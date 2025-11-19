import React from "react";
import { publicNav } from "../../_nav";
import FooterSection from "./FooterSection";
import "./Footer.css";
import footerImg from "@/assets/images/footer/footer1.jpg";

/**
 * Footer — WisdomQuantum Solution Pvt. Ltd.
 * Modern, responsive, with image background + modular sections.
 */

export default function Footer() {
  return (
    <footer className="footer-root">
      {/* Background Image */}
      <div className="footer-bg">
        <img src={footerImg} alt="Footer Background" className="footer-img" />
        <div className="footer-overlay"></div>
      </div>

      {/* Main Content */}
      <div className="footer-container">
        {/* Social Icons + Branding */}
        <FooterSection
          title="WisdomQuantum"
          type="brand"
          description="WisdomQuantum Solution Pvt. Ltd. empowers innovation through intelligent design and next-gen technology. We create scalable, secure, and smart digital solutions for businesses worldwide."
        />

        {/* Inline Quick Links */}
        <FooterSection title="Quick Links" type="links" links={publicNav} />

        {/* Contact Block */}
        <FooterSection
          title="Contact"
          type="contact"
          contactInfo={{
            address: "Pune, Maharashtra, India",
            email: "info@wisdomquantums.com",
            phone: "+91 8208385551 +91 7620691559",
          }}
        />
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <a href="/">
          <p>
            © {new Date().getFullYear()} WisdomQuantum Solution — All Rights
            Reserved.
          </p>
        </a>
      </div>
    </footer>
  );
}
