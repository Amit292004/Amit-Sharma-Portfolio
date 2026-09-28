"use client";

import { motion } from "framer-motion";
import { Laptop, Cpu, Database, BookOpen, Briefcase, ArrowUpRight } from "lucide-react";

export default function AboutSection() {
  const engineeringDisciplines = [
    {
      title: "Full-Stack Web Engineering",
      detail: "Building responsive, production-ready web apps with Next.js, React 19, TypeScript, and modern CSS architectures.",
      icon: Laptop,
      badge: "Core Stack",
    },
    {
      title: "Applied Machine Learning & AI",
      detail: "Implementing ML algorithms, working with Python data science stacks, and integrating generative models into practical applications.",
      icon: Cpu,
      badge: "Research & Applied",
    },
    {
      title: "Data Structures & Algorithms",
      detail: "Deep foundational practice with Java and C++ tackling graph algorithms, dynamic programming, and systems performance.",
      icon: Database,
      badge: "Core CS",
    },
    {
      title: "STEM Tutoring & Mentorship",
      detail: "Taught 30+ students across grades 1–12 in Physics, Chemistry, and Mathematics for CBSE & State boards.",
      icon: BookOpen,
      badge: "Mentorship",
    },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-16 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Bio & Track Record */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-400">
              <span>01 // BACKGROUND</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display leading-tight">
              Engineering with a focus on fundamentals and clarity.
            </h2>

            <div className="text-zinc-400 space-y-4 text-base leading-relaxed font-sans">
              <p>
                I am a Computer Science undergraduate focused on practical full-stack software development and intelligent web applications.
              </p>
              <p>
                My projects center on building dependable web software: designing relational database models, writing type-safe TypeScript interfaces, and exploring machine learning workflows.
              </p>
              <p>
                Outside of coding, I've spent substantial time in technical education: tutoring over <span className="text-white font-semibold">30 students</span> in secondary STEM coursework, and serving <span className="text-white font-semibold">6 months as a Subject Matter Expert at Chegg India</span> diagnosing advanced academic problems.
              </p>
            </div>

            {/* Clean Monochromatic Metrics Row */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="p-4 rounded-2xl bg-zinc-950 border border-white/[0.08]">
                <p className="text-2xl font-bold text-white font-display tracking-tight">30<span className="text-[#2997ff]">+</span></p>
                <p className="text-[11px] text-zinc-500 mt-1 uppercase tracking-wider font-mono">Students Mentored</p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950 border border-white/[0.08]">
                <p className="text-2xl font-bold text-white font-display tracking-tight">6<span className="text-[#2997ff]">mo</span></p>
                <p className="text-[11px] text-zinc-500 mt-1 uppercase tracking-wider font-mono">Chegg SME</p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950 border border-white/[0.08]">
                <p className="text-2xl font-bold text-white font-display tracking-tight">8.62</p>
                <p className="text-[11px] text-zinc-500 mt-1 uppercase tracking-wider font-mono">Degree CGPA</p>
              </div>
            </div>
          </div>

          {/* Right Column: Focus Disciplines */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">Core Disciplines & Focus</span>
              <span className="text-xs text-zinc-400 font-mono">4 Areas</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {engineeringDisciplines.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="group relative p-6 rounded-2xl bg-zinc-950/80 border border-white/[0.08] hover:border-[#2997ff]/30 hover:bg-zinc-900/50 transition-all duration-200 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 group-hover:text-white transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/[0.04] text-zinc-400 border border-white/[0.06]">
                          {item.badge}
                        </span>
                      </div>

                      <h3 className="font-semibold text-white text-base mb-2 group-hover:text-[#2997ff] transition-colors font-display">
                        {item.title}
                      </h3>

                      <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                        {item.detail}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center text-xs text-zinc-500 font-mono group-hover:text-zinc-400 transition-colors">
                      <span>Applied in projects</span>
                      <ArrowUpRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-[#2997ff]" />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Experience Footnote Card */}
            <div className="p-5 rounded-2xl bg-zinc-950/60 border border-white/[0.08] flex items-start gap-4 mt-6">
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 shrink-0 mt-0.5">
                <Briefcase className="w-4 h-4" />
              </div>
              <div className="text-xs text-zinc-400 leading-relaxed">
                <span className="font-semibold text-white font-sans">Community & Leadership:</span> Also served as an Internshala Student Ambassador, conducting technical awareness drives and sharing learning roadmaps with peers.
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
