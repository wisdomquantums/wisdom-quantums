import { useEffect, useRef, useCallback, useState } from "react";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import SEO from "@/components/SEO/SEO";
import { useAPI } from "../../hooks/useAPI";
import "./ITSolutions.css";

export default function ITSolutions() {
  const scrollRef = useRef(null);
  const intervalRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const { data: itSolutions, loading, error } = useAPI("it-solutions");

  // Debug logging
  useEffect(() => {
    console.log("IT Solutions Data:", itSolutions);
    console.log("Loading:", loading);
    console.log("Error:", error);
  }, [itSolutions, loading, error]);

  // Filter active solutions and sort by order
  const activeServices = itSolutions
    .filter((s) => s.isActive)
    .sort((a, b) => a.order - b.order);

  /* AUTO SCROLL */
  const stopAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startAutoScroll = useCallback(() => {
    if (isPaused) return;
    stopAutoScroll();

    intervalRef.current = setInterval(() => {
      const container = scrollRef.current;
      if (!container) return;

      const maxScroll = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScroll - 5) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: 260, behavior: "smooth" });
      }
    }, 3000);
  }, [stopAutoScroll, isPaused]);

  useEffect(() => {
    if (activeServices.length > 0) {
      startAutoScroll();
    }
    return () => stopAutoScroll();
  }, [startAutoScroll, stopAutoScroll, activeServices.length]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    stopAutoScroll();
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    startAutoScroll();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      const container = scrollRef.current;
      if (!container) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        container.scrollBy({ left: -300, behavior: "smooth" });
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        container.scrollBy({ left: 300, behavior: "smooth" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "IT Solutions & Services",
    description:
      "Innovative IT solutions designed for growth including web development, software development, cloud solutions, and digital transformation services.",
    provider: {
      "@type": "Organization",
      name: "WisdomQuantums Solutions",
      url: "https://www.wisdomquantums.com",
    },
    areaServed: "IN",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "IT Services",
      itemListElement: activeServices.slice(0, 10).map((service, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
        },
      })),
    },
  };

  return (
    <>
      <SEO
        title="IT Solutions & Services"
        description="Innovative IT solutions designed for growth. WisdomQuantums delivers powerful, scalable, and future-ready IT solutions including web development, software development, cloud solutions, and digital transformation."
        keywords="IT solutions, IT services, web development services, software development, cloud solutions, digital transformation, enterprise IT, business technology"
        url="https://www.wisdomquantums.com/services"
        structuredData={structuredData}
      />
      <section className="its-section">
        <div className="its-container">
          {/* Header with Icons */}
          <motion.div
            className="its-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="its-badge">
              <Sparkles size={16} />
              <span>Smart IT Services</span>
            </div>

            <h2 className="its-title">
              Innovative IT Solutions Designed for Growth
            </h2>

            <p className="its-description">
              WisdomQuantums delivers powerful, scalable, and future-ready IT
              solutions tailored to your business goals. Our expert team
              leverages modern technology to streamline operations, enhance user
              experience, and accelerate your digital transformation journey.
            </p>
          </motion.div>

          {loading ? (
            <div className="its-loading">
              <Loader2 className="its-spinner" size={48} />
              <p>Loading IT Solutions...</p>
            </div>
          ) : activeServices.length === 0 ? (
            <div className="its-empty">
              <p>No IT solutions available at the moment.</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div
                className="its-scroll-wrapper"
                ref={scrollRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleMouseEnter}
                onTouchEnd={handleMouseLeave}
              >
                <div className="its-card-row">
                  {[...activeServices, ...activeServices].map((item, idx) => (
                    <motion.div
                      key={`${item._id || item.id}-${idx}`}
                      className="its-card"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      whileHover={{
                        y: -12,
                        scale: 1.02,
                        transition: { duration: 0.3 },
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="card-border-glow"></div>

                      <img
                        src={
                          item.image
                            ? item.image.startsWith("http")
                              ? item.image
                              : `${import.meta.env.VITE_BACKEND_URL}${
                                  item.image
                                }`
                            : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                item.title
                              )}&background=6366f1&color=fff&size=400`
                        }
                        className="its-img"
                        alt={item.title}
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            item.title
                          )}&background=6366f1&color=fff&size=400`;
                        }}
                      />

                      <div className="its-overlay"></div>

                      <div className="its-card-content">
                        <div className="its-card-text">
                          <h3 className="its-card-titl">{item.title}</h3>
                          {item.description && (
                            <p className="its-card-dec">
                              {item.description.length > 100
                                ? `${item.description.substring(0, 100)}...`
                                : item.description}
                            </p>
                          )}
                        </div>
                        <motion.div
                          className="its-card-arrow"
                          whileHover={{ scale: 1.1, rotate: -45 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight size={20} />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeServices.length > 0 && (
            <motion.div
              className="its-scroll-indicator"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span>{isPaused ? "Paused" : "Auto-scrolling"}</span>
              <div className="its-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
