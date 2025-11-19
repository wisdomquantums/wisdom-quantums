import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import SEO from "@/components/SEO/SEO";
import "./ContactUs.css";
import {
  MapPin,
  Mail,
  Phone,
  Send,
  MessageCircle,
  Clock,
  Sparkles,
  CheckCircle,
} from "lucide-react";

export default function ContactUs() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const sendInquiry = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    const formData = new FormData(formRef.current);
    const data = {
      name: `${formData.get("first_name")} ${formData.get("last_name")}`,
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("service"),
      message: formData.get("message"),
      type: "general",
    };

    try {
      console.log(
        "Submitting contact inquiry to:",
        `${import.meta.env.VITE_BACKEND_URL}/api/inquiries`
      );
      console.log("Data:", data);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/inquiries`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      console.log("Response status:", response.status);
      const json = await response.json();
      console.log("Response data:", json);

      if (json.success) {
        setMsg(
          "Your message has been sent successfully! We'll get back to you soon."
        );
        formRef.current.reset();
      } else {
        setMsg(json.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Contact inquiry error:", error);
      setMsg(
        `Server error: ${error.message}. Please check if backend is running.`
      );
    }

    setLoading(false);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact WisdomQuantums Solutions",
    description:
      "Get in touch with WisdomQuantums Solutions for IT services, web development, and software solutions.",
    mainEntity: {
      "@type": "Organization",
      name: "WisdomQuantums Solutions",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Katraj",
        addressLocality: "Pune",
        addressRegion: "Maharashtra",
        postalCode: "411021",
        addressCountry: "IN",
      },
      telephone: "+91-8208385551",
      email: "info@wisdomquantums.com",
    },
  };

  return (
    <>
      <SEO
        title="Contact Us - Get In Touch"
        description="Contact WisdomQuantums Solutions for web development, software solutions, and IT services. Located in Pune, Maharashtra. Call us at +91 8208385551 or email info@wisdomquantums.com"
        keywords="contact wisdomquantums, IT services contact, web development inquiry, Pune IT company, software development contact"
        url="https://www.wisdomquantums.com/contact-us"
        structuredData={structuredData}
      />
      <div className="contact-page">
        {/* Hero Section */}
        <motion.div
          className="contact-hero"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="absolute -top-6 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-8 h-8 text-primary opacity-60" />
          </motion.div>
          <h1 className="contact-title">
            <span className="text-gradient">Get In Touch</span>
          </h1>
          <p className="contact-subtitle">
            We'd love to hear from you. Let's start a conversation.
          </p>
        </motion.div>

        {/* CONTAINER WRAPPER */}
        <div className="contact-container">
          {/* LEFT SIDE - Contact Info */}
          <motion.div
            className="contact-info-section"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="info-heading">Let's Talk</h2>
            <p className="info-description">
              Have a project in mind or just want to chat? We're here to help
              bring your ideas to life.
            </p>

            <div className="contact-cards">
              <motion.div className="info-card" whileHover={{ y: -5 }}>
                <div className="info-icon-wrapper">
                  <MapPin className="info-icon" />
                </div>
                <div className="info-content">
                  <h3 className="info-label">Visit Us</h3>
                  <p className="info-text">
                    Katraj, Pune, Maharashtra,
                    <br />
                    <strong>India</strong> – 411021
                  </p>
                </div>
              </motion.div>

              <motion.div className="info-card" whileHover={{ y: -5 }}>
                <div className="info-icon-wrapper">
                  <Mail className="info-icon" />
                </div>
                <div className="info-content">
                  <h3 className="info-label">Email Us</h3>
                  <p className="info-text">info@wisdomquantums.com</p>
                </div>
              </motion.div>

              <motion.div className="info-card" whileHover={{ y: -5 }}>
                <div className="info-icon-wrapper">
                  <Phone className="info-icon" />
                </div>
                <div className="info-content">
                  <h3 className="info-label">Call Us</h3>
                  <p className="info-text">
                    +91 8208385551
                    <br />
                    +91 7620691559
                  </p>
                </div>
              </motion.div>

              <motion.div className="info-card" whileHover={{ y: -5 }}>
                <div className="info-icon-wrapper">
                  <Clock className="info-icon" />
                </div>
                <div className="info-content">
                  <h3 className="info-label">Working Hours</h3>
                  <p className="info-text">
                    Mon - Sat: 9:00 AM - 6:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="info-features">
              <div className="feature-badge">
                <CheckCircle className="w-4 h-4" />
                <span>24/7 Support</span>
              </div>
              <div className="feature-badge">
                <CheckCircle className="w-4 h-4" />
                <span>Quick Response</span>
              </div>
              <div className="feature-badge">
                <CheckCircle className="w-4 h-4" />
                <span>Expert Team</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE FORM */}
          <motion.div
            className="contact-form-section"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="form-header">
              <MessageCircle className="form-header-icon" />
              <h3 className="form-title">Send us a Message</h3>
              <p className="form-description">
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>
            </div>

            <form className="contact-form" ref={formRef} onSubmit={sendInquiry}>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name*</label>
                  <input
                    name="first_name"
                    type="text"
                    required
                    placeholder="John"
                  />
                </div>

                <div className="form-group">
                  <label>Last Name*</label>
                  <input
                    name="last_name"
                    type="text"
                    required
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email Address*</label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number*</label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Service Interest*</label>
                <select name="service" required>
                  <option value="">Select your Service</option>
                  <option value="Web Development">Web Development</option>
                  <option value="App Development">App Development</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Software Development">
                    Software Development
                  </option>
                  <option value="Other">Others</option>
                </select>
              </div>

              <div className="form-group">
                <label>How can we help you?*</label>
                <textarea
                  name="message"
                  required
                  placeholder="Tell us about your project or inquiry..."
                  rows="5"
                />
              </div>

              <motion.button
                className="submit-btn"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <>
                    <div className="spinner"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>

              {msg && (
                <motion.div
                  className={`form-message ${
                    msg.includes("success") ? "success" : "error"
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {msg}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>

        {/* GOOGLE MAP */}
        <motion.div
          className="map-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="map-header">
            <h2 className="map-title">Find Us Here</h2>
            <p className="map-description">
              Visit our office or drop by for a coffee
            </p>
          </div>
          <div className="map-wrapper">
            <iframe
              title="WisdomQuantums Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.8670179210576!2d73.8542025749609!3d18.444346082634496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2ebce85204b6d%3A0x9c1259eb826c80fb!2sWisdomQuantums%20Solution!5e0!3m2!1sen!2sin!4v1763389841452!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </>
  );
}
