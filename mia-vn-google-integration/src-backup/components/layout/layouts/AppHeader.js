import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useActivityLogger } from '../hooks/useActivityLogger';

// Lucide icons
import {
  Bell,
  ChevronDown,
  FileUp,
  HelpCircle,
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  Shield,
  Sun,
  Upload,
  User,
  UserCog,
  X
} from 'lucide-react';

// Notification component
const NotificationItem = React.memo(({ notification, isDarkMode, onMarkAsRead }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`p-3 border-b ${
        isDarkMode ? 'border-gray-700' : 'border-gray-100'
      } ${
        !notification.read
          ? (isDarkMode ? 'bg-gray-700/40' : 'bg-blue-50/70')
          : ''
      }`}
      onClick={() => onMarkAsRead && onMarkAsRead(notification.id)}
    >
      <div className="flex items-start">
        <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
          notification.read
            ? (isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600')
            : 'bg-blue-100 text-blue-600'
        }`}>
          <Bell size={14} />
        </div>
        <div className="flex-1">
          <p className={`text-sm ${notification.read ? '' : 'font-medium'}`}>
            {notification.content}
          </p>
          <span className="text-xs opacity-70 mt-0.5 block">{notification.time}</span>
        </div>
        {!notification.read && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="h-2 w-2 bg-blue-500 rounded-full mt-2"
          />
        )}
      </div>
    </motion.div>
  );
});

NotificationItem.displayName = 'NotificationItem';

const AppHeader = ({ toggleSidebar, toggleMobileMenu, isScrolled }) => {
  const navigate = useNavigate();
  const { currentUser, logout, isAuthenticated } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const { logUserActivity } = useActivityLogger();

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [uploadMenuOpen, setUploadMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const userDropdownRef = useRef(null);
  const notificationsRef = useRef(null);
  const uploadMenuRef = useRef(null);
  const fileInputRef = useRef(null);

  // Log auth status for debugging
  useEffect(() => {
    console.log("Header Auth Status:", {
      isAuthenticated,
      userEmail: currentUser?.email
    });
  }, [isAuthenticated, currentUser]);

  // Mock notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      content: 'SLA cảnh báo: Đơn hàng #WH-12345 sắp trễ hạn',
      time: '12 phút trước',
      read: false
    },
    {
      id: 2,
      content: 'Đơn hàng #WH-56789 đã hoàn thành',
      time: '45 phút trước',
      read: false
    },
    {
      id: 3,
      content: 'Báo cáo tuần đã sẵn sàng',
      time: '2 giờ trước',
      read: true
    },
  ]);

  // Tính toán số thông báo chưa đọc
  const notificationCount = notifications.filter(n => !n.read).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
      if (uploadMenuRef.current && !uploadMenuRef.current.contains(event.target)) {
        setUploadMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handlers
  const handleLogout = useCallback(() => {
    logUserActivity('auth', 'logout', {
      user: currentUser?.username || 'unknown',
      timestamp: new Date().toISOString()
    });

    logout();
    navigate('/login');
  }, [logout, navigate, currentUser, logUserActivity]);

  const toggleNotifications = useCallback(() => {
    setNotificationsOpen(prev => !prev);

    if (!notificationsOpen) {
      logUserActivity('notification', 'open_menu', {
        count: notificationCount
      });
    }
  }, [notificationsOpen, notificationCount, logUserActivity]);

  // Handle file upload
  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Validate file type
    const validTypes = ['application/json', 'text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    if (!validTypes.includes(file.type)) {
      alert('Định dạng file không hỗ trợ. Vui lòng tải lên file JSON, CSV hoặc Excel.');
      return;
    }

    // Process file - can redirect or send to another handler
    logUserActivity('file', 'upload', {
      type: file.type,
      name: file.name,
      size: file.size
    });

    navigate('/upload', { state: { file } });
    setUploadMenuOpen(false);
  };

  // Mark notification as read
  const markNotificationAsRead = useCallback((id) => {
    setNotifications(prev => prev.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));

    logUserActivity('notification', 'mark_read', { id });
  }, [logUserActivity]);

  // Mark all notifications as read
  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));

    logUserActivity('notification', 'mark_all_read', {
      count: notificationCount
    });
  }, [notificationCount, logUserActivity]);

  // Handle search
  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      logUserActivity('search', 'global_search', {
        query: searchValue
      });

      // Here you would typically trigger a search
      console.log('Searching for:', searchValue);

      // Clear the search
      setSearchValue('');
    }
  };

  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        duration: 0.3,
        damping: 20,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  return (
    <header className={`
      fixed top-0 right-0 left-0 h-16 z-30 flex items-center justify-between px-4
      ${darkMode
        ? 'bg-gray-900/95 text-white border-gray-800'
        : 'bg-white/95 text-gray-700 border-gray-200'}
      ${isScrolled ? 'shadow-md' : ''}
      transition-all duration-300 border-b backdrop-blur
    `}>
      <div className="flex items-center gap-4">
        {/* Toggle mobile menu button */}
        <button
          className={`block md:hidden p-2 rounded-full ${
            darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
          }`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <Menu size={20} />
        </button>

        {/* Logo/Title */}
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold">
            MIA
          </div>
          <span className="text-lg font-semibold hidden sm:inline-block">Dashboard</span>
        </div>

        {/* Toggle sidebar button */}
        <button
          className={`p-2 rounded-full transition-colors ${
            darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
          }`}
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Middle section: Search Bar (hidden on mobile) */}
      <div className="hidden md:block max-w-md w-full mx-6">
        <div className={`flex items-center rounded-full border ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
        } px-3 py-1.5`}>
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearch}
            className={`ml-2 bg-transparent border-none focus:outline-none w-full ${
              darkMode ? 'placeholder-gray-500 text-gray-200' : 'placeholder-gray-400 text-gray-700'
            }`}
          />
        </div>
      </div>

      {/* Right section: Actions and user profile */}
      <div className="flex items-center gap-1.5 sm:gap-3">
        {/* Theme toggle */}
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full transition-colors ${
            darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
          }`}
          aria-label="Toggle theme"
        >
          {darkMode ? (
            <Sun size={18} />
          ) : (
            <Moon size={18} />
          )}
        </button>

        {/* Notifications dropdown */}
        <div className="relative" ref={notificationsRef}>
          <button
            className={`p-2 rounded-full transition-colors relative ${
              darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
            } ${notificationsOpen ? (darkMode ? 'bg-gray-800' : 'bg-gray-100') : ''}`}
            onClick={toggleNotifications}
            aria-label="Notifications"
          >
            <Bell size={18} />
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-white text-xs font-medium flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {notificationsOpen && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={dropdownVariants}
                className={`absolute right-0 mt-1 w-80 rounded-lg shadow-lg z-50 overflow-hidden ${
                  darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                }`}
              >
                <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h3 className="font-medium">Thông báo</h3>
                  <button
                    className={`text-xs ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
                    onClick={markAllAsRead}
                  >
                    Đánh dấu đã đọc tất cả
                  </button>
                </div>

                <div className="max-h-[280px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className={`p-4 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Không có thông báo mới
                    </div>
                  ) : (
                    notifications.map(notification => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        isDarkMode={darkMode}
                        onMarkAsRead={markNotificationAsRead}
                      />
                    ))
                  )}
                </div>

                <div className="p-2 text-center border-t border-gray-200 dark:border-gray-700">
                  <button
                    className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
                    onClick={() => {
                      setNotificationsOpen(false);
                      navigate('/notifications');
                    }}
                  >
                    Xem tất cả thông báo
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Upload file dropdown */}
        <div className="relative" ref={uploadMenuRef}>
          <button
            className={`p-2 rounded-full transition-colors relative ${
              darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
            } ${uploadMenuOpen ? (darkMode ? 'bg-gray-800' : 'bg-gray-100') : ''}`}
            onClick={() => setUploadMenuOpen(!uploadMenuOpen)}
            aria-label="Upload file"
          >
            <Upload size={18} />
          </button>

          <AnimatePresence>
            {uploadMenuOpen && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={dropdownVariants}
                className={`absolute right-0 mt-1 w-96 rounded-lg shadow-lg z-50 overflow-hidden ${
                  darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                }`}
              >
                <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h3 className="font-medium">Tải lên đơn hàng</h3>
                  <button
                    className={`${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'}`}
                    onClick={() => setUploadMenuOpen(false)}
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="p-4">
                  {/* File upload area */}
                  <div className="mb-3">
                    <div className={`p-4 border-2 border-dashed rounded-lg flex flex-col items-center justify-center ${
                      darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
                    }`}>
                      <div className={`rounded-full p-2 mb-2 ${darkMode ? 'bg-gray-700' : 'bg-blue-100'}`}>
                        <FileUp className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                      </div>
                      <p className="text-sm font-medium mb-1">Kéo thả file hoặc nhấp để tải lên</p>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-2`}>Hỗ trợ file JSON, CSV và Excel</p>

                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept=".json,.csv,.xls,.xlsx"
                        className="hidden"
                      />
                      <button
                        className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-sm ${
                          darkMode ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-blue-500 text-white hover:bg-blue-400'
                        }`}
                        onClick={() => fileInputRef.current.click()}
                      >
                        <FileUp size={14} />
                        Chọn file
                      </button>
                    </div>
                  </div>

                  {/* Format info */}
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div className={`p-2 rounded border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <div className="flex items-center text-xs font-medium mb-1">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
                        Định dạng JSON
                      </div>
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} truncate`}>
                        {'{"data":[{"id":"SO...","customer":"Shopee"}]}'}
                      </div>
                    </div>

                    <div className={`p-2 rounded border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <div className="flex items-center text-xs font-medium mb-1">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                        Định dạng CSV
                      </div>
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} truncate`}>
                        id,customer,date,detail,status
                      </div>
                    </div>
                  </div>

                  {/* Footer actions */}
                  <div className={`flex justify-between items-center pt-2 mt-2 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <button
                      className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                      onClick={() => {
                        setUploadMenuOpen(false);
                        navigate('/upload');
                      }}
                    >
                      Mở trang tải lên đầy đủ
                    </button>
                    <button
                      className={`text-xs ${darkMode ? 'text-blue-400' : 'text-blue-600'} cursor-pointer underline hover:text-opacity-80`}
                      onClick={() => {
                        setUploadMenuOpen(false);
                        navigate('/templates');
                      }}
                    >
                      Tải file mẫu
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User avatar and dropdown */}
        <div className="relative" ref={userDropdownRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className={`flex items-center gap-2 ml-1 py-1 px-1 sm:px-2 rounded-full transition-colors ${
              darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
            } ${userMenuOpen ? (darkMode ? 'bg-gray-800' : 'bg-gray-100') : ''}`}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
              {currentUser?.avatar || currentUser?.name?.charAt(0) || <User size={16} />}
            </div>
            <span className="hidden md:inline-block font-medium text-sm">
              {currentUser?.name || 'Người dùng'}
            </span>
            <ChevronDown size={16} className="hidden md:inline-block opacity-70" />
          </button>

          <AnimatePresence>
            {userMenuOpen && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={dropdownVariants}
                className={`absolute right-0 mt-1 w-56 rounded-lg shadow-lg z-50 overflow-hidden ${
                  darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                }`}
              >
                <div className={`p-3 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <p className="font-medium">{currentUser?.name || 'Người dùng'}</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-0.5`}>
                    {currentUser?.email || 'admin@example.com'}
                  </p>
                </div>

                <div className="py-1">
                  <button
                    className={`flex w-full items-center px-4 py-2 text-sm text-left ${
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      navigate('/profile');
                      setUserMenuOpen(false);
                    }}
                  >
                    <UserCog size={16} className="mr-2 opacity-70" />
                    Hồ sơ người dùng
                  </button>

                  <button
                    className={`flex w-full items-center px-4 py-2 text-sm text-left ${
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      navigate('/settings');
                      setUserMenuOpen(false);
                    }}
                  >
                    <Settings size={16} className="mr-2 opacity-70" />
                    Cài đặt tài khoản
                  </button>

                  <button
                    className={`flex w-full items-center px-4 py-2 text-sm text-left ${
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      navigate('/help');
                      setUserMenuOpen(false);
                    }}
                  >
                    <HelpCircle size={16} className="mr-2 opacity-70" />
                    Trợ giúp
                  </button>

                  <button
                    className={`flex w-full items-center px-4 py-2 text-sm text-left ${
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      navigate('/permissions');
                      setUserMenuOpen(false);
                    }}
                  >
                    <Shield size={16} className="mr-2 opacity-70" />
                    Phân quyền
                  </button>
                </div>

                <div className={`py-1 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <button
                    onClick={handleLogout}
                    className={`flex w-full items-center px-4 py-2 text-sm text-left ${
                      darkMode ? 'hover:bg-gray-700 text-red-400' : 'hover:bg-gray-50 text-red-600'
                    }`}
                  >
                    <LogOut size={16} className="mr-2 opacity-70" />
                    Đăng xuất
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
