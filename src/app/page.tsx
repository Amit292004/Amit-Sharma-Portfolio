import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TimelineSection from "@/components/TimelineSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";

// Next.js Server Component
export default async function Home() {
  // Fetch data from database
  // If the database is empty (initial run), we'll provide fallback data
  let achievements = await prisma.achievement.findMany({ orderBy: { createdAt: 'desc' } });
  let courses = await prisma.course.findMany({ orderBy: { createdAt: 'desc' } });
  let projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
  let profile = await prisma.profile.findFirst();

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
      { id: "1", title: "Won Hackathon India", description: "Secured 1st place among 500+ teams building AI solutions.", date: "2025", iconUrl: null, createdAt: new Date(), updatedAt: new Date() },
      { id: "2", title: "Launched Startup", description: "Successfully launched an EdTech platform with 10k active users.", date: "2024", iconUrl: null, createdAt: new Date(), updatedAt: new Date() },
    ];
  }

  if (courses.length === 0) {
    courses = [
      { id: "1", title: "Full Stack Web Development", institution: "IIT Bombay Online", dateCompleted: "2025", credentialLink: null, createdAt: new Date(), updatedAt: new Date() },
      { id: "2", title: "Advanced System Design", institution: "Google Certifications", dateCompleted: "2024", credentialLink: null, createdAt: new Date(), updatedAt: new Date() },
    ];
  }

  if (projects.length === 0) {
    projects = [
      { id: "1", title: "AI Portfolio Builder", description: "An automated tool that builds elite portfolios in minutes using generative AI.", techStack: "Next.js, Tailwind, Prisma, OpenAI", imageUrl: null, liveLink: "#", githubLink: "#", createdAt: new Date(), updatedAt: new Date() },
      { id: "2", title: "FinTech Dashboard", description: "A high-performance financial dashboard handling real-time crypto streams.", techStack: "React, Node.js, WebSockets", imageUrl: null, liveLink: "#", githubLink: "#", createdAt: new Date(), updatedAt: new Date() },
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
