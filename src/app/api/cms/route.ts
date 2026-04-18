import { NextResponse } from "next/server";
import { readDB } from "@/lib/db";
import { promises as fs } from 'fs';

export async function GET() {
  try {
    const db = await readDB();
    return NextResponse.json({ success: true, data: db.cms || {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to load CMS data" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = await readDB();
    
    db.cms = { ...db.cms, ...body };
    await fs.writeFile('local_database.json', JSON.stringify(db, null, 2));

    return NextResponse.json({ success: true, data: db.cms });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update CMS" }, { status: 500 });
  }
}
