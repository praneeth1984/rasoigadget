# Database Schema

This directory contains the SQL schema for the Rasoi Gadget application.

## Quick Start

### Run the Schema

For production or fresh installations:

```bash
psql -U postgres -d rasoigadget -f prisma/migrations/schema.sql
```

Or from within psql:

```bash
psql -U postgres -d rasoigadget
\i prisma/migrations/schema.sql
\q
```

This single script creates the complete database schema with all tables, indexes, and triggers.

## What's Included

### schema.sql

**Complete database schema** including:

#### Tables

- **User** - Customer and admin user management

  - Email, name, phone, password
  - Admin role flag (`isAdmin`)
  - Email verification status
  - Last login tracking

- **Order** - Order and payment tracking

  - Razorpay integration (order ID, payment ID)
  - Amount, currency, status
  - Customer details
  - Timestamps

- **OTP** - Email OTP verification

  - 6-digit codes for login/signup/password reset
  - Expiration tracking (10 minutes)
  - Attempt limiting (max 5)
  - Purpose tracking

- **PasswordResetToken** - Password reset tokens
  - One-time use tokens
  - Expiration tracking (1 hour)
  - User association

#### Features

- ✅ Automatic timestamp updates (triggers)
- ✅ Foreign key constraints
- ✅ Optimized indexes
- ✅ Default admin user
- ✅ OTP cleanup function
- ✅ Comprehensive documentation (SQL comments)

## Database Schema Overview

```
User
├── id (PK)
├── email (unique)
├── name
├── phone
├── password (hashed)
├── isAdmin (boolean)
├── emailVerified (boolean)
├── lastLoginAt
├── createdAt
└── updatedAt

Order
├── id (PK)
├── userId (FK → User)
├── razorpayOrderId (unique)
├── razorpayPaymentId (unique)
├── amount (paise)
├── currency
├── status
├── productName
├── customerEmail
├── customerName
├── customerPhone
├── createdAt
└── updatedAt

OTP
├── id (PK)
├── email
├── otp (6-digit)
├── purpose (login/signup/password_reset)
├── expiresAt
├── verified
├── attempts
├── createdAt
└── verifiedAt

PasswordResetToken
├── id (PK)
├── userId (FK → User)
├── token (unique)
├── expiresAt
├── used
├── createdAt
└── usedAt
```

## Default Admin User

The schema creates a default admin user:

- **Email:** `admin@rasoigadget.com`
- **Password:** `Admin@123`

⚠️ **IMPORTANT:** Change this password immediately after setup!

## After Running Schema

### 1. Generate Prisma Client

```bash
npx prisma generate
```

### 2. Verify Schema

```bash
# Using Prisma Studio
npx prisma studio

# Using psql
psql -U postgres -d rasoigadget -c "\dt"  # List tables
psql -U postgres -d rasoigadget -c "\d User"  # Describe User table
```

### 3. Install Dependencies

```bash
npm install nodemailer bcrypt
npm install -D @types/nodemailer @types/bcrypt
```

### 4. Configure Environment

Add to `.env.local`:

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/rasoigadget?schema=public"

# Email (for OTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=Rasoi Gadget <noreply@rasoigadget.com>
```

## Authentication Features

### Admin Authentication

- Database-driven (not secret key)
- Email + password login
- Stored in User table with `isAdmin = true`

### Customer Authentication

- Email OTP-based login
- Optional password creation
- Email verification
- Password reset via OTP

## Maintenance

### Clean Expired OTPs

```sql
-- Manual cleanup
DELETE FROM "OTP" WHERE "expiresAt" < CURRENT_TIMESTAMP;

-- Or use the function
SELECT cleanup_expired_otps();
```

### Set Up Automatic Cleanup (Optional)

```sql
-- Requires pg_cron extension
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Run daily at midnight
SELECT cron.schedule('cleanup-otps', '0 0 * * *', 'SELECT cleanup_expired_otps()');
```

## User Management

### Create Admin User

```sql
-- First, generate password hash using bcrypt
-- Then insert:
INSERT INTO "User" ("id", "email", "name", "password", "isAdmin", "createdAt", "updatedAt")
VALUES (
    gen_random_uuid()::text,
    'newadmin@example.com',
    'Admin Name',
    '$2b$10$YOUR_BCRYPT_HASH_HERE',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);
```

### Promote User to Admin

```sql
UPDATE "User"
SET "isAdmin" = true, "updatedAt" = CURRENT_TIMESTAMP
WHERE "email" = 'user@example.com';
```

### List All Admins

```sql
SELECT "id", "email", "name", "createdAt"
FROM "User"
WHERE "isAdmin" = true
ORDER BY "createdAt" DESC;
```

## Troubleshooting

### Schema Already Exists

The script uses `IF NOT EXISTS` clauses, so it's safe to run multiple times. Existing data won't be affected.

### Permission Issues

```sql
GRANT ALL PRIVILEGES ON DATABASE rasoigadget TO rasoigadget_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO rasoigadget_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO rasoigadget_user;
```

### Connection Issues

Check PostgreSQL is running:

```bash
# Linux
sudo systemctl status postgresql

# macOS
brew services list
```

## Production Deployment

1. **Create database** on your hosting provider (Neon, Supabase, Railway, etc.)
2. **Get connection string** from provider
3. **Add to environment variables** as `DATABASE_URL`
4. **Run schema:**
   ```bash
   psql $DATABASE_URL -f prisma/migrations/schema.sql
   ```
5. **Generate Prisma client:**
   ```bash
   npx prisma generate
   ```
6. **Change admin password** immediately

## Documentation

- **CUSTOMER_AUTH_GUIDE.md** - Complete customer authentication implementation
- **DATABASE_ADMIN_AUTH_GUIDE.md** - Admin authentication implementation
- **DATABASE_SETUP.md** - General database setup guide

## Support

For implementation help, see:

- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
