"use client";
import { motion } from "framer-motion";
import { ExternalLink, Code } from "lucide-react";
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

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="py-24 px-6 lg:px-20 bg-gradient-to-b from-transparent to-gray-900/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured <span className="text-gradient">Projects</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Some of the best work I have done, combining design, performance, and cutting-edge tech.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length > 0 ? projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel rounded-2xl overflow-hidden group hover:-translate-y-2 transition-all duration-300"
            >
              <div className="h-48 bg-gray-800 relative w-full overflow-hidden">
                {project.imageUrl ? (
                  <Image src={project.imageUrl} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
                    No Image Provided
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.split(',').map((tech, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                      {tech.trim()}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noreferrer" className="flex items-center text-sm font-medium hover:text-blue-400 transition-colors">
                      <ExternalLink className="w-4 h-4 mr-1" /> Live Demo
                    </a>
                  )}
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noreferrer" className="flex items-center text-sm font-medium hover:text-gray-300 transition-colors">
                      <Code className="w-4 h-4 mr-1" /> Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="col-span-full flex flex-col items-center justify-center py-20 gap-6"
            >
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <Code className="w-9 h-9 text-blue-400" />
                </div>
                <div className="absolute inset-0 rounded-2xl bg-blue-500/10 blur-xl animate-pulse -z-10" />
              </div>
              <div className="text-center">
                <p className="text-white font-bold text-xl mb-2">Projects Coming Soon</p>
                <p className="text-gray-500 text-sm max-w-sm">Real projects are being uploaded. Check back shortly!</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
