import { NextResponse } from "next/server";
import { readDB } from "@/lib/db";

export async function GET() {
  try {
    const db = readDB();
    
    const products = db.products || [];
    const orders = db.orders || [];
    const customers = db.customers || [];
    
    const totalRevenue = orders.reduce((sum: number, order: any) => sum + (Number(order.total) || 0), 0);
    const lowStockAlerts = products.filter((p: any) => Number(p.stock) < 10).map((p: any) => ({
      name: p.name || p.product_name,
      stock: p.stock
    }));

    return NextResponse.json({
      success: true,
      data: {
        totalRevenue: `₹${totalRevenue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
        totalOrders: orders.length.toString(),
        totalProducts: products.length.toString(),
        totalCustomers: customers.length.toString(),
        lowStockAlerts: lowStockAlerts.slice(0, 5),
        recentOrders: orders.slice(0, 5).map((o: any) => ({
          id: o.id,
          amount: `₹${Number(o.total).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
          items: Array.isArray(o.items) ? o.items.length : 0,
          status: o.order_status
        }))
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to load dashboard metrics" }, { status: 500 });
  }
}
