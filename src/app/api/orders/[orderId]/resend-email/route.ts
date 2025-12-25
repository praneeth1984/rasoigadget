import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendInvoiceEmail } from '@/lib/mail';

export async function POST(
  request: NextRequest,
  props: { params: Promise<{ orderId: string }> }
) {
  try {
    const params = await props.params;
    const { ccEmails, sentBy } = await request.json();

    // Fetch the order
    const order = await prisma.order.findUnique({
      where: { id: params.orderId },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        { success: false, message: 'Order not found' },
        { status: 404 }
      );
    }

    if (order.status !== 'completed') {
      return NextResponse.json(
        { success: false, message: 'Can only resend emails for completed orders' },
        { status: 400 }
      );
    }

    try {
      // Send the email with CC if provided
      await sendInvoiceEmail(order as any, ccEmails);

      // Log the email send
      await prisma.emailLog.create({
        data: {
          orderId: order.id,
          recipientEmail: order.customerEmail,
          ccEmails: ccEmails?.join(',') || null,
          emailType: 'invoice',
          subject: `Invoice for Order #${order.orderNumber || order.id}`,
          status: 'sent',
          sentBy: sentBy || 'admin',
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Email sent successfully',
      });
    } catch (emailError) {
      // Log the failed email attempt
      await prisma.emailLog.create({
        data: {
          orderId: order.id,
          recipientEmail: order.customerEmail,
          ccEmails: ccEmails?.join(',') || null,
          emailType: 'invoice',
          subject: `Invoice for Order #${order.orderNumber || order.id}`,
          status: 'failed',
          errorMessage: emailError instanceof Error ? emailError.message : 'Unknown error',
          sentBy: sentBy || 'admin',
        },
      });

      throw emailError;
    }
  } catch (error) {
    console.error('Error resending email:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to resend email',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
