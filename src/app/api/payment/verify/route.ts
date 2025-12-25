import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { sendInvoiceEmail } from '@/lib/mail';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(`[VERIFY] Incoming verification request for Razorpay Order: ${body.razorpay_order_id}`);
    
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customer_email,
      customer_name,
      customer_phone,
      customer_state,
      amount,
    } = body;

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

      // Get the next sequential order number for paid orders
      // First check if admin has set a custom starting number
      const nextOrderSetting = await prisma.setting.findUnique({
        where: { key: 'nextOrderNumber' },
      });

      const lastPaidOrder = await prisma.order.findFirst({
        where: {
          orderNumber: { not: null },
        },
        orderBy: {
          orderNumber: 'desc',
        },
        select: {
          orderNumber: true,
        },
      });

      // Use the highest of: last order number, or admin setting, or default 1112
      const adminStartNumber = nextOrderSetting ? parseInt(nextOrderSetting.value) - 1 : 1112;
      const nextOrderNumber = Math.max((lastPaidOrder?.orderNumber || 0), adminStartNumber) + 1;

      // Update existing pending order record with order number
      const order = await prisma.order.update({
        where: { razorpayOrderId: razorpay_order_id },
        data: {
          orderNumber: nextOrderNumber, // Assign sequential number only for paid orders
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

      console.log(`[VERIFY] Order ${order.id} marked as completed. Attempting to send invoice email...`);

      // Send confirmation email with invoice link and log it
      try {
        await sendInvoiceEmail(order);
        
        console.log(`[VERIFY] Invoice email sent successfully for order: ${order.id}`);

        // Log successful email send
        await prisma.emailLog.create({
          data: {
            orderId: order.id,
            recipientEmail: order.customerEmail,
            emailType: 'invoice',
            subject: `Your Order Confirmation & Invoice - #${order.id}`,
            status: 'sent',
            sentBy: 'system',
          },
        });
      } catch (mailError) {
        console.error(`[VERIFY] Failed to send confirmation email for order ${order.id}:`, mailError);
        
        // Log failed email attempt
        await prisma.emailLog.create({
          data: {
            orderId: order.id,
            recipientEmail: order.customerEmail,
            emailType: 'invoice',
            subject: `Your Order Confirmation & Invoice - #${order.id}`,
            status: 'failed',
            errorMessage: mailError instanceof Error ? mailError.message : 'Unknown error',
            sentBy: 'system',
          },
        });
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
    console.error('Error details:', JSON.stringify(error, null, 2));
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to verify payment',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

