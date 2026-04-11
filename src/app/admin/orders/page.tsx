"use client";

import { useState } from 'react';
import { Download, Filter, Search, Eye, Edit, Truck } from 'lucide-react';

const mockOrders = [
  { id: 'ORD-9482', customer: 'Sarah Jenkins', date: '2026-04-10', total: 124.98, status: 'Processing', items: 3 },
  { id: 'ORD-9481', customer: 'Michael Thompson', date: '2026-04-09', total: 79.99, status: 'Shipped', items: 1 },
  { id: 'ORD-9480', customer: 'Jessica Wong', date: '2026-04-09', total: 245.50, status: 'Delivered', items: 5 },
  { id: 'ORD-9479', customer: 'David Smith', date: '2026-04-08', total: 34.99, status: 'Cancelled', items: 1 },
  { id: 'ORD-9478', customer: 'Emily Chen', date: '2026-04-08', total: 110.00, status: 'Pending', items: 2 },
];

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-heading font-extrabold text-gray-800">Order Management</h2>
          <p className="text-gray-500 mt-1">Track, update, and manage customer orders.</p>
        </div>
        <button className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl font-bold shadow-sm hover:bg-gray-800 transition-colors">
          <Download size={20} /> Export CSV
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by order ID or customer..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#4DA6FF] transition-colors"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="border border-gray-200 rounded-lg text-sm px-3 py-2 outline-none text-gray-600 focus:border-[#4DA6FF]">
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors justify-center">
              <Filter size={18} /> Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm font-medium uppercase tracking-wider">
                <th className="px-6 py-4 font-heading">Order ID</th>
                <th className="px-6 py-4 font-heading">Customer</th>
                <th className="px-6 py-4 font-heading">Date</th>
                <th className="px-6 py-4 font-heading">Status</th>
                <th className="px-6 py-4 font-heading">Total</th>
                <th className="px-6 py-4 font-heading text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="font-bold text-[#4DA6FF] hover:underline cursor-pointer">{order.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-gray-800">{order.customer}</span>
                    <p className="text-xs text-gray-400">{order.items} item(s)</p>
                  </td>
                  <td className="px-6 py-4 border-gray-100">
                    <span className="text-sm text-gray-600">{order.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold
                      ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-700' : 
                        order.status === 'Shipped' ? 'bg-purple-100 text-purple-700' : 
                        order.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 
                        'bg-red-100 text-red-700'}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-gray-800">${order.total.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-lg transition-colors" title="Update Shipping">
                        <Truck size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-[#4DA6FF] hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors" title="Edit Status">
                        <Edit size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500 bg-gray-50/50">
          <span>Showing 1 to 5 of 845 orders</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-200 rounded text-gray-400 cursor-not-allowed">Prevent</button>
            <button className="px-3 py-1 border border-[#4DA6FF] bg-[#4DA6FF] text-white rounded font-medium">1</button>
            <button className="px-3 py-1 border border-gray-200 hover:bg-gray-100 rounded text-gray-600">2</button>
            <button className="px-3 py-1 border border-gray-200 hover:bg-gray-100 rounded text-gray-600">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
