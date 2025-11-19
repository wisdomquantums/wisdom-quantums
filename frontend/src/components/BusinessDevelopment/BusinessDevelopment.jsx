import { BarChart3, Cpu, Bot, TrendingUp, Zap, Rocket } from "lucide-react";
import { useAPI } from "../../hooks/useAPI";
import "./BusinessDevelopment.css";

// Icon mapping
const iconMap = {
  BarChart3: BarChart3,
  Cpu: Cpu,
  Bot: Bot,
  TrendingUp: TrendingUp,
  Zap: Zap,
  Rocket: Rocket,
};

export default function BusinessDevelopment() {
  const { data: businessDevData, loading } = useAPI("business-development");

  // Default cards
  const defaultCards = [
    {
      title: "Strategic Growth Acceleration",
      text: "Focused strategies that simplify processes and strengthen business growth.",
      icon: "BarChart3",
    },
    {
      title: "Intelligent Tech Integration",
      text: "Smart tools and automation that increase efficiency and accuracy.",
      icon: "Cpu",
    },
    {
      title: "Future-Ready Innovation",
      text: "Modern ideas and automation to keep your business ahead.",
      icon: "Bot",
    },
  ];

  // Use first active item or fallback to default
  const content = businessDevData.find((item) => item.isActive) || {
    tagline: "We are Avers",
    title: "Business Development & Innovation",
    cards: defaultCards,
  };

  // Ensure cards is an array
  const cards = Array.isArray(content.cards) ? content.cards : defaultCards;

  if (loading) {
    return (
      <section className="wq-bd-wrapper">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="wq-bd-wrapper">
      <div className="wq-bd-container">
        {/* Heading */}
        <div className="wq-bd-header">
          <h3 className="wq-bd-tagline">{content.tagline}</h3>
          <h2 className="wq-bd-title">{content.title}</h2>
        </div>

        {/* Cards */}
        <div className="wq-bd-grid">
          {cards.map((card, index) => {
            const IconComponent = iconMap[card.icon] || BarChart3;
            return (
              <div className="wq-bd-card" key={index}>
                <div className="wq-bd-icon-box">
                  <IconComponent className="wq-bd-icon" />
                </div>
                <h3 className="wq-bd-card-title">{card.title}</h3>
                <p className="wq-bd-card-text">{card.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
