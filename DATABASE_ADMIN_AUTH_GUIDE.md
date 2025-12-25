# Database-Driven Admin Authentication Guide

This guide explains how to implement and use the new database-driven admin authentication system.

## 🔄 Migration from Secret Key to Database-Driven Auth

The application now supports **database-driven admin authentication** instead of the shared `ADMIN_SECRET_KEY` approach.

### What Changed?

**Before (Secret Key):**

- Single shared secret key in environment variables
- Anyone with the key has admin access
- No user management or audit trail

**After (Database-Driven):**

- Admin users stored in database with `isAdmin` flag
- Individual credentials (email + password)
- Better security and audit capabilities
- Support for multiple admin users

## 📊 Database Schema Changes

### User Table Updates

```sql
ALTER TABLE "User"
ADD COLUMN "isAdmin" BOOLEAN NOT NULL DEFAULT false;
ADD COLUMN "password" TEXT;
```

**New Fields:**

- `password` (TEXT, nullable): Hashed password using bcrypt
- `isAdmin` (BOOLEAN, default: false): Admin role flag

## 🚀 Setup Instructions

### Step 1: Run Migrations

Apply the admin role migration:

```bash
# Option 1: Using Prisma
npx prisma migrate dev --name add_admin_role

# Option 2: Manual SQL
psql -U postgres -d rasoigadget -f prisma/migrations/003_add_admin_role.sql
```

### Step 2: Create Admin User

#### Option A: Using Seed Script (Quick Start)

```bash
psql -U postgres -d rasoigadget -f prisma/migrations/004_seed_admin_user.sql
```

**Default Credentials:**

- Email: `admin@rasoigadget.com`
- Password: `Admin@123`

⚠️ **IMPORTANT:** Change this password immediately after first login!

#### Option B: Create Custom Admin User

1. **Generate Password Hash:**

```javascript
// save as generate-hash.js
const bcrypt = require("bcrypt");

const password = "YourSecurePassword123!";
bcrypt.hash(password, 10, (err, hash) => {
  if (err) throw err;
  console.log("Password Hash:", hash);
});
```

```bash
npm install bcrypt
node generate-hash.js
```

2. **Insert Admin User:**

```sql
INSERT INTO "User" ("id", "email", "name", "password", "isAdmin", "createdAt", "updatedAt")
VALUES (
    'admin_custom',
    'your.email@example.com',
    'Your Name',
    '$2b$10$YOUR_GENERATED_HASH_HERE',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);
```

### Step 3: Update Prisma Schema

The schema has been updated to include the new fields:

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  password  String?  // Hashed password
  isAdmin   Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  orders    Order[]

  @@index([isAdmin])
}
```

### Step 4: Generate Prisma Client

```bash
npx prisma generate
```

## 🔐 Implementation Guide

### Backend: Authentication API

Create an authentication endpoint:

```typescript
// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        isAdmin: true,
      },
    });

    // Check if user exists
    if (!user || !user.password) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Check if user is admin
    if (!user.isAdmin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized - Admin access required" },
        { status: 403 }
      );
    }

    // Return user data (without password)
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
```

### Frontend: Login Form

Update the admin login page:

```typescript
// src/app/admin/page.tsx
"use client";

import { useState } from "react";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
        // Store user info in session/state
        sessionStorage.setItem("adminUser", JSON.stringify(data.user));
        // Fetch admin data...
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <form onSubmit={handleLogin} className="w-full max-w-md p-8">
          <h1 className="text-2xl font-bold mb-6">Admin Login</h1>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return <div>Admin Dashboard...</div>;
}
```

## 👥 Managing Admin Users

### Create New Admin User

```sql
-- Generate hash first using bcrypt, then:
INSERT INTO "User" ("id", "email", "name", "password", "isAdmin", "createdAt", "updatedAt")
VALUES (
    gen_random_uuid()::text,  -- or use cuid
    'newadmin@example.com',
    'New Admin Name',
    '$2b$10$GENERATED_HASH_HERE',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);
```

### Promote Existing User to Admin

```sql
UPDATE "User"
SET "isAdmin" = true,
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "email" = 'user@example.com';
```

### Revoke Admin Access

```sql
UPDATE "User"
SET "isAdmin" = false,
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "email" = 'admin@example.com';
```

### Change Admin Password

```javascript
// generate-new-hash.js
const bcrypt = require("bcrypt");
bcrypt.hash("NewPassword123!", 10, (err, hash) => {
  console.log("New Hash:", hash);
});
```

```sql
UPDATE "User"
SET "password" = '$2b$10$NEW_HASH_HERE',
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "email" = 'admin@example.com';
```

### List All Admin Users

```sql
SELECT "id", "email", "name", "createdAt"
FROM "User"
WHERE "isAdmin" = true
ORDER BY "createdAt" DESC;
```

## 🔒 Security Best Practices

1. **Password Requirements:**

   - Minimum 8 characters
   - Mix of uppercase, lowercase, numbers, symbols
   - Use a password manager

2. **Password Hashing:**

   - Always use bcrypt with cost factor 10+
   - Never store plain text passwords
   - Never log passwords

3. **Session Management:**

   - Use secure session tokens (JWT/NextAuth)
   - Implement session timeout
   - Clear sessions on logout

4. **Rate Limiting:**

   - Limit login attempts (e.g., 5 per 15 minutes)
   - Implement account lockout after failed attempts
   - Log suspicious activity

5. **HTTPS Only:**
   - Always use HTTPS in production
   - Set secure cookie flags
   - Enable HSTS headers

## 🧪 Testing

### Test Admin Login

```bash
# Using curl
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@rasoigadget.com","password":"Admin@123"}'
```

### Verify Admin User in Database

```bash
psql -U postgres -d rasoigadget -c "SELECT email, name, isAdmin FROM \"User\" WHERE isAdmin = true;"
```

## 📝 Migration Checklist

- [ ] Run migration 003_add_admin_role.sql
- [ ] Run migration 004_seed_admin_user.sql (or create custom admin)
- [ ] Update Prisma schema
- [ ] Run `npx prisma generate`
- [ ] Implement authentication API endpoint
- [ ] Update admin login page
- [ ] Test login functionality
- [ ] Change default password
- [ ] Remove ADMIN_SECRET_KEY from .env (optional)
- [ ] Update documentation

## 🆘 Troubleshooting

### "Invalid credentials" error

- Verify email exists in database
- Check password hash is correct
- Ensure bcrypt is installed: `npm install bcrypt`

### "Unauthorized - Admin access required"

- Verify user has `isAdmin = true`
- Check with: `SELECT * FROM "User" WHERE email = 'your@email.com';`

### Password hash not working

- Ensure using bcrypt cost factor 10
- Verify hash starts with `$2b$10$`
- Generate new hash and update database

## 🔄 Rollback

If you need to rollback to the secret key approach:

```bash
psql -U postgres -d rasoigadget -f prisma/migrations/003_add_admin_role_rollback.sql
```

Then restore the original admin authentication code.
