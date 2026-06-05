"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Home, User, Briefcase, Mail, BookOpen } from "lucide-react";

const NAV_ITEMS = [
  { icon: Home, label: "Home", href: "#" },
  { icon: User, label: "About", href: "#about" },
  { icon: Briefcase, label: "Projects", href: "#projects" },
  { icon: BookOpen, label: "Blog", href: "#blog" },
  { icon: Mail, label: "Contact", href: "#contact" },
];

export default function BottomMobileNav() {
  const [active, setActive] = useState("#");
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setVisible(y < lastY || y < 100);
      setLastY(y);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  return (
    <nav
      className={`md:hidden fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${visible ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className="mx-4 mb-4 bg-[#0d0d0d]/90 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-around px-2 py-2 shadow-2xl shadow-black/50">
        {NAV_ITEMS.map(({ icon: Icon, label, href }) => (
          <a
            key={href}
            href={href}
            onClick={() => setActive(href)}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 ${
              active === href ? "bg-blue-500/20 text-blue-400" : "text-gray-500 hover:text-gray-300"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-semibold tracking-wide">{label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
