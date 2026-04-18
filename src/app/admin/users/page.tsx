"use client";

import { Shield, Plus } from 'lucide-react';

export default function PermissionsPage() {
  const staff = [
    { name: "Admin Setup", email: "admin@global.store", role: "Super Admin", status: "Active" },
    { name: "Support Agent", email: "support@global.store", role: "Staff", status: "Active" },
  ];

  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-heading font-extrabold text-gray-900">Staff Roles & Permissions</h2>
          <p className="text-gray-500 mt-1">Restrict page access per user across the admin framework.</p>
        </div>
        <button className="bg-gray-900 text-white px-4 py-2.5 rounded-xl font-bold flex items-center gap-2">
          <Plus size={20} /> Invite Staff
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
              <th className="p-4 pl-6">Member Identity</th>
              <th className="p-4">Permission Role</th>
              <th className="p-4">Account Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {staff.map((st, i) => (
              <tr key={i}>
                <td className="p-4 pl-6">
                   <div className="font-bold text-gray-800">{st.name}</div>
                   <div className="text-sm font-medium text-gray-500">{st.email}</div>
                </td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-max ${st.role === 'Super Admin' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                    {st.role === 'Super Admin' && <Shield size={12}/>} {st.role}
                  </span>
                </td>
                <td className="p-4 text-green-600 font-bold">{st.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
