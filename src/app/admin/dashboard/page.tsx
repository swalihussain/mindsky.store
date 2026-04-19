"use client";

import { useState, useEffect } from 'react';
import { Package, TrendingUp, Users, DollarSign, Store, AlertCircle, ShoppingBag, Loader2, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import AdminDashboardWrapper from "@/components/admin/AdminDashboard";

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      const json = await res.json();
      if (json.success) setMetrics(json.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const statsCards = [
    { title: "Global Revenue", value: metrics?.totalRevenue || "₹0.00", icon: DollarSign, color: "bg-emerald-50 text-emerald-600", trend: "Live Tracking" },
    { title: "Total Orders", value: metrics?.totalOrders || "0", icon: ShoppingBag, color: "bg-blue-50 text-blue-600", trend: "Processed" },
    { title: "Catalog Volume", value: metrics?.totalProducts || "0", icon: Store, color: "bg-amber-50 text-amber-600", trend: "Products" },
    { title: "Active Accounts", value: metrics?.totalCustomers || "0", icon: Users, color: "bg-purple-50 text-purple-600", trend: "Customers" },
  ];

  if (loading) return (
    <div className="flex-1 flex flex-col items-center justify-center py-40 gap-4 text-gray-300">
       <Loader2 className="w-12 h-12 animate-spin text-[#024fe7]" />
       <span className="font-black text-xs uppercase tracking-[0.3em]">Synchronizing Business Data...</span>
    </div>
  );

  return (
    <AdminDashboardWrapper activeTab="dashboard">
      <div className="max-w-7xl mx-auto w-full animate-in fade-in duration-500">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-black text-[#1F2937] tracking-tighter">Control Center</h2>
            <p className="text-gray-400 mt-1 font-medium italic">Comprehensive oversight of your e-commerce ecosystem.</p>
          </div>
          <button onClick={fetchStats} className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-300 hover:text-[#024fe7] hover:bg-blue-50 transition-all shadow-sm">
             <RefreshCw size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {statsCards.map((stat, index) => (
            <div key={index} className="bg-white p-8 rounded-[32px] border border-gray-50 shadow-sm flex flex-col group hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl ${stat.color} transition-all group-hover:scale-110`}>
                  <stat.icon size={28} />
                </div>
                <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${stat.color} border border-white/50`}>{stat.trend}</span>
              </div>
              <h3 className="text-gray-400 text-[11px] font-black uppercase tracking-[0.2em] mb-2">{stat.title}</h3>
              <p className="text-3xl font-black text-[#1F2937] tracking-tighter">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-white rounded-[40px] border border-gray-50 shadow-sm p-10">
              <h3 className="text-xl font-black text-[#1F2937] mb-8 flex items-center gap-3 tracking-tight italic">
                 <TrendingUp className="text-[#024fe7]" /> Market Performance
              </h3>
              <div className="h-64 w-full bg-blue-50/30 rounded-[32px] flex items-end p-8 gap-4 border border-blue-50">
                 {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                   <div key={i} className="flex-1 bg-[#024fe7] rounded-t-[12px] opacity-40 hover:opacity-100 transition-all cursor-pointer relative group" style={{ height: `${h}%` }}>
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1F2937] text-white text-[10px] px-3 py-1.5 rounded-lg font-black opacity-0 group-hover:opacity-100 transition-all">₹{h}k</div>
                   </div>
                 ))}
              </div>
              <div className="flex justify-between mt-6 px-2">
                 {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <span key={d} className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{d}</span>)}
              </div>
            </div>
            
            <div className="bg-[#1F2937] rounded-[40px] shadow-2xl p-10 text-white relative overflow-hidden">
               <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#024fe7] rounded-full blur-[120px] opacity-20"></div>
               <h3 className="text-xl font-black mb-8 flex items-center gap-3 tracking-tight italic relative z-10">
                  <ShoppingBag className="text-[#024fe7]" /> Live Recent Orders
               </h3>
               <div className="space-y-6 relative z-10">
                  {metrics?.recentOrders.length === 0 ? (
                    <p className="text-gray-500 font-bold italic py-4">Waiting for first customer order...</p>
                  ) : metrics?.recentOrders.map((ord: any) => (
                    <div key={ord.id} className="flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center font-black text-[#024fe7] text-xs shadow-inner">{ord.id.slice(-2)}</div>
                          <div className="flex flex-col">
                             <span className="font-black text-sm tracking-tight">{ord.id}</span>
                             <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{ord.items} Items</span>
                          </div>
                       </div>
                       <div className="flex flex-col items-end">
                          <span className="font-black text-base">{ord.amount}</span>
                          <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-full mt-1 ${ord.status === 'Processing' ? 'bg-amber-500/20 text-amber-500' : 'bg-emerald-500/20 text-emerald-500'}`}>{ord.status}</span>
                       </div>
                    </div>
                  ))}
               </div>
               <Link href="/admin/orders" className="block w-full mt-8 py-4 bg-white/5 hover:bg-white/10 text-center rounded-[20px] text-[10px] font-black uppercase tracking-[0.3em] transition-all border border-white/5">Analyze Fulfillment Ledger →</Link>
            </div>
          </div>

          <div className="space-y-10">
            <div className="bg-rose-50 rounded-[40px] border border-rose-100 shadow-sm p-10 relative overflow-hidden group">
              <div className="absolute -right-10 -bottom-10 opacity-5 text-rose-600 group-hover:scale-110 transition-transform"><AlertCircle size={200} /></div>
              <h3 className="text-xl font-black text-rose-900 mb-8 flex items-center gap-3 tracking-tight italic relative z-10">
                 <AlertCircle size={24} className="text-rose-500" /> Stock Warning
              </h3>
              <div className="space-y-4 relative z-10">
                {metrics?.lowStockAlerts.length === 0 ? (
                  <div className="p-4 bg-emerald-50 text-emerald-700 rounded-2xl font-black text-xs uppercase tracking-widest text-center border border-emerald-100">Warehouse Healthy</div>
                ) : metrics?.lowStockAlerts.map((alert: any, i: number) => (
                   <div key={i} className="bg-white p-5 rounded-2xl border border-rose-100/50 shadow-sm flex items-center justify-between group/alert">
                      <span className="font-black text-rose-900 text-sm truncate pr-2">{alert.name}</span>
                      <span className="text-[10px] font-black bg-rose-500 text-white px-3 py-1.5 rounded-full shrink-0 shadow-lg shadow-rose-200 group-hover/alert:scale-110 transition-all">{alert.stock} UNITS</span>
                   </div>
                ))}
              </div>
              <Link href="/admin/inventory" className="block mt-10 text-[10px] font-black uppercase tracking-[0.3em] text-rose-400 hover:text-rose-600 transition-all relative z-10">Initiate Restock Protocol →</Link>
            </div>

            <div className="bg-white rounded-[40px] border border-gray-50 shadow-sm p-10 flex flex-col items-center text-center">
               <div className="w-20 h-20 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <Store size={40} />
               </div>
               <h4 className="text-xl font-black text-[#1F2937] mb-2 tracking-tighter italic">Growth Metrics</h4>
               <p className="text-gray-400 text-sm font-medium mb-8">Maintain a high catalog density to drive customer engagement.</p>
               <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="bg-gray-50 p-4 rounded-3xl border border-gray-100">
                     <div className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Items</div>
                     <div className="font-black text-[#1F2937]">{metrics?.totalProducts || 0}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-3xl border border-gray-100">
                     <div className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Users</div>
                     <div className="font-black text-[#1F2937]">{metrics?.totalCustomers || 0}</div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </AdminDashboardWrapper>
  );
}
