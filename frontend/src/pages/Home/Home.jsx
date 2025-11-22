import { motion } from "framer-motion";
import SEO from "@/components/SEO/SEO";
import Hero from "../../components/Hero/Hero";
import Testimonials from "../../components/Testimonials/Testimonials";
import Blog from "../Blog/Blog";
import CTASection from "../../components/CTASection/CTASection";
import HowWeWork from "../../components/HowWeWork/HowWeWork";
import BusinessSolutions from "../../components/BusinessSolutions/BusinessSolutions";
import BusinessDevelopment from "../../components/BusinessDevelopment/BusinessDevelopment";
import VisionMission from "../../components/VisionMission/VisionMission";
import ITSolutions from "../ITSolutions/ITSolutions";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import "./Home.css";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "WisdomQuantums Solutions",
    url: "https://www.wisdomquantums.com",
    logo: "https://www.wisdomquantums.com/logo.png",
    description:
      "Leading IT solutions provider offering web development, software development, CRM systems, and mobile applications.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://www.linkedin.com/company/wisdomquantum/",
      "https://www.instagram.com/wisdomquantum/",
      "https://twitter.com/wisdomquantum",
      "https://www.facebook.com/wisdomquantum",
    ],
  };

  return (
    <>
      <SEO
        title="WisdomQuantums Solutions – Web Development, Software, IT & CRM Services"
        description="WisdomQuantums Solutions provides modern website development, custom software, CRM systems, mobile apps, and IT solutions for businesses. Trusted IT partner for scalable digital growth."
        keywords="web development, software development, CRM solutions, mobile apps, IT services, custom software, digital transformation, business solutions, WisdomQuantums"
        url="https://www.wisdomquantums.com/"
        structuredData={structuredData}
      />
      <div className="home-page">
        {/* HERO SECTION */}
        <motion.section
          className="home-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Hero />
        </motion.section>

        {/* Business Development Section */}
        <motion.section
          className="home-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <BusinessDevelopment />
        </motion.section>

        {/* Vision & Mission Section */}
        <motion.section
          className="home-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <VisionMission />
        </motion.section>

        {/* IT Solutions Section */}
        <motion.section
          className="home-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ITSolutions />
        </motion.section>

        {/* Why choose us Section */}
        <motion.section
          className="home-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <WhyChooseUs />
        </motion.section>

        {/* Business Solutions Section */}
        <motion.section
          className="home-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <BusinessSolutions />
        </motion.section>

        {/* How We Work Section */}
        <motion.section
          className="home-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <HowWeWork />
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="home-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <CTASection />
        </motion.section>

        {/* Blog */}
        <motion.section
          className="home-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Blog />
        </motion.section>

        {/* TESTIMONIALS */}
        <motion.section
          className="home-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Testimonials />
        </motion.section>
      </div>
    </>
  );
}
