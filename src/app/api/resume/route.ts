import { NextResponse } from "next/server";
import { list } from "@vercel/blob";

// GET /api/resume
// Dynamically redirects to the latest Vercel Blob URL for the resume
export async function GET() {
  try {
    const { blobs } = await list({ prefix: "resume", limit: 1 });
    
    if (blobs.length > 0) {
      // Return a redirect to the actual Vercel Blob URL
      return NextResponse.redirect(blobs[0].url);
    } else {
      // Fallback if no resume is uploaded yet
      return NextResponse.redirect(new URL("/", process.env.NEXTAUTH_URL || "http://localhost:3000"));
    }
  } catch (error) {
    console.error("Failed to fetch resume blob URL:", error);
    // Fallback to local /resume.pdf if running locally without BLOB_READ_WRITE_TOKEN
    return NextResponse.redirect(new URL("/resume.pdf", process.env.NEXTAUTH_URL || "http://localhost:3000"));
  }
}
