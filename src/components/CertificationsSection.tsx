"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, Calendar, Building2, Eye, X } from "lucide-react";

type Certification = {
  id: string;
  title: string;
  issuer: string;
  dateCompleted: string;
  credentialUrl?: string | null;
  imageUrl?: string | null;
};

const FALLBACK_CERTS: Certification[] = [
  { id: "1", title: "Cyber Security Boot Camp", issuer: "NIELIT (Score: 94/100)", dateCompleted: "2024", credentialUrl: null, imageUrl: null },
  { id: "2", title: "Data Science & Generative AI", issuer: "Codebasics", dateCompleted: "2025", credentialUrl: null, imageUrl: null },
  { id: "3", title: "Full-Stack Web Development", issuer: "Apna College", dateCompleted: "2025", credentialUrl: null, imageUrl: null },
  { id: "4", title: "DSA with C++ Foundation", issuer: "PW Skills", dateCompleted: "2025", credentialUrl: null, imageUrl: null },
];

export default function CertificationsSection({ certifications }: { certifications: Certification[] }) {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
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

        {/* Certifications Grid - All cards have strictly identical dimensions and layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {display.map((cert, idx) => (
            <motion.div
              key={cert.id || idx}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="group p-5 rounded-2xl bg-zinc-950/80 border border-white/[0.08] hover:border-[#2997ff]/35 hover:bg-zinc-900/30 transition-all duration-200 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.5)] h-full"
            >
              <div className="flex flex-col flex-1">
                {/* Unified Top Banner - Identical aspect ratio and height across all cards */}
                <div className="relative w-full h-40 mb-4 rounded-xl overflow-hidden border border-white/[0.08] bg-zinc-900/70 shrink-0">
                  {cert.imageUrl ? (
                    <div
                      onClick={() => setSelectedCert(cert)}
                      className="w-full h-full relative cursor-pointer group/img"
                      title="Click to view full certificate"
                    >
                      <img
                        src={cert.imageUrl}
                        alt={`${cert.title} Certificate`}
                        className="w-full h-full object-cover object-top transition-transform duration-300 group-hover/img:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end justify-between p-2.5">
                        <span className="text-[11px] font-mono text-white bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-md flex items-center gap-1.5 border border-white/10 shadow-sm">
                          <Eye className="w-3.5 h-3.5 text-[#2997ff]" />
                          <span>View Document</span>
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-white/[0.04] via-zinc-950 to-zinc-950 text-center relative select-none">
                      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:12px_12px] opacity-60 pointer-events-none" />
                      <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-400 group-hover:text-[#2997ff] group-hover:border-[#2997ff]/40 transition-colors mb-2 z-10 shadow-sm">
                        <Award className="w-5 h-5" />
                      </div>
                      <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider z-10 truncate max-w-[90%]">
                        {cert.issuer}
                      </p>
                      <p className="text-[9px] font-mono text-zinc-500 mt-0.5 z-10">
                        Verified Training
                      </p>
                    </div>
                  )}
                </div>

                {/* Content Area */}
                <div className="flex-1 flex flex-col justify-start">
                  <h3 className="font-semibold text-white text-base tracking-tight mb-2 group-hover:text-[#2997ff] transition-colors font-display line-clamp-2 min-h-[3rem]">
                    {cert.title}
                  </h3>

                  <p className="text-xs text-zinc-400 font-mono flex items-center gap-1.5 mb-1.5">
                    <Building2 className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span className="truncate">{cert.issuer}</span>
                  </p>

                  <p className="text-xs text-zinc-400 font-mono flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span>{cert.dateCompleted}</span>
                  </p>
                </div>
              </div>

              {/* Unified Bottom Action Row */}
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                {cert.imageUrl ? (
                  <button
                    type="button"
                    onClick={() => setSelectedCert(cert)}
                    className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#2997ff]" />
                    <span>View Image</span>
                  </button>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-zinc-500 text-[11px]">
                    <Award className="w-3.5 h-3.5 text-zinc-600" />
                    <span>Credential</span>
                  </span>
                )}

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#2997ff] hover:underline transition-colors ml-auto"
                  >
                    <span>Verify</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal for Certificate Preview */}
      <AnimatePresence>
        {selectedCert && selectedCert.imageUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between gap-4 bg-zinc-900/60">
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-white truncate font-display">
                    {selectedCert.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono truncate">
                    {selectedCert.issuer} · {selectedCert.dateCompleted}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {selectedCert.credentialUrl && (
                    <a
                      href={selectedCert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-[#2997ff] flex items-center gap-1.5 transition-colors"
                    >
                      <span>Verify</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setSelectedCert(null)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    title="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Image Display */}
              <div className="p-2 sm:p-4 overflow-auto flex items-center justify-center bg-black/40">
                <img
                  src={selectedCert.imageUrl}
                  alt={selectedCert.title}
                  className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg border border-white/5 shadow-lg"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
