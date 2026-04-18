import { NextResponse } from "next/server";
import { readDB } from "@/lib/db";
import { promises as fs } from 'fs';

export async function GET() {
  try {
    const db = await readDB();
    return NextResponse.json({ success: true, settings: db.whatsapp_settings });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to load settings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = await readDB();
    
    db.whatsapp_settings = { ...db.whatsapp_settings, ...body };
    await fs.writeFile('local_database.json', JSON.stringify(db, null, 2));

    return NextResponse.json({ success: true, settings: db.whatsapp_settings });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to save settings" }, { status: 500 });
  }
}
