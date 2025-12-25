# Authentication API Testing Guide

This guide shows you how to test all the authentication APIs.

## 🔧 Setup

### 1. Configure Environment Variables

Add to your `.env.local`:

```env
# Email Configuration (Required for OTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password
SMTP_FROM="Rasoi Gadget <noreply@rasoigadget.com>"

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Gmail App Password Setup

If using Gmail:

1. Go to Google Account Settings
2. Security → 2-Step Verification (enable it)
3. App Passwords → Generate new app password
4. Copy the 16-character password to `SMTP_PASS`

## 📡 API Endpoints

### 1. Send OTP

**POST** `/api/auth/send-otp`

Sends a 6-digit OTP to the user's email.

**Request Body:**

```json
{
  "email": "user@example.com",
  "purpose": "login"
}
```

**Purpose values:**

- `"login"` - For existing users to log in
- `"signup"` - For new user registration
- `"password_reset"` - For password reset

**Response (Success):**

```json
{
  "success": true,
  "message": "OTP sent successfully to your email"
}
```

**Response (Error - Rate Limited):**

```json
{
  "success": false,
  "message": "Too many OTP requests. Please try again later."
}
```

### 2. Verify OTP

**POST** `/api/auth/verify-otp`

Verifies the OTP and returns user data.

**Request Body:**

```json
{
  "email": "user@example.com",
  "otp": "123456",
  "purpose": "login"
}
```

**Response (Success):**

```json
{
  "success": true,
  "message": "OTP verified successfully",
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe",
    "phone": "+91-9876543210",
    "isAdmin": false,
    "emailVerified": true
  },
  "requiresPassword": false
}
```

**Response (Error):**

```json
{
  "success": false,
  "message": "Invalid or expired OTP. Please request a new one."
}
```

### 3. Login with Password

**POST** `/api/auth/login`

Login with email and password (for users who have set a password).

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "MySecurePassword123"
}
```

**Response (Success):**

```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe",
    "phone": "+91-9876543210",
    "isAdmin": false,
    "emailVerified": true
  }
}
```

**Response (Error):**

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

### 4. Set Password

**POST** `/api/auth/set-password`

Set or update user password (after OTP verification).

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "MyNewPassword123"
}
```

**Response (Success):**

```json
{
  "success": true,
  "message": "Password set successfully"
}
```

**Response (Error):**

```json
{
  "success": false,
  "message": "Password must be at least 8 characters long"
}
```

## 🧪 Testing with cURL

### Test 1: Send OTP for Login

```bash
curl -X POST http://localhost:3000/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "purpose": "login"
  }'
```

### Test 2: Verify OTP

```bash
curl -X POST http://localhost:3000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "otp": "123456",
    "purpose": "login"
  }'
```

### Test 3: Login with Password

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@rasoigadget.com",
    "password": "Admin@123"
  }'
```

### Test 4: Set Password

```bash
curl -X POST http://localhost:3000/api/auth/set-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "NewPassword123"
  }'
```

## 🔄 User Flows

### Flow 1: New User Signup (OTP)

1. **Send OTP:**

```bash
POST /api/auth/send-otp
{
  "email": "newuser@example.com",
  "purpose": "signup"
}
```

2. **Verify OTP (creates user automatically):**

```bash
POST /api/auth/verify-otp
{
  "email": "newuser@example.com",
  "otp": "123456",
  "purpose": "signup"
}
```

3. **Optional: Set Password:**

```bash
POST /api/auth/set-password
{
  "email": "newuser@example.com",
  "password": "MyPassword123"
}
```

### Flow 2: Existing User Login (OTP)

1. **Send OTP:**

```bash
POST /api/auth/send-otp
{
  "email": "user@example.com",
  "purpose": "login"
}
```

2. **Verify OTP:**

```bash
POST /api/auth/verify-otp
{
  "email": "user@example.com",
  "otp": "123456",
  "purpose": "login"
}
```

### Flow 3: Login with Password

```bash
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "MyPassword123"
}
```

### Flow 4: Password Reset

1. **Send OTP:**

```bash
POST /api/auth/send-otp
{
  "email": "user@example.com",
  "purpose": "password_reset"
}
```

2. **Verify OTP:**

```bash
POST /api/auth/verify-otp
{
  "email": "user@example.com",
  "otp": "123456",
  "purpose": "password_reset"
}
```

3. **Set New Password:**

```bash
POST /api/auth/set-password
{
  "email": "user@example.com",
  "password": "NewPassword123"
}
```

## 🧪 Testing with Postman

### Setup

1. Create a new collection: "Rasoi Gadget Auth"
2. Set base URL variable: `{{baseUrl}}` = `http://localhost:3000`

### Request 1: Send OTP

- **Method:** POST
- **URL:** `{{baseUrl}}/api/auth/send-otp`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**

```json
{
  "email": "test@example.com",
  "purpose": "login"
}
```

### Request 2: Verify OTP

- **Method:** POST
- **URL:** `{{baseUrl}}/api/auth/verify-otp`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**

```json
{
  "email": "test@example.com",
  "otp": "123456",
  "purpose": "login"
}
```

## 🔒 Security Features

### Rate Limiting

- Maximum 5 OTP requests per email per hour
- Returns 429 status code when exceeded

### OTP Security

- 6-digit numeric code
- 10-minute expiration
- Maximum 5 verification attempts
- One-time use only

### Password Security

- Minimum 8 characters
- Hashed with bcrypt (cost factor 10)
- Never returned in API responses

## 📊 Database Queries for Testing

### Check OTP Records

```sql
SELECT * FROM "OTP"
WHERE email = 'test@example.com'
ORDER BY "createdAt" DESC
LIMIT 5;
```

### Check User

```sql
SELECT * FROM "User"
WHERE email = 'test@example.com';
```

### Clean Up Test OTPs

```sql
DELETE FROM "OTP"
WHERE email = 'test@example.com';
```

## 🐛 Troubleshooting

### OTP Not Received

**Check:**

1. SMTP credentials are correct
2. Email is not in spam folder
3. Check server logs for email errors
4. Verify SMTP port 587 is not blocked

**Test SMTP:**

```bash
# Check if port is accessible
telnet smtp.gmail.com 587
```

### "User not found" Error

**For login/password_reset:**

- User must exist in database
- Check with: `SELECT * FROM "User" WHERE email = 'email@example.com';`

**For signup:**

- User must NOT exist
- If exists, use "login" purpose instead

### "Invalid OTP" Error

**Check:**

1. OTP hasn't expired (10 minutes)
2. OTP matches exactly (6 digits)
3. Purpose matches (login/signup/password_reset)
4. Attempts < 5

**Debug:**

```sql
SELECT email, otp, purpose, "expiresAt", verified, attempts
FROM "OTP"
WHERE email = 'test@example.com'
ORDER BY "createdAt" DESC
LIMIT 1;
```

### Rate Limit Error

**Solution:**

- Wait 1 hour, or
- Clean up OTPs manually:

```sql
DELETE FROM "OTP" WHERE email = 'test@example.com';
```

## ✅ Testing Checklist

- [ ] SMTP configured in .env.local
- [ ] Dependencies installed (nodemailer, bcrypt)
- [ ] Prisma client generated
- [ ] Database schema applied
- [ ] Server running (`npm run dev`)
- [ ] Test send OTP endpoint
- [ ] Receive OTP email
- [ ] Test verify OTP endpoint
- [ ] Test login with password
- [ ] Test set password endpoint
- [ ] Test rate limiting (6+ requests)
- [ ] Test expired OTP (wait 10+ minutes)
- [ ] Test invalid OTP
- [ ] Test password reset flow

## 📝 Example Test Script

```javascript
// test-auth.js
const baseUrl = "http://localhost:3000";

async function testAuth() {
  const email = "test@example.com";

  // 1. Send OTP
  console.log("1. Sending OTP...");
  const sendResponse = await fetch(`${baseUrl}/api/auth/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, purpose: "login" }),
  });
  console.log("Send OTP:", await sendResponse.json());

  // 2. Get OTP from email (manual step)
  const otp = prompt("Enter OTP from email:");

  // 3. Verify OTP
  console.log("2. Verifying OTP...");
  const verifyResponse = await fetch(`${baseUrl}/api/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp, purpose: "login" }),
  });
  console.log("Verify OTP:", await verifyResponse.json());
}

testAuth();
```

Run with: `node test-auth.js`
