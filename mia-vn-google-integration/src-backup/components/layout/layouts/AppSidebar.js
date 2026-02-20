import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth, usePermission } from '../../contexts';

// Thư viện icon
import {
  Home,
  Package,
  Users,
  Settings,
  FileText,
  BarChart2,
  ShoppingBag,
  Truck,
  Clock,
  Star,
  UserCheck,
} from 'lucide-react';

const AppSidebar = () => {
  const { userRole } = useAuth();
  const { hasPermission } = usePermission();

  // Định nghĩa các menu item
  const menuItems = [
    {
      title: 'Dashboard',
      icon: <Home size={18} />,
      path: '/dashboard',
      permission: null, // Không cần quyền
    },
    {
      title: 'Đơn hàng',
      icon: <Package size={18} />,
      path: '/orders',
      permission: 'view_orders',
      submenu: [
        { title: 'Tất cả đơn hàng', path: '/orders' },
        { title: 'Đơn hàng ưu tiên', path: '/orders/priority' },
        { title: 'Đang xử lý', path: '/orders/processing' },
      ],
    },
    {
      title: 'Quản lý SLA',
      icon: <Clock size={18} />,
      path: '/priority-order-sla',
      permission: null,
    },
    {
      title: 'Phân công đơn hàng',
      icon: <UserCheck size={18} />,
      path: '/order-allocation',
      permission: null,
    },
    {
      title: 'Người dùng',
      icon: <Users size={18} />,
      path: '/users',
      permission: 'view_users',
    },
    {
      title: 'Báo cáo',
      icon: <FileText size={18} />,
      path: '/reports',
      permission: 'view_reports',
      submenu: [
        { title: 'Báo cáo SLA', path: '/reports/sla' },
        { title: 'Hiệu suất nhân viên', path: '/reports/performance' },
      ],
    },
    {
      title: 'Cài đặt',
      icon: <Settings size={18} />,
      path: '/settings',
      permission: 'view_settings',
      submenu: [
        { title: 'Cài đặt chung', path: '/settings' },
        { title: 'Cài đặt SLA', path: '/settings/platform-sla' },
      ],
    },
  ];

  // Filter menu items based on permissions
  const filteredMenuItems = menuItems.filter(
    (item) => !item.permission || hasPermission(item.permission)
  );

  return (
    <aside className="w-64 bg-gray-800 text-white h-full overflow-auto flex-shrink-0">
      <div className="p-4">
        <div className="text-xs uppercase text-gray-500 mb-4 font-semibold tracking-wider">
          Menu chính
        </div>

        <nav className="space-y-1">
          {filteredMenuItems.map((item) => (
            <div key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                {item.title}
              </NavLink>

              {item.submenu && (
                <div className="ml-7 mt-1 space-y-1">
                  {item.submenu.map((subItem) => (
                    <NavLink
                      key={subItem.path}
                      to={subItem.path}
                      className={({ isActive }) =>
                        `flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                          isActive
                            ? 'bg-gray-700 text-white'
                            : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                        }`
                      }
                    >
                      {subItem.title}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Trạng thái hệ thống */}
      <div className="p-4 border-t border-gray-700">
        <div className="text-xs uppercase text-gray-500 mb-2 font-semibold tracking-wider">
          Trạng thái hệ thống
        </div>
        <div className="flex items-center justify-between text-sm py-1">
          <div className="flex items-center text-gray-400">
            <Clock size={14} className="mr-1" />
            <span>Cập nhật</span>
          </div>
          <span className="text-green-400 text-xs">Online</span>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
