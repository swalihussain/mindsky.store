import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db = readDB();
    
    db.banners = db.banners.filter((b: any) => b.id.toString() !== id);
    writeDB(db);

    return NextResponse.json({ success: true, message: "Banner retired successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to retire asset" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const db = readDB();
    
    const index = db.banners.findIndex((b: any) => b.id.toString() === id);
    if (index === -1) return NextResponse.json({ success: false, error: "Asset not found" }, { status: 404 });

    db.banners[index] = { ...db.banners[index], ...body };
    writeDB(db);

    return NextResponse.json({ success: true, data: db.banners[index] });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update asset" }, { status: 500 });
  }
}
