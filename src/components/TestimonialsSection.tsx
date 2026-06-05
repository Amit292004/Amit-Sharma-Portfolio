"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, Users } from "lucide-react";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company?: string | null;
  content: string;
  avatarUrl?: string | null;
  rating: number;
};

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Priya Mehta",
    role: "Student",
    company: "Class 10 Student",
    content: "Amit is an amazing teacher! He explained Math and Physics concepts so clearly that I went from failing to scoring 85% in my board exams. His patience and dedication are unmatched.",
    avatarUrl: null,
    rating: 5,
  },
  {
    id: "2",
    name: "Rahul Singh",
    role: "Peer Developer",
    company: "B.Tech CSE",
    content: "Working with Amit on a web development project was fantastic. He has exceptional problem-solving skills and always comes up with elegant solutions. Highly recommend!",
    avatarUrl: null,
    rating: 5,
  },
  {
    id: "3",
    name: "Dr. Anita Kapoor",
    role: "Parent",
    company: "Chegg India",
    content: "My son was struggling with Chemistry before Amit started tutoring him. Within two months, his grades improved dramatically. Amit is truly gifted at making complex topics easy to understand.",
    avatarUrl: null,
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className={`w-4 h-4 ${s <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}`} />
      ))}
    </div>
  );
}

function Avatar({ name, avatarUrl }: { name: string; avatarUrl?: string | null }) {
  if (avatarUrl) {
    return <img src={avatarUrl} alt={name} className="w-12 h-12 rounded-full object-cover border-2 border-white/10" />;
  }
  const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  const colors = ["bg-blue-500", "bg-purple-500", "bg-emerald-500", "bg-orange-500", "bg-pink-500"];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center text-white font-bold text-sm border-2 border-white/10`}>
      {initials}
    </div>
  );
}

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const display = testimonials.length > 0 ? testimonials : FALLBACK_TESTIMONIALS;
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + display.length) % display.length);
  const next = () => setCurrent((c) => (c + 1) % display.length);

  return (
    <section id="testimonials" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-20 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-semibold text-emerald-400 mb-4">
            <Users className="w-3.5 h-3.5" />
            <span>What people say</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Testimo<span className="text-gradient">nials</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">Kind words from students, peers, and collaborators.</p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
              className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/5 relative overflow-hidden"
            >
              {/* Background quote mark */}
              <Quote className="absolute top-6 right-8 w-20 h-20 text-white/[0.03] rotate-180" />

              <div className="flex flex-col gap-6">
                <StarRating rating={display[current].rating} />

                <p className="text-lg sm:text-xl text-gray-200 leading-relaxed font-light italic">
                  &ldquo;{display[current].content}&rdquo;
                </p>

                <div className="flex items-center gap-4 pt-2 border-t border-white/5">
                  <Avatar name={display[current].name} avatarUrl={display[current].avatarUrl} />
                  <div>
                    <p className="font-bold text-white">{display[current].name}</p>
                    <p className="text-sm text-gray-400">
                      {display[current].role}
                      {display[current].company && ` · ${display[current].company}`}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full glass-panel border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {display.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2 bg-blue-500" : "w-2 h-2 bg-white/20"}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full glass-panel border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
