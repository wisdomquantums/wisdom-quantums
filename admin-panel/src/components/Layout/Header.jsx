import { useState, useEffect } from "react";
import {
  Menu,
  LogOut,
  User,
  Bell,
  Search,
  Settings,
  Zap,
  Activity,
  X,
  Mail,
  Briefcase,
  FileText,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import logo from "../../assets/images/logo.png";

export default function Header({ toggleSidebar }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch notifications
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await api.get("/admin/notifications");
      setNotifications(response.data.data || []);
      setUnreadCount(response.data.data?.filter((n) => !n.read).length || 0);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  // Global search
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await api.get(
        `/admin/search?q=${encodeURIComponent(query)}`
      );
      setSearchResults(response.data.data || []);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  // Keyboard shortcut for search (Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setShowSearch(true);
      }
      if (e.key === "Escape") {
        setShowSearch(false);
        setShowNotifications(false);
        setShowSettings(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const markAsRead = async (notificationId) => {
    try {
      await api.put(`/admin/notifications/${notificationId}/read`);
      fetchNotifications();
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  return (
    <header
      className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-cyan-500/20 sticky top-0 z-50"
      style={{
        boxShadow: "0 4px 30px rgba(6, 182, 212, 0.1)",
      }}
    >
      {/* Animated top border */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"></div>

      <div className="flex items-center justify-between px-6 py-3.5">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2.5 rounded-lg transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Menu className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors relative z-10" />
          </button>

          {/* Search Bar */}
          <div className="hidden md:flex items-center gap-3 bg-slate-900/50 px-4 py-2.5 rounded-lg border border-cyan-500/20 hover:border-cyan-400/40 focus-within:border-cyan-400 focus-within:bg-slate-900 transition-all duration-300 w-96 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
            <Search className="w-4 h-4 text-slate-400 group-focus-within:text-cyan-400 transition-colors relative z-10" />
            <input
              type="text"
              placeholder="Search anything..."
              className="bg-transparent border-none outline-none text-sm text-slate-200 placeholder-slate-400 w-full relative z-10"
            />
            <kbd className="hidden lg:block px-2 py-0.5 text-[10px] font-mono text-slate-500 bg-slate-800 border border-slate-700 rounded relative z-10">
              Ctrl+K
            </kbd>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* System Status */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900/50 border border-cyan-500/20">
            <Activity className="w-4 h-4 text-green-400 animate-pulse" />
            <span className="text-xs font-mono text-green-400">ONLINE</span>
          </div>

          {/* Notifications */}
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-lg transition-all duration-300 group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Bell className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors relative z-10" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-red-500/50">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {/* Settings */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2.5 rounded-lg transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Settings className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors relative z-10" />
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg blur-md opacity-60 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-9 h-9 bg-white rounded-lg flex items-center justify-center border border-cyan-400/50 group-hover:border-cyan-400 transition-colors p-1.5">
                  <img
                    src={logo}
                    alt="User"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="text-left hidden lg:block relative z-10">
                <p className="text-sm font-semibold text-white">{user?.name}</p>
                <p className="text-[10px] text-cyan-400 font-mono uppercase">
                  {user?.role}
                </p>
              </div>
            </button>

            {/* Dropdown */}
            {showDropdown && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowDropdown(false)}
                />
                <div
                  className="absolute right-0 mt-3 w-64 bg-slate-900 rounded-xl border border-cyan-500/30 py-2 z-20 overflow-hidden"
                  style={{
                    boxShadow:
                      "0 20px 60px rgba(6, 182, 212, 0.2), 0 0 40px rgba(6, 182, 212, 0.1)",
                  }}
                >
                  {/* Glow effect */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>

                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-cyan-500/20">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg blur-md opacity-60"></div>
                        <div className="relative w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-cyan-400/50 p-2">
                          <img
                            src={logo}
                            alt="User Avatar"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {user?.name}
                        </p>
                        <p className="text-xs text-slate-400">{user?.email}</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Zap className="w-3 h-3 text-cyan-400" />
                          <span className="text-[10px] text-cyan-400 font-mono uppercase">
                            {user?.role}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <button
                      onClick={() => {
                        navigate("/admin/profile");
                        setShowDropdown(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all group"
                    >
                      <User className="w-4 h-4" />
                      <span>My Profile</span>
                    </button>

                    <button
                      onClick={() => {
                        navigate("/admin/profile");
                        setShowDropdown(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all group"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </button>
                  </div>

                  <div className="border-t border-cyan-500/20 pt-2">
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all group"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Global Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
          <div className="w-full max-w-2xl mx-4">
            <div className="bg-slate-900 rounded-xl border border-cyan-500/30 overflow-hidden shadow-2xl">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-4 border-b border-cyan-500/20">
                <Search className="w-5 h-5 text-cyan-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search projects, blogs, inquiries..."
                  className="flex-1 bg-transparent border-none outline-none text-slate-200 placeholder-slate-400"
                  autoFocus
                />
                <button onClick={() => setShowSearch(false)}>
                  <X className="w-5 h-5 text-slate-400 hover:text-cyan-400" />
                </button>
              </div>

              {/* Search Results */}
              <div className="max-h-96 overflow-y-auto">
                {searchResults.length > 0 ? (
                  <div className="p-2">
                    {searchResults.map((result, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          navigate(result.link);
                          setShowSearch(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-cyan-500/10 transition-colors text-left"
                      >
                        {result.type === "inquiry" && (
                          <Mail className="w-5 h-5 text-cyan-400" />
                        )}
                        {result.type === "project" && (
                          <Briefcase className="w-5 h-5 text-green-400" />
                        )}
                        {result.type === "blog" && (
                          <FileText className="w-5 h-5 text-purple-400" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-200">
                            {result.title}
                          </p>
                          <p className="text-xs text-slate-400">
                            {result.description}
                          </p>
                        </div>
                        <span className="text-xs text-slate-500 uppercase">
                          {result.type}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : searchQuery.length >= 2 ? (
                  <div className="p-8 text-center text-slate-400">
                    No results found for "{searchQuery}"
                  </div>
                ) : (
                  <div className="p-8 text-center text-slate-400">
                    Type to search...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Panel */}
      {showNotifications && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowNotifications(false)}
          />
          <div className="absolute right-6 top-16 w-96 bg-slate-900 rounded-xl border border-cyan-500/30 z-50 overflow-hidden shadow-2xl">
            <div className="px-4 py-3 border-b border-cyan-500/20 flex items-center justify-between">
              <h3 className="font-semibold text-white">Notifications</h3>
              <span className="text-xs text-cyan-400">
                {unreadCount} unread
              </span>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    className={`px-4 py-3 border-b border-cyan-500/10 hover:bg-cyan-500/5 cursor-pointer transition-colors ${
                      !notification.read ? "bg-cyan-500/5" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          !notification.read ? "bg-cyan-400" : "bg-slate-600"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-sm text-slate-200">
                          {notification.message}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-slate-400">
                  No notifications
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowSettings(false)}
          />
          <div className="absolute right-6 top-16 w-80 bg-slate-900 rounded-xl border border-cyan-500/30 z-50 overflow-hidden shadow-2xl">
            <div className="px-4 py-3 border-b border-cyan-500/20">
              <h3 className="font-semibold text-white">Quick Settings</h3>
            </div>
            <div className="p-4 space-y-4">
              <button
                onClick={() => {
                  navigate("/admin/profile");
                  setShowSettings(false);
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-slate-800/50 hover:bg-cyan-500/10 transition-colors"
              >
                <span className="text-sm text-slate-200">Profile Settings</span>
                <User className="w-4 h-4 text-cyan-400" />
              </button>
              <button
                onClick={() => {
                  navigate("/admin/users");
                  setShowSettings(false);
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-slate-800/50 hover:bg-cyan-500/10 transition-colors"
              >
                <span className="text-sm text-slate-200">User Management</span>
                <User className="w-4 h-4 text-cyan-400" />
              </button>
              <div className="pt-2 border-t border-cyan-500/20">
                <button
                  onClick={logout}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors"
                >
                  <span className="text-sm text-red-400">Logout</span>
                  <LogOut className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
