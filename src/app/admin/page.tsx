"use client";

import { Package, TrendingUp, Users, DollarSign, Store } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const stats = [
    { title: "Total Revenue", value: "$24,532.00", icon: DollarSign, color: "bg-green-100 text-green-600", trend: "+12.5%" },
    { title: "Total Orders", value: "845", icon: Package, color: "bg-blue-100 text-blue-600", trend: "+45" },
    { title: "Active Customers", value: "3,211", icon: Users, color: "bg-purple-100 text-purple-600", trend: "+12%" },
    { title: "Conversion Rate", value: "4.8%", icon: TrendingUp, color: "bg-amber-100 text-amber-600", trend: "+0.8%" },
  ];

  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-heading font-extrabold text-gray-800">Dashboard Overview</h2>
          <p className="text-gray-500 mt-1">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <Link href="/" className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 text-sm font-bold text-gray-600 hover:text-[#4DA6FF] hover:border-[#4DA6FF] transition-colors shadow-sm">
          <Store size={18} /> View Live Store
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className="text-sm font-bold text-green-500 bg-green-50 px-2.5 py-1 rounded-full">{stat.trend}</span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-3xl font-black font-heading text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity & Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold font-heading text-gray-800">Sales Analytics</h3>
            <select className="bg-gray-50 border-none rounded-lg text-sm font-medium p-2 outline-none">
              <option>Last 7 Days</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-72 w-full bg-gray-50 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-medium">Chart visualization will render here</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold font-heading text-gray-800">Recent Orders</h3>
            <Link href="/admin/orders" className="text-sm font-bold text-[#4DA6FF] hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0 last:pb-0">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                  <Package size={18} className="text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800 truncate">Order #ORD-{9482 + i}</p>
                  <p className="text-xs text-gray-500 truncate">2 items • $49.98</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 shrink-0">
                  Pending
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
