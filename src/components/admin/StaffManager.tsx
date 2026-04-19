"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Shield, UserPlus, Search, Loader2, Mail, 
  BadgeCheck, X, Check, Edit2, Trash2, Power, 
  ChevronDown, Phone, Send, Info, ShieldAlert, ShieldCheck
} from 'lucide-react';

export default function StaffManager() {
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  
  const [formData, setFormData] = useState({ 
    name: '', email: '', phone: '', role: 'Staff', status: 'Active' 
  });

  const roles = ["Super Admin", "Admin", "Manager", "Staff", "Support Agent"];

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const res = await fetch('/api/admin/staff');
      const json = await res.json();
      if (json.success) setStaff(json.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingUser ? 'PUT' : 'POST';
    const payload = editingUser ? { ...formData, id: editingUser.id } : formData;

    try {
      const res = await fetch('/api/admin/staff', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setIsModalOpen(false);
        setEditingUser(null);
        setFormData({ name: '', email: '', phone: '', role: 'Staff', status: 'Active' });
        fetchStaff();
      }
    } catch (err) {
      alert("Operational failure in personnel manifest.");
    }
  };

  const handleDelete = async (id: number, role: string) => {
    if (role === "Super Admin") {
      alert("Critical Asset Warning: Super Admin profiles are indestructible.");
      return;
    }
    if (!confirm("Confirm removal of this identity from the ecosystem?")) return;

    try {
      const res = await fetch(`/api/admin/staff?id=${id}`, { method: 'DELETE' });
      if (res.ok) fetchStaff();
      else {
        const json = await res.json();
        alert(json.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openEditModal = (user: any) => {
    setEditingUser(user);
    setFormData({ 
      name: user.name, 
      email: user.email, 
      phone: user.phone || '', 
      role: user.role, 
      status: user.status 
    });
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="py-40 flex flex-col items-center justify-center gap-4 text-gray-300">
         <Loader2 className="animate-spin text-[#024fe7]" size={40} />
         <span className="font-black text-xs uppercase tracking-[0.3em]">Synchronizing Credentials...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
        <div>
           <h2 className="text-5xl font-black text-[#1F2937] tracking-tighter italic">Staff Roles & <span className="text-[#024fe7]">Permissions</span></h2>
           <p className="text-gray-400 font-bold mt-2 leading-relaxed max-w-xl">Restrict page access per user across the admin framework.</p>
        </div>
        <button 
          onClick={() => {
            setEditingUser(null);
            setFormData({ name: '', email: '', phone: '', role: 'Staff', status: 'Active' });
            setIsModalOpen(true);
          }}
          className="bg-[#1F2937] text-white px-10 py-5 rounded-[24px] font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-[#024fe7] transition-all shadow-xl active:scale-95 group"
        >
          <UserPlus size={18} className="group-hover:scale-110 transition-transform"/> Invite Staff
        </button>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-[48px] border border-gray-100 shadow-[0_40px_100px_rgba(0,0,0,0.03)] overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-10 py-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">Member Identity</th>
              <th className="px-10 py-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">Information</th>
              <th className="px-10 py-8 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Permission Role</th>
              <th className="px-10 py-8 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Account Status</th>
              <th className="px-10 py-8 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {staff.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50/20 transition-colors group">
                <td className="px-10 py-8">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-[#1F2937] text-white rounded-[24px] flex items-center justify-center font-black text-xl border-4 border-white shadow-lg group-hover:rotate-6 transition-all duration-500">
                      {member.name.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-black text-[#1F2937] text-lg tracking-tight uppercase">{member.name}</span>
                      <span className="text-[10px] font-black text-[#024fe7] uppercase tracking-widest opacity-60">ID #{member.id.toString().slice(-4)}</span>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-8">
                   <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-gray-500 text-sm font-bold italic">
                         <Mail size={14} className="text-[#024fe7]" /> {member.email}
                      </div>
                      {member.phone && (
                        <div className="flex items-center gap-2 text-gray-400 text-[11px] font-bold">
                           <Phone size={12} /> {member.phone}
                        </div>
                      )}
                   </div>
                </td>
                <td className="px-10 py-8 text-center">
                  <span className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                    member.role === 'Super Admin' 
                    ? 'bg-rose-50 text-rose-600 border-rose-100 shadow-sm shadow-rose-100' 
                    : member.role === 'Admin'
                    ? 'bg-blue-50 text-blue-600 border-blue-100'
                    : 'bg-gray-50 text-gray-500 border-gray-100'
                  }`}>
                    {member.role === 'Super Admin' ? <ShieldAlert size={14} className="fill-rose-600/10" /> : <ShieldCheck size={14} />} {member.role}
                  </span>
                </td>
                <td className="px-10 py-8 text-center">
                  <span className={`font-black text-xs uppercase tracking-tighter flex items-center justify-center gap-2 italic ${member.status === 'Active' ? 'text-emerald-500' : 'text-rose-400'}`}>
                    <div className={`w-2 h-2 rounded-full ${member.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-400'} animate-pulse`} /> {member.status}
                  </span>
                </td>
                <td className="px-10 py-8">
                   <div className="flex items-center justify-end gap-3 translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                      <button onClick={() => openEditModal(member)} className="p-3 bg-white border border-gray-100 text-gray-400 hover:text-[#024fe7] hover:border-[#024fe7] rounded-2xl shadow-sm transition-all"><Edit2 size={16}/></button>
                      <button onClick={() => handleDelete(member.id, member.role)} className="p-3 bg-white border border-gray-100 text-gray-400 hover:text-rose-500 hover:border-rose-500 rounded-2xl shadow-sm transition-all"><Trash2 size={16}/></button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- INVITATION / EDIT MODAL --- */}
      <AnimatePresence>
         {isModalOpen && (
           <div className="fixed inset-0 bg-[#0F172A]/40 z-[200] flex justify-center items-center p-4 backdrop-blur-xl">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                className="bg-white max-w-lg w-full rounded-[64px] shadow-2xl overflow-hidden relative border border-white/20"
              >
                 <div className="p-12 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                       <h3 className="text-4xl font-black text-[#1F2937] tracking-tighter italic">{editingUser ? 'Update' : 'Invite'} <span className="text-[#024fe7]">Staff</span></h3>
                       <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mt-2">Administrative Privilege Request</p>
                    </div>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-300 hover:text-rose-500 transition-colors"><X size={32}/></button>
                 </div>
                 
                 <form onSubmit={handleSubmit} className="p-12 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    <div className="space-y-4">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Full Identity Name</label>
                       <input 
                         required
                         type="text" 
                         className="w-full p-6 bg-gray-50 border-2 border-transparent rounded-[24px] font-black text-[#1F2937] focus:bg-white focus:border-[#024fe7] outline-none transition-all uppercase placeholder:text-gray-200"
                         value={formData.name}
                         onChange={(e) => setFormData({...formData, name: e.target.value})}
                       />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-4">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Digital Mail</label>
                          <input 
                            required
                            type="email" 
                            className="w-full p-6 bg-gray-50 border-2 border-transparent rounded-[24px] font-black text-[#1F2937] focus:bg-white focus:border-[#024fe7] outline-none transition-all placeholder:text-gray-200"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                       </div>
                       <div className="space-y-4">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Phone Link</label>
                          <input 
                            type="text" 
                            className="w-full p-6 bg-gray-50 border-2 border-transparent rounded-[24px] font-black text-[#1F2937] focus:bg-white focus:border-[#024fe7] outline-none transition-all placeholder:text-gray-200"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          />
                       </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-4">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Authority Level</label>
                          <select 
                            className="w-full p-6 bg-gray-50 border-2 border-transparent rounded-[24px] font-black text-[#1F2937] focus:bg-white focus:border-[#024fe7] outline-none transition-all uppercase appearance-none"
                            value={formData.role}
                            onChange={(e) => setFormData({...formData, role: e.target.value as any})}
                          >
                            {roles.map(r => <option key={r} value={r}>{r}</option>)}
                          </select>
                       </div>
                       <div className="space-y-4">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Ecosystem Status</label>
                          <select 
                            className="w-full p-6 bg-gray-50 border-2 border-transparent rounded-[24px] font-black text-[#1F2937] focus:bg-white focus:border-[#024fe7] outline-none transition-all uppercase appearance-none"
                            value={formData.status}
                            onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                          >
                             <option value="Active">Active Asset</option>
                             <option value="Inactive">Deactivated</option>
                          </select>
                       </div>
                    </div>

                    <div className="pt-6 flex gap-4">
                       <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-6 bg-gray-50 text-[#1F2937] rounded-[24px] font-black text-sm uppercase tracking-widest hover:bg-gray-100 transition-all">Cancel</button>
                       <button type="submit" className="flex-[2] py-6 bg-[#1F2937] text-white rounded-[24px] font-black text-sm flex items-center justify-center gap-3 hover:bg-[#024fe7] transition-all shadow-xl active:scale-95 uppercase tracking-widest group">
                          {editingUser ? <Check size={18} /> : <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                          {editingUser ? 'Save Updates' : 'Transmit Invite'}
                       </button>
                    </div>
                 </form>
              </motion.div>
           </div>
         )}
      </AnimatePresence>
    </div>
  );
}
