"use client";

import { motion } from "framer-motion";
import { GraduationCap, Trophy } from "lucide-react";

type Achievement = {
  id: string;
  title: string;
  description: string;
  date: string;
};

type Course = {
  id: string;
  title: string;
  institution: string;
  dateCompleted: string;
};

interface TimelineProps {
  achievements: Achievement[];
  courses: Course[];
}

export default function TimelineSection({ achievements, courses }: TimelineProps) {
  return (
    <section id="achievements" className="py-24 px-4 sm:px-6 lg:px-16 bg-[#07080c]">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Heading */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-mono text-sky-400">
            <span>04 // TRACK RECORD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
            Honors, Competitions & Coursework
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl">
            Verified academic milestones, competitive programming awards, and specialized technical training.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Achievements Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-white/[0.08]">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Trophy className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight font-display">Key Honors & Competitions</h3>
            </div>

            <div className="space-y-4">
              {achievements.length > 0 ? (
                achievements.map((item, idx) => (
                  <motion.div
                    key={item.id || idx}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.08 }}
                    className="p-5 rounded-2xl bg-[#0c101d]/75 border border-white/[0.08] hover:border-amber-500/30 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
                  >
                    <div className="flex items-baseline justify-between gap-3 mb-2">
                      <h4 className="font-semibold text-white text-base tracking-tight font-display">{item.title}</h4>
                      <span className="text-xs font-mono text-amber-300 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                        {item.date}
                      </span>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed font-sans">{item.description}</p>
                  </motion.div>
                ))
              ) : (
                <p className="text-slate-500 text-sm font-mono">No achievements listed yet.</p>
              )}
            </div>
          </div>

          {/* Courses & Training Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-white/[0.08]">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight font-display">Focused Technical Coursework</h3>
            </div>

            <div className="space-y-4">
              {courses.length > 0 ? (
                courses.map((item, idx) => (
                  <motion.div
                    key={item.id || idx}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.08 }}
                    className="p-5 rounded-2xl bg-[#0c101d]/75 border border-white/[0.08] hover:border-sky-500/30 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
                  >
                    <div className="flex items-baseline justify-between gap-3 mb-1.5">
                      <h4 className="font-semibold text-white text-base tracking-tight font-display">{item.title}</h4>
                      <span className="text-xs font-mono text-sky-300 px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20">{item.dateCompleted}</span>
                    </div>
                    <p className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                      <span>Institution:</span>
                      <span className="text-slate-300">{item.institution}</span>
                    </p>
                  </motion.div>
                ))
              ) : (
                <p className="text-slate-500 text-sm font-mono">No courses listed yet.</p>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
