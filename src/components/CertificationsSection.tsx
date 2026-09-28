"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, Calendar, Building2 } from "lucide-react";

type Certification = {
  id: string;
  title: string;
  issuer: string;
  dateCompleted: string;
  credentialUrl?: string | null;
  imageUrl?: string | null;
};

const FALLBACK_CERTS: Certification[] = [
  { id: "1", title: "Cyber Security Boot Camp", issuer: "NIELIT (Score: 94/100)", dateCompleted: "2024", credentialUrl: null },
  { id: "2", title: "Data Science & Generative AI", issuer: "Codebasics", dateCompleted: "2025", credentialUrl: null },
  { id: "3", title: "Full-Stack Web Development", issuer: "Apna College", dateCompleted: "2025", credentialUrl: null },
  { id: "4", title: "DSA with C++ Foundation", issuer: "PW Skills", dateCompleted: "2025", credentialUrl: null },
];

export default function CertificationsSection({ certifications }: { certifications: Certification[] }) {
  const display = certifications && certifications.length > 0 ? certifications : FALLBACK_CERTS;

  return (
    <section id="certifications" className="py-24 px-4 sm:px-6 lg:px-16 bg-black">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-400">
            <span>06 // CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
            Technical Certifications & Training
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl">
            Structured curriculums and verified programs completed in security, AI, web development, and algorithms.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {display.map((cert, idx) => (
            <motion.div
              key={cert.id || idx}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.06 }}
              className="group p-5 rounded-2xl bg-zinc-950/80 border border-white/[0.08] hover:border-[#2997ff]/35 hover:bg-zinc-900/40 transition-all duration-200 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-400 mb-4 group-hover:text-white transition-colors">
                  <Award className="w-4 h-4" />
                </div>

                <h3 className="font-semibold text-white text-base tracking-tight mb-2 group-hover:text-[#2997ff] transition-colors font-display">
                  {cert.title}
                </h3>

                <p className="text-xs text-zinc-400 font-mono flex items-center gap-1.5 mb-1">
                  <Building2 className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{cert.issuer}</span>
                </p>

                <p className="text-xs text-zinc-400 font-mono flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{cert.dateCompleted}</span>
                </p>
              </div>

              {cert.credentialUrl && (
                <div className="mt-5 pt-3 border-t border-white/[0.06]">
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#2997ff] hover:underline transition-colors"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
