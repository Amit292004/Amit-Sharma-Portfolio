import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { writeFile, unlink } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { put, del, list } from "@vercel/blob";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("resume") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File size must be under 5MB" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let saved = false;

    // 1. Try saving to local public folder (works for local development and node servers)
    try {
      const publicDir = path.join(process.cwd(), "public");
      const filePath = path.join(publicDir, "resume.pdf");
      await writeFile(filePath, buffer);
      saved = true;
    } catch (fsErr) {
      console.warn("Could not write resume to filesystem:", fsErr);
    }

    // 2. Try Vercel Blob if token is configured
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const { blobs } = await list({ prefix: "resume" });
        for (const blob of blobs) {
          await del(blob.url);
        }
        await put("resume.pdf", file, {
          access: "public",
          addRandomSuffix: false,
        });
        saved = true;
      } catch (blobErr) {
        console.warn("Could not upload resume to Vercel Blob:", blobErr);
      }
    }

    // 3. Try database if DATABASE_URL is configured
    if (process.env.DATABASE_URL) {
      try {
        await prisma.resume.upsert({
          where: { id: "singleton" },
          update: { data: buffer, filename: file.name, updatedAt: new Date() },
          create: { id: "singleton", data: buffer, filename: file.name },
        });
        saved = true;
      } catch (dbErr) {
        console.warn("Could not save resume to database:", dbErr);
      }
    }

    if (!saved) {
      return NextResponse.json(
        { error: "Could not save resume to storage. Please check server permissions." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Resume upload error:", error);
    return NextResponse.json({ error: error?.message || "Failed to upload resume" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 1. Remove from local public directory if present
    try {
      const filePath = path.join(process.cwd(), "public", "resume.pdf");
      if (existsSync(filePath)) {
        await unlink(filePath);
      }
    } catch (fsErr) {
      console.warn("Failed to delete local resume:", fsErr);
    }

    // 2. Remove from Vercel Blob if configured
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const { blobs } = await list({ prefix: "resume" });
        for (const blob of blobs) {
          await del(blob.url);
        }
      } catch (blobErr) {
        console.warn("Failed to delete blob resume:", blobErr);
      }
    }

    // 3. Remove from database if configured
    if (process.env.DATABASE_URL) {
      try {
        await prisma.resume.deleteMany({ where: { id: "singleton" } });
      } catch (dbErr) {
        console.warn("Failed to delete database resume:", dbErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Resume delete error:", error);
    return NextResponse.json({ error: error?.message || "Failed to delete resume" }, { status: 500 });
  }
}
