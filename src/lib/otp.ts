import { prisma } from './prisma';

/**
 * Generate a 6-digit OTP
 */
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Create and store OTP in database
 */
export async function createOTP(
  email: string,
  purpose: 'login' | 'signup' | 'password_reset'
): Promise<string> {
  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  await prisma.oTP.create({
    data: {
      email,
      otp,
      purpose,
      expiresAt,
    },
  });

  return otp;
}

/**
 * Verify OTP and mark as used
 */
export async function verifyOTP(
  email: string,
  otp: string,
  purpose: 'login' | 'signup' | 'password_reset'
): Promise<boolean> {
  // Find the most recent OTP for this email and purpose
  const otpRecord = await prisma.oTP.findFirst({
    where: {
      email,
      otp,
      purpose,
      verified: false,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: 'desc' },
  });

  if (!otpRecord) {
    return false;
  }

  // Check if max attempts exceeded
  if (otpRecord.attempts >= 5) {
    return false;
  }

  // Increment attempts
  await prisma.oTP.update({
    where: { id: otpRecord.id },
    data: { attempts: otpRecord.attempts + 1 },
  });

  // Mark as verified
  await prisma.oTP.update({
    where: { id: otpRecord.id },
    data: {
      verified: true,
      verifiedAt: new Date(),
    },
  });

  return true;
}

/**
 * Check if OTP rate limit is exceeded
 * Returns true if user can request OTP, false if rate limited
 */
export async function checkOTPRateLimit(email: string): Promise<boolean> {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

  const recentOTPs = await prisma.oTP.count({
    where: {
      email,
      createdAt: { gt: oneHourAgo },
    },
  });

  // Allow max 5 OTP requests per hour
  return recentOTPs < 5;
}

/**
 * Clean up expired OTPs (can be called periodically)
 */
export async function cleanupExpiredOTPs(): Promise<number> {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const result = await prisma.oTP.deleteMany({
    where: {
      OR: [
        { expiresAt: { lt: new Date() } },
        { createdAt: { lt: sevenDaysAgo } },
      ],
    },
  });

  return result.count;
}
