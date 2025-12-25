import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  name: 'rasoigadget.com', // Improves deliverability by fixing EHLO hostname
});

export async function sendInvoiceEmail(order: any, ccEmails?: string[]) {
  const invoiceUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/orders/${order.id}/invoice`;

  const mailOptions = {
    from: process.env.SMTP_FROM || '"Rasoi Gadget" <noreply@rasoigadget.com>',
    to: order.customerEmail,
    cc: ccEmails && ccEmails.length > 0 ? ccEmails.join(',') : undefined,
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

        <h3 style="color: #4CAF50;">Your Downloads</h3>
        <p>Here are direct links to your ebooks:</p>
        <ul style="list-style: none; padding: 0;">
          <li style="margin-bottom: 15px; padding: 10px; border: 1px solid #eee; border-radius: 5px;">
            <strong>Satvik 4-in-1 Meal Book:</strong><br>
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/downloads/Satvik_4_in1_Meal_BookFinal.pdf" style="color: #9FCC7C; text-decoration: none;">Download PDF</a>
          </li>
          <li style="margin-bottom: 15px; padding: 10px; border: 1px solid #eee; border-radius: 5px;">
            <strong>Satvik Protein Book:</strong><br>
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/downloads/Satvik_Protein_BookFinal.pdf" style="color: #9FCC7C; text-decoration: none;">Download PDF</a>
          </li>
          <li style="margin-bottom: 15px; padding: 10px; border: 1px solid #eee; border-radius: 5px;">
            <strong>Satvik Dessert Book:</strong><br>
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/downloads/Satvik_Dessert_Book_Final.pdf" style="color: #9FCC7C; text-decoration: none;">Download PDF</a>
          </li>
        </ul>

        <h3 style="color: #FFB347;">Your Bonuses</h3>
        <ul style="list-style: none; padding: 0;">
          <li style="margin-bottom: 15px; padding: 10px; border: 1px solid #FFF9F0; background-color: #FFF9F0; border-radius: 5px;">
            <strong>Kids Meal Planner:</strong><br>
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/downloads/Kids-Meal-Planner.pdf" style="color: #FFB347; text-decoration: none;">Download PDF</a>
          </li>
          <li style="margin-bottom: 15px; padding: 10px; border: 1px solid #FFF9F0; background-color: #FFF9F0; border-radius: 5px;">
             <strong>Monthly Meal Planner:</strong><br>
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/downloads/Monthly-Meal-Planner.pdf" style="color: #FFB347; text-decoration: none;">Download PDF</a>
          </li>
        </ul>

        <div style="margin-top: 30px; text-align: center;">
            <p>You can also download your tax invoice:</p>
            <a href="${invoiceUrl}" style="display: inline-block; padding: 12px 24px; background-color: #555; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Download Invoice</a>
        </div>
        
        <p style="margin-top: 30px;">Keep Cooking Satvik!</p>
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

export async function sendSampleEmail(email: string, discountCode: string) {
  const samplerUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/free-sample`;

  const mailOptions = {
    from: process.env.SMTP_FROM || '"Rasoi Gadget" <noreply@rasoigadget.com>',
    to: email,
    subject: "🎁 Your Free Satvik Recipe Sampler & Special Gift!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
        <h2 style="color: #FFB347;">Your Satvik Journey Starts Here!</h2>
        <p>Hi there,</p>
        <p>Thank you for your interest in the Satvik lifestyle! As promised, here are your free sample recipes and an exclusive gift.</p>
        
        <div style="background: #FFF9F0; padding: 20px; border-radius: 8px; border: 1px solid #FFB347/30; margin: 20px 0; text-align: center;">
          <h3 style="color: #9FCC7C; margin-top: 0;">Get Your Free Sampler</h3>
          <p>Click below to view your digital sampler featuring 3 hero recipes from our collection:</p>
          <a href="${samplerUrl}" style="display: inline-block; padding: 12px 24px; background-color: #9FCC7C; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">View Free Sampler →</a>
        </div>

        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <h3 style="margin-top: 0;">Your Exclusive Discount</h3>
          <p>Get an <strong>ADDITIONAL 10% OFF</strong> our complete 3-Book Collection (250+ Recipes)!</p>
          <p style="font-size: 24px; font-weight: bold; color: #FFB347; letter-spacing: 2px;">${discountCode}</p>
          <p style="font-size: 12px; color: #777;">(Use this code at checkout)</p>
        </div>

        <p>Why switching to Satvik is the best decision for your health:</p>
        <ul style="color: #444;">
          <li>Pure Satvik (No Onion, No Garlic)</li>
          <li>High Protein options for energy</li>
          <li>Zero Refined Sugar / Flour</li>
        </ul>

        <p>Ready to get started? <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}" style="color: #9FCC7C; font-weight: bold;">Claim the full 250+ recipe collection here.</a></p>
        
        <p style="margin-top: 30px;">Keep Cooking Satvik!</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="font-size: 12px; color: #777; text-align: center;">Rasoi Gadget India</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Sample email sent to ${email}`);
    return { success: true };
  } catch (error) {
    console.error('Error sending sample email:', error);
    return { success: false, error };
  }
}
