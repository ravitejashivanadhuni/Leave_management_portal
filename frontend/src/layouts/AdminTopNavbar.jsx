import { Bell, UserCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function AdminTopNavbar() {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white border-b shadow-sm flex items-center justify-between px-8">
      {/* Left */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Admin Dashboard
        </h2>
        <p className="text-sm text-gray-500">
          Welcome back, {user?.name || "Administrator"}
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
          <Bell className="w-5 h-5 text-gray-600" />

          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center gap-3">
          <UserCircle className="w-10 h-10 text-blue-600" />

          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">
              {user?.name || "Administrator"}
            </p>

            <p className="text-xs text-gray-500">
              {user?.role || "ADMIN"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminTopNavbar;