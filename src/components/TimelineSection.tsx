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
    <section id="achievements" className="py-24 px-6 lg:px-20 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Milestones & <span className="text-gradient">Education</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">A journey of continuous learning and striving for excellence.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Achievements Timeline */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Trophy className="w-8 h-8 text-blue-500" />
              <h3 className="text-2xl font-bold">Top Achievements</h3>
            </div>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-800 before:to-transparent">
              {achievements.length > 0 ? achievements.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-700 bg-[#050505] text-blue-500 shadow shrink-0 z-10 glass-panel">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl glass-panel group-hover:border-blue-500/30 transition-colors">
                    <div className="flex items-center justify-between space-x-2 mb-1">
                      <div className="font-bold text-white">{item.title}</div>
                      <time className="font-mono text-xs text-blue-400">{item.date}</time>
                    </div>
                    <div className="text-sm text-gray-400">{item.description}</div>
                  </div>
                </motion.div>
              )) : (
                <p className="text-gray-500 ml-12">No achievements added yet.</p>
              )}
            </div>
          </div>

          {/* Courses Timeline */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="w-8 h-8 text-purple-500" />
              <h3 className="text-2xl font-bold">Certifications & Courses</h3>
            </div>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-800 before:to-transparent">
              {courses.length > 0 ? courses.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-700 bg-[#050505] text-purple-500 shadow shrink-0 z-10 glass-panel">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl glass-panel group-hover:border-purple-500/30 transition-colors">
                    <div className="flex items-center justify-between space-x-2 mb-1">
                      <div className="font-bold text-white">{item.title}</div>
                      <time className="font-mono text-xs text-purple-400">{item.dateCompleted}</time>
                    </div>
                    <div className="text-sm text-gray-400">{item.institution}</div>
                  </div>
                </motion.div>
              )) : (
                <p className="text-gray-500 ml-12">No courses added yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
