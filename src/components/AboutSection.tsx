"use client";

import { motion } from "framer-motion";
import { BookOpen, Briefcase, Cpu, Database, GraduationCap, Laptop, Sparkles, Users } from "lucide-react";

export default function AboutSection() {
  const focusAreas = [
    {
      title: "Full Stack Web Development",
      description: "Building modern, secure, and highly scalable web architectures with Next.js, React, and Node.",
      icon: Laptop,
      color: "text-blue-400"
    },
    {
      title: "Artificial Intelligence & ML",
      description: "Exploring machine learning models, neural networks, and generative AI integrations.",
      icon: Cpu,
      color: "text-purple-400"
    },
    {
      title: "Java DSA",
      description: "Strengthening core computer science principles through advanced data structures and algorithms.",
      icon: Database,
      color: "text-emerald-400"
    },
    {
      title: "GATE DA Preparation",
      description: "Preparing for the GATE Data Science & AI paper, covering advanced math, probability, and database theory.",
      icon: GraduationCap,
      color: "text-pink-400"
    },
    {
      title: "Educational Technology",
      description: "Creating accessible platforms and resources to empower the next generation of engineers.",
      icon: BookOpen,
      color: "text-orange-400"
    },
    {
      title: "Subject Matter Expert — Chegg India",
      description: "Served 6 months as an SME at Chegg India, solving advanced academic problems and mentoring 30+ students across CS & Math domains.",
      icon: Briefcase,
      color: "text-yellow-400"
    }
  ];

  return (
    <section id="about" className="py-24 px-6 lg:px-20 bg-gradient-to-b from-[#050505] to-gray-900/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Block: Bio Story */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6 lg:sticky lg:top-28"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs font-semibold text-purple-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get to know me</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Driven by <span className="text-gradient">Tech</span> & <span className="text-gradient">Education</span>
            </h2>
            
            <div className="text-gray-400 space-y-4 text-base md:text-lg leading-relaxed font-sans">
              <p>
                As a B.Tech Computer Science Engineering student, my journey is fueled by a dual passion for building cutting-edge software and sharing knowledge. I maintain a continuous learning mindset, always looking to explore new horizons.
              </p>
              <p>
                My core interest lies at the intersection of robust Full-Stack Development and Artificial Intelligence/Machine Learning. I love solving complex structural problems through code optimizations and algorithmic thinking.
              </p>
              <p>
                Beyond writing code, I'm deeply committed to education. I served <span className="text-yellow-400 font-semibold">6 months as a Subject Matter Expert at Chegg India</span>, where I solved academic problems and mentored <span className="text-blue-400 font-semibold">30+ students</span> across CS and Math domains.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glass-panel p-4 rounded-2xl border border-white/5 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-black text-white">30<span className="text-blue-400">+</span></p>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Students Taught</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass-panel p-4 rounded-2xl border border-white/5 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-2xl font-black text-white">6<span className="text-yellow-400">mo</span></p>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Chegg India SME</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Block: Core Focus Cards Grid */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-4">Core Focus & Expertise</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {focusAreas.map((area, index) => {
                const IconComponent = area.icon;
                return (
                  <motion.div
                    key={area.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass-panel p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center mb-4">
                      <IconComponent className={`w-5 h-5 ${area.color}`} />
                    </div>
                    <h4 className="font-bold text-white text-lg mb-2">{area.title}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed font-sans">{area.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
