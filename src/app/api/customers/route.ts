import { NextResponse } from "next/server";
import { readDB } from "@/lib/db";
import { promises as fs } from 'fs';

export async function GET() {
  try {
    const db = await readDB();
    return NextResponse.json({ success: true, data: db.customers || [] });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to load customers" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = await readDB();
    
    const newCustomer = {
      id: Date.now(),
      name: body.name,
      email: body.email,
      phone: body.phone || "",
      address: body.address || "",
      total_orders: 0,
      total_spend: 0,
      created_at: new Date().toISOString()
    };

    db.customers = [newCustomer, ...(db.customers || [])];
    await fs.writeFile('local_database.json', JSON.stringify(db, null, 2));

    return NextResponse.json({ success: true, data: newCustomer });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create customer" }, { status: 500 });
  }
}
