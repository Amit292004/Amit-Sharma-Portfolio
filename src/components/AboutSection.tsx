"use client";

import { motion } from "framer-motion";
import { BookOpen, Briefcase, Cpu, Database, Laptop, Sparkles, Users } from "lucide-react";
import SpotlightCard from "./SpotlightCard";




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
    },
    {
      title: "Student Ambassador — Internshala",
      description: "Promoted internship and learning opportunities to a student community, strengthening outreach and communication skills.",
      icon: Users,
      color: "text-blue-400"
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-20 bg-gradient-to-b from-[#050505] to-gray-900/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
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
                As a <span className="text-blue-400 font-semibold">B.Tech Computer Science Engineering</span> student, my journey is fueled by a dual passion for building <span className="text-purple-400 font-semibold">cutting-edge software</span> and <span className="text-yellow-400 font-semibold">sharing knowledge</span>. I maintain a <span className="text-emerald-400 font-semibold">continuous learning mindset</span>, always looking to explore new horizons.
              </p>
              <p>
                My core interest lies at the intersection of <span className="text-blue-400 font-semibold">robust Full-Stack Development</span> and <span className="text-purple-400 font-semibold">Artificial Intelligence / Machine Learning</span>. I love solving <span className="text-pink-400 font-semibold">complex structural problems</span> through <span className="text-emerald-400 font-semibold">code optimizations</span> and <span className="text-orange-400 font-semibold">algorithmic thinking</span>.
              </p>
              <p>
                Beyond writing code, I'm deeply committed to education. I have personally taught <span className="text-blue-400 font-semibold">30+ students</span> from <span className="text-white font-semibold">Class 1–12</span> in <span className="text-purple-400 font-semibold">Maths, Physics & Chemistry</span>, covering both <span className="text-white font-semibold">CBSE and State Board</span> curricula. Additionally, I served <span className="text-yellow-400 font-semibold">6 months as a Subject Matter Expert at Chegg India</span>, solving advanced academic problems online.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-2">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="h-full"
              >
                <SpotlightCard className="glass-panel p-3 sm:p-4 rounded-2xl border border-white/5 flex items-center gap-2 sm:gap-3 h-full">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-lg sm:text-2xl font-black text-white">30<span className="text-blue-400">+</span></p>
                    <p className="text-[10px] sm:text-xs text-gray-500 font-semibold uppercase tracking-wide">Class 1–12 Taught</p>
                  </div>
                </SpotlightCard>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-full"
              >
                <SpotlightCard className="glass-panel p-3 sm:p-4 rounded-2xl border border-white/5 flex items-center gap-2 sm:gap-3 h-full">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center shrink-0">
                    <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-lg sm:text-2xl font-black text-white">6<span className="text-yellow-400">mo</span></p>
                    <p className="text-[10px] sm:text-xs text-gray-500 font-semibold uppercase tracking-wide">Chegg India SME</p>
                  </div>
                </SpotlightCard>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="h-full"
              >
                <SpotlightCard className="glass-panel p-3 sm:p-4 rounded-2xl border border-white/5 flex items-center gap-2 sm:gap-3 h-full">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-lg sm:text-2xl font-black text-white">8.47<span className="text-emerald-400 text-xs sm:text-sm font-bold"> GPA</span></p>
                    <p className="text-[10px] sm:text-xs text-gray-500 font-semibold uppercase tracking-wide">CGPA</p>
                  </div>
                </SpotlightCard>
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
                    className="h-full"
                  >
                    <SpotlightCard className="glass-panel p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 h-full flex flex-col">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center mb-4">
                        <IconComponent className={`w-5 h-5 ${area.color}`} />
                      </div>
                      <h4 className="font-bold text-white text-lg mb-2">{area.title}</h4>
                      <p className="text-sm text-gray-400 leading-relaxed font-sans flex-1">{area.description}</p>
                    </SpotlightCard>
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
