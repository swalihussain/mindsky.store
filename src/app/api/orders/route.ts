import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";

export async function GET() {
  try {
    const db = readDB();
    return NextResponse.json({ success: true, data: db.orders || [] });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to load orders" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = readDB();
    
    if (!db.orders) db.orders = [];
    if (!db.customers) db.customers = [];

    // 1. Generate Unique Invoice Number
    const date = new Date();
    const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
    const rand = Math.floor(1000 + Math.random() * 9000);
    const invoice_id = `INV-${dateStr}-${rand}`;

    const orderTotal = Number(body.total_amount || body.total);

    // 2. NEW: Automatic Customer Sync Logic
    const customerEmail = body.customer_email || body.email || "";
    const customerPhone = body.customer_phone || body.phone || "";
    
    let customerIndex = db.customers.findIndex((c: any) => 
      (customerEmail && c.email === customerEmail) || 
      (customerPhone && c.phone === customerPhone)
    );

    if (customerIndex !== -1) {
      db.customers[customerIndex].total_orders += 1;
      db.customers[customerIndex].total_spend += orderTotal;
    } else {
      const newCustomer = {
        id: Date.now(),
        name: body.customer_name,
        email: customerEmail,
        phone: customerPhone,
        address: body.address || "",
        total_orders: 1,
        total_spend: orderTotal,
        created_at: new Date().toISOString()
      };
      db.customers = [newCustomer, ...db.customers];
    }

    // 3. Create Order Object
    const newOrder = {
      id: "ORD-" + Date.now(),
      invoice_id: invoice_id,
      customer_name: body.customer_name,
      customer_phone: customerPhone,
      customer_email: customerEmail,
      address: body.address || "",
      items: body.items || [], 
      subtotal: Number(body.subtotal || orderTotal * 0.8),
      shipping: Number(body.shipping || 99),
      discount: Number(body.discount || 0),
      tax: Number(body.tax || (orderTotal * 0.18)),
      total: orderTotal,
      payment_status: body.payment_status || 'Pending',
      order_status: 'Pending',
      created_at: new Date().toISOString()
    };

    db.orders = [newOrder, ...db.orders];
    
    try {
      writeDB(db);
    } catch (fsError) {
      console.warn("PERSISTENCE_FAILURE: Read-only filesystem detected (Vercel Environment). Proceeding with stateless logic.", fsError);
    }

    return NextResponse.json({ success: true, data: { order: newOrder, customerUpdated: true } });
  } catch (error) {
    console.error("SYNC API ERROR:", error);
    return NextResponse.json({ success: false, error: "Failed to synchronize order and customer data" }, { status: 500 });
  }
}
