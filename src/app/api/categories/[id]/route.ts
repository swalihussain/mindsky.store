import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id: idParam } = await context.params;
    const db = readDB();
    
    if (!db.categories) return NextResponse.json({ success: false, error: 'No categories found' }, { status: 404 });

    const initialLength = db.categories.length;
    db.categories = db.categories.filter((c: any) => (c?.id || "").toString() !== (idParam || "").toString());

    if (db.categories.length === initialLength) {
      return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 });
    }

    writeDB(db);
    return NextResponse.json({ success: true, message: 'Category deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id: idParam } = await context.params;
    const body = await request.json();
    const db = readDB();

    if (!db.categories) return NextResponse.json({ success: false, error: 'No categories found' }, { status: 404 });

    const index = db.categories.findIndex((c: any) => (c?.id || "").toString() === (idParam || "").toString());
    if (index === -1) return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 });

    db.categories[index] = { 
      ...db.categories[index], 
      ...body, 
      id: db.categories[index].id // Ensure ID is never changed
    };

    writeDB(db);
    return NextResponse.json({ success: true, data: db.categories[index] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
