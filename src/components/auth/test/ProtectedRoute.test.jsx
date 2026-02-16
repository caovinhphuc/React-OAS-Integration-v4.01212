/**
 * ProtectedRoute Component Tests
 * Tests for route protection and session validation
 */

import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders, setupLocalStorageMock } from "../../../utils/test-utils";
import ProtectedRoute from "../ProtectedRoute";

import { logout } from "../../../store/actions/authActions";

jest.mock("antd", () => {
  const antd = jest.requireActual("antd");
  // Create mock message methods inside the factory
  const mockMsg = {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warning: jest.fn(),
    loading: jest.fn(),
  };
  // Store reference globally so tests can access
  global.__antdMockMessage = mockMsg;
  return {
    ...antd,
    message: mockMsg,
  };
});

// Mock react-router-dom
const mockNavigate = jest.fn();
const mockLocation = {
  pathname: "/dashboard",
  search: "",
  hash: "",
  state: null,
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useLocation: () => mockLocation,
}));

// Mock fetch globally
global.fetch = jest.fn();

// Mock authActions - logout is a thunk that returns a function
const mockLogoutThunk = jest.fn((logoutAll) => {
  return async (dispatch) => {
    dispatch({ type: "LOGOUT" });
    return { success: true };
  };
});

jest.mock("../../../store/actions/authActions", () => ({
  logout: jest.fn((logoutAll) => mockLogoutThunk(logoutAll)),
}));

// Mock Loading component
jest.mock("../../Common/Loading", () => {
  return function Loading({ text }) {
    return <div data-testid="loading">{text || "Đang tải..."}</div>;
  };
});

describe("ProtectedRoute Component", () => {
  let localStorageMock;
  let mockMessage;

  const mockChildren = <div data-testid="protected-content">Protected Content</div>;

  beforeEach(() => {
    // Get reference to mocked message
    mockMessage = global.__antdMockMessage || {
      success: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
      warning: jest.fn(),
      loading: jest.fn(),
    };

    // Setup localStorage mock
    localStorageMock = setupLocalStorageMock();

    // Clear all mocks
    jest.clearAllMocks();
    global.fetch.mockClear();
    mockMessage.warning.mockClear();
    mockLogoutThunk.mockClear();
    logout.mockClear();

    // Reset fetch mock
    global.fetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: async () => ({ valid: true, success: true }),
      })
    );
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  describe("Loading State", () => {
    it("should show loading state initially", () => {
      const initialState = {
        auth: {
          isAuthenticated: true,
          sessionId: "test-session-id",
        },
      };

      localStorageMock.getItem.mockImplementation((key) => {
        if (key === "authToken" || key === "token") return "valid-token";
        if (key === "sessionId") return "test-session-id";
        return null;
      });

      global.fetch.mockImplementation(() => new Promise(() => {}));

      renderWithProviders(<ProtectedRoute>{mockChildren}</ProtectedRoute>, {
        initialState,
      });

      expect(screen.getByTestId("loading")).toBeInTheDocument();
      expect(screen.getByText(/Đang kiểm tra phiên đăng nhập/i)).toBeInTheDocument();
    });
  });

  describe("Unauthenticated User", () => {
    it("should redirect to login when not authenticated and no token", async () => {
      const initialState = {
        auth: {
          isAuthenticated: false,
          sessionId: null,
        },
      };

      localStorageMock.getItem.mockReturnValue(null);

      renderWithProviders(<ProtectedRoute>{mockChildren}</ProtectedRoute>, {
        initialState,
        route: "/dashboard",
      });

      await waitFor(() => {
        expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
      });

      // Should not render protected content (Navigate component redirects)
      await waitFor(() => {
        expect(screen.queryByTestId("protected-content")).not.toBeInTheDocument();
      });
    });

    it("should redirect with returnUrl when not authenticated", async () => {
      const initialState = {
        auth: {
          isAuthenticated: false,
          sessionId: null,
        },
      };

      localStorageMock.getItem.mockReturnValue(null);

      renderWithProviders(<ProtectedRoute>{mockChildren}</ProtectedRoute>, {
        initialState,
        route: "/dashboard",
      });

      await waitFor(() => {
        expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
      });

      // Protected content should not be rendered (Navigate redirects)
      await waitFor(() => {
        expect(screen.queryByTestId("protected-content")).not.toBeInTheDocument();
      });
    });
  });

  describe("Authenticated User - Session Validation", () => {
    it("should allow access when authenticated and session is valid", async () => {
      const initialState = {
        auth: {
          isAuthenticated: true,
          sessionId: "test-session-id",
          user: { id: 1, email: "test@example.com" },
        },
      };

      localStorageMock.getItem.mockImplementation((key) => {
        if (key === "authToken" || key === "token") return "valid-token";
        if (key === "sessionId") return "test-session-id";
        return null;
      });

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ valid: true, success: true }),
      });

      renderWithProviders(<ProtectedRoute>{mockChildren}</ProtectedRoute>, {
        initialState,
      });

      await waitFor(() => {
        expect(screen.getByTestId("protected-content")).toBeInTheDocument();
      });

      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
      expect(screen.getByText("Protected Content")).toBeInTheDocument();
    });

    it("should call verify API when authenticated", async () => {
      const initialState = {
        auth: {
          isAuthenticated: true,
          sessionId: "test-session-id",
        },
      };

      localStorageMock.getItem.mockImplementation((key) => {
        if (key === "authToken" || key === "token") return "valid-token";
        if (key === "sessionId") return "test-session-id";
        return null;
      });

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ valid: true, success: true }),
      });

      renderWithProviders(<ProtectedRoute>{mockChildren}</ProtectedRoute>, {
        initialState,
      });

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalled();
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/auth/verify"),
        expect.objectContaining({
          method: "GET",
          headers: expect.objectContaining({
            Authorization: "Bearer valid-token",
          }),
        })
      );

      // Wait for component to finish checking and render children
      await waitFor(
        () => {
          expect(screen.getByTestId("protected-content")).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });

    it("should handle session expiration (401)", async () => {
      const initialState = {
        auth: {
          isAuthenticated: true,
          sessionId: "expired-session-id",
        },
      };

      localStorageMock.getItem.mockImplementation((key) => {
        if (key === "authToken" || key === "token") return "expired-token";
        if (key === "sessionId") return "expired-session-id";
        return null;
      });

      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
      });

      renderWithProviders(<ProtectedRoute>{mockChildren}</ProtectedRoute>, {
        initialState,
      });

      await waitFor(
        () => {
          expect(logout).toHaveBeenCalledWith(false);
        },
        { timeout: 3000 }
      );

      await waitFor(
        () => {
          expect(mockMessage.warning).toHaveBeenCalledWith(
            "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại."
          );
        },
        { timeout: 3000 }
      );

      // Should clear tokens
      expect(localStorageMock.removeItem).toHaveBeenCalledWith("authToken");
      expect(localStorageMock.removeItem).toHaveBeenCalledWith("token");
      expect(localStorageMock.removeItem).toHaveBeenCalledWith("sessionId");
    });

    it("should handle invalid session response", async () => {
      const initialState = {
        auth: {
          isAuthenticated: true,
          sessionId: "invalid-session-id",
        },
      };

      localStorageMock.getItem.mockImplementation((key) => {
        if (key === "authToken" || key === "token") return "invalid-token";
        if (key === "sessionId") return "invalid-session-id";
        return null;
      });

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ valid: false, success: false }),
      });

      renderWithProviders(<ProtectedRoute>{mockChildren}</ProtectedRoute>, {
        initialState,
      });

      await waitFor(
        () => {
          expect(global.fetch).toHaveBeenCalled();
        },
        { timeout: 3000 }
      );

      await waitFor(
        () => {
          expect(logout).toHaveBeenCalledWith(false);
        },
        { timeout: 2000 }
      );

      expect(mockMessage.warning).toHaveBeenCalledWith(
        "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại."
      );

      expect(localStorageMock.removeItem).toHaveBeenCalledWith("authToken");
    });

    it("should handle network errors gracefully", async () => {
      const initialState = {
        auth: {
          isAuthenticated: true,
          sessionId: "test-session-id",
        },
      };

      localStorageMock.getItem.mockImplementation((key) => {
        if (key === "authToken" || key === "token") return "valid-token";
        if (key === "sessionId") return "test-session-id";
        return null;
      });

      // Network error (not 401)
      global.fetch.mockRejectedValueOnce(new Error("Network error"));

      renderWithProviders(<ProtectedRoute>{mockChildren}</ProtectedRoute>, {
        initialState,
      });

      // Should allow access on network error (backend might be down)
      await waitFor(
        () => {
          expect(screen.getByTestId("protected-content")).toBeInTheDocument();
        },
        { timeout: 3000 }
      );

      expect(logout).not.toHaveBeenCalled();
      expect(mockMessage.warning).not.toHaveBeenCalled();
    });

    it("should handle 401 network errors and logout", async () => {
      const initialState = {
        auth: {
          isAuthenticated: true,
          sessionId: "test-session-id",
        },
      };

      localStorageMock.getItem.mockImplementation((key) => {
        if (key === "authToken" || key === "token") return "expired-token";
        if (key === "sessionId") return "test-session-id";
        return null;
      });

      // 401 error in message
      global.fetch.mockRejectedValueOnce(new Error("401 Unauthorized"));

      renderWithProviders(<ProtectedRoute>{mockChildren}</ProtectedRoute>, {
        initialState,
      });

      await waitFor(
        () => {
          expect(global.fetch).toHaveBeenCalled();
        },
        { timeout: 3000 }
      );

      await waitFor(
        () => {
          expect(logout).toHaveBeenCalledWith(false);
        },
        { timeout: 2000 }
      );
    });
  });

  describe("Token in localStorage but not in Redux", () => {
    it("should validate token from localStorage when not in Redux", async () => {
      const initialState = {
        auth: {
          isAuthenticated: false,
          sessionId: null,
        },
      };

      localStorageMock.getItem.mockImplementation((key) => {
        if (key === "authToken" || key === "token") return "local-token";
        return null;
      });

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ valid: true, success: true }),
      });

      renderWithProviders(<ProtectedRoute>{mockChildren}</ProtectedRoute>, {
        initialState,
      });

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalled();
      });

      // Should still call verify API
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/auth/verify"),
        expect.any(Object)
      );
    });

    it("should clear tokens when validation fails", async () => {
      const initialState = {
        auth: {
          isAuthenticated: false,
          sessionId: null,
        },
      };

      localStorageMock.getItem.mockImplementation((key) => {
        if (key === "authToken" || key === "token") return "invalid-token";
        return null;
      });

      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
      });

      renderWithProviders(<ProtectedRoute>{mockChildren}</ProtectedRoute>, {
        initialState,
      });

      await waitFor(() => {
        expect(localStorageMock.removeItem).toHaveBeenCalledWith("authToken");
      });
      expect(localStorageMock.removeItem).toHaveBeenCalledWith("token");
      expect(localStorageMock.removeItem).toHaveBeenCalledWith("sessionId");
    });
  });

  describe("Authenticated without sessionId", () => {
    it("should allow access when authenticated but no sessionId", async () => {
      const initialState = {
        auth: {
          isAuthenticated: true,
          sessionId: null,
        },
      };

      localStorageMock.getItem.mockReturnValue(null);

      renderWithProviders(<ProtectedRoute>{mockChildren}</ProtectedRoute>, {
        initialState,
      });

      await waitFor(
        () => {
          expect(screen.getByTestId("protected-content")).toBeInTheDocument();
        },
        { timeout: 3000 }
      );

      // Should not call verify API when no sessionId
      expect(global.fetch).not.toHaveBeenCalled();
    });
  });

  describe("Redirect Behavior", () => {
    it("should clear tokens before redirecting", async () => {
      const initialState = {
        auth: {
          isAuthenticated: false,
          sessionId: null,
        },
      };

      localStorageMock.getItem.mockReturnValue(null);

      renderWithProviders(<ProtectedRoute>{mockChildren}</ProtectedRoute>, {
        initialState,
        route: "/dashboard",
      });

      await waitFor(() => {
        expect(localStorageMock.removeItem).toHaveBeenCalledWith("authToken");
      });
      expect(localStorageMock.removeItem).toHaveBeenCalledWith("token");
      expect(localStorageMock.removeItem).toHaveBeenCalledWith("sessionId");
    });

    it("should not redirect when already on login page", async () => {
      const initialState = {
        auth: {
          isAuthenticated: false,
          sessionId: null,
        },
      };

      localStorageMock.getItem.mockReturnValue(null);

      // Mock location to be /login
      jest.spyOn(require("react-router-dom"), "useLocation").mockReturnValue({
        ...mockLocation,
        pathname: "/login",
      });

      renderWithProviders(<ProtectedRoute>{mockChildren}</ProtectedRoute>, {
        initialState,
        route: "/login",
      });

      await waitFor(() => {
        expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
      });
    });
  });

  describe("Periodic Session Check", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it("should check session periodically (5 minutes)", async () => {
      const initialState = {
        auth: {
          isAuthenticated: true,
          sessionId: "test-session-id",
        },
      };

      localStorageMock.getItem.mockImplementation((key) => {
        if (key === "authToken" || key === "token") return "valid-token";
        if (key === "sessionId") return "test-session-id";
        return null;
      });

      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({ valid: true, success: true }),
      });

      renderWithProviders(<ProtectedRoute>{mockChildren}</ProtectedRoute>, {
        initialState,
      });

      // Wait for initial check
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledTimes(1);
      });

      // Fast-forward 5 minutes
      jest.advanceTimersByTime(5 * 60 * 1000);

      // Should check again
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledTimes(2);
      });
    });

    it("should cleanup interval on unmount", () => {
      const initialState = {
        auth: {
          isAuthenticated: true,
          sessionId: "test-session-id",
        },
      };

      localStorageMock.getItem.mockImplementation((key) => {
        if (key === "authToken" || key === "token") return "valid-token";
        if (key === "sessionId") return "test-session-id";
        return null;
      });

      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({ valid: true, success: true }),
      });

      const { unmount } = renderWithProviders(<ProtectedRoute>{mockChildren}</ProtectedRoute>, {
        initialState,
      });

      const clearIntervalSpy = jest.spyOn(global, "clearInterval");

      unmount();

      expect(clearIntervalSpy).toHaveBeenCalled();
    });
  });
});
