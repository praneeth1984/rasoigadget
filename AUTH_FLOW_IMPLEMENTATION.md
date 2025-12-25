# 🔐 Full Authentication Flow Implementation Plan

## Overview

Implementing complete authentication system with guest checkout support.

## User Flows

### 1. **Guest Checkout Flow** (No Login Required)

```
Homepage → Buy Button → Checkout → Payment → Success
                                              ↓
                                    Optional: Create Account
```

### 2. **Customer Login Flow**

```
Login Page → Email Entry → Choose Method:
                           ├─ OTP Login (passwordless)
                           │  └─ Enter OTP → Logged In
                           └─ Password Login
                              └─ Enter Password → Logged In
```

### 3. **Admin Login Flow**

```
Admin Login → Email + Password → Admin Dashboard
```

### 4. **Account Creation After Purchase**

```
Success Page → "Create Account?" → Send OTP → Verify → Set Password (optional)
```

## Implementation Steps

### Phase 1: Authentication Context & Session Management

- [ ] Create AuthContext for global auth state
- [ ] Session storage utilities
- [ ] Protected route wrapper

### Phase 2: Login Pages

- [ ] `/login` - Customer login (OTP + Password)
- [ ] `/admin/login` - Admin login (Password only)
- [ ] Login components (OTP input, password input)

### Phase 3: Update Checkout Flow

- [ ] Keep guest checkout (current behavior)
- [ ] Add "Login" option before checkout
- [ ] Link orders to user if logged in

### Phase 4: Post-Purchase Account Creation

- [ ] Success page account creation prompt
- [ ] OTP verification flow
- [ ] Optional password setup

### Phase 5: Orders Page Update

- [ ] Require login to view orders
- [ ] Redirect to login if not authenticated
- [ ] Show user-specific orders only

## File Structure

```
src/
├── app/
│   ├── login/
│   │   └── page.tsx          # Customer login
│   ├── admin/
│   │   └── login/
│   │       └── page.tsx      # Admin login
│   └── orders/
│       └── page.tsx          # Updated with auth
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx     # Main login component
│   │   ├── OTPInput.tsx      # OTP entry
│   │   ├── PasswordInput.tsx # Password entry
│   │   └── AuthGuard.tsx     # Protected route wrapper
│   └── checkout/
│       └── GuestCheckout.tsx # Guest checkout option
└── lib/
    ├── auth.ts               # Auth utilities
    └── session.ts            # Session management
```

## Key Features

### Authentication Methods

1. **OTP Login** (Passwordless)

   - Send OTP to email
   - Verify OTP
   - Auto-login

2. **Password Login**

   - Email + password
   - Remember me option

3. **Guest Checkout**
   - No login required
   - Collect email for order
   - Optional account creation after

### Security

- Session tokens (JWT or simple token)
- HTTP-only cookies (optional)
- CSRF protection
- Rate limiting on auth endpoints

### User Experience

- Seamless guest checkout
- Optional account creation
- Remember login state
- Easy password reset

## Next Steps

1. Create authentication context
2. Build login pages
3. Update checkout flow
4. Add post-purchase account creation
5. Update orders page with auth

Ready to implement!
