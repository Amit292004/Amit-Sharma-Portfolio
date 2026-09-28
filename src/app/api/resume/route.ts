import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { list } from "@vercel/blob";

// GET /api/resume
// Streams the resume PDF stored in Database, Vercel Blob, or public/resume.pdf
export async function GET(req: NextRequest) {
  // 1. Try fetching from Database if DATABASE_URL is present
  if (process.env.DATABASE_URL) {
    try {
      const resume = await prisma.resume.findUnique({ where: { id: "singleton" } });
      if (resume && resume.data) {
        return new NextResponse(new Uint8Array(resume.data), {
          status: 200,
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `inline; filename="${resume.filename || "resume.pdf"}"`,
            "Content-Length": resume.data.length.toString(),
            "Cache-Control": "public, max-age=3600",
          },
        });
      }
    } catch (dbErr) {
      console.warn("Prisma resume fetch failed, checking fallbacks:", dbErr);
    }
  }

  // 2. Try Vercel Blob if token is available
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { blobs } = await list({ prefix: "resume", limit: 1 });
      if (blobs.length > 0 && blobs[0].url) {
        return NextResponse.redirect(blobs[0].url);
      }
    } catch (blobErr) {
      console.warn("Vercel Blob resume fetch failed, checking file fallback:", blobErr);
    }
  }

  // 3. Try reading local public/resume.pdf
  try {
    const filePath = path.join(process.cwd(), "public", "resume.pdf");
    if (existsSync(filePath)) {
      const fileBuffer = await readFile(filePath);
      return new NextResponse(new Uint8Array(fileBuffer), {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'inline; filename="resume.pdf"',
          "Content-Length": fileBuffer.length.toString(),
          "Cache-Control": "public, max-age=3600",
        },
      });
    }
  } catch (fsErr) {
    console.warn("Filesystem resume read failed:", fsErr);
  }

  // 4. Fallback if no resume is found anywhere
  const origin = req.nextUrl.origin;
  return NextResponse.redirect(new URL("/", origin));
}
