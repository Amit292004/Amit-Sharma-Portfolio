"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Code } from "lucide-react";
import Image from "next/image";
import SpotlightCard from "./SpotlightCard";

type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string;
  imageUrl: string | null;
  liveLink: string | null;
  githubLink: string | null;
};

// 3D Tilt Card Component
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="h-full flex flex-col"
      >
        <SpotlightCard className="h-full flex flex-col group">
          <div className="h-48 bg-gray-800 relative w-full overflow-hidden shrink-0" style={{ transform: "translateZ(30px)" }}>
            {project.imageUrl ? (
              <Image src={project.imageUrl} alt={project.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
                No Image Provided
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          
          <div className="p-6 flex flex-col flex-1" style={{ transform: "translateZ(40px)" }}>
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-1">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-6" style={{ transform: "translateZ(20px)" }}>
              {project.techStack.split(',').map((tech, i) => (
                <span key={i} className="text-[11px] px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 font-medium tracking-wide">
                  {tech.trim()}
                </span>
              ))}
            </div>
            
            <div className="flex items-center gap-4 mt-auto" style={{ transform: "translateZ(50px)" }}>
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm font-semibold text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl transition-all shadow-lg">
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/5 px-4 py-2 rounded-xl transition-all">
                  <Code className="w-4 h-4" /> Code
                </a>
              )}
            </div>
          </div>
        </SpotlightCard>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("All");

  // Extract unique categories from tech stacks (simplified logic: take the first tech as the main category, or predefined categories)
  const categories = useMemo(() => {
    const cats = new Set(["All"]);
    projects.forEach(p => {
      const techList = p.techStack.split(',').map(t => t.trim());
      techList.forEach(t => {
        // Group similar techs or just use them if they are common
        if (["React", "Next.js", "Node.js", "Python", "AI/ML", "Java", "C++"].includes(t)) {
          cats.add(t);
        }
      });
    });
    return Array.from(cats);
  }, [projects]);

  const filteredProjects = projects.filter(p => {
    if (filter === "All") return true;
    return p.techStack.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-20 max-w-7xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-gray-300 mb-4">
          <Code className="w-3.5 h-3.5" />
          <span>Portfolio</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          Featured <span className="text-gradient">Projects</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          A showcase of my technical abilities, blending beautiful design with robust backend engineering.
        </p>
      </motion.div>

      {/* Dynamic Filter */}
      {categories.length > 1 && projects.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                filter === cat
                  ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      )}

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))
          ) : projects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="col-span-full flex flex-col items-center justify-center py-20 gap-6"
            >
              <div className="w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center relative">
                <Code className="w-9 h-9 text-blue-400" />
                <div className="absolute inset-0 rounded-2xl bg-blue-500/10 blur-xl animate-pulse -z-10" />
              </div>
              <div className="text-center">
                <p className="text-white font-bold text-xl mb-2">Projects Coming Soon</p>
                <p className="text-gray-500 text-sm max-w-sm">Real projects are being uploaded. Check back shortly!</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full text-center py-12 text-gray-500"
            >
              No projects found in this category.
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
