import { NextResponse } from "next/server";
import { readDB } from "@/lib/db";
import { promises as fs } from 'fs';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const db = await readDB();
    
    const index = db.orders.findIndex((o: any) => o.id === id);
    if (index === -1) return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });

    db.orders[index] = { ...db.orders[index], ...body };
    await fs.writeFile('local_database.json', JSON.stringify(db, null, 2));

    return NextResponse.json({ success: true, data: db.orders[index] });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update order" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db = await readDB();
    
    db.orders = db.orders.filter((o: any) => o.id !== id);
    await fs.writeFile('local_database.json', JSON.stringify(db, null, 2));

    return NextResponse.json({ success: true, message: "Order deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete order" }, { status: 500 });
  }
}
