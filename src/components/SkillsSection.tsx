"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Server, Brain, Wrench, Globe, Terminal, Layers, Search } from "lucide-react";

type Skill = {
  id: string;
  name: string;
  category: string;
  proficiency?: number;
  iconName?: string | null;
};

// Rich technical metadata with unified, clean badge styling
const TECH_META: Record<string, { tag: string; description: string }> = {
  "React / Next.js": { tag: "Full-Stack", description: "App Router, Server Components, SSR & Client hydration" },
  "TypeScript": { tag: "Language", description: "Strict typing, generics, interfaces & compile-time safety" },
  "Tailwind CSS": { tag: "Styling", description: "Utility-first design systems, responsive dark themes" },
  "HTML / CSS": { tag: "Foundation", description: "Semantic markup, CSS Grid/Flexbox, modern web standards" },
  "Node.js": { tag: "Runtime", description: "REST APIs, asynchronous event loop, npm ecosystem" },
  "PostgreSQL": { tag: "Database", description: "Relational modeling, indexing, ACID transactions" },
  "Prisma ORM": { tag: "Data Access", description: "Type-safe schemas, automated migrations, relational queries" },
  "REST APIs": { tag: "Architecture", description: "HTTP endpoints, JSON contracts, authentication headers" },
  "Python": { tag: "Language", description: "Data manipulation with NumPy/Pandas, automation scripts" },
  "Machine Learning": { tag: "AI/ML", description: "Supervised models, scikit-learn pipelines, evaluation" },
  "Generative AI": { tag: "Applied AI", description: "LLM integration, prompt engineering, API orchestration" },
  "C++": { tag: "Systems", description: "STL containers, pointers, high-performance problem solving" },
  "Java": { tag: "Language", description: "Object-oriented programming, data structures, JVM concepts" },
  "Git / GitHub": { tag: "Tooling", description: "Version control, branching workflows, PR reviews" },
  "Vercel / Supabase": { tag: "DevOps", description: "Edge deployment, continuous deployment, hosted databases" },
};

const CATEGORIES = ["All", "Frontend", "Backend", "AI/ML", "Languages", "Tools"] as const;

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  All: Layers,
  Frontend: Code2,
  Backend: Server,
  "AI/ML": Brain,
  Tools: Wrench,
  Languages: Globe,
};

const FALLBACK_SKILLS: Skill[] = [
  { id: "1", name: "React / Next.js", category: "Frontend", proficiency: 85 },
  { id: "2", name: "TypeScript", category: "Frontend", proficiency: 80 },
  { id: "3", name: "Tailwind CSS", category: "Frontend", proficiency: 90 },
  { id: "4", name: "HTML / CSS", category: "Frontend", proficiency: 95 },
  { id: "5", name: "Node.js", category: "Backend", proficiency: 78 },
  { id: "6", name: "PostgreSQL", category: "Backend", proficiency: 75 },
  { id: "7", name: "Prisma ORM", category: "Backend", proficiency: 80 },
  { id: "8", name: "REST APIs", category: "Backend", proficiency: 85 },
  { id: "9", name: "Python", category: "AI/ML", proficiency: 80 },
  { id: "10", name: "Machine Learning", category: "AI/ML", proficiency: 70 },
  { id: "11", name: "Generative AI", category: "AI/ML", proficiency: 72 },
  { id: "12", name: "C++", category: "Languages", proficiency: 82 },
  { id: "13", name: "Java", category: "Languages", proficiency: 78 },
  { id: "14", name: "Git / GitHub", category: "Tools", proficiency: 88 },
  { id: "15", name: "Vercel / Supabase", category: "Tools", proficiency: 85 },
];

export default function SkillsSection({ skills }: { skills: Skill[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const displaySkills = skills && skills.length > 0 ? skills : FALLBACK_SKILLS;

  const filteredSkills = useMemo(() => {
    return displaySkills.filter((s) => {
      const matchesCategory = activeCategory === "All" || s.category.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            s.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [displaySkills, activeCategory, searchQuery]);

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-16 bg-black">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-400">
              <span>02 // CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
              Technical Stack & Engineering Tools
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl">
              Languages, frameworks, and infrastructure tools I use regularly in production and algorithmic problem solving.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-zinc-950 border border-white/[0.08] rounded-xl text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-white/25 transition-colors"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat] || Terminal;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`interactive-tap inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all duration-150 cursor-pointer ${
                  isActive
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "bg-zinc-950 text-zinc-400 hover:text-white hover:bg-zinc-900 border border-white/[0.08]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const meta = TECH_META[skill.name] || {
                tag: skill.category,
                description: `Applied in software engineering workflows with ${skill.name}.`,
              };

              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="group p-5 rounded-2xl bg-zinc-950/80 border border-white/[0.08] hover:border-[#2997ff]/30 hover:bg-zinc-900/50 transition-all duration-150 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-semibold text-white text-base tracking-tight font-display group-hover:text-[#2997ff] transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/[0.04] text-zinc-400 border border-white/[0.06]">
                        {meta.tag}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                      {meta.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono">
                    <span className="text-zinc-500">{skill.category}</span>
                    <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Active Stack
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredSkills.length === 0 && (
          <div className="py-12 text-center text-sm text-zinc-500 font-mono">
            No technologies found matching &ldquo;{searchQuery}&rdquo;.
          </div>
        )}

      </div>
    </section>
  );
}
