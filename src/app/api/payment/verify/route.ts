import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { sendInvoiceEmail } from '@/lib/mail';

export async function POST(request: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customer_email,
      customer_name,
      customer_phone,
      customer_state,
      amount,
    } = await request.json();

    // Create signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(sign.toString())
      .digest('hex');

    // Verify signature
    if (razorpay_signature === expectedSignature) {
      // Find or create user
      let user = await prisma.user.findUnique({
        where: { email: customer_email },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            email: customer_email,
            name: customer_name || null,
          },
        });
      }

      // Calculate GST (assuming 18% included in price)
      // Total = Base * 1.18 -> Base = Total / 1.18
      const totalAmountPaise = amount;
      const baseAmountPaise = Math.round(totalAmountPaise / 1.18);
      const taxAmountPaise = totalAmountPaise - baseAmountPaise;

      // Update existing pending order record
      const order = await prisma.order.update({
        where: { razorpayOrderId: razorpay_order_id },
        data: {
          razorpayPaymentId: razorpay_payment_id,
          baseAmount: baseAmountPaise,
          taxAmount: taxAmountPaise,
          customerEmail: customer_email,
          customerName: customer_name || null,
          customerPhone: customer_phone || null,
          customerState: customer_state || null,
          status: 'completed',
        } as any,
      });

      // Send confirmation email with invoice link
      try {
        await sendInvoiceEmail(order);
      } catch (mailError) {
        console.error('Failed to send confirmation email:', mailError);
        // We don't fail the request if email fails
      }

      return NextResponse.json({
        success: true,
        message: 'Payment verified successfully',
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        orderRecordId: order.id,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid signature',
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to verify payment',
      },
      { status: 500 }
    );
  }
}

