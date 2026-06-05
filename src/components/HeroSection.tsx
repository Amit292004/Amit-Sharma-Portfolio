"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, Sparkles, Eye } from "lucide-react";

type ProfileProp = {
  name: string;
  role: string;
  avatarUrl: string | null;
  available: boolean;
};

export default function HeroSection({ profile }: { profile: ProfileProp }) {
  const words = [
    "Full Stack Developer",
    "AI & ML Enthusiast",
    "Computer Science Student",
    "Educator & Content Creator"
  ];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
      setText(words[index].substring(0, subIndex));
    }, reverse ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [subIndex, reverse, index]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4 sm:px-6 lg:px-20 bg-[#050505]">
      {/* Background Gradients */}
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#050505] to-[#050505] -z-10" />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[160px] -z-10 animate-pulse"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.08, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600 rounded-full blur-[140px] -z-10"
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        {/* Left Column: Bio & Info */}
        <div className="lg:col-span-7 space-y-6 text-left order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome to my universe</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-2"
          >
            <h2 className="text-sm md:text-xl font-medium text-gray-400 tracking-wide uppercase">
              Hello, I am
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black leading-none tracking-tighter text-white">
              {profile.name}<span className="text-blue-500">.</span>
            </h1>
            
            {/* Typewriter wrapper with min-height to avoid layout shifting */}
            <div className="min-h-[40px] md:min-h-[48px] flex items-center">
              <p className="text-xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {text}
                <span className="inline-block w-1.5 h-6 md:h-8 bg-purple-400 ml-1.5 animate-pulse">|</span>
              </p>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-base md:text-lg text-gray-400 max-w-xl leading-relaxed font-sans"
          >
            A <span className="text-blue-400 font-semibold">B.Tech Computer Science Engineering</span> Student. <span className="text-purple-400 font-semibold">Developer</span>, <span className="text-yellow-400 font-semibold">educator</span>, <span className="text-pink-400 font-semibold">content creator</span>, and <span className="text-emerald-400 font-semibold">problem solver</span>. Driven by curiosities in <span className="text-blue-400 font-semibold">Full Stack Web Development</span> and <span className="text-purple-400 font-semibold">AI/ML</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-3 pt-4"
          >
            <a 
              href="#projects" 
              className="group relative inline-flex items-center justify-center px-5 py-3 font-bold text-white transition-all duration-300 bg-blue-600 border border-transparent rounded-2xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 focus:outline-none overflow-hidden cursor-pointer text-sm"
            >
              <span className="mr-2">View Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a 
              href="#contact" 
              className="group inline-flex items-center justify-center px-5 py-3 font-bold text-white transition-all duration-300 bg-transparent border border-white/10 rounded-2xl hover:bg-white/5 focus:outline-none glass-panel cursor-pointer text-sm"
            >
              <Mail className="w-4 h-4 mr-2" />
              <span>Contact Me</span>
            </a>

            <a 
              href="/api/resume" 
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center px-5 py-3 font-bold text-white transition-all duration-300 bg-transparent border border-white/10 rounded-2xl hover:bg-white/5 focus:outline-none glass-panel cursor-pointer text-sm"
            >
              <Eye className="w-4 h-4 mr-2" />
              <span>View Resume</span>
            </a>

            <a 
              href="/api/resume" 
              download
              className="group inline-flex items-center justify-center px-5 py-3 font-bold text-gray-300 transition-all duration-300 bg-transparent rounded-2xl hover:text-white cursor-pointer text-sm"
            >
              <Download className="w-4 h-4 mr-2 group-hover:translate-y-0.5 transition-transform" />
              <span>Download Resume</span>
            </a>
          </motion.div>
        </div>

        {/* Right Column: Premium Profile Photo */}
        <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-52 h-[260px] sm:w-64 sm:h-[320px] md:w-72 md:h-[360px] lg:w-80 lg:h-[420px]"
          >
            {/* Outer glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-30 animate-pulse" />

            {/* Spinning gradient ring */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-[3px] bg-gradient-to-tr from-blue-500 via-purple-400 to-pink-500 rounded-3xl -z-10 opacity-80"
            />

            {/* Card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full bg-[#0d0d0d] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col"
            >
              {/* Photo — fills top 80% */}
              <div className="flex-1 overflow-hidden">
                <img
                  src={profile.avatarUrl || "/profile.jpg"}
                  alt={profile.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Info bar at bottom */}
              <div className="px-5 py-4 bg-black/60 backdrop-blur-md border-t border-white/10 flex items-center justify-between">
                <div>
                  <p className="font-extrabold text-white text-sm tracking-tight">{profile.name}</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{profile.role}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${profile.available ? "bg-green-400 animate-ping" : "bg-red-500"}`} />
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${profile.available ? "text-green-400" : "text-red-400"}`}>
                    {profile.available ? "Available" : "Busy"}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
