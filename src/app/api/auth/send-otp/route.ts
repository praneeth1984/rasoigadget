import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createOTP, checkOTPRateLimit } from '@/lib/otp';
import { sendOTPEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, purpose } = body;

    // Validate input
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address' },
        { status: 400 }
      );
    }

    if (!['login', 'signup', 'password_reset'].includes(purpose)) {
      return NextResponse.json(
        { success: false, message: 'Invalid purpose' },
        { status: 400 }
      );
    }

    // Check rate limit
    const canSendOTP = await checkOTPRateLimit(email);
    if (!canSendOTP) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many OTP requests. Please try again later.',
        },
        { status: 429 }
      );
    }

    // Check if user exists for login and password_reset
    if (purpose === 'login' || purpose === 'password_reset') {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return NextResponse.json(
          {
            success: false,
            message: 'No account found with this email address',
          },
          { status: 404 }
        );
      }
    }

    // For signup, check if user already exists
    if (purpose === 'signup') {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return NextResponse.json(
          {
            success: false,
            message: 'An account with this email already exists',
          },
          { status: 409 }
        );
      }
    }

    // Generate and send OTP
    const otp = await createOTP(email, purpose);
    await sendOTPEmail(email, otp, purpose);

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully to your email',
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send OTP. Please try again.' },
      { status: 500 }
    );
  }
}
