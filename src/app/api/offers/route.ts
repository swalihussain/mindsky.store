import { NextResponse } from "next/server";
import { readDB } from "@/lib/db";
import { promises as fs } from 'fs';

export async function GET() {
  try {
    const db = await readDB();
    return NextResponse.json({ success: true, data: db.offers || [] });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to load offers" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = await readDB();
    
    const newOffer = {
      id: Date.now(),
      code: body.code.toUpperCase(),
      discount: Number(body.discount),
      type: body.type || 'percentage',
      status: 'Active',
      usageCount: 0,
      createdAt: new Date().toISOString()
    };

    db.offers = [newOffer, ...(db.offers || [])];
    await fs.writeFile('local_database.json', JSON.stringify(db, null, 2));

    return NextResponse.json({ success: true, data: newOffer });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create offer" }, { status: 500 });
  }
}
