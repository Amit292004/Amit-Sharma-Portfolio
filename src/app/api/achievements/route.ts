import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const achievements = await prisma.achievement.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(achievements);
  } catch (error) {
    console.error("Error fetching achievements:", error);
    return NextResponse.json({ error: "Failed to fetch achievements" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, description, date, iconUrl } = await req.json();
    if (!title || !description || !date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const achievement = await prisma.achievement.create({
      data: {
        title,
        description,
        date,
        iconUrl: iconUrl || null,
      }
    });

    return NextResponse.json(achievement);
  } catch (error) {
    console.error("Error creating achievement:", error);
    return NextResponse.json({ error: "Failed to create achievement" }, { status: 500 });
  }
}
