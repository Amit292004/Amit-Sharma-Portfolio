import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { prisma } from "./prisma";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

const PUBLIC_FILE = path.join(/*turbopackIgnore: true*/ process.cwd(), "public", "messages.json");
const TMP_FILE = path.join("/tmp", "messages.json");

/**
 * Read messages from file system fallback (public or /tmp)
 */
export async function getLocalMessages(): Promise<ContactMessage[]> {
  const paths = [PUBLIC_FILE, TMP_FILE];
  for (const filePath of paths) {
    try {
      if (existsSync(filePath)) {
        const raw = await readFile(filePath, "utf-8");
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {}
  }
  return [];
}

/**
 * Save messages to file system fallback
 */
export async function saveLocalMessages(messages: ContactMessage[]): Promise<void> {
  const payload = JSON.stringify(messages, null, 2);
  try {
    await writeFile(PUBLIC_FILE, payload, "utf-8");
  } catch {}
  try {
    await writeFile(TMP_FILE, payload, "utf-8");
  } catch {}
}

/**
 * Dispatch notifications via Webhook, Email API, or Web3Forms if configured
 */
async function dispatchNotifications(data: { name: string; email: string; message: string }) {
  const promises: Promise<any>[] = [];

  // 1. Web3Forms Forwarding
  if (process.env.WEB3FORMS_ACCESS_KEY) {
    promises.push(
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_ACCESS_KEY,
          name: data.name,
          email: data.email,
          message: data.message,
          subject: `Portfolio Contact: Message from ${data.name}`,
          from_name: `${data.name} (Portfolio)`,
        }),
      }).catch((err) => console.warn("Web3Forms forward failed:", err))
    );
  }

  // 2. Resend Email Dispatch
  if (process.env.RESEND_API_KEY) {
    promises.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>",
          to: ["amitsharma72020@gmail.com"],
          reply_to: data.email,
          subject: `New Portfolio Message from ${data.name}`,
          text: `You received a new message from your portfolio contact form:\n\nName: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
        }),
      }).catch((err) => console.warn("Resend email dispatch failed:", err))
    );
  }

  // 3. Discord Webhook Notification
  if (process.env.DISCORD_WEBHOOK_URL) {
    promises.push(
      fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              title: "📬 New Portfolio Contact Message",
              color: 0x2997ff,
              fields: [
                { name: "Sender Name", value: data.name, inline: true },
                { name: "Email Address", value: data.email, inline: true },
                { name: "Message", value: data.message, inline: false },
              ],
              footer: { text: "Amit Sharma Portfolio" },
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      }).catch((err) => console.warn("Discord webhook notification failed:", err))
    );
  }

  // 4. Telegram Bot Notification
  if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
    const text = `📬 *New Portfolio Message*\n*Name:* ${data.name}\n*Email:* ${data.email}\n\n*Message:*\n${data.message}`;
    promises.push(
      fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text,
          parse_mode: "Markdown",
        }),
      }).catch((err) => console.warn("Telegram bot notification failed:", err))
    );
  }

  await Promise.allSettled(promises);
}

/**
 * Save incoming contact message to Prisma (if available), fallback file, and trigger notifications
 */
export async function saveMessage(data: { name: string; email: string; message: string }) {
  const newMsg: ContactMessage = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: data.name,
    email: data.email,
    message: data.message,
    read: false,
    createdAt: new Date().toISOString(),
  };

  let savedInDb = false;

  // 1. Try Prisma if DATABASE_URL is configured
  if (process.env.DATABASE_URL) {
    try {
      const dbMsg = await prisma.message.create({
        data: {
          name: data.name,
          email: data.email,
          message: data.message,
        },
      });
      newMsg.id = dbMsg.id;
      savedInDb = true;
    } catch (dbErr) {
      console.warn("Prisma message create failed, persisting to file fallback:", dbErr);
    }
  }

  // 2. Persist to local JSON fallback so no message is ever lost
  try {
    const existing = await getLocalMessages();
    existing.unshift(newMsg);
    // Keep up to 200 recent messages
    await saveLocalMessages(existing.slice(0, 200));
  } catch (fsErr) {
    console.warn("Could not save to local messages file:", fsErr);
  }

  // 3. Dispatch external notification services if configured
  try {
    await dispatchNotifications(data);
  } catch (notifyErr) {
    console.warn("Notification dispatch error:", notifyErr);
  }

  return { message: newMsg, savedInDb };
}

/**
 * Mark a message as read in DB and/or local fallback file
 */
export async function markMessageRead(id: string, read: boolean): Promise<boolean> {
  let updated = false;

  if (process.env.DATABASE_URL) {
    try {
      await prisma.message.update({ where: { id }, data: { read } });
      updated = true;
    } catch {}
  }

  try {
    const existing = await getLocalMessages();
    const target = existing.find((m) => m.id === id);
    if (target) {
      target.read = read;
      await saveLocalMessages(existing);
      updated = true;
    }
  } catch {}

  return updated;
}

/**
 * Delete a message from DB and/or local fallback file
 */
export async function deleteMessage(id: string): Promise<boolean> {
  let deleted = false;

  if (process.env.DATABASE_URL) {
    try {
      await prisma.message.delete({ where: { id } });
      deleted = true;
    } catch {}
  }

  try {
    const existing = await getLocalMessages();
    const filtered = existing.filter((m) => m.id !== id);
    if (filtered.length !== existing.length) {
      await saveLocalMessages(filtered);
      deleted = true;
    }
  } catch {}

  return deleted;
}
