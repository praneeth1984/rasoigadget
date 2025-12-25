# Database Quick Reference

## 🚀 One-Command Setup

```bash
psql -U postgres -d rasoigadget -f prisma/migrations/schema.sql
npx prisma generate
```

## 📊 Database Schema

### Tables Created

- **User** - Customers & admins with authentication
- **Order** - Order & payment tracking (Razorpay)
- **OTP** - Email OTP verification codes
- **PasswordResetToken** - Password reset tokens

### Default Admin

- Email: `admin@rasoigadget.com`
- Password: `Admin@123` ⚠️ **CHANGE THIS!**

## 🔐 Authentication Types

### Admin

- Email + Password (database-driven)
- Stored in User table with `isAdmin = true`

### Customer

- Email + OTP (6-digit code)
- Optional password for future logins
- Email verification
- Password reset via OTP

## 📝 Common SQL Queries

### Create Admin User

```sql
INSERT INTO "User" ("id", "email", "name", "password", "isAdmin", "createdAt", "updatedAt")
VALUES (
    gen_random_uuid()::text,
    'admin@example.com',
    'Admin Name',
    '$2b$10$YOUR_BCRYPT_HASH',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);
```

### List All Admins

```sql
SELECT email, name, "createdAt"
FROM "User"
WHERE "isAdmin" = true;
```

### View Recent Orders

```sql
SELECT "customerEmail", "amount", "status", "createdAt"
FROM "Order"
ORDER BY "createdAt" DESC
LIMIT 10;
```

### Clean Expired OTPs

```sql
SELECT cleanup_expired_otps();
```

### Check Database Stats

```sql
SELECT
    'Users' as table_name, COUNT(*) as count,
    COUNT(*) FILTER (WHERE "isAdmin" = true) as admins
FROM "User"
UNION ALL
SELECT 'Orders', COUNT(*), NULL FROM "Order"
UNION ALL
SELECT 'OTPs', COUNT(*), NULL FROM "OTP";
```

## 🛠️ Environment Setup

```env
# .env.local

# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/rasoigadget"

# Email (for OTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=Rasoi Gadget <noreply@rasoigadget.com>
```

## 📦 Dependencies

```bash
npm install nodemailer bcrypt
npm install -D @types/nodemailer @types/bcrypt
```

## 🔧 Maintenance

### Daily OTP Cleanup (Optional)

```sql
CREATE EXTENSION IF NOT EXISTS pg_cron;
SELECT cron.schedule('cleanup-otps', '0 0 * * *', 'SELECT cleanup_expired_otps()');
```

### Backup Database

```bash
pg_dump -U postgres rasoigadget > backup_$(date +%Y%m%d).sql
```

### Restore Database

```bash
psql -U postgres rasoigadget < backup_20251225.sql
```

## 📚 Documentation Files

- `schema.sql` - Complete database schema
- `README.md` - Detailed documentation
- `CUSTOMER_AUTH_GUIDE.md` - Customer auth implementation
- `DATABASE_ADMIN_AUTH_GUIDE.md` - Admin auth implementation

## ✅ Post-Setup Checklist

- [ ] Run schema.sql
- [ ] Run `npx prisma generate`
- [ ] Change default admin password
- [ ] Configure SMTP settings
- [ ] Install nodemailer & bcrypt
- [ ] Test database connection
- [ ] Implement authentication APIs
- [ ] Test OTP flow

## 🆘 Quick Troubleshooting

**Can't connect to database?**

```bash
sudo systemctl status postgresql  # Check if running
psql -U postgres -l  # List databases
```

**Prisma client not working?**

```bash
npx prisma generate  # Regenerate client
npx prisma studio  # Open visual editor
```

**OTP not sending?**

- Check SMTP credentials
- Verify port 587 is open
- Use app-specific password (Gmail)
- Check spam folder

## 🔗 Useful Commands

```bash
# View database in browser
npx prisma studio

# Check schema
psql -U postgres -d rasoigadget -c "\dt"

# Describe table
psql -U postgres -d rasoigadget -c "\d User"

# Run SQL file
psql -U postgres -d rasoigadget -f schema.sql
```
