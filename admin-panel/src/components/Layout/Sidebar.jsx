import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  FolderOpen,
  FileText,
  Star,
  Users,
  Mail,
  Code,
  UserCircle,
  Image,
  Shield,
  Home,
  Lightbulb,
  Target,
  Info,
  UserCheck,
  TrendingUp,
  CheckCircle,
  Workflow,
  ChevronDown,
  ChevronRight,
  Zap,
  Activity,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/images/logo1.png";

const menuSections = [
  {
    title: "OVERVIEW",
    items: [{ name: "Dashboard", path: "/", icon: LayoutDashboard }],
  },
  {
    title: "CONTENT",
    items: [
      { name: "Hero Section", path: "/hero-sections", icon: Home },
      { name: "Vision & Mission", path: "/vision-mission", icon: Target },
      { name: "Business Dev", path: "/business-development", icon: TrendingUp },
      { name: "Solutions", path: "/business-solutions", icon: Lightbulb },
      { name: "Why Choose Us", path: "/why-choose-us", icon: CheckCircle },
      { name: "How We Work", path: "/how-we-work", icon: Workflow },
      { name: "IT Solutions", path: "/it-solutions", icon: Zap },
    ],
  },
  {
    title: "COMPANY",
    items: [
      { name: "About Page", path: "/about-page", icon: Info },
      { name: "Founders", path: "/founders", icon: UserCheck },
      { name: "Team", path: "/team", icon: UserCircle },
    ],
  },
  {
    title: "PORTFOLIO",
    items: [
      { name: "Services", path: "/services", icon: Briefcase },
      { name: "Projects", path: "/projects", icon: FolderOpen },
      { name: "Technologies", path: "/technologies", icon: Code },
      { name: "Gallery", path: "/gallery", icon: Image },
    ],
  },
  {
    title: "ENGAGEMENT",
    items: [
      { name: "Blogs", path: "/blogs", icon: FileText },
      { name: "Testimonials", path: "/testimonials", icon: Star },
      { name: "Careers", path: "/careers", icon: Users },
      { name: "Inquiries", path: "/inquiries", icon: Mail },
    ],
  },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const { user } = useAuth();
  const [expandedSections, setExpandedSections] = useState([
    "OVERVIEW",
    "CONTENT",
  ]);

  const toggleSection = (title) => {
    setExpandedSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 w-64 z-30 transition-transform duration-300 border-r border-cyan-500/20 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          boxShadow:
            "0 0 60px rgba(6, 182, 212, 0.15), inset 0 0 60px rgba(6, 182, 212, 0.03)",
        }}
      >
        {/* Animated border effect */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse"></div>

        {/* Logo */}
        <div className="p-6 border-b border-cyan-500/20 relative">
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0 group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg blur-lg opacity-60 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-white p-2 rounded-lg border border-cyan-400/50 group-hover:border-cyan-400 transition-colors overflow-hidden">
                <img
                  src={logo}
                  alt="WisdomQuantums Logo"
                  className="w-8 h-8 object-contain"
                />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                WisdomQuantums
              </h1>
              <p className="text-[10px] text-cyan-400/60 font-mono tracking-wider">
                ADMIN_CONTROL_v2.0
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-240px)] custom-scrollbar">
          {menuSections.map((section) => (
            <div key={section.title} className="mb-4">
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full flex items-center justify-between px-3 py-2 text-[10px] font-bold text-cyan-400/70 hover:text-cyan-400 tracking-widest transition-colors"
              >
                <span>{section.title}</span>
                {expandedSections.includes(section.title) ? (
                  <ChevronDown className="w-3 h-3" />
                ) : (
                  <ChevronRight className="w-3 h-3" />
                )}
              </button>

              {expandedSections.includes(section.title) && (
                <div className="space-y-1 mt-1">
                  {section.items.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.path === "/"}
                      className={({ isActive }) =>
                        `group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 relative overflow-hidden ${
                          isActive
                            ? "text-white"
                            : "text-slate-300 hover:text-cyan-300"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <>
                              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20"></div>
                              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-10 blur-xl"></div>
                              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-cyan-400 via-blue-400 to-purple-500 shadow-lg shadow-cyan-500/50"></div>
                            </>
                          )}
                          <div
                            className={`absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity`}
                          ></div>
                          <item.icon className="w-4 h-4 flex-shrink-0 relative z-10" />
                          <span className="text-sm font-medium relative z-10">
                            {item.name}
                          </span>
                        </>
                      )}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Superadmin Users */}
          {user?.role === "superadmin" && (
            <div className="pt-2 border-t border-cyan-500/20">
              <p className="px-3 py-2 text-[10px] font-bold text-cyan-400/70 tracking-widest">
                ADMIN
              </p>
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 relative overflow-hidden ${
                    isActive
                      ? "text-white"
                      : "text-slate-300 hover:text-cyan-300"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20"></div>
                        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-cyan-400 to-purple-500"></div>
                      </>
                    )}
                    <Shield className="w-4 h-4 flex-shrink-0 relative z-10" />
                    <span className="text-sm font-medium relative z-10">
                      Users
                    </span>
                  </>
                )}
              </NavLink>
            </div>
          )}
        </nav>

        {/* User Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-cyan-500/20 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative rounded-lg p-3 overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 group-hover:from-cyan-500/20 group-hover:to-purple-500/20 transition-all"></div>
            <div className="absolute inset-0 border border-cyan-500/30 rounded-lg"></div>
            <div className="relative flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full blur-md opacity-60"></div>
                <div className="relative w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center border border-cyan-400/50">
                  <span className="text-sm font-bold text-white">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {user?.name}
                </p>
                <div className="flex items-center gap-1.5">
                  <Activity className="w-3 h-3 text-green-400" />
                  <p className="text-[10px] text-green-400 font-mono uppercase">
                    {user?.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.3);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #06b6d4, #a855f7);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #22d3ee, #c084fc);
        }
      `}</style>
    </>
  );
}
