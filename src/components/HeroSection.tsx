"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, ExternalLink, MapPin, CheckCircle2 } from "lucide-react";
import Particles from "./Particles";
import ThreeDCanvas from "./ThreeDCanvas";

type ProfileProp = {
  name: string;
  role: string;
  avatarUrl: string | null;
  available: boolean;
};

export default function HeroSection({ profile }: { profile: ProfileProp }) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-28 pb-20 px-4 sm:px-6 lg:px-16 bg-black">
      {/* Background Particles & Subtle Blue Ambient Light */}
      <Particles />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[480px] bg-[radial-gradient(ellipse_at_top,_rgba(41,151,255,0.12)_0%,_rgba(0,0,0,0)_70%)] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10">
        
        {/* Left Column: Authentic Engineering Bio & Intent */}
        <div className="lg:col-span-7 space-y-7 text-left order-2 lg:order-1">
          
          {/* Status & Location Pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap items-center gap-3"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono font-medium text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for engineering roles</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-400">
              <MapPin className="w-3.5 h-3.5 text-zinc-400" />
              <span>India · UTC+5:30</span>
            </div>
          </motion.div>

          {/* Name & Title */}
          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white font-display"
            >
              {profile.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl sm:text-2xl text-zinc-300 font-medium tracking-tight"
            >
              Software Engineer & Computer Science Student
            </motion.p>
          </div>

          {/* Grounded Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed font-sans"
          >
            Building full-stack web applications and exploring applied machine learning.
            Winner of the <span className="text-white font-medium">Techaura 2025 Death Race</span> competition, 
            former <span className="text-white font-medium">Subject Matter Expert at Chegg India</span>, and 
            focused on writing clean, high-performance software.
          </motion.p>

          {/* Clean Monochromatic Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="grid grid-cols-3 gap-6 pt-3 pb-4 border-y border-white/[0.08] max-w-lg"
          >
            <div>
              <p className="text-xl sm:text-2xl font-bold text-white font-display tracking-tight">1st Place</p>
              <p className="text-[11px] text-zinc-500 uppercase tracking-wider font-mono mt-0.5">Techaura '25</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-white font-display tracking-tight">8.47</p>
              <p className="text-[11px] text-zinc-500 uppercase tracking-wider font-mono mt-0.5">B.Tech CGPA</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-white font-display tracking-tight">30+ Taught</p>
              <p className="text-[11px] text-zinc-500 uppercase tracking-wider font-mono mt-0.5">STEM Students</p>
            </div>
          </motion.div>

          {/* CTA Actions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <a
              href="#projects"
              className="interactive-tap inline-flex items-center justify-center gap-2 px-5 py-3 font-semibold text-sm text-black bg-white hover:bg-zinc-200 rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.12)] cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </a>

            <a
              href="#contact"
              className="interactive-tap inline-flex items-center justify-center gap-2 px-5 py-3 font-medium text-sm text-zinc-200 bg-white/[0.04] border border-white/[0.1] rounded-xl hover:bg-white/[0.08] hover:text-white transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4 text-zinc-400" />
              <span>Contact Me</span>
            </a>

            <div className="flex items-center gap-1.5 pl-1">
              <a
                href="/api/resume"
                target="_blank"
                rel="noopener noreferrer"
                className="interactive-tap inline-flex items-center justify-center gap-1.5 px-3.5 py-3 text-xs font-mono font-medium text-zinc-400 hover:text-white transition-colors"
                title="View Resume"
              >
                <span>Resume</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="/api/resume"
                download
                className="interactive-tap p-3 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/[0.04]"
                title="Download Resume PDF"
              >
                <Download className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Physical Profile Presentation */}
        <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative w-64 h-[320px] sm:w-72 sm:h-[360px] md:w-80 md:h-[400px]"
          >
            {/* Interactive Geometric 3D Canvas Background */}
            <div className="absolute -inset-20 sm:-inset-28 -z-20 opacity-70 pointer-events-auto">
              <ThreeDCanvas />
            </div>

            {/* Profile Card */}
            <div className="relative w-full h-full bg-zinc-950/90 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/[0.12] flex flex-col group transition-all duration-300 hover:border-[#2997ff]/40">
              {/* Photo */}
              <div className="flex-1 overflow-hidden relative bg-zinc-900">
                <img
                  src={profile.avatarUrl || "/profile.jpg"}
                  alt={profile.name}
                  className="w-full h-full object-cover object-top filter grayscale-[15%] group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90" />
              </div>

              {/* Bottom metadata strip */}
              <div className="px-5 py-3.5 bg-black/95 border-t border-white/[0.08] flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white text-sm tracking-tight flex items-center gap-1.5 font-display">
                    {profile.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2997ff] inline" />
                  </p>
                  <p className="text-[11px] text-zinc-400 font-mono">B.Tech CS Engineering</p>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Open
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
