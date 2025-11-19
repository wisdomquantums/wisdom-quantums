import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LogIn,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/images/logo1.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { login } = useAuth();

  // Mouse move effect for 3D tilt
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login(email, password);
    setLoading(false);
  };

  // Floating particles animation
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 10,
  }));

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.15),rgba(0,0,0,0))]"></div>

      {/* Animated Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/20 backdrop-blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - 3D Animated Graphics */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* 3D Floating Card */}
              <motion.div
                animate={{
                  rotateY: mousePosition.x,
                  rotateX: -mousePosition.y,
                }}
                transition={{ type: "spring", stiffness: 100 }}
                className="relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Main 3D Card */}
                <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-cyan-500/30 shadow-2xl">
                  <div className="space-y-6">
                    {/* Animated Logo */}
                    <motion.div
                      animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="flex justify-center"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-2xl blur-2xl opacity-60 animate-pulse"></div>
                        <div className="relative bg-white p-6 rounded-2xl border-2 border-cyan-400/50 shadow-2xl">
                          <img
                            src={logo}
                            alt="WisdomQuantums Logo"
                            className="w-20 h-20 object-contain"
                          />
                        </div>
                      </div>
                    </motion.div>

                    <div className="text-center space-y-4">
                      <h2 className="text-4xl font-bold text-white">
                        Welcome Back
                      </h2>
                      <p className="text-white/70 text-lg">
                        Secure Admin Access Portal
                      </p>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-2 gap-4 mt-8">
                      {[
                        {
                          icon: Sparkles,
                          text: "Advanced Security",
                          color: "from-cyan-500 to-blue-600",
                        },
                        {
                          icon: Zap,
                          text: "Lightning Fast",
                          color: "from-purple-500 to-purple-600",
                        },
                        {
                          icon: Shield,
                          text: "Protected Data",
                          color: "from-green-500 to-emerald-600",
                        },
                        {
                          icon: LogIn,
                          text: "Easy Access",
                          color: "from-cyan-400 to-cyan-600",
                        },
                      ].map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 + 0.5 }}
                          whileHover={{ scale: 1.05, y: -5 }}
                          className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-cyan-500/20 hover:border-cyan-400/50 transition-all"
                        >
                          <div
                            className={`bg-gradient-to-br ${feature.color} p-2 rounded-lg w-fit mb-2`}
                          >
                            <feature.icon className="w-5 h-5 text-white" />
                          </div>
                          <p className="text-slate-200 text-sm font-medium">
                            {feature.text}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-6 -right-6 bg-gradient-to-br from-cyan-500 to-purple-600 p-4 rounded-2xl shadow-2xl border border-cyan-400/50"
                  style={{ transform: "translateZ(50px)" }}
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute -bottom-6 -left-6 bg-gradient-to-br from-cyan-400 to-blue-600 p-4 rounded-2xl shadow-2xl border border-cyan-400/50"
                  style={{ transform: "translateZ(50px)" }}
                >
                  <Zap className="w-8 h-8 text-white" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-slate-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 md:p-12 border border-cyan-500/30"
            >
              {/* Logo/Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="inline-flex items-center justify-center mb-6"
                >
                  {/* WisdomQuantums Logo */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-2xl blur-xl opacity-60 animate-pulse"></div>
                    <div className="relative bg-white p-4 rounded-2xl border-2 border-cyan-400/50 shadow-2xl">
                      <img
                        src={logo}
                        alt="WisdomQuantums Logo"
                        className="w-24 h-24 object-contain"
                      />
                    </div>
                  </div>
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl font-bold text-white mb-2"
                >
                  Admin Panel
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-white/70 text-lg"
                >
                  WisdomQuantums Solutions
                </motion.p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-cyan-500/20 rounded-xl text-slate-200 placeholder-slate-400 focus:bg-slate-900 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none transition-all backdrop-blur-sm"
                      placeholder="info@wisdomquantums.com"
                      required
                    />
                  </div>
                </motion.div>

                {/* Password */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-14 py-4 bg-slate-900/50 border border-cyan-500/20 rounded-xl text-slate-200 placeholder-slate-400 focus:bg-slate-900 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none transition-all backdrop-blur-sm"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="relative w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-cyan-500/50 overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white relative z-10"></div>
                      <span className="relative z-10">Logging in...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5 relative z-10" />
                      <span className="relative z-10">Login to Dashboard</span>
                    </>
                  )}
                </motion.button>
              </form>

              {/* Footer Text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-center text-slate-400 text-sm mt-6"
              >
                Secured by WisdomQuantums © 2025
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
    </div>
  );
}
