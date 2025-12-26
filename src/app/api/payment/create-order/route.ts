import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { amount, customerInfo, productName } = await request.json();
    const finalProductName = productName || 'Satvik 3-Book Collection';

    // Initialize Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: amount * 100, // Razorpay expects amount in paise
      currency: process.env.PRODUCT_CURRENCY || 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        product: finalProductName,
      },
    });

    // If customer info is provided, create a pending order in DB
    if (customerInfo) {
      try {
        // Find or create user
        let user = await prisma.user.findUnique({
          where: { email: customerInfo.email },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email: customerInfo.email,
              name: customerInfo.name || null,
            },
          });
        }

        // Calculate GST (default 5% if not set)
        const gstSetting = await prisma.setting.findUnique({
          where: { key: 'gstPercentage' },
        });
        const gstPercentage = gstSetting ? parseFloat(gstSetting.value) : 5;
        const gstMultiplier = 1 + (gstPercentage / 100);

        const totalAmountPaise = amount * 100;
        const baseAmountPaise = Math.round(totalAmountPaise / gstMultiplier);
        const taxAmountPaise = totalAmountPaise - baseAmountPaise;

        // Create pending order (Draft)
        await prisma.order.create({
          data: {
            userId: user.id,
            razorpayOrderId: razorpayOrder.id,
            amount: totalAmountPaise,
            baseAmount: baseAmountPaise,
            taxAmount: taxAmountPaise,
            customerEmail: customerInfo.email,
            customerName: customerInfo.name || null,
            customerPhone: customerInfo.contact || null,
            customerState: customerInfo.state || null,
            discountCode: customerInfo.discountCode || null,
            discountAmount: customerInfo.discountCode === 'SATVIK10' ? Math.round((amount / 0.9) * 0.1 * 100) : null,
            productName: finalProductName,
            status: 'draft',
          } as any,
        });
      } catch (dbError) {
        console.error('Error creating pending order in DB:', dbError);
        // We still return the Razorpay order even if DB save fails
      }
    }

    return NextResponse.json({
      success: true,
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create order',
      },
      { status: 500 }
    );
  }
}
