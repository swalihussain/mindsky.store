import { NextResponse } from "next/server";
import { readDB } from "@/lib/db";
import { promises as fs } from 'fs';

export async function GET() {
  try {
    const db = await readDB();
    return NextResponse.json({ success: true, data: db.learn_play || { fun_facts: [], parenting_tips: [], printables: [] } });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to load Learn & Play data" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = await readDB();
    const { type, content } = body; // type: 'fun_facts' | 'parenting_tips' | 'printables'

    if (!db.learn_play) db.learn_play = { fun_facts: [], parenting_tips: [], printables: [] };
    
    const newItem = {
      ...content,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };

    db.learn_play[type] = [newItem, ...db.learn_play[type]];
    await fs.writeFile('local_database.json', JSON.stringify(db, null, 2));

    return NextResponse.json({ success: true, data: newItem });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create entry" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const db = await readDB();
    const { type, id, updates } = body;

    const index = db.learn_play[type].findIndex((item: any) => item.id === id);
    if (index === -1) return NextResponse.json({ success: false, error: "Entry not found" }, { status: 404 });

    db.learn_play[type][index] = { ...db.learn_play[type][index], ...updates };
    await fs.writeFile('local_database.json', JSON.stringify(db, null, 2));

    return NextResponse.json({ success: true, data: db.learn_play[type][index] });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update entry" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get('id'));
    const type = searchParams.get('type');
    const db = await readDB();

    if (!type || !db.learn_play[type]) return NextResponse.json({ success: false, error: "Invalid type" }, { status: 400 });

    db.learn_play[type] = db.learn_play[type].filter((item: any) => item.id !== id);
    await fs.writeFile('local_database.json', JSON.stringify(db, null, 2));

    return NextResponse.json({ success: true, message: "Entry retired." });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete" }, { status: 500 });
  }
}
