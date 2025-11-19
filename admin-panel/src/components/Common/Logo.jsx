import { motion } from "framer-motion";

export default function Logo({
  size = "md",
  animated = false,
  className = "",
}) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  if (animated) {
    return (
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
        className={`relative ${className}`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl blur-lg opacity-50 animate-pulse"></div>
        <div className="relative bg-black/80 backdrop-blur-sm p-2 rounded-xl border-2 border-red-500/50 shadow-2xl">
          <img
            src="/images/logo.png"
            alt="WisdomQuantums Logo"
            className={`${sizes[size]} object-contain`}
          />
        </div>
      </motion.div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg blur-md opacity-50"></div>
      <div className="relative bg-black/80 p-2 rounded-lg border border-red-500/50">
        <img
          src="/images/logo.png"
          alt="WisdomQuantums Logo"
          className={`${sizes[size]} object-contain`}
        />
      </div>
    </div>
  );
}
