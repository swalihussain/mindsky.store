import { NextResponse } from "next/server";
import { readDB } from "@/lib/db";
import { promises as fs } from 'fs';

export async function GET() {
  try {
    const db = await readDB();
    return NextResponse.json({ success: true, data: db.reviews || [] });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to load reviews" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = await readDB();
    
    if (!db.reviews) db.reviews = [];

    const newReview = {
      id: Date.now(),
      user: body.user,
      product: body.product || "Global Store",
      text: body.text,
      rating: Number(body.rating) || 5,
      status: "Pending", // For moderator approval
      createdAt: new Date().toISOString()
    };

    db.reviews = [newReview, ...db.reviews];
    await fs.writeFile('local_database.json', JSON.stringify(db, null, 2));

    return NextResponse.json({ success: true, data: newReview });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to submit feedback" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const db = await readDB();
    
    const index = db.reviews.findIndex((r: any) => r.id === body.id);
    if (index === -1) return NextResponse.json({ success: false, error: "Review not found" }, { status: 404 });

    // Allow updating ALL fields (Edit feature)
    db.reviews[index] = { 
      ...db.reviews[index], 
      ...body 
    };

    await fs.writeFile('local_database.json', JSON.stringify(db, null, 2));

    return NextResponse.json({ success: true, data: db.reviews[index] });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update review" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
   try {
     const { searchParams } = new URL(req.url);
     const id = Number(searchParams.get('id'));
     const db = await readDB();
     
     db.reviews = db.reviews.filter((r: any) => r.id !== id);
     await fs.writeFile('local_database.json', JSON.stringify(db, null, 2));
 
     return NextResponse.json({ success: true, message: "Review retired." });
   } catch (error) {
     return NextResponse.json({ success: false, error: "Failed to delete" }, { status: 500 });
   }
 }
