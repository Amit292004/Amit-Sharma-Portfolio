"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show on first visit per session
    const shown = sessionStorage.getItem("splash_shown");
    if (!shown) {
      setVisible(true);
      sessionStorage.setItem("splash_shown", "true");
      const timer = setTimeout(() => setVisible(false), 2400);
      return () => clearTimeout(timer);
    }
  }, []);

  const text = "Amit Sharma";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505] overflow-hidden"
        >
          {/* Particle Burst on Exit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            exit={{ opacity: 1, scale: 2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
          >
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 0, y: 0 }}
                exit={{ 
                  opacity: [0, 1, 0],
                  x: Math.cos(i * 30 * Math.PI / 180) * 150,
                  y: Math.sin(i * 30 * Math.PI / 180) * 150,
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_8px_2px_rgba(255,255,255,0.8)]"
              />
            ))}
          </motion.div>

          <div className="relative flex flex-col items-center gap-6 z-10">
            {/* Animated rings */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full">
                <defs>
                  <linearGradient id="ring1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
                    <stop offset="50%" stopColor="#a855f7" stopOpacity="1" />
                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="ring2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity="1" />
                    <stop offset="50%" stopColor="transparent" stopOpacity="0" />
                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <motion.circle
                  cx="48" cy="48" r="46"
                  stroke="url(#ring1)" strokeWidth="2" fill="none"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "center" }}
                />
                <motion.circle
                  cx="48" cy="48" r="40"
                  stroke="url(#ring2)" strokeWidth="1.5" fill="none"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "center" }}
                />
              </svg>
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-3xl font-black text-white tracking-tighter"
              >
                A<span className="text-blue-500">.</span>
              </motion.span>
            </div>

            {/* Name */}
            <div className="text-center">
              <div className="text-white font-black text-2xl tracking-tight flex justify-center">
                {text.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.05, duration: 0.4 }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + text.length * 0.05, duration: 0.4 }}
                  className="text-blue-500"
                >
                  .
                </motion.span>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="text-gray-400 text-sm mt-2 tracking-[0.2em] uppercase font-medium"
              >
                Developer · Creator · Educator
              </motion.p>
            </div>

            {/* Progress bar */}
            <motion.div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full relative"
              >
                <div className="absolute top-0 right-0 h-full w-4 bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.8)] blur-[2px]" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
