"use client";

import { useState } from 'react';
import { Search, Filter, Ban, Mail, Eye } from 'lucide-react';
import Image from 'next/image';

const mockCustomers = [
  { id: 'CUST-001', name: 'Sarah Jenkins', email: 'sarah@example.com', orders: 12, spent: 845.50, joinDate: '2025-11-10', status: 'Active', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100' },
  { id: 'CUST-002', name: 'Michael Thompson', email: 'm.thompson@example.com', orders: 4, spent: 210.00, joinDate: '2026-01-15', status: 'Active', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100' },
  { id: 'CUST-003', name: 'Jessica Wong', email: 'jwong@example.com', orders: 1, spent: 245.50, joinDate: '2026-04-09', status: 'Active', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100' },
  { id: 'CUST-004', name: 'David Smith', email: 'david.s@example.com', orders: 0, spent: 0, joinDate: '2026-04-08', status: 'Blocked', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100' },
];

export default function AdminCustomersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-heading font-extrabold text-gray-800">Customer Management</h2>
          <p className="text-gray-500 mt-1">View user accounts, order history, and manage access.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, email, or ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#4DA6FF] transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors w-full sm:w-auto justify-center">
            <Filter size={18} /> Filter List
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm font-medium uppercase tracking-wider">
                <th className="px-6 py-4 font-heading">Customer</th>
                <th className="px-6 py-4 font-heading">Total Orders</th>
                <th className="px-6 py-4 font-heading">Total Spent</th>
                <th className="px-6 py-4 font-heading">Joined</th>
                <th className="px-6 py-4 font-heading">Status</th>
                <th className="px-6 py-4 font-heading text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 relative rounded-full overflow-hidden border border-gray-200 shrink-0">
                        <Image src={cust.avatar} alt={cust.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 text-sm">{cust.name}</p>
                        <p className="text-xs text-gray-400">{cust.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-gray-600">{cust.orders}</span>
                  </td>
                  <td className="px-6 py-4 border-gray-100">
                    <span className="font-bold text-[#4DA6FF]">${cust.spent.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4 border-gray-100">
                    <span className="text-sm text-gray-500">{cust.joinDate}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold
                      ${cust.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                    >
                      {cust.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-[#4DA6FF] hover:bg-blue-50 rounded-lg transition-colors" title="Send Email">
                        <Mail size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-[#4DA6FF] hover:bg-blue-50 rounded-lg transition-colors" title="View Profile">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title={cust.status === 'Active' ? 'Block User' : 'Unblock User'}>
                        <Ban size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
