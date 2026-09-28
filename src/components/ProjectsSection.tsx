"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import Image from "next/image";

type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string;
  imageUrl: string | null;
  liveLink: string | null;
  githubLink: string | null;
};

// High-quality showcase projects reflecting Amit's real engineering domains
const DEFAULT_PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Portfolio Platform Architecture",
    description: "Next.js 16 full-stack web application featuring PostgreSQL, Prisma ORM, NextAuth administrative management, and dynamic REST endpoints.",
    techStack: "Next.js, React 19, TypeScript, PostgreSQL, Prisma, Tailwind CSS",
    imageUrl: null,
    liveLink: "https://amitsharma-portfolio-v2.vercel.app",
    githubLink: "https://github.com/Amit292004/PersonalPortifoliaPage",
  },
  {
    id: "p2",
    title: "Techaura Death Race Autonomous Solution",
    description: "Algorithmic decision tree and pathfinding logic built in C++ that secured 1st place in the Techaura 2025 tech fest coding championship.",
    techStack: "C++, STL, Algorithms, Optimization, Graph Search",
    imageUrl: null,
    liveLink: null,
    githubLink: "https://github.com/Amit292004",
  },
  {
    id: "p3",
    title: "AI Assisted STEM Learning Portal",
    description: "Educational tooling prototype designed to assist students with step-by-step problem breakdown in Physics and Chemistry using LLM orchestrations.",
    techStack: "Python, Generative AI, Next.js, FastAPI, REST APIs",
    imageUrl: null,
    liveLink: null,
    githubLink: "https://github.com/Amit292004",
  },
];

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("All");

  const effectiveProjects = projects && projects.length > 0 ? projects : DEFAULT_PROJECTS;

  const categories = useMemo(() => {
    const cats = new Set(["All"]);
    effectiveProjects.forEach((p) => {
      const techList = p.techStack.split(",").map((t) => t.trim());
      techList.forEach((t) => {
        if (["Next.js", "React", "TypeScript", "Python", "C++", "PostgreSQL"].includes(t)) {
          cats.add(t);
        }
      });
    });
    return Array.from(cats);
  }, [effectiveProjects]);

  const filteredProjects = useMemo(() => {
    if (filter === "All") return effectiveProjects;
    return effectiveProjects.filter((p) =>
      p.techStack.toLowerCase().includes(filter.toLowerCase())
    );
  }, [effectiveProjects, filter]);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-16 bg-[#07080c]">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-mono text-sky-400">
              <span>03 // CODE & SYSTEMS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
              Selected Projects & Systems
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl">
              Production web applications, algorithmic implementations, and machine learning prototypes.
            </p>
          </div>

          {/* Filter Pills */}
          {categories.length > 1 && (
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`interactive-tap px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    filter === cat
                      ? "bg-sky-400 text-slate-950 font-bold shadow-[0_0_16px_rgba(56,189,248,0.3)]"
                      : "bg-[#0c101c]/80 text-slate-400 hover:text-white border border-white/[0.08]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const tags = project.techStack.split(",").map((t) => t.trim());
              return (
                <motion.div
                  key={project.id || idx}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="group rounded-2xl bg-[#0c101d]/80 border border-white/[0.08] hover:border-sky-500/35 hover:bg-[#101524] transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
                >
                  {/* Project Image Preview or Visual Banner */}
                  <div className="h-44 w-full bg-[#080b14] relative overflow-hidden border-b border-white/[0.08] flex items-center justify-center">
                    {project.imageUrl ? (
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#0d1322] to-[#080b14]">
                        <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-3 group-hover:scale-110 transition-transform">
                          <FolderGit2 className="w-5 h-5" />
                        </div>
                        <span className="font-mono text-xs text-sky-400/80 tracking-wider">PROJECT ARCHITECTURE</span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-sky-300 transition-colors mb-2 font-display">
                        {project.title}
                      </h3>

                      <p className="text-sm text-slate-300 leading-relaxed font-sans mb-6">
                        {project.description}
                      </p>
                    </div>

                    <div className="space-y-5">
                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-1.5">
                        {tags.map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-sky-500/[0.06] text-sky-200 border border-sky-500/15"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Links Footer */}
                      <div className="pt-4 border-t border-white/[0.06] flex items-center gap-3">
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="interactive-tap inline-flex items-center gap-1.5 text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 px-3.5 py-2 rounded-xl transition-all shadow-[0_0_15px_rgba(56,189,248,0.25)]"
                          >
                            <span>Live Preview</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}

                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="interactive-tap inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-300 hover:text-white bg-[#0f1422] hover:bg-[#172036] border border-white/[0.1] px-3.5 py-2 rounded-xl transition-colors"
                          >
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                            <span>Repository</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
