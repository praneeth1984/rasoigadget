# ADMIN_SECRET_KEY Explained

## 🔐 What is ADMIN_SECRET_KEY?

`ADMIN_SECRET_KEY` is a **password/secret key** that protects your admin dashboard from unauthorized access. It's like a master password that only you (the admin) should know.

## 🎯 Purpose

The `ADMIN_SECRET_KEY` is used to:

1. **Authenticate admin users** accessing the dashboard
2. **Protect sensitive business data** (orders, revenue, customer info)
3. **Prevent unauthorized access** to admin-only features
4. **Secure API endpoints** that return confidential information

## 🔍 How It Works

### 1. Admin Login Flow

```
User visits /admin
    ↓
Enters ADMIN_SECRET_KEY
    ↓
Key sent to API: /api/admin/orders?key=YOUR_KEY
    ↓
Server compares: adminKey === process.env.ADMIN_SECRET_KEY
    ↓
If match: Show dashboard with orders & stats
If no match: Show "Unauthorized" error
```

### 2. Code Implementation

**API Route** (`/src/app/api/admin/orders/route.ts`):

```typescript
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const adminKey = searchParams.get("key");

  // Verify admin key
  if (adminKey !== process.env.ADMIN_SECRET_KEY) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  // If key matches, return orders and stats
  // ...
}
```

**Admin Dashboard** (`/src/app/admin/page.tsx`):

```typescript
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  // Send key to API
  const response = await fetch(
    `/api/admin/orders?key=${encodeURIComponent(adminKey)}`
  );
  const data = await response.json();

  if (data.success) {
    setIsAuthenticated(true);
    setOrders(data.orders);
    setStats(data.stats);
  } else {
    alert("Invalid admin key");
  }
};
```

## ⚙️ Configuration

### 1. Set Your Secret Key

Add to `.env.local`:

```env
ADMIN_SECRET_KEY=your_very_secure_random_key_here
```

### 2. Generate a Secure Key

**Option A: Use a password generator**

- Use a tool like [1Password](https://1password.com/password-generator/)
- Generate a 32+ character random string
- Example: `kJ8#mP2$nQ9@rT5&wX7!yZ3%aB6^cD4*`

**Option B: Use Node.js**

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Option C: Use OpenSSL**

```bash
openssl rand -hex 32
```

### 3. Example Configuration

```env
# .env.local
ADMIN_SECRET_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
```

## 🔒 Security Best Practices

### ✅ DO:

1. **Use a long, random key** (32+ characters)
2. **Keep it secret** - Never commit to Git
3. **Use different keys** for development and production
4. **Store securely** - Use environment variables
5. **Change periodically** - Update every few months
6. **Use strong characters** - Mix letters, numbers, symbols

### ❌ DON'T:

1. **Don't use simple passwords** like "admin123"
2. **Don't share the key** publicly
3. **Don't hardcode** in your source code
4. **Don't use the same key** across environments
5. **Don't commit** `.env.local` to Git
6. **Don't expose** in client-side code

## 📊 What the Admin Can See

Once authenticated with the correct `ADMIN_SECRET_KEY`, admins can:

### Dashboard Statistics

- **Total Revenue** - Sum of all successful orders
- **Total Orders** - Count of all orders
- **Unique Customers** - Number of different customers

### Order Management

- **View all orders** with complete details
- **Customer information** (email, name, phone)
- **Transaction IDs** (Razorpay order & payment IDs)
- **Order dates and amounts**
- **Order status** (completed, failed, refunded)

### Features

- **Search orders** by email, name, or transaction ID
- **Filter orders** in real-time
- **Export to CSV** for accounting/analysis
- **Auto-login** (key saved in session)

## 🚀 Usage Example

### Step 1: Set Your Key

```env
# .env.local
ADMIN_SECRET_KEY=my_super_secure_admin_password_2024
```

### Step 2: Restart Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

### Step 3: Access Admin Dashboard

1. Visit: `http://localhost:3000/admin`
2. Enter your `ADMIN_SECRET_KEY`
3. Click "Login"
4. View dashboard with all orders

### Step 4: Session Persistence

- Key is saved in `sessionStorage`
- Auto-login on page refresh
- Logout clears the session

## 🔄 Changing Your Admin Key

### Development

1. Update `.env.local`:

   ```env
   ADMIN_SECRET_KEY=new_secure_key_here
   ```

2. Restart dev server:

   ```bash
   npm run dev
   ```

3. Use new key to login

### Production

1. Update environment variable in your hosting platform:

   - **Vercel**: Project Settings → Environment Variables
   - **Netlify**: Site Settings → Build & Deploy → Environment
   - **Other**: Platform-specific settings

2. Redeploy your application

3. Inform authorized admins of the new key

## 🆘 Troubleshooting

### "Unauthorized" Error

**Problem:** Getting "Unauthorized" when trying to login

**Solutions:**

1. Check `ADMIN_SECRET_KEY` is set in `.env.local`
2. Verify no typos in the key
3. Restart dev server after changing `.env.local`
4. Check you're entering the exact key (case-sensitive)

### Key Not Working

**Problem:** Correct key not working

**Solutions:**

1. Check environment variable is loaded:

   ```bash
   # In terminal
   echo $ADMIN_SECRET_KEY
   ```

2. Verify `.env.local` is in project root

3. Check for extra spaces in `.env.local`:

   ```env
   # Wrong (has spaces)
   ADMIN_SECRET_KEY = my_key

   # Correct (no spaces)
   ADMIN_SECRET_KEY=my_key
   ```

### Forgot Admin Key

**Problem:** Lost/forgot the admin key

**Solutions:**

1. Check `.env.local` file
2. If lost, generate a new one
3. Update `.env.local` with new key
4. Restart server

## 🌐 Production Deployment

### Setting Up for Production

1. **Generate production key:**

   ```bash
   openssl rand -hex 32
   ```

2. **Add to hosting platform:**

   **Vercel:**

   - Go to Project Settings
   - Navigate to Environment Variables
   - Add: `ADMIN_SECRET_KEY` = `your_production_key`
   - Redeploy

   **Netlify:**

   - Go to Site Settings
   - Build & Deploy → Environment
   - Add: `ADMIN_SECRET_KEY` = `your_production_key`
   - Redeploy

3. **Share securely:**
   - Use password manager (1Password, LastPass)
   - Encrypted messaging (Signal, WhatsApp)
   - Never email or text unencrypted

## 📝 Example Scenarios

### Scenario 1: First Time Setup

```bash
# 1. Generate key
openssl rand -hex 32
# Output: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6...

# 2. Add to .env.local
echo "ADMIN_SECRET_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6..." >> .env.local

# 3. Restart server
npm run dev

# 4. Visit http://localhost:3000/admin
# 5. Enter the key and login
```

### Scenario 2: Multiple Admins

```env
# Development (.env.local)
ADMIN_SECRET_KEY=dev_admin_key_2024

# Production (hosting platform)
ADMIN_SECRET_KEY=prod_admin_key_2024_secure_random_string
```

All admins use the same key for each environment.

### Scenario 3: Security Breach

If you suspect the key is compromised:

```bash
# 1. Generate new key immediately
openssl rand -hex 32

# 2. Update .env.local
ADMIN_SECRET_KEY=new_secure_key_here

# 3. Restart server
npm run dev

# 4. Update production
# (via hosting platform)

# 5. Notify legitimate admins
# Share new key securely
```

## 🎯 Summary

**ADMIN_SECRET_KEY** is:

✅ **A password** that protects your admin dashboard
✅ **Required** to view orders and statistics
✅ **Configurable** via environment variables
✅ **Secure** - stored server-side, never exposed to users
✅ **Simple** - just one key for all admin access

**To use it:**

1. Generate a secure random key
2. Add to `.env.local` as `ADMIN_SECRET_KEY=your_key`
3. Restart your dev server
4. Visit `/admin` and enter the key
5. Access your dashboard!

**Keep it secret, keep it safe!** 🔐
