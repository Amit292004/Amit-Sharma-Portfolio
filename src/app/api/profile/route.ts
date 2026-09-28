import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const PROFILE_FILE = path.join(process.cwd(), "public", "profile.json");

async function getLocalProfile() {
  try {
    if (existsSync(PROFILE_FILE)) {
      const data = await readFile(PROFILE_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch {}
  return null;
}

async function saveLocalProfile(data: any) {
  try {
    await writeFile(PROFILE_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not save profile to local json:", err);
  }
}

export async function GET() {
  if (process.env.DATABASE_URL) {
    try {
      const profile = await prisma.profile.findFirst();
      if (profile) return NextResponse.json(profile);
    } catch (error) {
      console.warn("Prisma profile fetch failed, using local fallback:", error);
    }
  }

  const localProfile = await getLocalProfile();
  if (localProfile) {
    return NextResponse.json(localProfile);
  }

  return NextResponse.json({
    name: "Amit Sharma",
    role: "CS Engineering",
    avatarUrl: "/profile.jpg",
    available: true,
  });
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, role, avatarUrl, available } = await req.json();
    let savedProfile: any = null;

    if (process.env.DATABASE_URL) {
      try {
        let profile = await prisma.profile.findFirst();
        if (profile) {
          savedProfile = await prisma.profile.update({
            where: { id: profile.id },
            data: {
              name: name ?? "Amit Sharma",
              role: role ?? "CS Engineering",
              avatarUrl: avatarUrl !== undefined ? avatarUrl : profile.avatarUrl,
              available: available !== undefined ? available : profile.available,
            },
          });
        } else {
          savedProfile = await prisma.profile.create({
            data: {
              name: name ?? "Amit Sharma",
              role: role ?? "CS Engineering",
              avatarUrl: avatarUrl || null,
              available: available !== undefined ? available : true,
            },
          });
        }
      } catch (dbErr) {
        console.warn("Database profile update failed, using local fallback:", dbErr);
      }
    }

    if (!savedProfile) {
      const existing = (await getLocalProfile()) || {
        name: "Amit Sharma",
        role: "CS Engineering",
        avatarUrl: "/profile.jpg",
        available: true,
      };

      savedProfile = {
        id: "local",
        name: name ?? existing.name,
        role: role ?? existing.role,
        avatarUrl: avatarUrl !== undefined ? avatarUrl : existing.avatarUrl,
        available: available !== undefined ? available : existing.available,
        updatedAt: new Date().toISOString(),
      };
    }

    await saveLocalProfile(savedProfile);

    return NextResponse.json(savedProfile);
  } catch (error: any) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ error: error?.message || "Failed to update profile" }, { status: 500 });
  }
}
