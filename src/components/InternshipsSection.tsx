"use client";

import { motion } from "framer-motion";
import { Briefcase, ExternalLink, Calendar, Building2 } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

type Internship = {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  certificateUrl?: string | null;
};

export default function InternshipsSection({ internships }: { internships: Internship[] }) {
  if (!internships || internships.length === 0) return null;

  return (
    <section id="internships" className="py-20 px-4 sm:px-6 lg:px-20 max-w-5xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-gray-300 mb-4">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Work Experience</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
          My <span className="text-gradient">Internships</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Professional experiences where I applied my skills, built real-world solutions, and learned from industry experts.
        </p>
      </motion.div>

      <div className="relative border-l border-white/10 ml-4 md:ml-8 space-y-12">
        {internships.map((internship, i) => (
          <motion.div
            key={internship.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative pl-8 md:pl-12 group"
          >
            {/* Timeline dot */}
            <div className="absolute -left-[6px] md:-left-[7px] top-1.5 w-3 h-3 md:w-3.5 md:h-3.5 bg-blue-500 rounded-full ring-4 ring-[#050505] group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            
            <SpotlightCard className="glass-panel p-6 md:p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-all bg-white/[0.02] group-hover:bg-white/[0.03]">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                    {internship.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-purple-400" />
                      {internship.company}
                    </span>
                    <span className="hidden md:inline text-gray-600">•</span>
                    <span className="flex items-center gap-1.5 text-blue-300">
                      <Calendar className="w-4 h-4" />
                      {internship.duration}
                    </span>
                  </div>
                </div>
                
                {internship.certificateUrl && (
                  <a
                    href={internship.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all shadow-lg hover:shadow-white/5 whitespace-nowrap"
                  >
                    View Certificate
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
              
              <div className="text-gray-400 leading-relaxed text-sm md:text-base whitespace-pre-line">
                {internship.description}
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
