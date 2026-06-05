"use client";
import { motion } from "framer-motion";
import { Code2, Server, Brain, Wrench, Globe } from "lucide-react";

type Skill = {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  iconName?: string | null;
};

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Frontend: Code2,
  Backend: Server,
  "AI/ML": Brain,
  Tools: Wrench,
  Languages: Globe,
};

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: "from-blue-500/20 to-blue-600/5 border-blue-500/20 text-blue-400",
  Backend: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/20 text-emerald-400",
  "AI/ML": "from-purple-500/20 to-purple-600/5 border-purple-500/20 text-purple-400",
  Tools: "from-orange-500/20 to-orange-600/5 border-orange-500/20 text-orange-400",
  Languages: "from-yellow-500/20 to-yellow-600/5 border-yellow-500/20 text-yellow-400",
};

const BAR_COLORS: Record<string, string> = {
  Frontend: "from-blue-500 to-blue-400",
  Backend: "from-emerald-500 to-emerald-400",
  "AI/ML": "from-purple-500 to-purple-400",
  Tools: "from-orange-500 to-orange-400",
  Languages: "from-yellow-500 to-yellow-400",
};

// Static fallback skills
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
  const displaySkills = skills.length > 0 ? skills : FALLBACK_SKILLS;

  // Group by category
  const grouped = displaySkills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs font-semibold text-blue-400 mb-4">
            <Code2 className="w-3.5 h-3.5" />
            <span>What I work with</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Skills & <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I've worked with across development, AI/ML, and security.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Object.entries(grouped).map(([category, catSkills], catIdx) => {
            const Icon = CATEGORY_ICONS[category] || Code2;
            const colorClass = CATEGORY_COLORS[category] || CATEGORY_COLORS["Tools"];
            const barGradient = BAR_COLORS[category] || BAR_COLORS["Tools"];

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                className={`glass-panel rounded-2xl p-6 border bg-gradient-to-br ${colorClass}`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-lg">{category}</h3>
                  <span className="ml-auto text-xs font-semibold opacity-60">{catSkills.length} skills</span>
                </div>

                <div className="space-y-4">
                  {catSkills.map((skill, i) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: catIdx * 0.1 + i * 0.05 }}
                    >
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm font-medium text-gray-200">{skill.name}</span>
                        <span className="text-xs text-gray-500 font-mono">{skill.proficiency}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: catIdx * 0.1 + i * 0.05 + 0.2, ease: "easeOut" }}
                          className={`h-full rounded-full bg-gradient-to-r ${barGradient}`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
