import { NextResponse } from "next/server";
import { saveMessage } from "@/lib/messages";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = body?.name ? String(body.name).trim() : "";
    const email = body?.email ? String(body.email).trim() : "";
    const message = body?.message ? String(body.message).trim() : "";

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, and message are all required." },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const { message: savedMessage, savedInDb } = await saveMessage({
      name,
      email,
      message,
    });

    return NextResponse.json({
      success: true,
      message: "Message received successfully",
      data: savedMessage,
      savedInDb,
    });
  } catch (error: any) {
    console.error("Error in contact API route:", error);
    return NextResponse.json(
      { error: "Failed to process message. Please reach out directly." },
      { status: 500 }
    );
  }
}
