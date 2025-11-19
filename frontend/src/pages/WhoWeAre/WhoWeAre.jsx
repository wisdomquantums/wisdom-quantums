import { motion } from "framer-motion";
import {
  Twitter,
  Linkedin,
  Instagram,
  Sparkles,
  Users,
  Target,
  Award,
} from "lucide-react";
import SEO from "@/components/SEO/SEO";
import "./WhoWeAre.css";
import { useAPI } from "../../hooks/useAPI";
import whoweare from "../../assets/images/pages/whoweare.jpg";

export default function WhoWeAre() {
  const { data: teamMembers, loading: teamLoading } = useAPI("team");
  const { data: aboutData } = useAPI("about-page");
  const { data: founders, loading: foundersLoading } = useAPI("founders");

  // Filter active team members and parse social data
  const team = teamMembers
    .filter((member) => member.isActive)
    .map((member) => {
      // Parse social field if it's a string
      let social = member.social;
      if (typeof social === "string") {
        try {
          social = JSON.parse(social);
        } catch (e) {
          console.error("Error parsing social data:", e);
          social = {};
        }
      }
      return { ...member, social: social || {} };
    });

  // Debug: Check team data
  console.log("Team Members Data:", teamMembers);
  console.log("Processed Team:", team);
  console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

  // Get active about page content
  const about = aboutData.find((item) => item.isActive) || {
    bannerImage: whoweare,
    introTitle:
      "WisdomQuantums: Innovating the Future with Next-Generation Technologies",
    introText:
      "WisdomQuantums, a leading IT company, is redefining the digital landscape with innovative next-gen technologies. Our skilled team of professionals delivers high-quality, scalable, and customized IT solutions for global clients. Partner with us to experience excellence in IT services that drive meaningful growth and sustainable success.",
  };

  // Get active founders
  const activeFounders = founders.filter((f) => f.isActive);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About WisdomQuantums Solutions",
    description:
      "Learn about WisdomQuantums Solutions, our team, vision, mission, and commitment to delivering innovative IT solutions.",
    mainEntity: {
      "@type": "Organization",
      name: "WisdomQuantums Solutions",
      url: "https://www.wisdomquantums.com",
      description: about.introText,
    },
  };

  return (
    <>
      <SEO
        title="About Us - Who We Are"
        description="WisdomQuantums is a leading IT company redefining the digital landscape with innovative next-gen technologies. Meet our team of professionals delivering high-quality IT solutions."
        keywords="about wisdomquantums, IT company, team, founders, vision, mission, technology experts"
        url="https://www.wisdomquantums.com/about"
        structuredData={structuredData}
      />
      <div className="wq-section">
        {/* HERO SECTION */}
        <motion.div
          className="wq-hero"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="absolute -top-6 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, -10, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-8 h-8 text-primary opacity-60" />
          </motion.div>
          <h1 className="wq-hero-title">
            <span className="text-gradient">Who We Are</span>
          </h1>
          <p className="wq-hero-subtitle">
            Creating and working together for improvement
          </p>

          {/* Stats */}
          <motion.div
            className="wq-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="stat-item">
              <Users className="stat-icon" />
              <div className="stat-value">50+</div>
              <div className="stat-label">Team Members</div>
            </div>
            <div className="stat-item">
              <Target className="stat-icon" />
              <div className="stat-value">100+</div>
              <div className="stat-label">Projects</div>
            </div>
            <div className="stat-item">
              <Award className="stat-icon" />
              <div className="stat-value">5+</div>
              <div className="stat-label">Years Experience</div>
            </div>
          </motion.div>
        </motion.div>

        {/* BANNER IMAGE */}
        <motion.div
          className="wq-banner"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="banner-wrapper">
            <img
              src={about.bannerImage}
              className="wq-banner-img"
              alt="Team Collaboration"
            />
            <div className="banner-overlay"></div>
          </div>
        </motion.div>

        {/* INTRO */}
        <motion.section
          className="wq-intro"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="wq-intro-title">{about.introTitle}</h2>
          <p className="wq-intro-text">{about.introText}</p>
        </motion.section>

        {/* FOUNDERS SECTION */}
        {foundersLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-primary"></div>
            </div>
          </div>
        ) : activeFounders.length > 0 ? (
          <section className="wq-founders-section">
            <motion.div
              className="section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">Meet Our Founders</h2>
              <p className="section-subtitle">
                The visionaries behind WisdomQuantums
              </p>
            </motion.div>

            {activeFounders.map((founder, index) => (
              <motion.div
                className="founder-card"
                key={founder.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="founder-content">
                  <div className="founder-badge">{founder.role}</div>
                  <h2 className="founder-name">{founder.name}</h2>
                  <p className="founder-desc">{founder.description}</p>

                  <div className="founder-social">
                    {founder.social?.twitter && (
                      <motion.a
                        href={founder.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        whileHover={{ scale: 1.1, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Twitter className="w-5 h-5" />
                      </motion.a>
                    )}
                    {founder.social?.linkedin && (
                      <motion.a
                        href={founder.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        whileHover={{ scale: 1.1, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Linkedin className="w-5 h-5" />
                      </motion.a>
                    )}
                    {founder.social?.instagram && (
                      <motion.a
                        href={founder.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        whileHover={{ scale: 1.1, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Instagram className="w-5 h-5" />
                      </motion.a>
                    )}
                  </div>
                </div>

                <div className="founder-image-wrapper">
                  <div className="founder-image-bg"></div>
                  <img
                    src={founder.image}
                    className="founder-img"
                    alt={founder.name}
                  />
                </div>
              </motion.div>
            ))}
          </section>
        ) : null}

        {/* TEAM SECTION */}
        <motion.div
          className="wq-team-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="wq-team-sub">Awesome team members</h3>
          <h2 className="wq-team-title">Our Team</h2>
        </motion.div>

        {/* TEAM GRID */}
        {teamLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-primary"></div>
            </div>
          </div>
        ) : team.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Users className="w-20 h-20 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No team members available at the moment.
            </p>
          </motion.div>
        ) : (
          <div className="wq-team-grid">
            {team.map((member, index) => (
              <motion.div
                className="team-card"
                key={member.id || index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
              >
                <div className="team-card-inner">
                  {/* Front */}
                  <div className="team-card-front">
                    <div className="team-avatar-wrapper">
                      <div className="team-avatar-bg"></div>
                      <img
                        src={
                          member.image
                            ? member.image.startsWith("http")
                              ? member.image
                              : `${import.meta.env.VITE_BACKEND_URL}${
                                  member.image
                                }`
                            : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                member.name
                              )}&background=2563eb&color=fff&size=200`
                        }
                        className="team-avatar"
                        alt={member.name}
                        onError={(e) => {
                          console.log(
                            "Image load error for:",
                            member.name,
                            "Image path:",
                            member.image
                          );
                          e.target.onerror = null;
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            member.name
                          )}&background=2563eb&color=fff&size=200`;
                        }}
                      />
                    </div>
                    <div className="team-info">
                      <h3 className="team-name">{member.name}</h3>
                      <p className="team-position">{member.position}</p>
                      <span className="team-email">{member.email}</span>
                    </div>
                  </div>

                  {/* Back */}
                  <div className="team-card-back">
                    <div className="team-back-content">
                      <div className="team-quote-icon">
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          opacity="0.3"
                        >
                          <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                        </svg>
                      </div>
                      <p className="team-bio">
                        {member.bio ||
                          `Passionate ${member.position} dedicated to delivering excellence and innovation at WisdomQuantums.`}
                      </p>
                      <div className="team-back-divider"></div>
                      <div className="team-social">
                        {member.social?.linkedin && (
                          <motion.a
                            href={member.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="team-social-link"
                            whileHover={{ scale: 1.15, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            title="Connect on LinkedIn"
                          >
                            <Linkedin className="w-5 h-5" />
                          </motion.a>
                        )}
                        {member.social?.twitter && (
                          <motion.a
                            href={member.social.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="team-social-link"
                            whileHover={{ scale: 1.15, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            title="Follow on Twitter"
                          >
                            <Twitter className="w-5 h-5" />
                          </motion.a>
                        )}
                        {member.social?.github && (
                          <motion.a
                            href={member.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="team-social-link"
                            whileHover={{ scale: 1.15, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            title="View GitHub"
                          >
                            <Instagram className="w-5 h-5" />
                          </motion.a>
                        )}
                      </div>
                      {!member.social?.linkedin &&
                        !member.social?.twitter &&
                        !member.social?.github && (
                          <p className="team-connect-text">
                            Connect with {member.name.split(" ")[0]}
                          </p>
                        )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
