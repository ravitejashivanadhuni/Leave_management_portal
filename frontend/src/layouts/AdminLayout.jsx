import AdminSidebar from "./AdminSidebar";
import AdminTopNavbar from "./AdminTopNavbar";

function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      {/* <AdminSidebar /> */}

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navbar */}
        <AdminTopNavbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;