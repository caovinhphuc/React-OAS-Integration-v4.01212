/**
 * Mock Security Service
 * Mock implementation for testing
 */

// Mock login function
export const loginUser = jest.fn((email, password, mfaToken = null) => {
  return Promise.resolve({
    success: true,
    token: "mock-token-123",
    user: {
      id: "1",
      email: email,
      name: "Test User",
      role: "user",
    },
    sessionId: "mock-session-123",
    session: {
      session_id: "mock-session-123",
    },
    serviceAccount: {
      email: "service@example.com",
      projectId: "test-project",
    },
    requiresMFA: false,
  });
});

// Mock register function
export const registerUser = jest.fn((email, password, fullName = "", role = "user") => {
  return Promise.resolve({
    success: true,
    message: "Đăng ký thành công",
    user: {
      id: "1",
      email: email,
      name: fullName,
      role: role,
    },
  });
});

// Mock logout function
export const logoutUser = jest.fn(() => {
  return Promise.resolve({
    success: true,
    message: "Đăng xuất thành công",
  });
});

// Mock getCurrentUser function
export const getCurrentUser = jest.fn(() => {
  return Promise.resolve({
    success: true,
    user: {
      id: "1",
      email: "test@example.com",
      name: "Test User",
      role: "user",
    },
  });
});

// Mock SSO functions
export const getSSOAuthUrl = jest.fn((provider) => {
  return Promise.resolve({
    success: true,
    authUrl: `https://${provider}.com/auth`,
  });
});

export const handleSSOCallback = jest.fn((provider, code) => {
  return Promise.resolve({
    success: true,
    token: "mock-sso-token",
    user: {
      id: "1",
      email: "sso@example.com",
      name: "SSO User",
      role: "user",
    },
  });
});

// Mock MFA functions
export const generateMFASecret = jest.fn(() => {
  return Promise.resolve({
    success: true,
    secret: "mock-mfa-secret",
    qrCode: "data:image/png;base64,mock-qr-code",
  });
});

export const enableMFA = jest.fn((token) => {
  return Promise.resolve({
    success: true,
    message: "MFA enabled successfully",
  });
});

export const disableMFA = jest.fn(() => {
  return Promise.resolve({
    success: true,
    message: "MFA disabled successfully",
  });
});

// Export default object
const securityService = {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
  getSSOAuthUrl,
  handleSSOCallback,
  generateMFASecret,
  enableMFA,
  disableMFA,
};

export default securityService;
