'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { saveSession } from '@/lib/auth';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
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

      if (data.success && data.user.isAdmin) {
        saveSession(data.user);
        router.push('/admin');
      } else if (data.success && !data.user.isAdmin) {
        setError('Access denied. Admin credentials required.');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-dark-bg flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-royal-purple to-gold rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Admin Login</h2>
          <p className="text-text-secondary">Access the admin dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-dark-elevated rounded-2xl p-8 border-2 border-royal-purple/30">
          {error && (
            <div className="mb-4 p-3 bg-urgent-red/20 border border-urgent-red/50 rounded-lg text-urgent-red text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-text-primary font-semibold mb-2">
                Admin Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@rasoigadget.com"
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
                placeholder="Enter admin password"
                required
                className="w-full px-4 py-3 bg-dark-surface border border-royal-purple/30 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-royal-purple to-royal-purple-light text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login to Admin Panel'}
            </button>
          </form>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-text-muted hover:text-text-primary text-sm transition-colors"
          >
            ← Back to Customer Login
          </Link>
        </div>
      </div>
    </main>
  );
}
