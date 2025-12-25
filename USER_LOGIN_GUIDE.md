# User Login & Order Tracking Guide

## Overview

Users can now login with their email to view and manage their orders. The system provides a seamless experience with session persistence and automatic login.

## Features

### 1. **Email-Based Login**

- No password required
- Simply enter the email used during purchase
- Instant access to order history

### 2. **Session Persistence**

- Email is saved in browser's localStorage
- Automatic login on return visits
- No need to re-enter email every time

### 3. **Logout Functionality**

- Users can logout anytime
- Clears saved session
- Returns to login screen

### 4. **Order Management**

- View complete order history
- See all transaction details
- Download purchased ebooks anytime

## User Flow

### First Visit

1. User visits `/orders`
2. Sees login screen with email input
3. Enters email address
4. System fetches and displays their orders
5. Email is saved for future visits

### Return Visit

1. User visits `/orders`
2. **Automatically logged in** with saved email
3. Orders are loaded automatically
4. No need to re-enter email

### Logout

1. User clicks "Logout" button
2. Session is cleared
3. Returns to login screen
4. Can login with different email

## UI/UX Enhancements

### Login Screen

- **Clean, centered design**
- Email icon for visual clarity
- Clear instructions
- Security message for trust
- Loading state during fetch

### Logged-In View

- **User info card** showing logged-in email
- Logout button for easy access
- Order count and statistics
- Download all books button
- Individual order cards with details

### Empty State

- Friendly "No Orders Found" message
- Icon for visual feedback
- Support contact suggestion

## Technical Details

### Data Storage

```javascript
// Email is stored in localStorage
localStorage.setItem("userEmail", email);

// Retrieved on page load
const savedEmail = localStorage.getItem("userEmail");

// Cleared on logout
localStorage.removeItem("userEmail");
```

### Auto-Login

```javascript
useEffect(() => {
  const savedEmail = localStorage.getItem("userEmail");
  if (savedEmail) {
    setEmail(savedEmail);
    fetchOrders(savedEmail);
  }
}, []);
```

### Security

- No sensitive data stored in localStorage
- Only email address is saved
- Server validates all requests
- Orders fetched fresh on each visit

## Benefits

### For Users

✅ **Convenience**: No need to remember passwords
✅ **Quick Access**: Automatic login on return
✅ **Lifetime Downloads**: Access books anytime
✅ **Order History**: Complete transaction records

### For Business

✅ **Better UX**: Frictionless access
✅ **Customer Retention**: Easy re-engagement
✅ **Support Reduction**: Self-service order lookup
✅ **Trust Building**: Transparent order history

## Usage Examples

### Scenario 1: First-Time Access

```
User purchases ebook → Receives email → Visits /orders
→ Enters email → Views order → Downloads books
```

### Scenario 2: Return Visit

```
User visits /orders → Auto-logged in → Views orders
→ Downloads books again
```

### Scenario 3: Multiple Devices

```
User on laptop → Logs in → Email saved
User on phone → Logs in → Email saved separately
(Each device maintains its own session)
```

### Scenario 4: Different User

```
User A logged in → Clicks logout → User B logs in
→ Views their own orders
```

## API Endpoint

**GET** `/api/orders?email={email}`

**Response:**

```json
{
  "success": true,
  "orders": [
    {
      "id": "...",
      "razorpayOrderId": "...",
      "razorpayPaymentId": "...",
      "amount": 4700,
      "currency": "INR",
      "status": "completed",
      "productName": "Satvik 3-Book Collection",
      "createdAt": "2024-12-25T..."
    }
  ]
}
```

## Privacy & Security

### What We Store

- ✅ Email address (in browser only)
- ✅ Order history (in database)
- ✅ Transaction details (in database)

### What We DON'T Store

- ❌ Passwords
- ❌ Payment card details
- ❌ Sensitive personal information

### Data Protection

- Email stored locally (not transmitted unnecessarily)
- All API requests use HTTPS in production
- Database queries use Prisma (SQL injection protection)
- No third-party tracking on orders page

## Future Enhancements (Optional)

1. **Email Verification**

   - Send OTP to email for login
   - Enhanced security

2. **Order Notifications**

   - Email alerts for new orders
   - Download reminders

3. **Wishlist**

   - Save items for later
   - Get notified of sales

4. **Referral Program**
   - Share with friends
   - Earn rewards

## Support

If users have issues accessing their orders:

1. **Check Email**: Ensure using the same email as purchase
2. **Check Spam**: Confirmation email might be in spam
3. **Contact Support**: Email support@rasoigadget.com
4. **Admin Help**: Admin can look up orders in dashboard

## Summary

The login system provides a **passwordless, frictionless experience** for users to access their orders while maintaining security and privacy. The session persistence ensures users don't need to repeatedly enter their email, creating a seamless experience across visits.
