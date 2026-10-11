"use client";

import { useState } from "react";
import { Send, MapPin, Copy, Check, ArrowUpRight, Mail, MessageSquare, AlertCircle, RefreshCw } from "lucide-react";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const emailAddress = "amitsharma72020@gmail.com";
  const phoneNumber = "+917628024274";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name || "Visitor"}`);
    const body = encodeURIComponent(
      `Hi Amit,\n\n${message || "I would like to connect with you regarding an opportunity."}\n\nBest regards,\n${name || "Anonymous"}\nEmail: ${email || "Not provided"}`
    );
    return `mailto:${emailAddress}?subject=${subject}&body=${body}`;
  };

  const getWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hi Amit! My name is ${name || "a visitor"}${email ? ` (${email})` : ""}.\n\n${message || "I saw your portfolio and would love to connect."}`
    );
    return `https://wa.me/917628024274?text=${text}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      setErrorMessage("Please fill out all fields before sending.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && (data.success || !data.error)) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(data?.error || "Unable to send message to the server.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error occurred. You can still send your message directly via email or WhatsApp below.");
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setMessage("");
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-16 bg-black">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-400">
            <span>07 // GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
            Initiate Contact
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl">
            Open to software engineering opportunities, internships, and technical collaborations. Send a direct message or connect via channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Direct Channels */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Quick Email Copy Card */}
            <div className="p-5 rounded-2xl bg-zinc-950/80 border border-white/[0.08] flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Direct Email</span>
                <button
                  onClick={handleCopyEmail}
                  type="button"
                  className="interactive-tap inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-white px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>
              <a
                href={`mailto:${emailAddress}`}
                className="text-base sm:text-lg font-mono font-medium text-white hover:text-[#2997ff] transition-colors truncate"
              >
                {emailAddress}
              </a>
            </div>

            {/* Direct Phone / WhatsApp Card */}
            <div className="p-5 rounded-2xl bg-zinc-950/80 border border-white/[0.08] flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
              <div>
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block mb-1">Phone / WhatsApp</span>
                <a
                  href={`tel:${phoneNumber}`}
                  className="text-base font-mono font-medium text-white hover:text-zinc-300 transition-colors"
                >
                  +91 76280 24274
                </a>
              </div>
              <a
                href="https://wa.me/917628024274"
                target="_blank"
                rel="noopener noreferrer"
                className="interactive-tap px-3 py-1.5 text-xs font-mono text-zinc-300 hover:text-white bg-white/[0.04] border border-white/[0.08] rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <span>WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Location Pill */}
            <div className="p-5 rounded-2xl bg-zinc-950/80 border border-white/[0.08] flex items-center gap-3 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
              <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-400">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white font-sans">Location & Timezone</p>
                <p className="text-xs text-zinc-400 font-mono">India (UTC+5:30) · Open to Remote & Onsite</p>
              </div>
            </div>

            {/* Social Links Row */}
            <div className="pt-2">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block mb-3">Profiles</span>
              <div className="grid grid-cols-3 gap-2">
                <a
                  href="https://github.com/Amit292004"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive-tap p-3 rounded-xl bg-zinc-950/80 border border-white/[0.08] hover:border-[#2997ff]/40 text-center transition-colors group"
                >
                  <p className="text-xs font-semibold text-zinc-300 group-hover:text-white">GitHub</p>
                  <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Amit292004</p>
                </a>

                <a
                  href="https://www.linkedin.com/in/amit-sharma-142a26359/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive-tap p-3 rounded-xl bg-zinc-950/80 border border-white/[0.08] hover:border-[#2997ff]/40 text-center transition-colors group"
                >
                  <p className="text-xs font-semibold text-zinc-300 group-hover:text-white">LinkedIn</p>
                  <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Amit Sharma</p>
                </a>

                <a
                  href="https://www.instagram.com/am____it_292004/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive-tap p-3 rounded-xl bg-zinc-950/80 border border-white/[0.08] hover:border-[#2997ff]/40 text-center transition-colors group"
                >
                  <p className="text-xs font-semibold text-zinc-300 group-hover:text-white">Instagram</p>
                  <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Social</p>
                </a>
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/80 border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
              {status === "success" ? (
                <div className="py-8 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <Check className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white font-display">Message Sent Successfully!</h3>
                    <p className="text-zinc-400 text-sm max-w-md mx-auto">
                      Thank you for reaching out, {name || "there"}. Amit has received your message and will respond to <span className="text-zinc-200 font-mono">{email}</span> as soon as possible.
                    </p>
                  </div>
                  
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-mono text-white transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Also Chat on WhatsApp</span>
                    </a>
                    <button
                      onClick={handleReset}
                      type="button"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Send Another Message</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                        Your Name
                      </label>
                      <input
                        required
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-black border border-white/[0.09] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#2997ff]/60 transition-all font-sans"
                        placeholder="Jane Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                        Email Address
                      </label>
                      <input
                        required
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-black border border-white/[0.09] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#2997ff]/60 transition-all font-sans"
                        placeholder="jane@organization.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      id="message"
                      name="message"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-black border border-white/[0.09] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#2997ff]/60 transition-all resize-none font-sans"
                      placeholder="Tell me about your team, project, or role..."
                    />
                  </div>

                  {status === "error" && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs space-y-3 font-sans">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-red-200">Delivery Notice</p>
                          <p className="text-zinc-300 mt-0.5 leading-relaxed">
                            {errorMessage || "The message could not be sent to the server. Don't worry—you can send your pre-filled message instantly with one click below:"}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <a
                          href={getMailtoUrl()}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors shadow-sm"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Open in Email App</span>
                        </a>

                        <a
                          href={getWhatsAppUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 text-white font-semibold text-xs hover:bg-emerald-600 transition-colors shadow-sm"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Send via WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3 pt-1">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="interactive-tap w-full bg-white hover:bg-zinc-200 text-black font-semibold text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm disabled:opacity-50 cursor-pointer font-sans"
                    >
                      {status === "loading" ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          Sending message...
                        </span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-3.5 h-3.5 text-black" />
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-4 text-xs font-mono text-zinc-500 pt-1">
                      <span>Or reach out directly:</span>
                      <a
                        href={getMailtoUrl()}
                        className="text-zinc-400 hover:text-white underline underline-offset-4 transition-colors"
                      >
                        Email Client
                      </a>
                      <span>·</span>
                      <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-white underline underline-offset-4 transition-colors"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
