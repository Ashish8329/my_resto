import { useState } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { LocalhostCred, TOKEN_KEY } from "../../constatns/api";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const titleMap = {
  "/admin/dashboard": "Dashboard",
  "/admin/orders": "Orders",
  "/admin/menu": "Menu",
  "/admin/tables": "Table Management",
  "/admin/staffs": "Staff Management",
  "/admin/reports": "Reports",
};


  const handleLogout = () => {
  // Clear auth data (adjust keys if needed)
  // localStorage.removeItem(TOKEN_KEY);
  // localStorage.removeItem(LocalhostCred);
  localStorage.clear()

  // Redirect to login
  navigate('/staff/login')
  
};

const location = useLocation();
const title = titleMap[location.pathname] || "Admin";

  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64
        bg-slate-900
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <div className="h-full flex flex-col">

          {/* Brand */}
          <div className="px-6 py-6 border-b border-slate-800">
            <h1 className="text-lg font-semibold text-white">
              MyResto
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Admin Panel
            </p>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            <NavItem to="/admin/dashboard" label="Dashboard" />
            <NavItem to="/admin/orders" label="Orders" />
            <NavItem to="/admin/menu" label="Menu" />
            <NavItem to="/admin/tables" label="Tables" />
            <NavItem to="/admin/staffs" label="Staff" /> 
            <NavItem to="/admin/reports" label="Reports" />
          </nav>


          {/* Footer */}
          <div className="px-6 py-4 text-xs text-slate-500 border-t border-slate-800">
            © 2026 MyResto
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200
          flex items-center justify-between px-4 md:px-6 sticky top-0 z-20"
        >
          <button
            className="md:hidden text-slate-600 text-lg"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>

          <h2 className="text-sm font-medium text-slate-700">
            Dashboard
          </h2>

          <button
            className="px-4 py-1.5 rounded-md text-sm
            bg-indigo-600 text-white hover:bg-indigo-700 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};


const NavItem = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `w-full block px-4 py-2.5 rounded-lg text-sm transition
      ${isActive
        ? "bg-slate-800 text-white"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
      }`
    }
  >
    {label}
  </NavLink>
);


export default AdminLayout;
