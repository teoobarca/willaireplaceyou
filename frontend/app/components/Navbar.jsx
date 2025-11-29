import { useState, useEffect } from "react";
import { User, TrendingUp, Home, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Background with blur only when scrolled */}
      <div 
        className={`absolute inset-0 ${
          scrolled ? "bg-black/60 backdrop-blur-2xl" : "bg-transparent"
        } border-b border-white/20 transition-all duration-300`}
      ></div>

      {/* Gradient glow effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-20 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            opacity: [0.1, 0.15, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -top-20 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 h-20 flex items-center justify-between relative z-10">
        {/* Logo with gradient and glow */}
        <Link href="/" className="relative group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Sparkles className="w-5 h-5 text-blue-400 relative z-10" />
            <span id="intro" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 relative z-10">
              Unreplaceable.ai
            </span>
          </motion.div>
        </Link>

        {/* Navigation Links with glassmorphism */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          <div className="flex items-center gap-3">
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/20 text-sm text-zinc-300 hover:bg-white/10 hover:border-white/30 transition-all shadow-lg group"
              >
                <Home className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
                <span>Home</span>
              </motion.div>
            </Link>
          </div>
        </motion.button>
      </div>
    </motion.nav>
  );
}