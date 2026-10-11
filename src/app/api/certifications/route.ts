import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const PUBLIC_FILE = path.join(/*turbopackIgnore: true*/ process.cwd(), "public", "certifications.json");
const TMP_FILE = path.join("/tmp", "certifications.json");

async function getLocalCerts() {
  for (const filePath of [PUBLIC_FILE, TMP_FILE]) {
    try {
      if (existsSync(filePath)) {
        const raw = await readFile(filePath, "utf-8");
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
  }
  return [];
}

async function saveLocalCerts(certs: any[]) {
  const payload = JSON.stringify(certs, null, 2);
  try {
    await writeFile(PUBLIC_FILE, payload, "utf-8");
  } catch {}
  try {
    await writeFile(TMP_FILE, payload, "utf-8");
  } catch {}
}

export async function GET() {
  if (process.env.DATABASE_URL) {
    try {
      const certs = await prisma.certification.findMany({ orderBy: { createdAt: "desc" } });
      if (certs && certs.length > 0) {
        return NextResponse.json(certs);
      }
    } catch (error) {
      console.warn("Prisma certifications fetch failed, using local fallback:", error);
    }
  }

  const localCerts = await getLocalCerts();
  return NextResponse.json(localCerts);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { title, issuer, dateCompleted, credentialUrl, imageUrl } = await req.json();
    if (!title || !issuer || !dateCompleted) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let savedCert: any = null;

    if (process.env.DATABASE_URL) {
      try {
        savedCert = await prisma.certification.create({
          data: {
            title,
            issuer,
            dateCompleted,
            credentialUrl: credentialUrl || null,
            imageUrl: imageUrl || null,
          },
        });
      } catch (dbErr) {
        console.warn("Prisma certification create failed, using local file:", dbErr);
      }
    }

    if (!savedCert) {
      savedCert = {
        id: `cert_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        title,
        issuer,
        dateCompleted,
        credentialUrl: credentialUrl || null,
        imageUrl: imageUrl || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }

    const currentCerts = await getLocalCerts();
    currentCerts.unshift(savedCert);
    await saveLocalCerts(currentCerts);

    return NextResponse.json(savedCert);
  } catch (error: any) {
    console.error("Error creating certification:", error);
    return NextResponse.json({ error: "Failed to create certification" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await req.json();

    if (process.env.DATABASE_URL) {
      try {
        await prisma.certification.delete({ where: { id } });
      } catch (dbErr) {
        console.warn("Prisma delete failed, removing from local file:", dbErr);
      }
    }

    const currentCerts = await getLocalCerts();
    const filtered = currentCerts.filter((c: any) => c.id !== id);
    await saveLocalCerts(filtered);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting certification:", error);
    return NextResponse.json({ error: "Failed to delete certification" }, { status: 500 });
  }
}
