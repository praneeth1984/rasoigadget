import { NextRequest, NextResponse } from 'next/server';
import { sendTestEmail } from '@/lib/mail';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    const result = await sendTestEmail(email);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `Test email sent successfully to ${email}`,
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Failed to send test email', error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in test email route:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
