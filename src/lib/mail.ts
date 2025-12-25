import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendInvoiceEmail(order: any) {
  const invoiceUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/orders/${order.id}/invoice`;

  const mailOptions = {
    from: process.env.SMTP_FROM || '"Rasoi Gadget" <noreply@rasoigadget.com>',
    to: order.customerEmail,
    subject: `Your Order Confirmation & Invoice - #${order.id}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
        <h2 style="color: #9FCC7C;">Thank you for your purchase!</h2>
        <p>Hi ${order.customerName || 'Customer'},</p>
        <p>Your payment for <strong>${order.productName}</strong> has been successful.</p>
        <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>Order ID:</strong> #${order.id}</p>
          <p style="margin: 5px 0;"><strong>Amount Paid:</strong> ₹${(order.amount / 100).toFixed(2)}</p>
          <p style="margin: 5px 0;"><strong>Status:</strong> Paid</p>
        </div>
        <p>You can download your tax invoice by clicking the button below:</p>
        <a href="${invoiceUrl}" style="display: inline-block; padding: 12px 24px; background-color: #9FCC7C; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Download Invoice</a>
        <p style="margin-top: 30px;">Your ebooks are now available in your "My Orders" section.</p>
        <p>Keep Cooking Satvik!</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="font-size: 12px; color: #777; text-align: center;">Rasoi Gadget India</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Invoice email sent to ${order.customerEmail}`);
    return { success: true };
  } catch (error) {
    console.error('Error sending invoice email:', error);
    return { success: false, error };
  }
}
