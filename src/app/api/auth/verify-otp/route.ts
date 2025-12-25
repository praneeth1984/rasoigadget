import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyOTP } from '@/lib/otp';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, otp, purpose } = body;

    // Validate input
    if (!email || !otp || !purpose) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      return NextResponse.json(
        { success: false, message: 'Invalid OTP format' },
        { status: 400 }
      );
    }

    // Verify OTP
    const isValid = await verifyOTP(email, otp, purpose);

    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid or expired OTP. Please request a new one.',
        },
        { status: 401 }
      );
    }

    // Get or create user
    let user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        isAdmin: true,
        emailVerified: true,
      },
    });

    // Create user if doesn't exist (signup flow)
    if (!user && purpose === 'signup') {
      user = await prisma.user.create({
        data: {
          email,
          emailVerified: true,
        },
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          isAdmin: true,
          emailVerified: true,
        },
      });
    }

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Update email verification status if not verified
    if (!user.emailVerified) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: true },
      });
      user.emailVerified = true;
    }

    // Update last login for login purpose
    if (purpose === 'login') {
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'OTP verified successfully',
      user,
      requiresPassword: purpose === 'password_reset',
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json(
      { success: false, message: 'Verification failed. Please try again.' },
      { status: 500 }
    );
  }
}
