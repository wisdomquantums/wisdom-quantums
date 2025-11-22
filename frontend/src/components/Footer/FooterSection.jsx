import React from "react";
import { Link } from "react-router-dom";

/* FontAwesome React Icons */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

import {
  faLinkedin,
  faFacebook,
  faInstagram,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

/**
 * FooterSection — Reusable sub-component
 * Updated with:
 * ✔ Social icons (LinkedIn, Facebook, Instagram, Twitter, YouTube)
 * ✔ Quick links inline
 * ✔ Address in a wrapped box
 * ✔ Email left | Mobile right
 */

export default function FooterSection({
  title,
  type,
  description,
  links,
  contactInfo,
}) {
  return (
    <div className="footer-section">
      {/* TITLE */}
      <h3
        className={`footer-heading ${type === "brand" ? "footer-brand" : ""}`}
      >
        {title}
      </h3>

      {/* BRAND SECTION */}
      {type === "brand" && (
        <>
          {/* SOCIAL ICONS ROW */}
          <div className="footer-social-row">
            <a
              href="https://www.linkedin.com/company/wisdomquantums/"
              target="_blank"
              rel="noreferrer"
              className="social-icon"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a
              href="https://www.facebook.com/share/16XcNf3uT5/"
              target="_blank"
              rel="noreferrer"
              className="social-icon"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a
              href="https://www.instagram.com/wisdomquantums?igsh=MWs3NDd6dTgxemd0NQ=="
              target="_blank"
              rel="noreferrer"
              className="social-icon"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="https://x.com/wisdomquantums?t=Z-WuwoclTdQiU24f6BynAg&s=09"
              target="_blank"
              rel="noreferrer"
              className="social-icon"
            >
              <FontAwesomeIcon icon={faXTwitter} />
            </a>
            <a
              href="https://www.youtube.com/channel/UCzBoJCPGZ8wMPTOedpZcBXg"
              target="_blank"
              rel="noreferrer"
              className="social-icon"
            >
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>

          <p className="footer-desc">{description}</p>
        </>
      )}

      {/* INLINE QUICK LINKS */}
      {type === "links" && (
        <ul className="footer-links-inline">
          {links?.map((item) => (
            <li key={item.path}>
              <Link to={item.path} className="footer-link">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* CONTACT SECTION */}
      {type === "contact" && contactInfo && (
        <div className="footer-contact-wrapper">
          {/* Address Block */}
          <div className="footer-address-box">
            <FontAwesomeIcon icon={faLocationDot} className="text-blue-400" />
            <span className="footer-address-text">{contactInfo.address}</span>
          </div>

          {/* Email Block */}
          <div className="footer-single-contact">
            <FontAwesomeIcon icon={faEnvelope} className="text-blue-400" />
            <a href={`mailto:${contactInfo.email}`} className="hover-link">
              {contactInfo.email}
            </a>
          </div>

          {/* Phone Block */}
          <div className="footer-single-contact">
            <FontAwesomeIcon icon={faPhone} className="text-blue-400" />
            <a href={`tel:${contactInfo.phone}`} className="hover-link">
              {contactInfo.phone}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
