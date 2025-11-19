import {
  Heart,
  Mail,
  Phone,
  MapPin,
  Zap,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../../public/images/logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Blogs", path: "/blogs" },
  ];

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  return (
    <footer className="relative bg-slate-950 border-t border-cyan-500/20 mt-auto overflow-hidden">
      {/* Animated top border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"></div>

      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-lg blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-slate-900 p-2 rounded-lg border border-cyan-400/50 group-hover:border-cyan-400 transition-colors">
                  <img
                    src={logo}
                    alt="WisdomQuantums Logo"
                    className="w-8 h-8 object-contain"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  WisdomQuantums
                </h3>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Empowering businesses with innovative technology solutions and
              digital transformation.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-2 rounded-lg transition-all duration-300 overflow-hidden"
                  aria-label={social.label}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <social.icon className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors relative z-10" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-cyan-400 mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-300 transition-colors"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-cyan-400 mb-4 flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="group flex items-start gap-3 text-sm text-slate-400 hover:text-cyan-300 transition-colors">
                <div className="p-1.5 rounded-lg bg-slate-900/50 border border-cyan-500/20 group-hover:border-cyan-400/50 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <span className="pt-0.5">info@wisdomquantums.com</span>
              </li>
              <li className="group flex items-start gap-3 text-sm text-slate-400 hover:text-cyan-300 transition-colors">
                <div className="p-1.5 rounded-lg bg-slate-900/50 border border-cyan-500/20 group-hover:border-cyan-400/50 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <span className="pt-0.5">+91 8208385551 | +91 7620691559</span>
              </li>
              <li className="group flex items-start gap-3 text-sm text-slate-400 hover:text-cyan-300 transition-colors">
                <div className="p-1.5 rounded-lg bg-slate-900/50 border border-cyan-500/20 group-hover:border-cyan-400/50 transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <span className="pt-0.5">Pune, Maharashtra, India-411046</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-cyan-500/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              © {currentYear} WisdomQuantums Solutions. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <p className="text-sm text-slate-500 flex items-center gap-2">
                Made with{" "}
                <Heart className="w-4 h-4 text-red-400 fill-current animate-pulse" />{" "}
                by WisdomQuantums Team
              </p>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/30">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400 font-mono">
                  SYSTEM ONLINE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
