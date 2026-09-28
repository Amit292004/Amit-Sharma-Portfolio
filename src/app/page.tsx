import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import TimelineSection from "@/components/TimelineSection";
import ProjectsSection from "@/components/ProjectsSection";

import CertificationsSection from "@/components/CertificationsSection";
import InternshipsSection from "@/components/InternshipsSection";

import ContactSection from "@/components/ContactSection";
import FaqSection from "@/components/FaqSection";
import BackToTop from "@/components/BackToTop";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  let achievements: any[] = [];
  let courses: any[] = [];
  let projects: any[] = [];
  let profile: any = null;
  let skills: any[] = [];
  let certifications: any[] = [];
  let internships: any[] = [];


  try {
    [achievements, courses, projects, profile, skills, certifications, internships] = await Promise.all([
      prisma.achievement.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.course.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.project.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.profile.findFirst(),
      prisma.skill.findMany({ orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }] }),
      prisma.certification.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.internship.findMany({ orderBy: { createdAt: 'desc' } }),
    ]);
  } catch {
    // DB not available — components will use built-in fallback data
  }

  if (!profile) {
    try {
      const fs = await import("fs/promises");
      const path = await import("path");
      const localFile = path.join(process.cwd(), "public", "profile.json");
      const content = await fs.readFile(localFile, "utf-8");
      profile = JSON.parse(content);
    } catch {}
  }

  if (!profile) {
    profile = { id: "default", name: "Amit Sharma", role: "CS Engineering", avatarUrl: null, available: true, createdAt: new Date(), updatedAt: new Date() };
  }

  // Fallback static data (used only when DB is empty)
  if (achievements.length === 0) {
    achievements = [
      { id: "1", title: "Won Death Race Competition", description: "Secured 1st place in the Death Race coding competition at Techaura 2025 tech fest.", date: "2025", iconUrl: null, createdAt: new Date(), updatedAt: new Date() },
      { id: "2", title: "2nd Position — Circutrix", description: "Secured 2nd position in the Circutrix competition at Techaura 2025 tech fest.", date: "2025", iconUrl: null, createdAt: new Date(), updatedAt: new Date() },
    ];
  }
  if (courses.length === 0) {
    courses = [
      { id: "1", title: "Data Science and Generative AI", institution: "Codebasics (Virtual)", dateCompleted: "Sep 2025 – Present", credentialLink: null, createdAt: new Date(), updatedAt: new Date() },
      { id: "2", title: "Java Programming", institution: "Apna College (Virtual)", dateCompleted: "Jun 2025 – Present", credentialLink: null, createdAt: new Date(), updatedAt: new Date() },
      { id: "3", title: "Web Development", institution: "Apna College (Virtual)", dateCompleted: "May 2025 – Oct 2025", credentialLink: null, createdAt: new Date(), updatedAt: new Date() },
      { id: "4", title: "DSA with C++", institution: "PW Skills (Virtual)", dateCompleted: "Mar 2025 – Oct 2025", credentialLink: null, createdAt: new Date(), updatedAt: new Date() },
      { id: "5", title: "Cyber Security Boot Camp", institution: "NIELIT (Score: 94/100)", dateCompleted: "2024", credentialLink: null, createdAt: new Date(), updatedAt: new Date() },
    ];
  }

  const SectionBorder = () => (
    <div className="w-full max-w-6xl mx-auto px-6">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );

  return (
    <main className="min-h-screen bg-black text-[#f5f5f7]">
      <Navbar />
      <HeroSection profile={{ name: profile.name, role: profile.role, avatarUrl: profile.avatarUrl, available: profile.available }} />

      <SectionBorder />
      <AboutSection />

      <SectionBorder />
      <SkillsSection skills={skills} />

      <SectionBorder />
      <ProjectsSection projects={projects} />

      <SectionBorder />
      <InternshipsSection internships={internships} />

      <SectionBorder />
      <TimelineSection
        achievements={achievements.map((a: any) => ({ ...a, date: a.date.toString() }))}
        courses={courses.map((c: any) => ({ ...c, dateCompleted: c.dateCompleted.toString() }))}
      />

      <SectionBorder />
      <CertificationsSection certifications={certifications} />

      <SectionBorder />
      <FaqSection />

      <SectionBorder />
      <ContactSection />

      <footer className="py-12 border-t border-white/[0.08] bg-[#050507] text-zinc-500 text-xs font-mono">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Amit Sharma.</span>
            <span>·</span>
            <span className="text-zinc-400">Computer Science & Systems</span>
          </div>

          <div className="flex items-center gap-6 text-zinc-400">
            <a href="https://github.com/Amit292004" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/amit-sharma-142a26359/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="https://www.instagram.com/am____it_292004/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Instagram
            </a>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-zinc-500">Next.js 16 · React 19</span>
            <BackToTop />
          </div>
        </div>
      </footer>
    </main>
  );
}
