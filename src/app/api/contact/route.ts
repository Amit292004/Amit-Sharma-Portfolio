import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const savedMessage = await prisma.message.create({
      data: { name, email, message }
    });
    return NextResponse.json({ success: true, data: savedMessage });
  } catch (error) {
    console.error("Error in contact API route:", error);
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
  }
}
