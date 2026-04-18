import { NextResponse } from "next/server";
import { readDB } from "@/lib/db";
import { promises as fs } from 'fs';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get('id'));
    
    const db = await readDB();
    const index = db.learn_play.printables.findIndex((p: any) => p.id === id);
    
    if (index !== -1) {
      db.learn_play.printables[index].downloads = (db.learn_play.printables[index].downloads || 0) + 1;
      await fs.writeFile('local_database.json', JSON.stringify(db, null, 2));
      
      const fileUrl = db.learn_play.printables[index].file_url;
      // In a real production app, you might stream the file here.
      // For now, we redirect to the file URL.
      return NextResponse.redirect(new URL(fileUrl, req.url));
    }

    return NextResponse.json({ success: false, error: "Resource not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Download protocol failed" }, { status: 500 });
  }
}
