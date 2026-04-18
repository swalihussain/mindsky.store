import { NextResponse } from "next/server";
import { readDB } from "@/lib/db";
import { promises as fs } from 'fs';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const db = await readDB();
    
    const index = db.offers.findIndex((o: any) => o.id.toString() === id);
    if (index === -1) return NextResponse.json({ success: false, error: "Offer not found" }, { status: 404 });

    db.offers[index] = { ...db.offers[index], ...body, code: body.code?.toUpperCase() };
    await fs.writeFile('local_database.json', JSON.stringify(db, null, 2));

    return NextResponse.json({ success: true, data: db.offers[index] });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update offer" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db = await readDB();
    
    db.offers = db.offers.filter((o: any) => o.id.toString() !== id);
    await fs.writeFile('local_database.json', JSON.stringify(db, null, 2));

    return NextResponse.json({ success: true, message: "Offer deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete offer" }, { status: 500 });
  }
}
