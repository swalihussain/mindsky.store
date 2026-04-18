import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    // In Next.js 15+, params is a promise and must be awaited
    const { id: idParam } = await context.params;
    const body = await request.json();

    console.log("SERVER: Received PUT request for ID:", idParam);

    const db = readDB();
    const productIndex = db.products.findIndex(p => (p?.id || "").toString() === (idParam || "").toString());
    
    if (productIndex === -1) {
       console.error("SERVER: Product NOT FOUND for ID:", idParam);
       return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    const currentProduct = db.products[productIndex];
    
    const dataToUpdate: any = { 
      ...currentProduct, 
      ...body,
      name: body.name || body.product_name || currentProduct.name,
      category: body.category || body.category_id || currentProduct.category,
      price: body.price ? Number(body.price) : currentProduct.price,
      stock: body.stock ? Number(body.stock) : currentProduct.stock,
      imageUrl: body.imageUrl || body.image_url || currentProduct.imageUrl,
      discountPrice: body.discountPrice || body.discount_price || currentProduct.discountPrice,
    };

    db.products[productIndex] = dataToUpdate;
    writeDB(db);

    return NextResponse.json({ success: true, data: dataToUpdate });
  } catch (error: any) {
    console.error("SERVER: PUT Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    // In Next.js 15+, params is a promise and must be awaited
    const { id: idParam } = await context.params;
    console.log("SERVER: Received DELETE request for ID:", idParam);
    
    const db = readDB();
    const initialLength = db.products.length;
    
    // Safely compare all IDs as universal strings
    db.products = db.products.filter(p => {
      const pId = (p?.id || "").toString();
      const match = pId !== (idParam || "").toString();
      return match;
    });
    
    if (db.products.length === initialLength) {
       console.error("SERVER: Product NOT FOUND for ID:", idParam);
       return NextResponse.json({ success: false, error: 'Product not found corresponding to ID: ' + idParam }, { status: 404 });
    }
    
    writeDB(db);
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error: any) {
    console.error("SERVER: DELETE Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
