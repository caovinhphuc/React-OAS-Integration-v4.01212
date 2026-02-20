//ProtectedRoute.js

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import getApiBaseUrl from "../../utils/getApiBaseUrl";
import Loading from "../common/Loading";

const API_BASE_URL = getApiBaseUrl();

/**
 * ProtectedRoute - Component để bảo vệ routes yêu cầu authentication
 * Tự động kiểm tra session và redirect về login nếu hết hạn
 */
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, sessionId } = useSelector((state) => state.auth);
  const [isChecking, setIsChecking] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      // Nếu không có authentication state, kiểm tra token trong localStorage
      const token = localStorage.getItem("authToken") || localStorage.getItem("token");

      if (!token && !isAuthenticated) {
        // Không có token và không authenticated
        setIsChecking(false);
        setIsValid(false);
        return;
      }

      // Nếu có token nhưng chưa có trong Redux state, thử validate
      if (token && !isAuthenticated) {
        try {
          const token = localStorage.getItem("authToken") || localStorage.getItem("token");

          const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          });

          if (response.ok) {
            const data = await response.json();
            if (data.valid && data.success) {
              // Session hợp lệ
              setIsValid(true);
            } else {
              // Session không hợp lệ
              setIsValid(false);
              // Clear invalid tokens
              localStorage.removeItem("authToken");
              localStorage.removeItem("token");
              localStorage.removeItem("sessionId");
            }
          } else {
            // Lỗi khi gọi API, coi như session không hợp lệ
            setIsValid(false);
            localStorage.removeItem("authToken");
            localStorage.removeItem("token");
            localStorage.removeItem("sessionId");
          }
        } catch (error) {
          console.error("Error verifying session:", error);
          setIsValid(false);
          localStorage.removeItem("authToken");
          localStorage.removeItem("token");
          localStorage.removeItem("sessionId");
        } finally {
          setIsChecking(false);
        }
      } else {
        // Đã authenticated trong Redux state
        setIsValid(true);
        setIsChecking(false);
      }
    };

    checkSession();
  }, [dispatch, isAuthenticated, sessionId]);

  if (isChecking) {
    // Hiển thị loading trong khi kiểm tra session
    return <Loading />;
  }

  if (!isValid) {
    // Nếu session không hợp lệ, redirect về login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Nếu session hợp lệ, render component con
  return children;
};

export default ProtectedRoute;
