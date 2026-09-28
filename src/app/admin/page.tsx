import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../api/auth/[...nextauth]/route";
import DashboardClient from "./DashboardClient";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login");
  }

  let projects: any[] = [];
  let achievements: any[] = [];
  let profile: any = null;

  try {
    projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });
    achievements = await prisma.achievement.findMany({ orderBy: { createdAt: "desc" } });
    profile = await prisma.profile.findFirst();
  } catch {
    // Graceful fallback if DB fails
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

  return (
    <DashboardClient 
      initialProjects={projects.map(p => ({
        id: p.id,
        title: p.title,
        description: p.description,
        techStack: p.techStack,
        imageUrl: p.imageUrl,
        liveLink: p.liveLink,
        githubLink: p.githubLink,
      }))} 
      initialAchievements={achievements.map(a => ({
        id: a.id,
        title: a.title,
        description: a.description,
        date: a.date,
        iconUrl: a.iconUrl,
      }))} 
      initialProfile={{
        name: profile.name,
        role: profile.role,
        avatarUrl: profile.avatarUrl,
        available: profile.available,
      }}
    />
  );
}
