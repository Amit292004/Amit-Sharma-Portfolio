"use client";

import { motion } from "framer-motion";
import { ExternalLink, Calendar, Building2 } from "lucide-react";

type Internship = {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  certificateUrl?: string | null;
};

const DEFAULT_INTERNSHIPS: Internship[] = [
  {
    id: "int-1",
    role: "Subject Matter Expert (CS & STEM)",
    company: "Chegg India",
    duration: "6 Months",
    description: "Evaluated and resolved advanced Computer Science and Mathematics academic queries with detailed, step-by-step technical problem solving and high student satisfaction metrics.",
    certificateUrl: null,
  },
  {
    id: "int-2",
    role: "Student Ambassador",
    company: "Internshala",
    duration: "3 Months",
    description: "Led student outreach initiatives, organized career readiness and tech education drives, and guided peers toward practical internship pathways.",
    certificateUrl: null,
  }
];

export default function InternshipsSection({ internships }: { internships: Internship[] }) {
  const displayItems = internships && internships.length > 0 ? internships : DEFAULT_INTERNSHIPS;

  return (
    <section id="internships" className="py-24 px-4 sm:px-6 lg:px-16 bg-black">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-400">
            <span>05 // WORK EXPERIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
            Professional Experience & Roles
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl font-sans">
            Practical roles in technical mentorship, academic analysis, and campus leadership.
          </p>
        </div>

        {/* Experience List */}
        <div className="space-y-4">
          {displayItems.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="group p-6 sm:p-7 rounded-2xl bg-zinc-950/80 border border-white/[0.08] hover:border-[#2997ff]/30 hover:bg-zinc-900/40 transition-all duration-200 shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight font-display group-hover:text-[#2997ff] transition-colors">
                    {item.role}
                  </h3>
                  <div className="flex items-center gap-3 text-sm font-mono mt-1">
                    <span className="flex items-center gap-1.5 text-zinc-300">
                      <Building2 className="w-3.5 h-3.5 text-zinc-500" />
                      {item.company}
                    </span>
                    <span className="text-zinc-600">·</span>
                    <span className="flex items-center gap-1.5 text-zinc-500">
                      <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                      {item.duration}
                    </span>
                  </div>
                </div>

                {item.certificateUrl && (
                  <a
                    href={item.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interactive-tap inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] px-3.5 py-1.5 rounded-xl transition-colors self-start sm:self-auto"
                  >
                    <span>Verification</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                  </a>
                )}
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed font-sans max-w-4xl">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
