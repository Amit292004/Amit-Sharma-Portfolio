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
  { id: "1", title: "Cyber Security Boot Camp", issuer: "NIELIT", dateCompleted: "2024", credentialUrl: null },
  { id: "2", title: "Data Science & Generative AI", issuer: "Codebasics", dateCompleted: "2025", credentialUrl: null },
  { id: "3", title: "Web Development Bootcamp", issuer: "Apna College", dateCompleted: "2025", credentialUrl: null },
  { id: "4", title: "DSA with C++", issuer: "PW Skills", dateCompleted: "2025", credentialUrl: null },
];

const CERT_GRADIENTS = [
  "from-blue-500/15 to-blue-900/5 border-blue-500/20",
  "from-purple-500/15 to-purple-900/5 border-purple-500/20",
  "from-emerald-500/15 to-emerald-900/5 border-emerald-500/20",
  "from-orange-500/15 to-orange-900/5 border-orange-500/20",
  "from-pink-500/15 to-pink-900/5 border-pink-500/20",
  "from-yellow-500/15 to-yellow-900/5 border-yellow-500/20",
];

export default function CertificationsSection({ certifications }: { certifications: Certification[] }) {
  const display = certifications.length > 0 ? certifications : FALLBACK_CERTS;

  return (
    <section id="certifications" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-xs font-semibold text-yellow-400 mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>Verified credentials</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Certifi<span className="text-gradient">cations</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Courses and bootcamps I've completed to strengthen my technical foundation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {display.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className={`relative glass-panel rounded-2xl border p-6 flex flex-col gap-4 bg-gradient-to-br ${CERT_GRADIENTS[i % CERT_GRADIENTS.length]} transition-all duration-300 group`}
            >
              {/* Badge Icon */}
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                {cert.imageUrl ? (
                  <img src={cert.imageUrl} alt={cert.issuer} className="w-8 h-8 object-contain rounded-lg" />
                ) : (
                  <Award className="w-6 h-6 text-yellow-400" />
                )}
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-white text-base leading-snug mb-2">{cert.title}</h3>
                <div className="flex items-center gap-1.5 text-gray-400 text-sm mb-1">
                  <Building2 className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{cert.issuer}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                  <Calendar className="w-3 h-3 shrink-0" />
                  <span>{cert.dateCompleted}</span>
                </div>
              </div>

              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors group/link"
                >
                  <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  View Credential
                </a>
              )}

              {/* Shine effect on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-white/5 to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
