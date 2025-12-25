import nodemailer from 'nodemailer';

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Send OTP email to user
 */
export async function sendOTPEmail(
  email: string,
  otp: string,
  purpose: 'login' | 'signup' | 'password_reset'
): Promise<void> {
  const subject =
    purpose === 'login'
      ? 'Your Login OTP - Rasoi Gadget'
      : purpose === 'signup'
      ? 'Verify Your Email - Rasoi Gadget'
      : 'Reset Your Password - Rasoi Gadget';

  const title =
    purpose === 'login'
      ? 'Login to Your Account'
      : purpose === 'signup'
      ? 'Welcome to Rasoi Gadget!'
      : 'Reset Your Password';

  const message =
    purpose === 'login'
      ? 'Use this code to log in to your account:'
      : purpose === 'signup'
      ? 'Use this code to verify your email address:'
      : 'Use this code to reset your password:';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">Rasoi Gadget</h1>
                  <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Satvik Cooking Books</p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <h2 style="color: #333333; margin: 0 0 20px 0; font-size: 24px;">${title}</h2>
                  <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                    ${message}
                  </p>
                  
                  <!-- OTP Box -->
                  <div style="background-color: #f8f9fa; border: 2px dashed #667eea; border-radius: 8px; padding: 30px; text-align: center; margin: 0 0 30px 0;">
                    <p style="color: #666666; font-size: 14px; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 1px;">Your OTP Code</p>
                    <div style="font-size: 36px; font-weight: bold; color: #667eea; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                      ${otp}
                    </div>
                  </div>
                  
                  <p style="color: #999999; font-size: 14px; line-height: 1.6; margin: 0;">
                    <strong>Important:</strong> This code will expire in <strong>10 minutes</strong>. 
                    If you didn't request this code, please ignore this email.
                  </p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #f8f9fa; padding: 20px 30px; border-top: 1px solid #e9ecef;">
                  <p style="color: #999999; font-size: 12px; line-height: 1.6; margin: 0; text-align: center;">
                    This is an automated email from Rasoi Gadget. Please do not reply to this email.
                  </p>
                  <p style="color: #999999; font-size: 12px; margin: 10px 0 0 0; text-align: center;">
                    © ${new Date().getFullYear()} Rasoi Gadget. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || '"Rasoi Gadget" <noreply@rasoigadget.com>',
    to: email,
    subject,
    html,
  });
}

/**
 * Send welcome email after successful order
 */
export async function sendWelcomeEmail(
  email: string,
  name: string
): Promise<void> {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Rasoi Gadget</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <tr>
                <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">Welcome to Rasoi Gadget!</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 40px 30px;">
                  <h2 style="color: #333333; margin: 0 0 20px 0;">Hi ${name || 'there'}! 👋</h2>
                  <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                    Thank you for your purchase! Your account has been created and you can now:
                  </p>
                  <ul style="color: #666666; font-size: 16px; line-height: 1.8; margin: 0 0 20px 0;">
                    <li>Track your orders anytime</li>
                    <li>Download your ebooks</li>
                    <li>Access your purchase history</li>
                  </ul>
                  <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                    To log in, simply use your email address and we'll send you a one-time password.
                  </p>
                  <div style="text-align: center;">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL}/login" style="display: inline-block; background-color: #667eea; color: #ffffff; text-decoration: none; padding: 14px 30px; border-radius: 6px; font-weight: bold; font-size: 16px;">
                      Log In Now
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="background-color: #f8f9fa; padding: 20px 30px; border-top: 1px solid #e9ecef;">
                  <p style="color: #999999; font-size: 12px; text-align: center; margin: 0;">
                    © ${new Date().getFullYear()} Rasoi Gadget. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || '"Rasoi Gadget" <noreply@rasoigadget.com>',
    to: email,
    subject: 'Welcome to Rasoi Gadget! 🎉',
    html,
  });
}
