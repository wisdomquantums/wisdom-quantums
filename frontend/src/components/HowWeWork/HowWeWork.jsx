import { motion } from "framer-motion";
import {
  Lightbulb,
  CheckCircle2,
  TrendingUp,
  Headphones,
  ArrowRight,
} from "lucide-react";
import { useAPI } from "../../hooks/useAPI";
import "./HowWeWork.css";
import centerLogo from "@/assets/images/logo1.png";

const stepIcons = [Lightbulb, CheckCircle2, TrendingUp, Headphones];

export default function HowWeWork() {
  const { data: howWeWorkData, loading } = useAPI("how-we-work");

  // Default steps
  const defaultSteps = [
    {
      title: "Understanding Your Vision",
      text: "We begin by listening. Our team collaborates closely with you to understand your business goals, challenges, and vision. This helps us tailor solutions that truly meet your needs.",
    },
    {
      title: "Quality Assurance",
      text: "Our process is iterative and transparent. By following agile methodologies, we adapt quickly to feedback, ensuring timely delivery while minimizing risks.",
    },
    {
      title: "Strategic Planning",
      text: "Our experts analyze your requirements and develop a detailed plan. Through innovation and efficiency, we craft strategies that align technology with your business objectives.",
    },
    {
      title: "Support & Optimization",
      text: "Our partnership doesn't end at delivery. We provide continuous support, monitor performance, and optimize solutions to keep your business ahead of the curve.",
    },
  ];

  // Use first active item or fallback to default
  const content = howWeWorkData.find((item) => item.isActive) || {
    title: "How we work",
    subtitle: "Simple Easy Steps to Follow",
    centerLogo: centerLogo,
    steps: defaultSteps,
  };

  // Ensure steps is an array
  const steps = Array.isArray(content.steps) ? content.steps : defaultSteps;

  if (loading) {
    return (
      <section className="hww-root">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="hww-root">
      {/* Heading */}
      <div className="hww-header">
        <h2 className="hww-title">{content.title}</h2>
        <h3 className="hww-subtitle">{content.subtitle}</h3>
      </div>

      {/* Layout */}
      <div className="hww-grid">
        {/* Left Side Steps */}
        <div className="hww-column">
          {steps.slice(0, 2).map((step, i) => (
            <div className="hww-card" key={i}>
              <h4>{step.title}</h4>
              <p>{step.text}</p>
            </div>
          ))}
        </div>

        {/* Center Logo */}
        <div className="hww-center">
          <div className="hww-logo-wrapper">
            <img
              src={content.centerLogo}
              alt="Process Illustration"
              className="hww-logo"
            />
          </div>
        </div>

        {/* Right Side Steps */}
        <div className="hww-column">
          {steps.slice(2, 4).map((step, i) => (
            <div className="hww-card" key={i}>
              <h4>{step.title}</h4>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
