"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Phone } from "lucide-react";

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message")
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's <span className="text-gradient">Connect</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Have a project in mind or just want to say hi? I'd love to hear from you.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="glass-panel p-8 rounded-2xl flex items-start gap-4">
              <Mail className="w-8 h-8 text-blue-500 shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Email</h3>
                <p className="text-gray-400 mb-2">Drop me a line anytime.</p>
                <a href="mailto:amitsharma72020@gmail.com" className="text-blue-400 hover:underline">amitsharma72020@gmail.com</a>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-2xl flex items-start gap-4">
              <Phone className="w-8 h-8 text-emerald-500 shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Phone</h3>
                <p className="text-gray-400 mb-2">Call or message via WhatsApp.</p>
                <a href="tel:+917628024274" className="text-emerald-400 hover:underline">+91 76280 24274</a>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-2xl flex items-start gap-4">
              <MapPin className="w-8 h-8 text-purple-500 shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Location</h3>
                <p className="text-gray-400">Available remotely & based in India.</p>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Connect with me</p>
              <div className="flex gap-4">
                {/* GitHub */}
                <a
                  href="https://github.com/Amit292004"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-5 py-3 rounded-2xl glass-panel border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all duration-300 hover:scale-105"
                >
                  <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">GitHub</span>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/am____it_292004/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-5 py-3 rounded-2xl glass-panel border border-white/5 hover:border-pink-500/30 hover:bg-pink-500/5 transition-all duration-300 hover:scale-105"
                >
                  <svg className="w-5 h-5 text-gray-300 group-hover:text-pink-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span className="text-sm font-semibold text-gray-300 group-hover:text-pink-400 transition-colors">Instagram</span>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/amit-sharma-142a26359/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-5 py-3 rounded-2xl glass-panel border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300 hover:scale-105"
                >
                  <svg className="w-5 h-5 text-gray-300 group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="text-sm font-semibold text-gray-300 group-hover:text-blue-400 transition-colors">LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-2xl space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input required type="text" id="name" name="name" className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="John Doe" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input required type="email" id="email" name="email" className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="john@example.com" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea required id="message" name="message" rows={5} className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" placeholder="Your message here..."></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={status === "loading" || status === "success"}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
              >
                {status === "loading" ? "Sending..." : status === "success" ? "Message Sent!" : (
                  <>Send Message <Send className="w-4 h-4 ml-2" /></>
                )}
              </button>
              {status === "error" && <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
