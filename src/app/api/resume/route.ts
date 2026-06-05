import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/resume
// Streams the resume PDF stored in the database
export async function GET(req: NextRequest) {
  try {
    const resume = await prisma.resume.findUnique({ where: { id: "singleton" } });

    if (!resume) {
      // No resume uploaded yet — redirect to home using the request's own origin
      const origin = req.nextUrl.origin;
      return NextResponse.redirect(new URL("/", origin));
    }

    return new NextResponse(new Uint8Array(resume.data), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${resume.filename}"`,
        "Content-Length": resume.data.length.toString(),
        // Allow browsers to cache for 1 hour
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Failed to fetch resume:", error);
    return NextResponse.json({ error: "Failed to fetch resume" }, { status: 500 });
  }
}
