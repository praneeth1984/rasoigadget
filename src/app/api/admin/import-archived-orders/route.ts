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

    for (const record of records) {
      try {
        // Parse the order number (remove # prefix)
        const orderNumber = record['Name']?.replace('#', '') || '';
        
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
        const createdAt = record['Created at'] ? new Date(record['Created at']) : new Date();
        const paidAt = record['Paid at'] ? new Date(record['Paid at']) : null;

        // Create archived order
        await prisma.archivedOrder.create({
          data: {
            orderNumber,
            customerName: record['Billing Name'] || null,
            customerEmail: record['Email'] || null,
            customerPhone: record['Phone'] || record['Billing Phone'] || null,
            financialStatus: record['Financial Status'] || null,
            paidAt,
            fulfillmentStatus: record['Fulfillment Status'] || null,
            createdAt,
            subtotal: parseFloat(record['Subtotal']) || null,
            shipping: parseFloat(record['Shipping']) || null,
            taxes: parseFloat(record['Taxes']) || null,
            total: parseFloat(record['Total']) || null,
            discountCode: record['Discount Code'] || null,
            discountAmount: parseFloat(record['Discount Amount']) || null,
            paymentMethod: record['Payment Method'] || null,
            paymentReference: record['Payment Reference'] || null,
            billingAddress: record['Billing Address1'] || null,
            billingCity: record['Billing City'] || null,
            billingState: record['Billing Province'] || null,
            billingZip: record['Billing Zip'] || null,
            billingCountry: record['Billing Country'] || null,
            shippingAddress: record['Shipping Address1'] || null,
            shippingCity: record['Shipping City'] || null,
            shippingState: record['Shipping Province'] || null,
            shippingZip: record['Shipping Zip'] || null,
            shippingCountry: record['Shipping Country'] || null,
            productName: record['Lineitem name'] || null,
            quantity: parseInt(record['Lineitem quantity']) || null,
          },
        });

        imported++;
      } catch (error) {
        console.error(`Error importing order ${record['Name']}:`, error);
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
