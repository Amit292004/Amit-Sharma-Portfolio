import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
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

    // Delete old resume blob if it exists
    const { blobs } = await list({ prefix: "resume" });
    for (const blob of blobs) {
      await del(blob.url);
    }

    // Upload to Vercel Blob
    const blob = await put("resume.pdf", file, {
      access: "public",
      addRandomSuffix: false, // Ensures predictable name (but we'll delete old ones anyway to be safe)
    });

    return NextResponse.json({ success: true, url: blob.url });
  } catch (error) {
    console.error("Resume upload error:", error);
    return NextResponse.json({ error: "Failed to upload resume to Blob Storage" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { blobs } = await list({ prefix: "resume" });
    for (const blob of blobs) {
      await del(blob.url);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resume delete error:", error);
    return NextResponse.json({ error: "Failed to delete resume" }, { status: 500 });
  }
}
