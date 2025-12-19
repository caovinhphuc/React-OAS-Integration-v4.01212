// src/shared/utils/auth.ts
import SessionManager from '@/services/auth/sessionManager';

export interface Session {
  user?: {
    id: string;
    email: string;
    fullName?: string;
    roleId?: string;
  };
  permissions?: Array<{
    resource: string;
    action: string;
  }>;
  ts?: number;
  token?: string;
  refreshToken?: string;
}

/**
 * Get current session from localStorage or SessionManager
 */
export function getSession(): Session | null {
  try {
    // Try SessionManager first
    const sessionManager = SessionManager.getInstance();
    const sessionInfo = sessionManager.getSessionInfo();
    
    if (sessionInfo?.userId && sessionInfo?.email) {
      return {
        user: {
          id: sessionInfo.userId,
          email: sessionInfo.email,
        },
        ts: sessionInfo.lastActivity || Date.now(),
      };
    }

    // Fallback to localStorage
    const storedSession = localStorage.getItem('mia_session');
    if (storedSession) {
      return JSON.parse(storedSession) as Session;
    }

    // Fallback to authToken/userData
    const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    const userData = localStorage.getItem('userData') || sessionStorage.getItem('userData');
    
    if (authToken && userData) {
      const user = JSON.parse(userData);
      return {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          roleId: user.roleId,
        },
        permissions: user.permissions || [],
        token: authToken,
      };
    }

    return null;
  } catch (error) {
    console.warn('Failed to get session:', error);
    return null;
  }
}

/**
 * Check if user has a specific permission
 */
export function hasPermission(resource: string, action: string): boolean {
  const session = getSession();
  if (!session?.permissions) return false;

  return session.permissions.some(
    (p) => p.resource === resource && p.action === action
  );
}

/**
 * Require permission - throws error if not authorized
 */
export function requirePermission(resource: string, action: string): void {
  if (!hasPermission(resource, action)) {
    throw new Error(`Access denied: ${action} on ${resource}`);
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return getSession() !== null;
}

/**
 * Get current user ID
 */
export function getCurrentUserId(): string | null {
  const session = getSession();
  return session?.user?.id || null;
}

/**
 * Get current user email
 */
export function getCurrentUserEmail(): string | null {
  const session = getSession();
  return session?.user?.email || null;
}

