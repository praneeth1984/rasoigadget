'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { saveSession } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'password' | 'otp'>('password');
  const [otpSent, setOtpSent] = useState(false);

  // Password Login
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        saveSession(data.user);
        router.push('/orders');
      } else {
        setError(data.message || 'Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Send OTP
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, purpose: 'login' }),
      });

      const data = await response.json();

      if (data.success) {
        setOtpSent(true);
        setError('');
      } else {
        setError(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, purpose: 'login' }),
      });

      const data = await response.json();

      if (data.success) {
        saveSession(data.user);
        router.push('/orders');
      } else {
        setError(data.message || 'Invalid OTP');
      }
    } catch (err) {
      setError('OTP verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-dark-bg flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-royal-purple to-gold bg-clip-text text-transparent">
              Rasoi Gadget
            </h1>
          </Link>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Welcome Back</h2>
          <p className="text-text-secondary">Login to access your orders and account</p>
        </div>

        {/* Login Method Toggle */}
        <div className="flex gap-2 mb-6 bg-dark-surface p-1 rounded-lg">
          <button
            onClick={() => { setMode('password'); setOtpSent(false); setError(''); }}
            className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all ${
              mode === 'password'
                ? 'bg-royal-purple text-white'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Password
          </button>
          <button
            onClick={() => { setMode('otp'); setError(''); }}
            className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all ${
              mode === 'otp'
                ? 'bg-royal-purple text-white'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            OTP
          </button>
        </div>

        {/* Login Form */}
        <div className="bg-dark-elevated rounded-2xl p-8 border border-royal-purple/20">
          {error && (
            <div className="mb-4 p-3 bg-urgent-red/20 border border-urgent-red/50 rounded-lg text-urgent-red text-sm">
              {error}
            </div>
          )}

          {mode === 'password' ? (
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-text-primary font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  className="w-full px-4 py-3 bg-dark-surface border border-royal-purple/30 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-text-primary font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 bg-dark-surface border border-royal-purple/30 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-royal-purple to-royal-purple-light text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          ) : (
            <>
              {!otpSent ? (
                <form onSubmit={handleSendOTP} className="space-y-4">
                  <div>
                    <label htmlFor="email-otp" className="block text-text-primary font-semibold mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email-otp"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      required
                      className="w-full px-4 py-3 bg-dark-surface border border-royal-purple/30 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-gold to-gold-dark text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Sending OTP...' : 'Send OTP'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOTP} className="space-y-4">
                  <div>
                    <label htmlFor="otp" className="block text-text-primary font-semibold mb-2">
                      Enter OTP
                    </label>
                    <p className="text-sm text-text-muted mb-2">
                      We sent a 6-digit code to {email}
                    </p>
                    <input
                      type="text"
                      id="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="000000"
                      required
                      maxLength={6}
                      className="w-full px-4 py-3 bg-dark-surface border border-royal-purple/30 rounded-lg text-text-primary text-center text-2xl tracking-widest placeholder-text-muted focus:outline-none focus:border-gold transition-colors font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || otp.length !== 6}
                    className="w-full bg-gradient-to-r from-gold to-gold-dark text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Verifying...' : 'Verify OTP'}
                  </button>

                  <button
                    type="button"
                    onClick={() => { setOtpSent(false); setOtp(''); }}
                    className="w-full text-text-secondary hover:text-text-primary text-sm transition-colors"
                  >
                    ← Back to email
                  </button>
                </form>
              )}
            </>
          )}

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-royal-purple/20"></div>
            <span className="text-text-muted text-sm">OR</span>
            <div className="flex-1 h-px bg-royal-purple/20"></div>
          </div>

          {/* Guest Checkout */}
          <Link
            href="/"
            className="block w-full text-center py-3 px-6 border-2 border-royal-purple/30 text-text-primary font-semibold rounded-lg hover:border-gold/50 hover:bg-dark-surface transition-all"
          >
            Continue as Guest
          </Link>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-text-muted text-sm">
            Don't have an account?{' '}
            <Link href="/" className="text-gold hover:text-gold-light font-semibold">
              Shop Now
            </Link>
          </p>
          <p className="text-text-muted text-sm">
            Admin?{' '}
            <Link href="/admin/login" className="text-royal-purple hover:text-royal-purple-light font-semibold">
              Admin Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
