import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarClock,
  Users,
  LogOut,
  Sparkles,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function AdminSidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
    },
    {
      title: "Leave Requests",
      icon: CalendarClock,
      path: "/admin/leaves",
    },
    {
      title: "Employees",
      icon: Users,
      path: "/admin/employees",
    },
  ];

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <aside className="w-64 bg-white flex flex-col h-screen sticky top-0 border-r border-slate-200">
      {/* Logo */}
      <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-100">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shrink-0">
          <Sparkles size={18} className="text-white" strokeWidth={2.5} />
        </div>
        <div className="leading-tight">
          <h1 className="text-slate-900 font-semibold text-[15px] tracking-tight">
            Leave Portal
          </h1>
          <p className="text-slate-400 text-[11px] font-medium">
            Admin Console
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Menu
        </p>
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* active indicator bar */}
                  <span
                    className={`absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-indigo-600 transition-opacity duration-200 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <Icon
                    size={18}
                    strokeWidth={2}
                    className={isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"}
                  />
                  <span>{item.title}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-slate-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
        >
          <LogOut size={18} strokeWidth={2} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;