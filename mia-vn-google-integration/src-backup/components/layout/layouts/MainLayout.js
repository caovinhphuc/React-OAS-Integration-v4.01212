import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";

const MainLayout = () => {
  const { isLoggedIn, loading, checkSession } = useAuth();

  // Kiểm tra phiên đăng nhập định kỳ
  useEffect(() => {
    const sessionCheckInterval = setInterval(() => {
      checkSession();
    }, 60 * 1000); // Kiểm tra mỗi phút

    return () => clearInterval(sessionCheckInterval);
  }, [checkSession]);

  // Hiển thị loading state
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  // Redirect về trang đăng nhập nếu chưa đăng nhập
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <AppHeader />

      {/* Main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <AppSidebar />

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t py-3 text-center text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()} MIA.vn - Hệ thống quản lý kho vận và đơn
          hàng
        </p>
      </footer>
    </div>
  );
};

export default MainLayout;
