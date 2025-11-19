import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useAPI } from "../../hooks/useAPI";
import "./Hero.css";
import { motion } from "framer-motion";
import carousel1 from "@/assets/images/home/carousel1.jpg";
import carousel2 from "@/assets/images/home/carousel2.jpg";
import carousel3 from "@/assets/images/home/carousel3.jpg";

export default function Hero() {
  const { data: heroData, loading } = useAPI("hero-sections");
  const [currentImage, setCurrentImage] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(0);

  // Use first active hero section or fallback to default
  const hero = heroData.find((h) => h.isActive) || {
    images: [carousel1, carousel2, carousel3],
    quotes: [
      {
        title: "Beyond Software — We Build Experiences",
        subtitle: "Crafting meaningful digital journeys for users everywhere.",
      },
      {
        title: "WisdomQuantum is",
        subtitle:
          "A software & IT solutions company crafting web, app, and digital services for the modern world.",
      },
      {
        title: "Building the Future of Digital Innovation",
        subtitle:
          "Delivering smart, scalable, and impactful technology solutions.",
      },
    ],
    ctaText: "Explore Services",
    ctaLink: "/services",
  };

  // Process images - add backend URL if needed
  const processImages = (imgs) => {
    // Check if imgs is valid array
    if (!imgs || !Array.isArray(imgs) || imgs.length === 0) {
      return [carousel1, carousel2, carousel3];
    }
    return imgs.map((img) => {
      if (typeof img === "string") {
        return img.startsWith("http") || img.startsWith("/assets")
          ? img
          : `${import.meta.env.VITE_BACKEND_URL}${img}`;
      }
      return img;
    });
  };

  const images = processImages(hero.images);

  // Process quotes with fallback
  const defaultQuotes = [
    {
      title: "Beyond Software — We Build Experiences",
      subtitle: "Crafting meaningful digital journeys for users everywhere.",
    },
    {
      title: "WisdomQuantum is",
      subtitle:
        "A software & IT solutions company crafting web, app, and digital services for the modern world.",
    },
    {
      title: "Building the Future of Digital Innovation",
      subtitle:
        "Delivering smart, scalable, and impactful technology solutions.",
    },
  ];

  const quotes =
    Array.isArray(hero.quotes) && hero.quotes.length > 0
      ? hero.quotes
      : defaultQuotes;

  // Debug
  console.log("Hero Data:", hero);
  console.log("Hero Images Raw:", hero.images);
  console.log("Hero Quotes Raw:", hero.quotes);
  console.log("Processed Images:", images);
  console.log("Processed Quotes:", quotes);

  useEffect(() => {
    if (images.length > 0) {
      const imageTimer = setInterval(
        () => setCurrentImage((prev) => (prev + 1) % images.length),
        5000
      );
      return () => clearInterval(imageTimer);
    }
  }, [images.length]);

  useEffect(() => {
    if (quotes.length > 0) {
      const quoteTimer = setInterval(
        () => setCurrentQuote((prev) => (prev + 1) % quotes.length),
        6000
      );
      return () => clearInterval(quoteTimer);
    }
  }, [quotes.length]);

  if (loading) {
    return (
      <section className="hero-root">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero-root">
      {/* Background Carousel */}
      <div className="hero-bg-container">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            src={images[currentImage]}
            alt={`Hero Slide ${currentImage + 1}`}
            className="hero-bg-image"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            onError={(e) => {
              console.log("Background image load error:", images[currentImage]);
              e.target.onerror = null;
              e.target.src = carousel1;
            }}
          />
        </AnimatePresence>
        <div className="hero-overlay"></div>
      </div>

      {/* Content */}
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="hero-left"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuote}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="hero-title">{quotes[currentQuote]?.title}</h2>
              <div className="hero-line"></div>
              <p className="hero-subtitle">{quotes[currentQuote]?.subtitle}</p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link to={hero.ctaLink} className="hero-btn">
              {hero.ctaText}
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="hero-right"
        >
          <img
            src={images[currentImage]}
            alt="Hero Visual"
            className="hero-image"
            onError={(e) => {
              console.log("Hero image load error:", images[currentImage]);
              e.target.onerror = null;
              e.target.src = carousel1;
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
