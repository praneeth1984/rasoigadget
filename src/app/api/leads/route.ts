import { NextRequest, NextResponse } from 'next/server';
import { sendSampleEmail } from '@/lib/mail';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    // The discount code for leads
    const discountCode = 'SATVIK10';

    // Send the sample email asynchronously
    // In a real production app, you might use a queue
    const emailResult = await sendSampleEmail(email, discountCode);

    if (!emailResult.success) {
      // We still return success to the user but log the error
      console.error('Failed to send sample email to lead');
    }

    return NextResponse.json({
      success: true,
      message: 'Sample sent successfully',
      discountCode
    });
  } catch (error) {
    console.error('Error in leads API:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process request' },
      { status: 500 }
    );
  }
}
