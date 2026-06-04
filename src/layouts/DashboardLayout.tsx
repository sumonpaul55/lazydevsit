import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router";
import { FiGrid, FiLayers, FiLogOut, FiExternalLink, FiUser, FiMenu, FiX } from "react-icons/fi";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Auth gate check
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      // Clear anything partial and kick to login
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navLinks = [
    { name: "Overview", path: "/dashboard", icon: <FiGrid size={18} /> },
    { name: "Projects", path: "/dashboard/projects", icon: <FiLayers size={18} /> },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-[#080018] flex items-center justify-center text-white">
        <div className="animate-pulse text-purple-400">Loading your space...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080018] text-white flex flex-col md:flex-row relative overflow-hidden font-sans">
      {/* Decorative background grid and glow */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none opacity-30"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[140px] pointer-events-none"></div>

      {/* MOBILE HEADER */}
      <header className="md:hidden flex items-center justify-between px-6 py-4 bg-[#120a1c] border-b border-white/5 relative z-30">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
            LazyDevs
          </span>
          <div className="w-5 h-5 bg-purple-500 rounded-xs transform rotate-45 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-400 hover:text-white focus:outline-none p-1 rounded-lg border border-white/5"
        >
          {isMobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </header>

      {/* SIDEBAR - DESKTOP & MOBILE */}
      <aside
        className={`w-64 bg-[#0c051a]/95 border-r border-white/10 flex flex-col justify-between fixed md:sticky top-0 h-screen z-40 transition-transform duration-300 md:translate-x-0 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex flex-col flex-1 py-6 px-4">
          {/* Logo Section */}
          <div className="hidden md:flex items-center gap-2 px-4 mb-8">
            <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
              LazyDevs
            </span>
            <div className="w-6 h-6 bg-purple-500 rounded-sm transform rotate-45 flex items-center justify-center shadow-lg shadow-purple-500/25">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1.5 flex-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                    ? "bg-purple-600/20 border border-purple-500/30 text-white font-semibold"
                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                    }`}
                >
                  <span className={isActive ? "text-purple-400" : "text-gray-500"}>
                    {link.icon}
                  </span>
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Links & Profile at bottom */}
          <div className="border-t border-white/10 pt-6 mt-6 space-y-4">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 border border-transparent transition-all duration-200 text-sm"
            >
              <FiExternalLink size={16} className="text-gray-500" />
              <span>Back to Website</span>
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-transparent transition-all duration-200 text-sm font-medium text-left"
            >
              <FiLogOut size={16} className="text-rose-400" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Profile Card Bottom */}
        <div className="bg-[#120a23] border-t border-white/5 p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold truncate text-white">{user.name}</h4>
            <p className="text-[11px] truncate text-gray-400">{user.email}</p>
          </div>
        </div>
      </aside>

      {/* OVERLAY FOR MOBILE SIDEBAR */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 min-w-0 p-6 md:p-10 relative z-20 overflow-y-auto max-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
