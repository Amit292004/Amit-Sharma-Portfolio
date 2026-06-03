import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TimelineSection from "@/components/TimelineSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";

// Next.js Server Component
export default async function Home() {
  // Fetch data from database — gracefully fall back to static data if DB unavailable
  let achievements: any[] = [];
  let courses: any[] = [];
  let projects: any[] = [];
  let profile: any = null;

  try {
    achievements = await prisma.achievement.findMany({ orderBy: { createdAt: 'desc' } });
    courses = await prisma.course.findMany({ orderBy: { createdAt: 'desc' } });
    projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
    profile = await prisma.profile.findFirst();
  } catch {
    // DB not available — will use fallback data below
  }

  if (!profile) {
    profile = {
      id: "default",
      name: "Amit Sharma",
      role: "CS Engineering",
      avatarUrl: null,
      available: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  // Placeholder data for showcase if DB is empty
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



  return (
    <main className="min-h-screen selection:bg-blue-500/30">
      <Navbar />
      <HeroSection profile={{
        name: profile.name,
        role: profile.role,
        avatarUrl: profile.avatarUrl,
        available: profile.available,
      }} />
      
      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent my-10 max-w-5xl mx-auto" />
      
      <AboutSection />
      
      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent my-10 max-w-5xl mx-auto" />
      
      <TimelineSection 
        achievements={achievements.map(a => ({...a, date: a.date.toString()}))} 
        courses={courses.map(c => ({...c, dateCompleted: c.dateCompleted.toString()}))} 
      />
      
      <ProjectsSection projects={projects} />
      
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent my-10 max-w-5xl mx-auto" />
      
      <ContactSection />
      
      <footer className="py-8 text-center text-gray-600 text-sm border-t border-white/5 bg-black">
        <p>© {new Date().getFullYear()} Amit Sharma. Designed & Built with AI.</p>
      </footer>
    </main>
  );
}
