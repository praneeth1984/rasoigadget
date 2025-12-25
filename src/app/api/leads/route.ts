import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
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

    // Save the lead to the database
    try {
      await prisma.lead.upsert({
        where: { email },
        update: {}, // No update needed if exists
        create: { email },
      });
      console.log(`[LEAD] Saved lead: ${email}`);
    } catch (dbError) {
      console.error('[LEAD] Failed to save lead to database:', dbError);
      // We continue even if DB save fails to send the email
    }

    // Send the sample email asynchronously
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
