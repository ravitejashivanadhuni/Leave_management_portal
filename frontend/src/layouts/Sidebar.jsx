import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarPlus,
  History,
  Users,
  ClipboardList,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const { user, logout } = useAuth();

  const employeeMenu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/employee/dashboard",
    },
    {
      name: "Apply Leave",
      icon: CalendarPlus,
      path: "/employee/apply-leave",
    },
    {
      name: "Leave History",
      icon: History,
      path: "/employee/history",
    },
  ];

  const adminMenu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
    },
    {
      name: "Leave Requests",
      icon: ClipboardList,
      path: "/admin/leaves",
    },
    {
      name: "Employees",
      icon: Users,
      path: "/admin/employees",
    },
  ];

  const menu =
    user?.role === "ADMIN"
      ? adminMenu
      : employeeMenu;

  return (
    <aside className="w-72 bg-white shadow-xl border-r h-screen flex flex-col">

      <div className="p-6 border-b">

        <h1 className="text-2xl font-bold text-blue-600">
          LeaveFlow
        </h1>

        <p className="text-gray-500 text-sm">
          Employee Leave Portal
        </p>

      </div>

      <div className="flex-1 p-4">

        {menu.map((item) => (

          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg mb-2 transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`
            }
          >

            <item.icon size={20} />

            {item.name}

          </NavLink>

        ))}

      </div>

      <div className="p-4">

        <button
          onClick={logout}
          className="w-full bg-red-500 hover:bg-red-600 text-white rounded-lg py-3 flex items-center justify-center gap-2"
        >
          <LogOut size={18} />

          Logout

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;