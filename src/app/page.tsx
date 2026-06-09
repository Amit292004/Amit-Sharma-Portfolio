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
import SplashScreen from "@/components/SplashScreen";


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

  const Divider = () => (
    <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent my-8 max-w-5xl mx-auto" />
  );

  return (
    <main className="min-h-screen selection:bg-blue-500/30">
      <SplashScreen />
      <Navbar />
      <HeroSection profile={{ name: profile.name, role: profile.role, avatarUrl: profile.avatarUrl, available: profile.available }} />

      <Divider />
      <AboutSection />

      <Divider />
      <SkillsSection skills={skills} />

      <Divider />
      <ProjectsSection projects={projects} />

      <Divider />
      <InternshipsSection internships={internships} />

      <Divider />
      <TimelineSection
        achievements={achievements.map((a: any) => ({ ...a, date: a.date.toString() }))}
        courses={courses.map((c: any) => ({ ...c, dateCompleted: c.dateCompleted.toString() }))}
      />

      <Divider />
      <CertificationsSection certifications={certifications} />


      <Divider />
      <ContactSection />

      <footer className="py-8 text-center text-gray-600 text-sm border-t border-white/5 bg-black pb-24 md:pb-8">
        <p>© {new Date().getFullYear()} Amit Sharma. Built with Next.js & ❤️</p>
      </footer>
    </main>
  );
}
