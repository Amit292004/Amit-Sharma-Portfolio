"use client";
import { motion } from "framer-motion";
import { BookOpen, Clock, ArrowRight, PenLine } from "lucide-react";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImageUrl?: string | null;
  readingTime: number;
  createdAt: string | Date;
};

const FALLBACK_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Building a Full-Stack Portfolio with Next.js 16",
    slug: "building-fullstack-portfolio-nextjs",
    excerpt: "A deep dive into building a modern developer portfolio with Next.js, Prisma, Supabase, and Vercel — from scratch to deployment.",
    readingTime: 8,
    createdAt: new Date("2025-10-01"),
  },
  {
    id: "2",
    title: "Getting Started with Generative AI in 2025",
    slug: "getting-started-generative-ai-2025",
    excerpt: "Exploring the fundamentals of large language models, prompt engineering, and how to integrate AI APIs into your web applications.",
    readingTime: 6,
    createdAt: new Date("2025-09-15"),
  },
  {
    id: "3",
    title: "Why DSA Still Matters for Modern Developers",
    slug: "why-dsa-matters-modern-developers",
    excerpt: "Data structures and algorithms aren't just for interviews. Here's how mastering DSA makes you a better problem solver in real-world projects.",
    readingTime: 5,
    createdAt: new Date("2025-08-20"),
  },
];

export default function BlogSection({ posts }: { posts: BlogPost[] }) {
  const display = posts.length > 0 ? posts : FALLBACK_POSTS;

  return (
    <section id="blog" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-500/10 border border-pink-500/20 rounded-full text-xs font-semibold text-pink-400 mb-4">
            <PenLine className="w-3.5 h-3.5" />
            <span>Thoughts & articles</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Latest <span className="text-gradient">Blog Posts</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            I write about web development, AI, and computer science. New articles coming soon.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {display.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-panel rounded-2xl border border-white/5 overflow-hidden group hover:border-white/15 transition-all duration-300 flex flex-col"
            >
              {/* Cover Image / Placeholder */}
              <div className="h-44 bg-gradient-to-br from-blue-900/30 to-purple-900/20 relative overflow-hidden">
                {post.coverImageUrl ? (
                  <img src={post.coverImageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-white/10" />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-transparent" />
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readingTime} min read
                  </span>
                  <span>·</span>
                  <span>{new Date(post.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</span>
                </div>

                <h3 className="font-bold text-white text-lg leading-snug mb-2 group-hover:text-blue-400 transition-colors flex-1">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>

                <div className="flex items-center text-sm font-semibold text-blue-400 group-hover:gap-2 gap-1 transition-all">
                  Read article
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
