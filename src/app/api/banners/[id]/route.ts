import { NextResponse } from "next/server";
import { readDB } from "@/lib/db";
import { promises as fs } from 'fs';

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db = await readDB();
    
    db.banners = db.banners.filter((b: any) => b.id.toString() !== id);
    await fs.writeFile('local_database.json', JSON.stringify(db, null, 2));

    return NextResponse.json({ success: true, message: "Banner retired successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to retire asset" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const db = await readDB();
    
    const index = db.banners.findIndex((b: any) => b.id.toString() === id);
    if (index === -1) return NextResponse.json({ success: false, error: "Asset not found" }, { status: 404 });

    db.banners[index] = { ...db.banners[index], ...body };
    await fs.writeFile('local_database.json', JSON.stringify(db, null, 2));

    return NextResponse.json({ success: true, data: db.banners[index] });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update asset" }, { status: 500 });
  }
}
