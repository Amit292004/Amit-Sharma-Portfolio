"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, ChevronRight, Lock } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#internships" },
  { name: "Milestones", href: "#achievements" },
  { name: "Contact", href: "#contact" },
];

const mobileNavLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#internships" },
  { name: "Milestones", href: "#achievements" },
  { name: "Certifications", href: "#certifications" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );

    const sections = mobileNavLinks.map((link) => link.href.substring(1)).filter(Boolean);
    sections.forEach((section) => {
      const el = document.getElementById(section);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="absolute top-0 left-0 w-full z-40 bg-transparent py-4 sm:py-5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-16 flex items-center justify-between">
        
        {/* Clean Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <span className="font-mono text-sm font-semibold tracking-tight text-white group-hover:text-zinc-300 transition-colors">
            amit.sharma<span className="text-[#2997ff] font-bold">_</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-950/80 p-1 rounded-full border border-white/[0.08] backdrop-blur-xl shadow-lg">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                className="relative px-3.5 py-1.5 text-xs font-mono tracking-tight transition-colors z-10"
                style={{ color: isActive ? "#ffffff" : "#a1a1aa" }}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-nav-pill"
                    className="absolute inset-0 bg-white/[0.12] rounded-full -z-10 border border-white/[0.08]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10 hover:text-white transition-colors">{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            className="interactive-tap inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-zinc-200 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] transition-all shadow-sm"
          >
            <span>Let&apos;s talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-zinc-300 hover:text-white p-2 rounded-xl border border-white/[0.08] bg-zinc-950/80 backdrop-blur-md transition-colors"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open navigation menu"
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* Modern High-End Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            data-lenis-prevent
            className="fixed inset-0 z-50 h-[100dvh] w-full bg-black/95 backdrop-blur-2xl flex flex-col justify-between overflow-hidden select-none"
          >
            {/* Top Bar */}
            <div className="flex justify-between items-center px-5 py-3.5 border-b border-white/[0.08] bg-zinc-950/80 shrink-0">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono text-sm font-semibold tracking-tight text-white flex items-center gap-1.5"
              >
                <span>amit.sharma</span>
                <span className="text-[#2997ff] font-bold">_</span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Menu Links */}
            <div className="px-5 py-2.5 flex-1 flex flex-col justify-center max-w-sm mx-auto w-full min-h-0">
              <div className="flex items-center justify-between px-1 mb-1 shrink-0">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  Menu Sections
                </span>
                <span className="text-[10px] font-mono text-zinc-600">
                  07 Total
                </span>
              </div>

              <nav className="space-y-1.5 shrink-0 max-h-[calc(100dvh-170px)] overflow-y-auto">
                {mobileNavLinks.map((link, idx) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.02 + 0.02 }}
                      className={`group flex items-center justify-between px-3.5 py-2 sm:py-2.5 rounded-xl border transition-all ${
                        isActive
                          ? "bg-white/[0.08] border-white/20 text-white font-medium shadow-[0_2px_12px_rgba(255,255,255,0.04)]"
                          : "bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.06] hover:border-white/10 text-zinc-300"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`text-[11px] font-mono font-medium ${isActive ? "text-[#2997ff]" : "text-zinc-500 group-hover:text-zinc-400"}`}>
                          0{idx + 1}
                        </span>
                        <span className="text-sm font-medium font-sans">
                          {link.name}
                        </span>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 ${isActive ? "text-[#2997ff]" : "text-zinc-600 group-hover:text-zinc-400"}`} />
                    </motion.a>
                  );
                })}
              </nav>

              {/* Quick Direct CTA Button */}
              <div className="pt-2 shrink-0">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold text-xs transition-all shadow-md cursor-pointer font-sans"
                >
                  <span>Initiate Contact</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Bottom Status & Staff Login */}
            <div className="px-5 py-3 border-t border-white/[0.08] bg-zinc-950/70 flex items-center justify-between text-[11px] font-mono max-w-sm mx-auto w-full shrink-0 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <div className="flex items-center gap-2 text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Open to Opportunities</span>
              </div>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1.5"
              >
                <Lock className="w-3 h-3 text-zinc-600" />
                <span>Admin Login</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
