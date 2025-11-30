"use client";

import {
  Github,
  Twitter,
  Linkedin,
  Sparkles,
  Mail,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const socialLinks = [
    {
      icon: Twitter,
      href: "#",
      label: "Twitter",
      color: "hover:text-blue-400",
    },
    {
      icon: Github,
      href: "#",
      label: "GitHub",
      color: "hover:text-purple-400",
    },
    {
      icon: Linkedin,
      href: "#",
      label: "LinkedIn",
      color: "hover:text-blue-500",
    },
  ];

  const navLinks = [
    { label: "Introduction", href: "/" },
    { label: "About", href: "#about" },
    { label: "How It Works", href: "#how" },
  ];

  return (
    <footer className="relative border-t border-white/10 pt-20 pb-8 overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 mb-4">
              {/* <Sparkles className="w-6 h-6 text-blue-400" /> */}
              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                willaireplace.you
              </div>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
              Navigating the AI revolution, one profession at a time. Your
              career compass for the future of work.
            </p>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <div className="flex flex-col gap-3">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="text-zinc-400 hover:text-white transition-all text-sm flex items-center gap-2 group w-fit"
                >
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Connect With Us
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group"
                    aria-label={social.label}
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                    <div
                      className={`relative p-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/20 text-zinc-400 ${social.color} transition-all group-hover:bg-white/10 group-hover:border-white/30`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-white/5"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
            <p>
              &copy; {new Date().getFullYear()} willaireplace.you. Built with{" "}
              <span className="text-purple-400">AIove</span> for the future.
            </p>
            <div className="flex gap-6 text-xs">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
