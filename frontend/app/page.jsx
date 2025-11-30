"use client";

import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import UpdatedSections from "./components/WhyItExists";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      {/* <Navbar /> */}
      <HeroSection />

      <UpdatedSections />

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/20 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60"
          >
            Discover your future in 2030
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto"
          >
            The best time to prepare for the AI revolution was yesterday. The
            second best time is now.
          </motion.p>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="relative group hover:cursor-pointer bg-white text-black px-10 py-4 rounded-xl font-semibold overflow-hidden flex items-center gap-2 mx-auto text-lg shadow-lg hover:scale-105 duration-400"
          >
            {/* Text a ikona */}
            <span className="relative z-10 flex items-center gap-2">
              Start Analysis
              <ArrowRight className="w-5 h-5" />
            </span>
          </motion.button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
