import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { parse } from 'csv-parse/sync';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file provided' },
        { status: 400 }
      );
    }

    const csvText = await file.text();
    const records = parse(csvText, {
      columns: true,
      skip_empty_lines: true,
    });

    let imported = 0;
    let skipped = 0;

    for (const record of (records as any[])) {
      const rec = record as any;
      try {
        // Parse the order number (remove # prefix)
        const orderNumber = rec['Name']?.replace('#', '') || '';
        
        if (!orderNumber) {
          skipped++;
          continue;
        }

        // Check if already imported
        const existing = await prisma.archivedOrder.findUnique({
          where: { orderNumber },
        });

        if (existing) {
          skipped++;
          continue;
        }

        // Parse dates
        const createdAt = rec['Created at'] ? new Date(rec['Created at']) : new Date();
        const paidAt = rec['Paid at'] ? new Date(rec['Paid at']) : null;

        // Create archived order
        await prisma.archivedOrder.create({
          data: {
            orderNumber,
            customerName: rec['Billing Name'] || null,
            customerEmail: rec['Email'] || null,
            customerPhone: rec['Phone'] || rec['Billing Phone'] || null,
            financialStatus: rec['Financial Status'] || null,
            paidAt,
            fulfillmentStatus: rec['Fulfillment Status'] || null,
            createdAt,
            subtotal: parseFloat(rec['Subtotal']) || null,
            shipping: parseFloat(rec['Shipping']) || null,
            taxes: parseFloat(rec['Taxes']) || null,
            total: parseFloat(rec['Total']) || null,
            discountCode: rec['Discount Code'] || null,
            discountAmount: parseFloat(rec['Discount Amount']) || null,
            paymentMethod: rec['Payment Method'] || null,
            paymentReference: rec['Payment Reference'] || null,
            billingAddress: rec['Billing Address1'] || null,
            billingCity: rec['Billing City'] || null,
            billingState: rec['Billing Province'] || null,
            billingZip: rec['Billing Zip'] || null,
            billingCountry: rec['Billing Country'] || null,
            shippingAddress: rec['Shipping Address1'] || null,
            shippingCity: rec['Shipping City'] || null,
            shippingState: rec['Shipping Province'] || null,
            shippingZip: rec['Shipping Zip'] || null,
            shippingCountry: rec['Shipping Country'] || null,
            productName: rec['Lineitem name'] || null,
            quantity: parseInt(rec['Lineitem quantity']) || null,
          },
        });

        imported++;
      } catch (error) {
        console.error(`Error importing order ${rec['Name']}:`, error);
        skipped++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Import completed: ${imported} orders imported, ${skipped} skipped`,
      imported,
      skipped,
    });
  } catch (error) {
    console.error('Error importing archived orders:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to import orders',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
