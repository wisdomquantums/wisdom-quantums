import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { publicNav } from "../../_nav";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { Menu, X } from "lucide-react";
import "./Navbar.css";
import logo from "../../assets/images/logo1.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  return (
    <header className={`nav-container ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-wrapper">
        {/* Logo */}
        <Link
          to="/"
          className="nav-logo"
          onClick={() => setMenuOpen(false)}
          aria-label="WisdomQuantums Home"
        >
          <img
            src={logo}
            alt="WisdomQuantums Solutions - IT Services Company Logo"
            className="nav-logo-img"
            width="40"
            height="40"
            loading="eager"
          />
          <span className="nav-logo-text">WisdomQuantums</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="nav-desktop">
          {publicNav.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              {link.name}
            </NavLink>
          ))}
          <div className="nav-theme-toggle">
            <ThemeToggle />
          </div>
        </nav>

        {/* Hamburger */}
        <button
          className={`nav-hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="nav-overlay"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <nav className={`nav-mobile ${menuOpen ? "open" : ""}`}>
        <div className="mobile-menu-content">
          {publicNav.map((link, index) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? "mobile-item active" : "mobile-item"
              }
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <span className="mobile-item-text">{link.name}</span>
              <span className="mobile-item-arrow">→</span>
            </NavLink>
          ))}
          <div className="mobile-theme-toggle">
            <span className="mobile-theme-label">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
