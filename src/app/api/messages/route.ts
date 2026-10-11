import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getLocalMessages, markMessageRead, deleteMessage } from "@/lib/messages";

// Admin only — view all contact form submissions
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // 1. Try DB first if DATABASE_URL is defined
  if (process.env.DATABASE_URL) {
    try {
      const messages = await prisma.message.findMany({ orderBy: { createdAt: "desc" } });
      if (messages && messages.length > 0) {
        return NextResponse.json(messages);
      }
    } catch (error) {
      console.warn("Prisma messages fetch failed, falling back to local storage:", error);
    }
  }

  // 2. Fall back to local messages file
  try {
    const localMessages = await getLocalMessages();
    return NextResponse.json(localMessages);
  } catch (err) {
    console.error("Error fetching local messages:", err);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

// Mark message as read
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id, read } = await req.json();
    await markMessageRead(id, !!read);
    return NextResponse.json({ success: true, id, read });
  } catch (error) {
    console.error("Error updating message:", error);
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 });
  }
}

// Delete a message
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await req.json();
    await deleteMessage(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
  }
}
