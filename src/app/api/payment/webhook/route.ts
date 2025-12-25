import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { sendInvoiceEmail } from '@/lib/mail';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-razorpay-signature');
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!secret) {
      console.error('[WEBHOOK] RAZORPAY_WEBHOOK_SECRET is not defined');
      return NextResponse.json({ message: 'Webhook secret not configured' }, { status: 500 });
    }

    if (!signature) {
      console.error('[WEBHOOK] No signature provided');
      return NextResponse.json({ message: 'No signature' }, { status: 400 });
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    if (expectedSignature !== signature) {
      console.error('[WEBHOOK] Invalid signature');
      return NextResponse.json({ message: 'Invalid signature' }, { status: 400 });
    }

    const payload = JSON.parse(body);
    const event = payload.event;
    console.log(`[WEBHOOK] Received event: ${event}`);

    // Handle payment.captured or order.paid
    if (event === 'payment.captured' || event === 'order.paid') {
      const payment = payload.payload.payment.entity;
      const razorpayOrderId = payment.order_id;
      const razorpayPaymentId = payment.id;

      console.log(`[WEBHOOK] Processing payment for Razorpay Order: ${razorpayOrderId}`);

      // Find the order
      const order = await prisma.order.findUnique({
        where: { razorpayOrderId },
        include: { emailLogs: true }
      });

      if (!order) {
        console.error(`[WEBHOOK] Order not found for Razorpay Order ID: ${razorpayOrderId}`);
        return NextResponse.json({ message: 'Order not found' }, { status: 200 }); // Return 200 to Razorpay
      }

      // If order is already completed, just return success
      if (order.status === 'completed') {
        console.log(`[WEBHOOK] Order ${order.id} is already completed. Skipping.`);
        return NextResponse.json({ message: 'Order already processed' });
      }

      // 1. Calculate GST and Order Number (Logic duplicated from verify route for reliability)
      const totalAmountPaise = payment.amount;
      const baseAmountPaise = Math.round(totalAmountPaise / 1.18);
      const taxAmountPaise = totalAmountPaise - baseAmountPaise;

      const nextOrderSetting = await prisma.setting.findUnique({
        where: { key: 'nextOrderNumber' },
      });

      const lastPaidOrder = await prisma.order.findFirst({
        where: { orderNumber: { not: null } },
        orderBy: { orderNumber: 'desc' },
        select: { orderNumber: true },
      });

      const adminStartNumber = nextOrderSetting ? parseInt(nextOrderSetting.value) - 1 : 1112;
      const nextOrderNumber = Math.max((lastPaidOrder?.orderNumber || 0), adminStartNumber) + 1;

      // 2. Update order
      const updatedOrder = await prisma.order.update({
        where: { id: order.id },
        data: {
          orderNumber: nextOrderNumber,
          razorpayPaymentId: razorpayPaymentId,
          baseAmount: baseAmountPaise,
          taxAmount: taxAmountPaise,
          status: 'completed',
          // We might not have customer details in the webhook payload entity 
          // but they should be in the 'notes' if we passed them, or already in the 'order' draft
        } as any,
      });

      console.log(`[WEBHOOK] Order ${updatedOrder.id} updated to completed via webhook.`);

      // 3. Send Email (idempotent check)
      const alreadySent = order.emailLogs.some(log => log.emailType === 'invoice' && log.status === 'sent');
      
      if (!alreadySent) {
        try {
          await sendInvoiceEmail(updatedOrder);
          console.log(`[WEBHOOK] Invoice email sent for order: ${updatedOrder.id}`);
          
          await prisma.emailLog.create({
            data: {
              orderId: updatedOrder.id,
              recipientEmail: updatedOrder.customerEmail,
              emailType: 'invoice',
              subject: `Your Order Confirmation & Invoice - #${updatedOrder.id}`,
              status: 'sent',
              sentBy: 'webhook',
            },
          });
        } catch (mailError) {
          console.error(`[WEBHOOK] Failed to send email for order ${updatedOrder.id}:`, mailError);
          await prisma.emailLog.create({
            data: {
              orderId: updatedOrder.id,
              recipientEmail: updatedOrder.customerEmail,
              emailType: 'invoice',
              subject: `Your Order Confirmation & Invoice - #${updatedOrder.id}`,
              status: 'failed',
              errorMessage: mailError instanceof Error ? mailError.message : 'Unknown error',
              sentBy: 'webhook',
            },
          });
        }
      } else {
        console.log(`[WEBHOOK] Invoice email already sent for order ${updatedOrder.id}. Skipping email.`);
      }
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('[WEBHOOK] Error processing webhook:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
