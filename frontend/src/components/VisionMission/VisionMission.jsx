import { Lightbulb, Target } from "lucide-react";

import { useAPI } from "../../hooks/useAPI";
import "./VisionMission.css";
import { motion } from "framer-motion";

export default function VisionMission() {
  const { data: visionMissionData, loading } = useAPI("vision-mission");

  // Use first active item or fallback to default
  const content = visionMissionData.find((item) => item.isActive) || {
    title: "Grow Your Business with WisdomQuantums",
    subtitle:
      "Accelerate your digital journey with intelligent solutions, advanced technology, and strategic expertise designed for future-ready businesses.",
    description:
      "At WisdomQuantums, we empower organizations with innovative, custom-built IT solutions that drive efficiency, scalability, and long-term success. Our team partners closely with clients to streamline processes, enhance digital capabilities, and unlock new opportunities in a rapidly evolving digital world.",
    vision:
      "To become a global benchmark in transforming businesses through intelligent, innovative, and future-driven digital solutions.",
    mission:
      "To empower organizations with next-gen technology, tailored strategies, and scalable solutions that accelerate growth and maximize impact.",
    ctaText: "Contact Us",
    ctaLink: "/contact-us",
  };

  if (loading) {
    return (
      <section className="vm-section">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="vm-section">
      <div className="vm-container">
        {/* LEFT SIDE */}
        <motion.div
          className="vm-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="vm-title">{content.title}</h3>

          <p className="vm-subtext">{content.subtitle}</p>

          <p className="vm-desc">{content.description}</p>

          <a href={content.ctaLink}>
            <button className="vm-btn">{content.ctaText}</button>
          </a>
        </motion.div>

        {/* RIGHT — CIRCLE SECTION */}
        <motion.div
          className="vm-right"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="vm-circle">
            <motion.div
              className="vm-q vm-q1 icon-bg"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
            >
              <div className="vm-q-inner icon-only">
                {content.circleImage1 ? (
                  <img
                    src={
                      content.circleImage1.startsWith("http")
                        ? content.circleImage1
                        : `${import.meta.env.VITE_BACKEND_URL}${
                            content.circleImage1
                          }`
                    }
                    alt="Vision"
                    className="vm-circle-img"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "block";
                    }}
                  />
                ) : null}
                <Lightbulb
                  className="vm-icon icon-yellow"
                  style={{ display: content.circleImage1 ? "none" : "block" }}
                />
              </div>
            </motion.div>

            <motion.div
              className="vm-q vm-q2 text-bg"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
              <div className="vm-q-inner text-only text-left-align">
                <h3 className="vm-heading">Vision:</h3>
                <p className="vm-text">{content.vision}</p>
              </div>
            </motion.div>

            <motion.div
              className="vm-q vm-q3 text-bg"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
              <div className="vm-q-inner text-only text-right-align">
                <h3 className="vm-heading">Mission:</h3>
                <p className="vm-text">{content.mission}</p>
              </div>
            </motion.div>

            <motion.div
              className="vm-q vm-q4 icon-bg"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
            >
              <div className="vm-q-inner icon-only">
                {content.circleImage2 ? (
                  <img
                    src={
                      content.circleImage2.startsWith("http")
                        ? content.circleImage2
                        : `${import.meta.env.VITE_BACKEND_URL}${
                            content.circleImage2
                          }`
                    }
                    alt="Mission"
                    className="vm-circle-img"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "block";
                    }}
                  />
                ) : null}
                <Target
                  className="vm-icon icon-blue"
                  style={{ display: content.circleImage2 ? "none" : "block" }}
                />
              </div>
            </motion.div>

            {/* Cross Lines */}
            <div className="vm-cross-vertical"></div>
            <div className="vm-cross-horizontal"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
