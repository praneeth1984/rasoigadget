# Database Setup Guide

This guide will help you set up PostgreSQL for the Rasoi Gadget application to track orders and manage users.

## Prerequisites

- PostgreSQL installed on your system
- Node.js and npm installed

## Step 1: Install PostgreSQL

### On Ubuntu/Debian:

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

### On macOS:

```bash
brew install postgresql
brew services start postgresql
```

### On Windows:

Download and install from [PostgreSQL Official Website](https://www.postgresql.org/download/windows/)

## Step 2: Create Database

```bash
# Access PostgreSQL
sudo -u postgres psql

# Create database
CREATE DATABASE rasoigadget;

# Create user (optional, for better security)
CREATE USER rasoigadget_user WITH ENCRYPTED PASSWORD 'your_secure_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE rasoigadget TO rasoigadget_user;

# Exit
\q
```

## Step 3: Configure Environment Variables

Add the following to your `.env.local` file:

```env
# Database Configuration
DATABASE_URL="postgresql://rasoigadget_user:your_secure_password@localhost:5432/rasoigadget?schema=public"

# Or if using default postgres user:
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/rasoigadget?schema=public"

# Admin Configuration
ADMIN_SECRET_KEY=your_very_secure_random_key_here
```

**Important**:

- Replace `your_secure_password` with your actual database password
- Replace `your_very_secure_random_key_here` with a strong random string for admin access
- Never commit `.env.local` to version control

## Step 4: Run Prisma Migrations

```bash
# Generate Prisma Client
npx prisma generate

# Create and apply migrations
npx prisma migrate dev --name init

# Or push schema without migration (for development)
npx prisma db push
```

## Step 5: Verify Setup

```bash
# Open Prisma Studio to view your database
npx prisma studio
```

This will open a browser window at `http://localhost:5555` where you can view and manage your database.

## Database Schema

The application uses two main models:

### User

- `id`: Unique identifier
- `email`: User's email (unique)
- `name`: User's name (optional)
- `createdAt`: Account creation timestamp
- `updatedAt`: Last update timestamp
- `orders`: Relation to orders

### Order

- `id`: Unique identifier
- `userId`: Reference to user
- `razorpayOrderId`: Razorpay order ID (unique)
- `razorpayPaymentId`: Razorpay payment ID (unique)
- `amount`: Amount in paise
- `currency`: Currency code (default: INR)
- `status`: Order status (completed, failed, refunded)
- `productName`: Product name
- `customerEmail`: Customer email
- `customerName`: Customer name (optional)
- `customerPhone`: Customer phone (optional)
- `createdAt`: Order creation timestamp
- `updatedAt`: Last update timestamp

## Features Enabled

### For Users:

1. **Order Tracking**: View all past orders by entering email at `/orders`
2. **Download Access**: Download purchased ebooks anytime
3. **Order History**: See payment details, dates, and amounts

### For Admin:

1. **Admin Dashboard**: Access at `/admin` with secret key
2. **Order Management**: View all orders with customer details
3. **Statistics**: See total revenue, orders, and unique customers
4. **Search**: Filter orders by email, name, or IDs
5. **Export**: Download order data as CSV

## Troubleshooting

### Connection Issues

If you get connection errors:

1. Check if PostgreSQL is running:

```bash
sudo systemctl status postgresql  # Linux
brew services list  # macOS
```

2. Verify connection string in `.env.local`

3. Check PostgreSQL logs:

```bash
sudo tail -f /var/log/postgresql/postgresql-*.log  # Linux
tail -f /usr/local/var/log/postgres.log  # macOS
```

### Migration Issues

If migrations fail:

```bash
# Reset database (WARNING: This deletes all data)
npx prisma migrate reset

# Or manually drop and recreate
psql -U postgres
DROP DATABASE rasoigadget;
CREATE DATABASE rasoigadget;
\q

# Then run migrations again
npx prisma migrate dev
```

## Production Deployment

For production (e.g., Vercel, Railway, Render):

1. Set up a PostgreSQL database (e.g., Neon, Supabase, Railway)
2. Add `DATABASE_URL` to your environment variables
3. Add `ADMIN_SECRET_KEY` to your environment variables
4. Run migrations:

```bash
npx prisma migrate deploy
```

## Security Notes

- Never expose `ADMIN_SECRET_KEY` publicly
- Use strong, unique passwords for database
- In production, use connection pooling (e.g., Prisma Accelerate)
- Enable SSL for database connections in production
- Regularly backup your database

## Useful Commands

```bash
# View database in browser
npx prisma studio

# Generate Prisma Client after schema changes
npx prisma generate

# Create a new migration
npx prisma migrate dev --name migration_name

# Apply migrations in production
npx prisma migrate deploy

# Reset database (development only)
npx prisma migrate reset

# Format Prisma schema
npx prisma format
```

## Support

For issues or questions:

- Check [Prisma Documentation](https://www.prisma.io/docs)
- Check [PostgreSQL Documentation](https://www.postgresql.org/docs/)
