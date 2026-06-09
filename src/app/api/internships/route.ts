import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const internships = await prisma.internship.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(internships);
  } catch (error) {
    console.error("Error fetching internships:", error);
    return NextResponse.json({ error: "Failed to fetch internships" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { role, company, duration, description, certificateUrl } = await req.json();
    if (!role || !company || !duration || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const internship = await prisma.internship.create({ 
      data: { role, company, duration, description, certificateUrl } 
    });
    return NextResponse.json(internship);
  } catch (error) {
    console.error("Error creating internship:", error);
    return NextResponse.json({ error: "Failed to create internship" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await req.json();
    await prisma.internship.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting internship:", error);
    return NextResponse.json({ error: "Failed to delete internship" }, { status: 500 });
  }
}
