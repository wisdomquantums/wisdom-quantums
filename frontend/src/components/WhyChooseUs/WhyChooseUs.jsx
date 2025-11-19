import { motion } from "framer-motion";
import {
  Target,
  Zap,
  Users,
  Award,
  TrendingUp,
  Shield,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { useAPI } from "../../hooks/useAPI";
import "./WhyChooseUs.css";

const defaultReasons = [
  {
    icon: Target,
    title: "Tailored Solutions",
    text: "Customized strategies to meet your unique business needs.",
    color: "#3b82f6",
  },
  {
    icon: Zap,
    title: "Innovative Technology",
    text: "Leveraging the latest tools for efficient and scalable results.",
    color: "#8b5cf6",
  },
  {
    icon: Users,
    title: "Expert Team",
    text: "Skilled professionals committed to your success.",
    color: "#ec4899",
  },
  {
    icon: Award,
    title: "Proven Track Record",
    text: "Years of experience delivering exceptional results.",
    color: "#f59e0b",
  },
  {
    icon: TrendingUp,
    title: "Growth Focused",
    text: "Strategies designed to scale your business.",
    color: "#10b981",
  },
  {
    icon: Shield,
    title: "Reliable Support",
    text: "24/7 dedicated support for your peace of mind.",
    color: "#06b6d4",
  },
];

const implementationSteps = [
  {
    step: "01",
    title: "Discovery & Analysis",
    description: "We analyze your business needs and goals",
    icon: Target,
  },
  {
    step: "02",
    title: "Strategy Planning",
    description: "Custom roadmap tailored to your objectives",
    icon: TrendingUp,
  },
  {
    step: "03",
    title: "Implementation",
    description: "Expert execution with cutting-edge technology",
    icon: Zap,
  },
  {
    step: "04",
    title: "Launch & Support",
    description: "Seamless deployment with ongoing assistance",
    icon: Shield,
  },
];

export default function WhyChooseUs() {
  const { data: whyChooseUsData, loading } = useAPI("why-choose-us");

  const content = whyChooseUsData.find((item) => item.isActive) || {
    subtitle: "Why Choose Us",
    title: "Your Success is Our Mission",
    items: defaultReasons.map((r) => ({ title: r.title, text: r.text })),
  };

  if (loading) {
    return (
      <section className="wc-section">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="wc-section">
      <div className="wc-container">
        {/* Header */}
        <motion.div
          className="wc-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="wc-badge">{content.subtitle}</span>
          <h2 className="wc-title">{content.title}</h2>
          <p className="wc-description">
            We combine innovation, expertise, and dedication to deliver
            exceptional results
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="wc-reasons-grid">
          {defaultReasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                className="wc-reason-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div
                  className="wc-reason-icon"
                  style={{ background: `${reason.color}15` }}
                >
                  <Icon
                    style={{ color: reason.color }}
                    size={28}
                    strokeWidth={2}
                  />
                </div>
                <h3 className="wc-reason-title">{reason.title}</h3>
                <p className="wc-reason-text">{reason.text}</p>
                <div className="wc-reason-hover-indicator">
                  <ArrowRight size={18} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Implementation Steps */}
        <motion.div
          className="wc-steps-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="wc-steps-title">Our Implementation Process</h3>
          <div className="wc-steps-grid">
            {implementationSteps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={index}
                  className="wc-step-card"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <div className="wc-step-number">{step.step}</div>
                  <div className="wc-step-icon-wrapper">
                    <StepIcon className="wc-step-icon" size={24} />
                  </div>
                  <h4 className="wc-step-title">{step.title}</h4>
                  <p className="wc-step-description">{step.description}</p>
                  {index < implementationSteps.length - 1 && (
                    <div className="wc-step-connector">
                      <ArrowRight size={20} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="wc-stats"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="wc-stat-item">
            <CheckCircle2 className="wc-stat-icon" size={32} />
            <div className="wc-stat-number">500+</div>
            <div className="wc-stat-label">Projects Completed</div>
          </div>
          <div className="wc-stat-item">
            <CheckCircle2 className="wc-stat-icon" size={32} />
            <div className="wc-stat-number">98%</div>
            <div className="wc-stat-label">Client Satisfaction</div>
          </div>
          <div className="wc-stat-item">
            <CheckCircle2 className="wc-stat-icon" size={32} />
            <div className="wc-stat-number">24/7</div>
            <div className="wc-stat-label">Support Available</div>
          </div>
          <div className="wc-stat-item">
            <CheckCircle2 className="wc-stat-icon" size={32} />
            <div className="wc-stat-number">10+</div>
            <div className="wc-stat-label">Years Experience</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
