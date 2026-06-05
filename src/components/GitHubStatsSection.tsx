"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitBranch, Star, GitFork, ExternalLink, Users, BookOpen, Code } from "lucide-react";

type GitHubData = {
  username: string;
  name: string;
  bio: string;
  publicRepos: number;
  followers: number;
  following: number;
  avatarUrl: string;
  profileUrl: string;
  topRepos: {
    name: string;
    description: string;
    stars: number;
    forks: number;
    language: string;
    url: string;
    topics: string[];
  }[];
};

const LANG_COLORS: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  Python: "bg-green-500",
  Java: "bg-orange-500",
  "C++": "bg-pink-500",
  HTML: "bg-red-500",
  CSS: "bg-purple-500",
  Go: "bg-cyan-500",
};

export default function GitHubStatsSection() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/GitBranch?username=Amit292004")
      .then((r) => r.json())
      .then((d) => { if (!d.error) setData(d); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const stats = data
    ? [
        { label: "Public Repos", value: data.publicRepos, icon: BookOpen, color: "text-blue-400" },
        { label: "Followers", value: data.followers, icon: Users, color: "text-purple-400" },
        { label: "Following", value: data.following, icon: Users, color: "text-emerald-400" },
      ]
    : [];

  return (
    <section id="GitBranch" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-gray-300 mb-4">
            <GitBranch className="w-3.5 h-3.5" />
            <span>Open source</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            GitBranch <span className="text-gradient">Activity</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">My open source work and contributions.</p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
          </div>
        ) : data ? (
          <>
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-12">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-panel rounded-2xl p-4 text-center border border-white/5"
                >
                  <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Contribution Graph via GitBranch chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel rounded-2xl border border-white/5 p-6 mb-10 overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-4">
                <GitBranch className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-semibold text-gray-300">Contribution Activity</span>
                <a href={data.profileUrl} target="_blank" rel="noopener noreferrer" className="ml-auto text-blue-400 hover:text-blue-300 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <div className="w-full overflow-x-auto">
                <img
                  src={`https://ghchart.rshah.org/3b82f6/${data.username}`}
                  alt="GitBranch Contributions"
                  className="w-full min-w-[600px] rounded-lg opacity-90"
                />
              </div>
            </motion.div>

            {/* Top repos */}
            {data.topRepos.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {data.topRepos.map((repo, i) => (
                  <motion.a
                    key={repo.name}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -3 }}
                    className="glass-panel rounded-2xl border border-white/5 p-5 flex flex-col gap-3 hover:border-white/15 transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Code className="w-4 h-4 text-gray-500 shrink-0" />
                        <span className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors truncate">{repo.name}</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-gray-600 group-hover:text-blue-400 transition-colors shrink-0" />
                    </div>

                    {repo.description && (
                      <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{repo.description}</p>
                    )}

                    <div className="flex items-center gap-4 mt-auto">
                      {repo.language && (
                        <span className="flex items-center gap-1.5 text-xs text-gray-400">
                          <span className={`w-2.5 h-2.5 rounded-full ${LANG_COLORS[repo.language] || "bg-gray-400"}`} />
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-xs text-gray-400 ml-auto">
                        <Star className="w-3 h-3" />{repo.stars}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <GitFork className="w-3 h-3" />{repo.forks}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <GitBranch className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Could not load GitBranch data.</p>
            <a href="https://GitBranch.com/Amit292004" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline mt-2 inline-block text-sm">
              View GitBranch Profile →
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
