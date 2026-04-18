import { NextResponse } from "next/server";
import { readDB } from "@/lib/db";
import { promises as fs } from 'fs';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const db = await readDB();
    
    const index = db.customers.findIndex((c: any) => c.id.toString() === id);
    if (index === -1) return NextResponse.json({ success: false, error: "Customer not found" }, { status: 404 });

    db.customers[index] = { ...db.customers[index], ...body };
    await fs.writeFile('local_database.json', JSON.stringify(db, null, 2));

    return NextResponse.json({ success: true, data: db.customers[index] });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update customer" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db = await readDB();
    
    db.customers = db.customers.filter((c: any) => c.id.toString() !== id);
    await fs.writeFile('local_database.json', JSON.stringify(db, null, 2));

    return NextResponse.json({ success: true, message: "Customer erased" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete customer" }, { status: 500 });
  }
}
