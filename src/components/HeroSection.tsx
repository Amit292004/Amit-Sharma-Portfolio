"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, ExternalLink, MapPin, CheckCircle2 } from "lucide-react";
import Particles from "./Particles";
import ThreeDCanvas from "./ThreeDCanvas";

type ProfileProp = {
  name: string;
  role: string;
  avatarUrl: string | null;
  available: boolean;
};

export default function HeroSection({ profile }: { profile: ProfileProp }) {
  const candidateSources = [
    profile.avatarUrl,
    "/avatar.png",
    "/profile.png",
    "/profile.jpg",
  ].filter(Boolean) as string[];

  const [sourceIndex, setSourceIndex] = useState(0);
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setSourceIndex(0);
    setImgFailed(false);
  }, [profile.avatarUrl]);

  const currentSrc = candidateSources[sourceIndex] || "/avatar.png";

  const handleImageError = () => {
    if (sourceIndex < candidateSources.length - 1) {
      setSourceIndex((prev) => prev + 1);
    } else {
      setImgFailed(true);
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-16 bg-black">
      {/* Background Particles & Subtle Blue Ambient Light */}
      <Particles />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[480px] bg-[radial-gradient(ellipse_at_top,_rgba(41,151,255,0.12)_0%,_rgba(0,0,0,0)_70%)] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center z-10">
        
        {/* Left Column: Authentic Engineering Bio & Intent */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-left order-2 lg:order-1">
          
          {/* Status & Location Pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap items-center gap-2 sm:gap-3"
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
          <div className="space-y-2 sm:space-y-3">
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
              className="text-lg sm:text-2xl text-zinc-300 font-medium tracking-tight"
            >
              Software Engineer & AI/ML Developer
            </motion.p>
          </div>

          {/* Grounded Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-sm sm:text-lg text-zinc-400 max-w-xl leading-relaxed font-sans"
          >
            Computer Science Engineering student at <span className="text-white font-medium">Nagaland University</span> and former AI/ML Intern at <span className="text-white font-medium">TIH, IIT Guwahati</span>. Founder and developer of <span className="text-white font-medium">Bounce Back Academy</span> (an EdTech platform), building production-grade full-stack web platforms and applied machine learning systems, and former <span className="text-white font-medium">Subject Matter Expert at Chegg India</span>.
          </motion.p>

          {/* Clean Monochromatic Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="w-full max-w-xl p-3 sm:p-3.5 rounded-2xl bg-zinc-950/70 border border-white/[0.08] backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
          >
            <div className="grid grid-cols-3 divide-x divide-white/[0.08] items-center">
              <div className="px-1 sm:px-3 text-center">
                <p className="text-xs sm:text-base font-bold text-white font-display tracking-tight">
                  IIT Guwahati
                </p>
                <p className="text-[10px] sm:text-xs text-zinc-400 font-mono tracking-wider uppercase mt-0.5">
                  AI/ML Intern
                </p>
              </div>

              <div className="px-1 sm:px-3 text-center">
                <p className="text-xs sm:text-base font-bold text-white font-display tracking-tight">
                  8.62 CGPA
                </p>
                <p className="text-[10px] sm:text-xs text-zinc-400 font-mono tracking-wider uppercase mt-0.5">
                  B.Tech CS
                </p>
              </div>

              <div className="px-1 sm:px-3 text-center" title="Bounce Back Academy (EdTech Platform)">
                <p className="text-xs sm:text-base font-bold text-white font-display tracking-tight whitespace-nowrap">
                  Bounce Back<span className="hidden sm:inline"> Academy</span>
                </p>
                <p className="text-[10px] sm:text-xs text-zinc-400 font-mono tracking-wider uppercase mt-0.5">
                  Founder & Dev
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA Actions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 pt-2 w-full max-w-xl"
          >
            <div className="grid grid-cols-2 gap-2.5 sm:flex sm:items-center sm:gap-3 w-full sm:w-auto">
              <a
                href="#projects"
                className="interactive-tap inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 font-semibold text-xs sm:text-sm text-black bg-white hover:bg-zinc-200 rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.12)] cursor-pointer whitespace-nowrap"
              >
                <span>View Projects</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black" />
              </a>

              <a
                href="#contact"
                className="interactive-tap inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 font-medium text-xs sm:text-sm text-zinc-200 bg-white/[0.04] border border-white/[0.1] rounded-xl hover:bg-white/[0.08] hover:text-white transition-all cursor-pointer whitespace-nowrap"
              >
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-400" />
                <span>Contact Me</span>
              </a>
            </div>

            <a
              href="/api/resume"
              target="_blank"
              rel="noopener noreferrer"
              className="interactive-tap inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 font-mono text-xs font-medium text-zinc-300 bg-white/[0.04] border border-white/[0.08] hover:border-white/20 rounded-xl hover:bg-white/[0.08] hover:text-white transition-all shadow-sm cursor-pointer w-full sm:w-auto whitespace-nowrap"
              title="View & Download Resume PDF"
            >
              <span>Resume (PDF)</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
            </a>
          </motion.div>
        </div>

        {/* Right Column: Physical Profile Presentation */}
        <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative w-60 h-[300px] sm:w-72 sm:h-[360px] md:w-80 md:h-[400px]"
          >
            {/* Interactive Geometric 3D Canvas Background */}
            <div className="absolute -inset-16 sm:-inset-28 -z-20 opacity-70 pointer-events-none sm:pointer-events-auto">
              <ThreeDCanvas />
            </div>

            {/* Profile Card */}
            <div className="relative w-full h-full bg-zinc-950/90 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/[0.12] flex flex-col group transition-all duration-300 hover:border-[#2997ff]/40">
              {/* Photo */}
              <div className="flex-1 overflow-hidden relative bg-zinc-900 flex items-center justify-center">
                {!imgFailed ? (
                  <img
                    src={currentSrc}
                    alt={`${profile.name} (Amit) - Software Engineer & AI/ML Developer - Nagaland University & IIT Guwahati`}
                    onError={handleImageError}
                    className="w-full h-full object-cover object-[center_15%] filter grayscale-[10%] group-hover:grayscale-0 transition-all duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-zinc-800 to-zinc-950 text-zinc-400 p-6 text-center select-none">
                    <div className="w-20 h-20 rounded-full bg-white/[0.06] border border-white/[0.1] flex items-center justify-center mb-3">
                      <span className="text-2xl font-bold font-display text-white">AS</span>
                    </div>
                    <p className="text-xs font-mono text-zinc-400">{profile.name}</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90 pointer-events-none" />
              </div>

              {/* Bottom metadata strip */}
              <div className="px-4 sm:px-5 py-3 sm:py-3.5 bg-black/95 border-t border-white/[0.08] flex items-center justify-between">
                <div className="min-w-0 pr-2">
                  <p className="font-semibold text-white text-xs sm:text-sm tracking-tight flex items-center gap-1.5 font-display truncate">
                    <span>{profile.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2997ff] inline flex-shrink-0" />
                  </p>
                  <p className="text-[11px] text-zinc-400 font-mono truncate">{profile.role || "B.Tech CS"}</p>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className={`inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono ${
                    profile.available !== false
                      ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                      : "text-amber-400 bg-amber-500/10 border-amber-500/20"
                  } px-2 py-0.5 rounded-full border`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${profile.available !== false ? "bg-emerald-400" : "bg-amber-400"}`} />
                    {profile.available !== false ? "Open" : "Busy"}
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
