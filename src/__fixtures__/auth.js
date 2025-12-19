/**
 * Authentication Test Fixtures
 * Mock data for authentication testing
 */

export const mockUser = {
  id: "1",
  email: "test@example.com",
  name: "Test User",
  role: "user",
  createdAt: "2024-01-01T00:00:00Z",
};

export const mockAdminUser = {
  id: "2",
  email: "admin@example.com",
  name: "Admin User",
  role: "admin",
  createdAt: "2024-01-01T00:00:00Z",
};

export const mockLoginResponse = {
  success: true,
  token: "mock-jwt-token-123456",
  user: mockUser,
  sessionId: "mock-session-id-123456",
  session: {
    session_id: "mock-session-id-123456",
    expires_at: "2024-12-20T00:00:00Z",
  },
  serviceAccount: {
    email: "service@example.com",
    projectId: "test-project-id",
    isConfigured: true,
  },
  requiresMFA: false,
};

export const mockLoginResponseWithMFA = {
  success: true,
  requiresMFA: true,
  message: "MFA required",
  mfaToken: "mock-mfa-token",
};

export const mockLoginError = {
  success: false,
  error: "Invalid credentials",
  message: "Email hoặc mật khẩu không đúng",
};

export const mockRegisterResponse = {
  success: true,
  message: "Đăng ký thành công",
  user: {
    id: "3",
    email: "newuser@example.com",
    name: "New User",
    role: "user",
  },
};

export const mockRegisterError = {
  success: false,
  error: "Email already exists",
  message: "Email này đã được sử dụng",
};

export const mockSSOProviders = [
  {
    id: "google",
    name: "Google",
    authUrl: "https://accounts.google.com/o/oauth2/auth",
  },
  {
    id: "github",
    name: "GitHub",
    authUrl: "https://github.com/login/oauth/authorize",
  },
  {
    id: "microsoft",
    name: "Microsoft",
    authUrl: "https://login.microsoftonline.com/oauth2/authorize",
  },
];

export const mockAuthState = {
  isAuthenticated: true,
  user: mockUser,
  loading: false,
  error: null,
  serviceAccount: {
    email: "service@example.com",
    projectId: "test-project-id",
    isConfigured: true,
  },
};

export const mockUnauthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  serviceAccount: {
    email: null,
    projectId: null,
    isConfigured: false,
  },
};
