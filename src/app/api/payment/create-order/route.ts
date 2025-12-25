import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { amount, customerInfo } = await request.json();

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
        product: 'Satvik 3-Book Collection',
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

        // Calculate GST (assuming 18% included in price)
        const totalAmountPaise = amount * 100;
        const baseAmountPaise = Math.round(totalAmountPaise / 1.18);
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
