# Customer Authentication Implementation Guide

This guide explains how to implement email OTP-based authentication and password management for customers.

## 🎯 User Flow

### 1. **Order Placement (First Time)**

- Customer places order
- Collects: Email + Phone Number
- User account created automatically
- Email verification optional at this stage

### 2. **Login Flow**

- Customer enters email
- System sends 6-digit OTP to email
- Customer enters OTP
- OTP verified → Logged in
- Option to set password for future logins

### 3. **Password Creation (Optional)**

- After OTP login, customer can set password
- Future logins: Email + Password OR Email + OTP

### 4. **Password Reset**

- Customer clicks "Forgot Password"
- Enters email
- Receives OTP via email
- Verifies OTP
- Sets new password

## 📊 Database Schema

### User Table (Updated)

```sql
- phone: TEXT (customer phone number)
- emailVerified: BOOLEAN (email verification status)
- lastLoginAt: TIMESTAMP (last login time)
```

### OTP Table (New)

```sql
- id: TEXT (primary key)
- email: TEXT (customer email)
- otp: TEXT (6-digit code)
- purpose: TEXT ('login', 'signup', 'password_reset')
- expiresAt: TIMESTAMP (validity: 10 minutes)
- verified: BOOLEAN (verification status)
- attempts: INTEGER (max 3-5 attempts)
- createdAt: TIMESTAMP
- verifiedAt: TIMESTAMP
```

### PasswordResetToken Table (New)

```sql
- id: TEXT (primary key)
- userId: TEXT (foreign key to User)
- token: TEXT (unique reset token)
- expiresAt: TIMESTAMP (validity: 1 hour)
- used: BOOLEAN (one-time use)
- createdAt: TIMESTAMP
- usedAt: TIMESTAMP
```

## 🚀 Implementation

### Step 1: Run Migration

```bash
psql -U postgres -d rasoigadget -f prisma/migrations/005_add_customer_auth.sql
```

### Step 2: Generate Prisma Client

```bash
npx prisma generate
```

### Step 3: Install Dependencies

```bash
npm install nodemailer bcrypt
npm install -D @types/nodemailer @types/bcrypt
```

### Step 4: Configure Email Service

Add to `.env.local`:

```env
# Email Configuration (using Gmail as example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=Rasoi Gadget <noreply@rasoigadget.com>
```

## 💻 Backend Implementation

### 1. Email Service

```typescript
// src/lib/email.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOTPEmail(
  email: string,
  otp: string,
  purpose: string
) {
  const subject =
    purpose === "login"
      ? "Your Login OTP - Rasoi Gadget"
      : purpose === "signup"
      ? "Verify Your Email - Rasoi Gadget"
      : "Reset Your Password - Rasoi Gadget";

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Your OTP Code</h2>
      <p>Your one-time password is:</p>
      <div style="background: #f4f4f4; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px;">
        ${otp}
      </div>
      <p>This code will expire in 10 minutes.</p>
      <p>If you didn't request this code, please ignore this email.</p>
      <hr>
      <p style="color: #666; font-size: 12px;">Rasoi Gadget - Satvik Cooking Books</p>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject,
    html,
  });
}
```

### 2. OTP Generation Utility

```typescript
// src/lib/otp.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function createOTP(
  email: string,
  purpose: "login" | "signup" | "password_reset"
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

export async function verifyOTP(
  email: string,
  otp: string,
  purpose: string
): Promise<boolean> {
  const otpRecord = await prisma.oTP.findFirst({
    where: {
      email,
      otp,
      purpose,
      verified: false,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!otpRecord) {
    return false;
  }

  // Check attempts
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
```

### 3. Send OTP API

```typescript
// src/app/api/auth/send-otp/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createOTP } from "@/lib/otp";
import { sendOTPEmail } from "@/lib/email";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email, purpose } = await request.json();

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Invalid email address" },
        { status: 400 }
      );
    }

    // Check if user exists (for login/password_reset)
    if (purpose === "login" || purpose === "password_reset") {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return NextResponse.json(
          { success: false, message: "Email not found" },
          { status: 404 }
        );
      }
    }

    // Generate and send OTP
    const otp = await createOTP(email, purpose);
    await sendOTPEmail(email, otp, purpose);

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Send OTP error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send OTP" },
      { status: 500 }
    );
  }
}
```

### 4. Verify OTP API

```typescript
// src/app/api/auth/verify-otp/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyOTP } from "@/lib/otp";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email, otp, purpose } = await request.json();

    const isValid = await verifyOTP(email, otp, purpose);

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired OTP" },
        { status: 401 }
      );
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        emailVerified: true,
      },
    });

    // Update email verification status
    if (user && !user.emailVerified) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: true },
      });
    }

    // Update last login
    if (user && purpose === "login") {
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      });
    }

    return NextResponse.json({
      success: true,
      message: "OTP verified successfully",
      user,
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return NextResponse.json(
      { success: false, message: "Verification failed" },
      { status: 500 }
    );
  }
}
```

### 5. Set Password API

```typescript
// src/app/api/auth/set-password/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate password
    if (!password || password.length < 8) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    return NextResponse.json({
      success: true,
      message: "Password set successfully",
    });
  } catch (error) {
    console.error("Set password error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to set password" },
      { status: 500 }
    );
  }
}
```

## 🎨 Frontend Implementation

### Login Page

```typescript
// src/app/login/page.tsx
"use client";

import { useState } from "react";

export default function LoginPage() {
  const [step, setStep] = useState<"email" | "otp" | "password">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, purpose: "login" }),
      });

      const data = await response.json();

      if (data.success) {
        setStep("otp");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, purpose: "login" }),
      });

      const data = await response.json();

      if (data.success) {
        // Store user session
        sessionStorage.setItem("user", JSON.stringify(data.user));
        // Redirect to dashboard
        window.location.href = "/orders";
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Customer Login</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        {step === "email" && (
          <div>
            <label className="block mb-2 font-medium">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded mb-4"
              placeholder="your@email.com"
            />
            <button
              onClick={handleSendOTP}
              disabled={loading}
              className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </div>
        )}

        {step === "otp" && (
          <div>
            <p className="mb-4 text-gray-600">
              We've sent a 6-digit code to <strong>{email}</strong>
            </p>
            <label className="block mb-2 font-medium">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 border rounded mb-4 text-center text-2xl tracking-widest"
              placeholder="000000"
              maxLength={6}
            />
            <button
              onClick={handleVerifyOTP}
              disabled={loading || otp.length !== 6}
              className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <button
              onClick={() => setStep("email")}
              className="w-full mt-2 text-blue-600 hover:underline"
            >
              Change Email
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
```

## 🔒 Security Best Practices

1. **OTP Security:**

   - 6-digit codes (100,000 - 999,999)
   - 10-minute expiration
   - Maximum 5 attempts
   - One-time use only

2. **Rate Limiting:**

   - Limit OTP requests per email (e.g., 3 per hour)
   - Implement IP-based rate limiting
   - Add CAPTCHA for suspicious activity

3. **Email Security:**

   - Use app-specific passwords for Gmail
   - Enable 2FA on email account
   - Use dedicated email service (SendGrid, AWS SES)

4. **Password Requirements:**
   - Minimum 8 characters
   - Mix of uppercase, lowercase, numbers
   - Hash with bcrypt (cost factor 10+)

## 📝 Testing

### Test OTP Flow

```bash
# Send OTP
curl -X POST http://localhost:3000/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","purpose":"login"}'

# Verify OTP
curl -X POST http://localhost:3000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","otp":"123456","purpose":"login"}'
```

### Check OTP in Database

```sql
SELECT * FROM "OTP" WHERE email = 'test@example.com' ORDER BY "createdAt" DESC LIMIT 5;
```

## 🧹 Maintenance

### Clean Up Expired OTPs

```sql
-- Manual cleanup
DELETE FROM "OTP" WHERE "expiresAt" < CURRENT_TIMESTAMP;

-- Or use the function
SELECT cleanup_expired_otps();
```

### Set Up Cron Job (Optional)

```sql
-- Run daily at midnight
CREATE EXTENSION IF NOT EXISTS pg_cron;

SELECT cron.schedule('cleanup-otps', '0 0 * * *', 'SELECT cleanup_expired_otps()');
```

## 🆘 Troubleshooting

### OTP Not Received

- Check spam/junk folder
- Verify SMTP credentials
- Check email service logs
- Test with different email provider

### OTP Verification Fails

- Check OTP hasn't expired (10 min)
- Verify attempts < 5
- Ensure OTP matches exactly
- Check database for OTP record

### Email Sending Fails

- Verify SMTP settings
- Check firewall/port 587
- Enable "Less secure apps" (Gmail)
- Use app-specific password

## 📋 Checklist

- [ ] Run migration 005_add_customer_auth.sql
- [ ] Update Prisma schema
- [ ] Run `npx prisma generate`
- [ ] Install nodemailer and bcrypt
- [ ] Configure SMTP settings in .env
- [ ] Implement email service
- [ ] Create OTP utility functions
- [ ] Build send-otp API endpoint
- [ ] Build verify-otp API endpoint
- [ ] Build set-password API endpoint
- [ ] Create login page UI
- [ ] Test OTP flow end-to-end
- [ ] Set up rate limiting
- [ ] Configure email templates
- [ ] Set up OTP cleanup job
