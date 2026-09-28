"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#internships" },
  { name: "Milestones", href: "#achievements" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

    const sections = navLinks.map((link) => link.href.substring(1)).filter(Boolean);
    sections.forEach((section) => {
      const el = document.getElementById(section);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-black/85 backdrop-blur-xl border-b border-white/[0.08] py-3.5"
          : "bg-transparent py-5"
      }`}
    >
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
            <ArrowUpRight className="w-3 h-3 text-zinc-400" />
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-zinc-300 hover:text-white p-1.5 rounded-lg border border-white/[0.08] bg-zinc-900/50"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open navigation menu"
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl p-6 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center pb-6 border-b border-white/[0.08]">
              <span className="font-mono text-sm font-semibold text-white">amit.sharma_</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-400 hover:text-white p-2"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-5 my-auto">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-xl font-mono transition-colors ${
                    activeSection === link.href.substring(1) ? "text-white font-bold" : "text-zinc-400"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-zinc-500">
              <span>Open to engineering roles</span>
              <Link href="/login" className="hover:text-zinc-300">
                Staff Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
