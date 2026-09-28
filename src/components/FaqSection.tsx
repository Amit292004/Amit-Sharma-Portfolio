"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "Who is Amit Sharma?",
    answer:
      "Amit Sharma is a Software Engineer, AI/ML Developer, and Computer Science undergraduate at Nagaland University (8.62 CGPA). He is a former AI/ML Intern at TIH IIT Guwahati, a former Subject Matter Expert at Chegg India, and the Founder & Developer of Bounce Back Academy.",
  },
  {
    question: "What are Amit Sharma's key technical skills and specializations?",
    answer:
      "Amit Sharma specializes in Full Stack Web Development (Next.js, React 19, TypeScript, Tailwind CSS, PostgreSQL, Prisma), Applied Machine Learning & AI (Python, PyTorch, Scikit-Learn), Java Programming, and Data Structures & Algorithms with C++.",
  },
  {
    question: "What notable projects has Amit Sharma built?",
    answer:
      "Amit Sharma developed Bounce Back Academy (an interactive EdTech platform for courses and academic tracking), applied multimodal recognition and AI pipelines during his internship at IIT Guwahati, and numerous production-grade full-stack web applications.",
  },
  {
    question: "What is Amit Sharma's educational and internship background?",
    answer:
      "Amit Sharma is pursuing his B.Tech in Computer Science Engineering at Nagaland University with an 8.62 CGPA. He completed an AI/ML internship at the Technology Innovation Hub (TIH), IIT Guwahati, and served for 6 months as an SME at Chegg India.",
  },
  {
    question: "How can I contact Amit Sharma for opportunities or collaborations?",
    answer:
      "You can contact Amit Sharma directly via email at amitsharma72020@gmail.com, call or WhatsApp at +91 76280 24274, or connect with him on GitHub (@Amit292004) and LinkedIn.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-16 bg-black" aria-label="Frequently Asked Questions about Amit Sharma">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="space-y-3 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-400">
            <HelpCircle className="w-3.5 h-3.5 text-[#2997ff]" />
            <span>06 // KNOWLEDGE BASE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
            About Amit Sharma · FAQ
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl font-sans">
            Direct facts and verified background information regarding Amit Sharma&apos;s engineering background, projects, education, and technical expertise.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.question}
                className="rounded-2xl border border-white/[0.08] bg-zinc-950/70 overflow-hidden transition-all duration-200 hover:border-white/[0.16]"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-medium text-zinc-100 font-sans">
                    {item.question}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-zinc-400 transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180 text-white" : ""}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-zinc-400 text-sm sm:text-base leading-relaxed font-sans border-t border-white/[0.04]">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
