import { NextResponse } from 'next/server';
import { readDB, writeDB, generateId } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const isAdmin = url.searchParams.get('admin') === 'true';

    const db = readDB();
    
    // Return newest first
    let sortedProducts = [...db.products].reverse();
    
    if (!isAdmin) {
      // Use the new keys provided by the user (name, category, status)
      sortedProducts = sortedProducts.filter(p => p.status === 'Active');
    }

    return NextResponse.json({ success: true, data: sortedProducts });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: 'Database connection failed' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Support both old and new key formats for robustness during transition
    const prodName = body.name || body.product_name;
    const prodPrice = body.price;

    if (!prodName || !prodPrice) {
      return NextResponse.json({ success: false, error: 'Required fields (Name, Price) are missing' }, { status: 400 });
    }

    const db = readDB();
    
    // ⭐ EXACT OBJECT STRUCTURE REQUESTED BY USER
    const newProduct = {
      id: Date.now(), // ID MUST HAVE as numeric timestamp
      name: prodName,
      category: body.category || body.category_id || '',
      price: Number(body.price),
      stock: Number(body.stock || 0),
      status: "Active",
      createdAt: new Date().toISOString(),
      // Retaining secondary fields for internal consistency with UI
      description: body.description || '',
      brand: body.brand || body.brand_id || '',
      imageUrl: body.imageUrl || body.image_url || '',
      sku: body.sku || `SKU-${Math.floor(Math.random() * 10000)}`,
      discountPrice: body.discountPrice || body.discount_price || null,
      ageGroup: body.ageGroup || body.age_group || '',
    };

    db.products.push(newProduct);
    writeDB(db);

    return NextResponse.json({ success: true, data: newProduct });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
