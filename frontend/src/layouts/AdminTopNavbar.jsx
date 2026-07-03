import { Bell, ChevronDown } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function AdminTopNavbar() {
  const { user } = useAuth();

  const name = user?.name || "Administrator";
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">
      {/* Left */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 tracking-tight">
          Admin Dashboard
        </h2>
        <p className="text-sm text-slate-400">
          Welcome back, {name}
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button className="relative p-2.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all duration-200">
          <Bell size={19} strokeWidth={2} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>

        <div className="w-px h-8 bg-slate-200" />

        <button className="flex items-center gap-3 pl-1 pr-2 py-1.5 rounded-lg hover:bg-slate-50 transition-all duration-200 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-semibold">
              {initials}
            </span>
          </div>

          <div className="text-left leading-tight">
            <p className="text-sm font-semibold text-slate-800">
              {name}
            </p>
            <p className="text-xs text-slate-400 uppercase tracking-wide">
              {user?.role || "Admin"}
            </p>
          </div>

          <ChevronDown
            size={16}
            strokeWidth={2}
            className="text-slate-400 group-hover:text-slate-600 transition-colors ml-1"
          />
        </button>
      </div>
    </header>
  );
}

export default AdminTopNavbar;