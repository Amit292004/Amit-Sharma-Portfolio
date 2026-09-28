"use client";

import { useState } from "react";
import { Send, MapPin, Copy, Check, ArrowUpRight } from "lucide-react";

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [copied, setCopied] = useState(false);

  const emailAddress = "amitsharma72020@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-16 bg-[#07080c]">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-mono text-sky-400">
            <span>07 // GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
            Initiate Contact
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl">
            Open to software engineering opportunities, internships, and technical collaborations. Send a direct message or connect via channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Direct Channels */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Quick Email Copy Card */}
            <div className="p-5 rounded-2xl bg-[#0c101d]/85 border border-white/[0.08] flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Direct Email</span>
                <button
                  onClick={handleCopyEmail}
                  className="interactive-tap inline-flex items-center gap-1.5 text-xs font-mono text-sky-300 hover:text-white px-2.5 py-1 rounded-lg bg-sky-500/10 border border-sky-500/20 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-sky-400" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>
              <a
                href={`mailto:${emailAddress}`}
                className="text-base sm:text-lg font-mono font-medium text-white hover:text-sky-400 transition-colors truncate"
              >
                {emailAddress}
              </a>
            </div>

            {/* Direct Phone / WhatsApp Card */}
            <div className="p-5 rounded-2xl bg-[#0c101d]/85 border border-white/[0.08] flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">Phone / WhatsApp</span>
                <a
                  href="tel:+917628024274"
                  className="text-base font-mono font-medium text-white hover:text-emerald-400 transition-colors"
                >
                  +91 76280 24274
                </a>
              </div>
              <a
                href="https://wa.me/917628024274"
                target="_blank"
                rel="noopener noreferrer"
                className="interactive-tap px-3 py-1.5 text-xs font-mono text-emerald-300 hover:text-white bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <span>WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Location Pill */}
            <div className="p-5 rounded-2xl bg-[#0c101d]/85 border border-white/[0.08] flex items-center gap-3 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
              <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white font-sans">Location & Timezone</p>
                <p className="text-xs text-slate-400 font-mono">India (UTC+5:30) · Open to Remote & Onsite</p>
              </div>
            </div>

            {/* Social Links Row */}
            <div className="pt-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-3">Profiles</span>
              <div className="grid grid-cols-3 gap-2">
                <a
                  href="https://github.com/Amit292004"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive-tap p-3 rounded-xl bg-[#0c101d]/85 border border-white/[0.08] hover:border-sky-500/30 text-center transition-colors group"
                >
                  <p className="text-xs font-semibold text-slate-200 group-hover:text-white">GitHub</p>
                  <p className="text-[10px] text-sky-400 font-mono mt-0.5">Amit292004</p>
                </a>

                <a
                  href="https://www.linkedin.com/in/amit-sharma-142a26359/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive-tap p-3 rounded-xl bg-[#0c101d]/85 border border-white/[0.08] hover:border-sky-500/30 text-center transition-colors group"
                >
                  <p className="text-xs font-semibold text-slate-200 group-hover:text-white">LinkedIn</p>
                  <p className="text-[10px] text-sky-400 font-mono mt-0.5">Amit Sharma</p>
                </a>

                <a
                  href="https://www.instagram.com/am____it_292004/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive-tap p-3 rounded-xl bg-[#0c101d]/85 border border-white/[0.08] hover:border-sky-500/30 text-center transition-colors group"
                >
                  <p className="text-xs font-semibold text-slate-200 group-hover:text-white">Instagram</p>
                  <p className="text-[10px] text-sky-400 font-mono mt-0.5">Social</p>
                </a>
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-[#0c101d]/85 border border-white/[0.08] space-y-5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Your Name
                  </label>
                  <input
                    required
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-[#070912] border border-white/[0.09] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all font-sans"
                    placeholder="Jane Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-[#070912] border border-white/[0.09] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all font-sans"
                    placeholder="jane@organization.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Message
                </label>
                <textarea
                  required
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full bg-[#070912] border border-white/[0.09] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all resize-none font-sans"
                  placeholder="Tell me about your team, project, or role..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="interactive-tap w-full bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(56,189,248,0.25)] disabled:opacity-50 cursor-pointer font-mono"
              >
                {status === "loading" ? (
                  <span>Sending message...</span>
                ) : status === "success" ? (
                  <span className="flex items-center gap-1.5 text-emerald-950">
                    <Check className="w-4 h-4 text-emerald-800" />
                    Message delivered successfully
                  </span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5 text-slate-950" />
                  </>
                )}
              </button>

              {status === "error" && (
                <p className="text-xs font-mono text-red-400 text-center">
                  Error sending message. Please reach out directly to amitsharma72020@gmail.com
                </p>
              )}
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
