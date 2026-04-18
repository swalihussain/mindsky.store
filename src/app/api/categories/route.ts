import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function GET() {
  try {
    const db = readDB();
    return NextResponse.json({ success: true, data: db.categories || [] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name) {
      return NextResponse.json({ success: false, error: 'Category name is required' }, { status: 400 });
    }

    const db = readDB();
    if (!db.categories) db.categories = [];

    const newCategory = {
      id: Date.now(), // Numeric timestamp ID
      name: body.name,
      description: body.description || '',
      imageUrl: body.imageUrl || '',
      parent: body.parent || 'None',
      createdAt: new Date().toISOString()
    };

    db.categories.push(newCategory);
    writeDB(db);

    return NextResponse.json({ success: true, data: newCategory });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
