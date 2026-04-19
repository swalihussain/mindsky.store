import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";

export async function GET() {
  try {
    const db = await readDB();
    return NextResponse.json({ success: true, data: db.banners || [] });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to load banners" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = await readDB();
    
    if (!db.banners) db.banners = [];

    const newBanner = {
      id: Date.now(),
      title: body.title || "Marketing Asset",
      imageUrl: body.imageUrl,
      link: body.link || "#",
      isActive: true,
      createdAt: new Date().toISOString()
    };

    db.banners = [newBanner, ...db.banners];
    writeDB(db);

    return NextResponse.json({ success: true, data: newBanner });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create banner" }, { status: 500 });
  }
}
