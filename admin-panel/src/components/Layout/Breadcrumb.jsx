import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const routeNames = {
  "/": "Dashboard",
  "/hero-sections": "Hero Sections",
  "/vision-mission": "Vision & Mission",
  "/business-development": "Business Development",
  "/business-solutions": "Business Solutions",
  "/why-choose-us": "Why Choose Us",
  "/how-we-work": "How We Work",
  "/about-page": "About Page",
  "/founders": "Founders",
  "/team": "Team Members",
  "/services": "Services",
  "/projects": "Projects",
  "/technologies": "Technologies",
  "/gallery": "Gallery",
  "/blogs": "Blogs",
  "/testimonials": "Testimonials",
  "/careers": "Careers",
  "/inquiries": "Inquiries",
  "/users": "User Management",
  "/profile": "My Profile",
};

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Don't show breadcrumb on dashboard
  if (location.pathname === "/") {
    return null;
  }

  return (
    <nav className="flex items-center gap-2 mb-6 px-1">
      {/* Home/Dashboard Link */}
      <Link
        to="/"
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-900/30 transition-all group"
      >
        <Home className="w-4 h-4" />
        <span className="text-sm font-medium">Dashboard</span>
      </Link>

      {/* Path segments */}
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        const routeName =
          routeNames[to] || value.charAt(0).toUpperCase() + value.slice(1);

        return (
          <div key={to} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-slate-600" />
            {isLast ? (
              <span className="px-3 py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 text-sm font-semibold border border-cyan-500/30">
                {routeName}
              </span>
            ) : (
              <Link
                to={to}
                className="px-3 py-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-900/30 transition-all text-sm font-medium"
              >
                {routeName}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
