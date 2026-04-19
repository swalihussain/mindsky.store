import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";

export async function GET() {
  try {
    const db = readDB();
    return NextResponse.json({ success: true, data: db.staff_users || [] });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch staff" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = readDB();
    
    const newMember = {
      id: Date.now(),
      name: body.name,
      email: body.email,
      phone: body.phone || "",
      role: body.role || "Staff",
      status: body.status || "Active",
      createdAt: new Date().toISOString()
    };

    if (!db.staff_users) db.staff_users = [];
    db.staff_users.push(newMember);
    writeDB(db);

    // Mock Email Invitation Logic
    console.log(`INVITATION SENT: To ${body.email} with link http://localhost:3000/admin/login?invite=${newMember.id}`);

    return NextResponse.json({ success: true, data: newMember });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to invite staff" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const db = readDB();
    const index = db.staff_users.findIndex((u: any) => u.id === body.id);
    
    if (index === -1) return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    
    db.staff_users[index] = { ...db.staff_users[index], ...body };
    writeDB(db);

    return NextResponse.json({ success: true, data: db.staff_users[index] });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update staff" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get('id'));
    
    const db = readDB();
    const user = db.staff_users.find((u: any) => u.id === id);
    
    if (!user) return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    
    // SECURITY: Prevent deleting Super Admin
    if (user.role === "Super Admin") {
      return NextResponse.json({ success: false, error: "Super Admin asset is indestructible and cannot be removed." }, { status: 403 });
    }

    db.staff_users = db.staff_users.filter((u: any) => u.id !== id);
    writeDB(db);

    return NextResponse.json({ success: true, message: "Member removed from ecosystem" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to remove staff" }, { status: 500 });
  }
}

