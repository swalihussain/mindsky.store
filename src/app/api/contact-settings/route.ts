import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";

export async function GET() {
  try {
    const db = readDB();
    return NextResponse.json({ success: true, settings: db.contact_settings });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to load contact settings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = readDB();
    
    db.contact_settings = { ...db.contact_settings, ...body };
    writeDB(db);

    return NextResponse.json({ success: true, settings: db.contact_settings });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to save contact settings" }, { status: 500 });
  }
}
