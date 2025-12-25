-- ============================================================================
-- RASOI GADGET - DATABASE SCHEMA
-- ============================================================================
-- Description: Complete database schema with authentication and order management
-- Version: 1.0
-- Created: 2025-12-25
-- 
-- Usage:
--   psql -U postgres -d rasoigadget -f prisma/migrations/schema.sql
--
-- Features:
--   - User management with admin roles
--   - Order tracking with Razorpay integration
--   - Email OTP-based authentication
--   - Password reset functionality
--   - Phone number collection
--
-- ============================================================================

-- Start transaction for safety
BEGIN;

-- ============================================================================
-- TABLES
-- ============================================================================

-- User Table
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE,
    "name" TEXT,
    "phone" TEXT,
    "password" TEXT,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Order Table
CREATE TABLE IF NOT EXISTS "Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "razorpayOrderId" TEXT NOT NULL UNIQUE,
    "razorpayPaymentId" TEXT NOT NULL UNIQUE,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "status" TEXT NOT NULL DEFAULT 'completed',
    "productName" TEXT NOT NULL DEFAULT 'Satvik 3-Book Collection',
    "customerEmail" TEXT NOT NULL,
    "customerName" TEXT,
    "customerPhone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- OTP Table
CREATE TABLE IF NOT EXISTS "OTP" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verifiedAt" TIMESTAMP(3)
);

-- Password Reset Token Table
CREATE TABLE IF NOT EXISTS "PasswordResetToken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL UNIQUE,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usedAt" TIMESTAMP(3),
    CONSTRAINT "PasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- User indexes
CREATE INDEX IF NOT EXISTS "User_isAdmin_idx" ON "User"("isAdmin") WHERE "isAdmin" = true;
CREATE INDEX IF NOT EXISTS "User_phone_idx" ON "User"("phone");
CREATE INDEX IF NOT EXISTS "User_emailVerified_idx" ON "User"("emailVerified");

-- Order indexes
CREATE INDEX IF NOT EXISTS "Order_userId_idx" ON "Order"("userId");
CREATE INDEX IF NOT EXISTS "Order_customerEmail_idx" ON "Order"("customerEmail");
CREATE INDEX IF NOT EXISTS "Order_createdAt_idx" ON "Order"("createdAt");

-- OTP indexes
CREATE INDEX IF NOT EXISTS "OTP_email_idx" ON "OTP"("email");
CREATE INDEX IF NOT EXISTS "OTP_expiresAt_idx" ON "OTP"("expiresAt");
CREATE INDEX IF NOT EXISTS "OTP_purpose_idx" ON "OTP"("purpose");

-- PasswordResetToken indexes
CREATE INDEX IF NOT EXISTS "PasswordResetToken_userId_idx" ON "PasswordResetToken"("userId");
CREATE INDEX IF NOT EXISTS "PasswordResetToken_token_idx" ON "PasswordResetToken"("token");
CREATE INDEX IF NOT EXISTS "PasswordResetToken_expiresAt_idx" ON "PasswordResetToken"("expiresAt");

-- ============================================================================
-- TRIGGERS & FUNCTIONS
-- ============================================================================

-- Function to auto-update updatedAt timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for User table
DROP TRIGGER IF EXISTS update_user_updated_at ON "User";
CREATE TRIGGER update_user_updated_at 
    BEFORE UPDATE ON "User"
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Triggers for Order table
DROP TRIGGER IF EXISTS update_order_updated_at ON "Order";
CREATE TRIGGER update_order_updated_at 
    BEFORE UPDATE ON "Order"
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Function to cleanup expired OTPs
CREATE OR REPLACE FUNCTION cleanup_expired_otps()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM "OTP" 
    WHERE "expiresAt" < CURRENT_TIMESTAMP 
    AND "createdAt" < CURRENT_TIMESTAMP - INTERVAL '7 days';
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- COMMENTS (Documentation)
-- ============================================================================

-- Table comments
COMMENT ON TABLE "User" IS 'Stores user information for customers and admins';
COMMENT ON TABLE "Order" IS 'Stores order and payment information from Razorpay';
COMMENT ON TABLE "OTP" IS 'Stores OTP codes for email verification, login, and password reset';
COMMENT ON TABLE "PasswordResetToken" IS 'Stores password reset tokens sent via email';

-- User column comments
COMMENT ON COLUMN "User"."phone" IS 'Customer phone number for contact and verification';
COMMENT ON COLUMN "User"."password" IS 'Hashed password for authentication (bcrypt)';
COMMENT ON COLUMN "User"."isAdmin" IS 'Indicates if user has admin privileges';
COMMENT ON COLUMN "User"."emailVerified" IS 'Whether the user has verified their email via OTP';
COMMENT ON COLUMN "User"."lastLoginAt" IS 'Timestamp of last successful login';

-- Order column comments
COMMENT ON COLUMN "Order"."amount" IS 'Amount in paise (smallest currency unit)';
COMMENT ON COLUMN "Order"."status" IS 'Order status: completed, failed, or refunded';

-- OTP column comments
COMMENT ON COLUMN "OTP"."purpose" IS 'Purpose of OTP: login, signup, or password_reset';
COMMENT ON COLUMN "OTP"."attempts" IS 'Number of verification attempts (max 3-5)';
COMMENT ON COLUMN "OTP"."verified" IS 'Whether OTP has been successfully verified';

-- PasswordResetToken column comments
COMMENT ON COLUMN "PasswordResetToken"."used" IS 'Whether the token has been used (one-time use)';

-- Function comments
COMMENT ON FUNCTION update_updated_at_column() IS 'Automatically updates updatedAt timestamp on row updates';
COMMENT ON FUNCTION cleanup_expired_otps() IS 'Deletes OTPs older than 7 days and expired';

-- ============================================================================
-- SEED DATA (Default Admin User)
-- ============================================================================

-- Insert default admin user
-- Email: admin@rasoigadget.com
-- Password: Admin@123 (MUST BE CHANGED!)
INSERT INTO "User" ("id", "email", "name", "password", "isAdmin", "createdAt", "updatedAt")
VALUES (
    'admin_001',
    'admin@rasoigadget.com',
    'Admin User',
    '$2b$10$rKZvVVVVVVVVVVVVVVVVVOeH5pZYZYZYZYZYZYZYZYZYZYZYZYZYZY',  -- Placeholder hash
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT ("email") DO UPDATE SET
    "isAdmin" = true,
    "password" = EXCLUDED."password",
    "updatedAt" = CURRENT_TIMESTAMP;

-- ============================================================================
-- FINALIZE
-- ============================================================================

-- Commit transaction
COMMIT;

-- ============================================================================
-- VERIFICATION QUERY
-- ============================================================================
-- Run this after schema creation to verify:
-- 
-- SELECT 
--     'Users' as "Table",
--     COUNT(*) as "Total",
--     COUNT(*) FILTER (WHERE "isAdmin" = true) as "Admins",
--     COUNT(*) FILTER (WHERE "emailVerified" = true) as "Verified"
-- FROM "User"
-- UNION ALL
-- SELECT 'Orders', COUNT(*), NULL, NULL FROM "Order"
-- UNION ALL
-- SELECT 'OTPs', COUNT(*), NULL, NULL FROM "OTP"
-- UNION ALL
-- SELECT 'Reset Tokens', COUNT(*), NULL, NULL FROM "PasswordResetToken";
--
-- ============================================================================
-- IMPORTANT NOTES
-- ============================================================================
--
-- Default Admin Credentials:
--   Email: admin@rasoigadget.com
--   Password: Admin@123
--
-- ⚠️  SECURITY WARNING: Change the default password immediately!
--
-- Features Enabled:
--   ✓ User management (customers & admins)
--   ✓ Order tracking with Razorpay
--   ✓ Admin authentication (email + password)
--   ✓ Customer OTP-based login
--   ✓ Email verification
--   ✓ Password reset functionality
--   ✓ Phone number collection
--
-- Next Steps:
--   1. Run: npx prisma generate
--   2. Change admin password (see DATABASE_ADMIN_AUTH_GUIDE.md)
--   3. Configure SMTP for OTP emails (see CUSTOMER_AUTH_GUIDE.md)
--   4. Install dependencies: npm install nodemailer bcrypt
--   5. Implement authentication APIs
--
-- Documentation:
--   - CUSTOMER_AUTH_GUIDE.md - Customer authentication implementation
--   - DATABASE_ADMIN_AUTH_GUIDE.md - Admin authentication implementation
--   - DATABASE_QUICK_REFERENCE.md - Quick commands and queries
--
-- Maintenance:
--   - Clean expired OTPs: SELECT cleanup_expired_otps();
--
-- ============================================================================
