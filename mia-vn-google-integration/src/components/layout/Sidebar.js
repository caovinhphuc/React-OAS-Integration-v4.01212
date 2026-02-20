import { NavLink } from "react-router-dom";

const navigationItems = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/ai", label: "AI" },
  { to: "/analytics", label: "Analytics" },
  { to: "/google-sheets", label: "Google Sheets" },
  { to: "/google-drive", label: "Google Drive" },
  { to: "/automation", label: "Automation" },
  { to: "/security", label: "Security" },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  if (!isOpen) {
    return (
      <aside className="w-0 overflow-hidden md:w-16 border-r bg-white flex items-start justify-center pt-4">
        <button type="button" onClick={toggleSidebar} className="text-sm font-medium">
          {">"}
        </button>
      </aside>
    );
  }

  return (
    <aside className="w-64 border-r bg-white p-4">
      <nav className="space-y-2">
        {navigationItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `block rounded px-3 py-2 text-sm ${isActive ? "bg-blue-100 text-blue-700" : "text-gray-700"}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
