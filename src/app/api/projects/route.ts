import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, description, techStack, imageUrl, liveLink, githubLink } = await req.json();
    if (!title || !description || !techStack) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        techStack,
        imageUrl: imageUrl || null,
        liveLink: liveLink || null,
        githubLink: githubLink || null,
      }
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
