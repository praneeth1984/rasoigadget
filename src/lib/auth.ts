// Simple session management utilities

export interface User {
  id: string;
  email: string;
  name?: string;
  isAdmin: boolean;
}

export interface Session {
  user: User;
  token: string;
  expiresAt: number;
}

// Session storage keys
const SESSION_KEY = 'auth_session';
const USER_KEY = 'auth_user';

/**
 * Save user session to localStorage
 */
export function saveSession(user: User): void {
  if (typeof window === 'undefined') return;
  
  const session: Session = {
    user,
    token: generateToken(),
    expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000), // 7 days
  };
  
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

/**
 * Get current session
 */
export function getSession(): Session | null {
  if (typeof window === 'undefined') return null;
  
  const sessionStr = localStorage.getItem(SESSION_KEY);
  if (!sessionStr) return null;
  
  try {
    const session: Session = JSON.parse(sessionStr);
    
    // Check if session is expired
    if (session.expiresAt < Date.now()) {
      clearSession();
      return null;
    }
    
    return session;
  } catch {
    return null;
  }
}

/**
 * Get current user
 */
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  
  const session = getSession();
  if (!session) return null;
  
  return session.user;
}

/**
 * Check if user is logged in
 */
export function isAuthenticated(): boolean {
  return getSession() !== null;
}

/**
 * Check if user is admin
 */
export function isAdmin(): boolean {
  const user = getCurrentUser();
  return user?.isAdmin === true;
}

/**
 * Clear session (logout)
 */
export function clearSession(): void {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(USER_KEY);
}

/**
 * Generate a simple token (for demo purposes)
 * In production, use JWT or similar
 */
function generateToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Redirect to login if not authenticated
 */
export function requireAuth(redirectTo: string = '/login'): boolean {
  if (typeof window === 'undefined') return false;
  
  if (!isAuthenticated()) {
    window.location.href = redirectTo;
    return false;
  }
  
  return true;
}

/**
 * Redirect to admin login if not admin
 */
export function requireAdmin(redirectTo: string = '/admin/login'): boolean {
  if (typeof window === 'undefined') return false;
  
  if (!isAdmin()) {
    window.location.href = redirectTo;
    return false;
  }
  
  return true;
}
