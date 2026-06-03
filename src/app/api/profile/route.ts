import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    let profile = await prisma.profile.findFirst();
    if (!profile) {
      // Return default values as fallback
      return NextResponse.json({
        name: "Amit Sharma",
        role: "CS Engineering",
        avatarUrl: null,
        available: true,
      });
    }
    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, role, avatarUrl, available } = await req.json();

    let profile = await prisma.profile.findFirst();

    if (profile) {
      profile = await prisma.profile.update({
        where: { id: profile.id },
        data: {
          name: name ?? "Amit Sharma",
          role: role ?? "CS Engineering",
          avatarUrl: avatarUrl !== undefined ? avatarUrl : profile.avatarUrl,
          available: available !== undefined ? available : profile.available,
        },
      });
    } else {
      profile = await prisma.profile.create({
        data: {
          name: name ?? "Amit Sharma",
          role: role ?? "CS Engineering",
          avatarUrl: avatarUrl || null,
          available: available !== undefined ? available : true,
        },
      });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
