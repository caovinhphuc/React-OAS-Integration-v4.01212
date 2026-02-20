import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useActivityLogger } from '../hooks/useActivityLogger';
import Header from './AppHeader';
import Sidebar from './AppSidebar';

/**
 * MainLayout - Component bố cục chính cho ứng dụng
 * Xử lý hiển thị Sidebar, Header và nội dung chính
 */
const AppMainLayout  = ({ children, activeModule }) => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const { isAuthenticated, currentUser } = useAuth();
  const { logUserActivity } = useActivityLogger();

  // State quản lý sidebar
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    return savedState !== null ? JSON.parse(savedState) : window.innerWidth < 1280;
  });

  // State quản lý menu mobile
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // State theo dõi scroll
  const [isScrolled, setIsScrolled] = useState(false);

  // Lấy kích thước màn hình
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Kiểm tra xác thực, nếu chưa đăng nhập thì chuyển về trang login
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Theo dõi sự kiện scroll để thêm hiệu ứng cho header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theo dõi kích thước màn hình
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setViewport({ width, height });

      // Auto-collapse sidebar trên màn hình nhỏ
      if (width < 768 && !sidebarCollapsed) {
        setSidebarCollapsed(true);
      }

      // Đóng mobile menu khi resize to lên
      if (width > 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarCollapsed]);

  // Lưu trạng thái sidebar
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(sidebarCollapsed));
  }, [sidebarCollapsed]);

  // Ghi log khi chuyển trang
  useEffect(() => {
    if (activeModule) {
      logUserActivity('navigation', 'view_page', {
        module: activeModule,
        user: currentUser?.username || 'anonymous',
        timestamp: new Date().toISOString()
      });
    }
  }, [activeModule, currentUser, logUserActivity]);

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);

    // Log sự kiện
    logUserActivity('ui_interaction', 'toggle_mobile_menu', {
      status: !mobileMenuOpen ? 'opened' : 'closed'
    });
  };

  // Kiểm tra nếu đang ở mobile
  const isMobile = viewport.width < 768;

  // Tính toán style cho phần nội dung
  const contentStyle = {
    marginLeft: isMobile ? 0 : sidebarCollapsed ? '72px' : '280px',
    width: isMobile ? '100%' : sidebarCollapsed ? 'calc(100% - 72px)' : 'calc(100% - 280px)',
    transition: 'margin-left 0.3s ease, width 0.3s ease'
  };

  // Animation variants cho content
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200
      }
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  // Mobile backdrop
  const renderBackdrop = () => {
    if (!isMobile || !mobileMenuOpen) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="mobile-backdrop"
        onClick={() => setMobileMenuOpen(false)}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 40,
        }}
      />
    );
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      {/* Header */}
      <Header
        toggleSidebar={toggleSidebar}
        toggleMobileMenu={toggleMobileMenu}
        isScrolled={isScrolled}
      />

      <div className="layout-container">
        {/* Sidebar */}
        <Sidebar
          collapsed={sidebarCollapsed}
          toggleCollapsed={toggleSidebar}
          mobileMenuOpen={mobileMenuOpen}
          isMobile={isMobile}
        />

        {/* Mobile backdrop */}
        <AnimatePresence>
          {mobileMenuOpen && renderBackdrop()}
        </AnimatePresence>

        {/* Main content */}
        <div
          className="content-container"
          style={contentStyle}
        >
          {/* Tiêu đề module nếu có */}
          {activeModule && (
            <div className="module-header fade-in-down">
              <div className="container py-4">
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                  {activeModule}
                </h1>
                <div className={`h-1 w-16 mt-2 rounded ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}></div>
              </div>
            </div>
          )}

          {/* Page content with animation */}
          <AnimatePresence mode="wait">
            <motion.main
              key={activeModule || 'content'}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={contentVariants}
              className="page-content"
            >
              {children}
            </motion.main>
          </AnimatePresence>

          {/* Footer */}
          <footer className={`py-4 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <p>© {new Date().getFullYear()} - Hệ thống Quản lý Kho Vận</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AppMainLayout;
