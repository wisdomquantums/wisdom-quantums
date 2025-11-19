import {
  Sparkles,
  TrendingUp,
  Target,
  Zap,
  Users,
  CheckCircle2,
  Award,
  Rocket,
  BarChart3,
  Shield,
} from "lucide-react";
import { useAPI } from "../../hooks/useAPI";
import "./BusinessSolutions.css";
import { motion } from "framer-motion";

import mainImg from "@/assets/images/solutions/main.jpg";
import smallImg from "@/assets/images/solutions/small.jpg";

const featureIcons = [Target, Zap, TrendingUp, Users, Shield];
const benefitIcons = [CheckCircle2, Award, BarChart3, Rocket, Users];

export default function BusinessSolutions() {
  const { data: solutions, loading } = useAPI("business-solutions");

  // Default data
  const defaultFeatures = [
    "Technology Integration",
    "Problem-Solving Approach",
    "Scalable Growth",
    "Adaptability and Agility",
    "Customer-Centric Design",
  ];

  const defaultBenefits = [
    "Increased Efficiency",
    "Enhanced Competitiveness",
    "Better Decision-Making",
    "Sustainable Growth",
    "Improved Customer Engagement",
  ];

  // Use first active solution or fallback to default
  const solution = solutions.find((s) => s.isActive) || {
    subtitle: "Driven by Smart Solutions",
    title: "Innovating Business Solutions",
    mainImage: mainImg,
    smallImage: smallImg,
    features: defaultFeatures,
    benefits: defaultBenefits,
  };

  // Ensure features and benefits are arrays
  const features = Array.isArray(solution.features)
    ? solution.features
    : defaultFeatures;
  const benefits = Array.isArray(solution.benefits)
    ? solution.benefits
    : defaultBenefits;

  if (loading) {
    return (
      <section className="bs-root">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="bs-root">
      <motion.div
        className="bs-wrapper fade-in"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* TOP SECTION */}
        <div className="bs-top">
          {/* LEFT IMAGES */}
          <motion.div
            className="bs-images parallax-hover"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={solution.mainImage}
              className="bs-main-img"
              alt="Business Solutions Main"
            />

            <div className="bs-arc animated-arc"></div>

            <img
              src={solution.smallImage}
              className="bs-small-img float-up"
              alt="Business Solutions Secondary"
            />
          </motion.div>

          {/* RIGHT TEXT */}
          <motion.div
            className="bs-content slide-up"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bs-subtitle-wrapper">
              <Sparkles className="bs-subtitle-icon" size={20} />
              <h4 className="bs-subtitle neon-text">{solution.subtitle}</h4>
            </div>

            <h2 className="bs-title glass-title">{solution.title}</h2>

            <div className="bs-lists">
              <motion.ul
                className="list-block fade-left"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {features.map((feature, idx) => {
                  const Icon = featureIcons[idx] || Target;
                  return (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                      whileHover={{ x: 8, transition: { duration: 0.2 } }}
                    >
                      <Icon className="list-icon" size={18} />
                      {feature}
                    </motion.li>
                  );
                })}
              </motion.ul>

              <motion.ul
                className="list-block fade-right"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {benefits.map((benefit, idx) => {
                  const Icon = benefitIcons[idx] || CheckCircle2;
                  return (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                      whileHover={{ x: 8, transition: { duration: 0.2 } }}
                    >
                      <Icon className="list-icon" size={18} />
                      {benefit}
                    </motion.li>
                  );
                })}
              </motion.ul>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
