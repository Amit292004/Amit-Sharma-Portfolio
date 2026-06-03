"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Achievements", href: "#achievements" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-[#050505]/80 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black tracking-tighter text-white">
          AMIT<span className="text-blue-500">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              {link.name}
            </a>
          ))}
          <Link href="/admin" className="text-sm font-bold text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors border border-white/10">
            Admin Login
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-[#050505] p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-black text-white">AMIT<span className="text-blue-500">.</span></span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white"><X className="w-8 h-8" /></button>
            </div>
            <nav className="flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium text-gray-300 hover:text-white">
                  {link.name}
                </a>
              ))}
              <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-blue-400 mt-4">
                Admin Area
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
