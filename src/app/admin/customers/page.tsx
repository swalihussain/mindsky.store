"use client";

import { useState, useEffect } from 'react';
import { Edit, Trash2, Eye, UserCheck, Mail, Phone, ShoppingBag, Loader2, Search, MapPin, Calendar, DollarSign, XCircle, Save, Filter } from 'lucide-react';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [segmentFilter, setSegmentFilter] = useState("All");

  const [selectedCust, setSelectedCust] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const fetchData = async () => {
    try {
      const [custRes, ordRes] = await Promise.all([
        fetch('/api/customers'),
        fetch('/api/orders')
      ]);
      const custJson = await custRes.json();
      const ordJson = await ordRes.json();
      if (custJson.success) setCustomers(custJson.data);
      if (ordJson.success) setAllOrders(ordJson.data);
    } catch (err) {
      console.error("Data Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = async () => {
    try {
      const res = await fetch(`/api/customers/${editData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData)
      });
      if (res.ok) {
        setIsEditMode(false);
        fetchData();
        setSelectedCust(editData);
      }
    } catch (err) {
       console.error("Update Error:", err);
    }
  };

  const handleDelete = async (id: any) => {
    if (!confirm('Permanent delete this customer profile? This action cannot be undone.')) return;
    try {
      const res = await fetch(`/api/customers/${id}`, { method: 'DELETE' });
      if (res.ok) fetchData();
    } catch (err) {
       console.error("Delete Error:", err);
    }
  };

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery);
    
    if (segmentFilter === 'New') {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      if (new Date(c.created_at) < sevenDaysAgo) return false;
    }
    if (segmentFilter === 'Returning' && c.total_orders <= 1) return false;
    if (segmentFilter === 'HighSpending' && c.total_spend < 50000) return false;

    return matchesSearch;
  });

  const getCustomerOrders = (name: string) => {
    return allOrders.filter(o => o.customer_name === name);
  };

  return (
    <div className="w-full h-full p-4 md:p-8 animate-in fade-in duration-500">
      
      {/* Header Controls */}
      <div className="mb-12 flex flex-col xl:flex-row xl:items-center justify-between gap-8">
        <div>
           <h2 className="text-4xl font-black text-[#1F2937] tracking-tighter">Client Ecosystem</h2>
           <p className="text-gray-400 mt-1 font-medium italic">Monitor user lifetime value and lifecycle engagement.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
           {/* Search */}
           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input 
                type="text" 
                placeholder="Name, Email, or Phone..." 
                className="pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl w-full sm:w-72 focus:ring-2 focus:ring-[#024fe7]/10 focus:border-[#024fe7] outline-none shadow-sm font-bold text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
           </div>

           {/* Filter Segments */}
           <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm">
             {['All', 'New', 'Returning', 'HighSpending'].map(f => (
               <button 
                 key={f}
                 onClick={() => setSegmentFilter(f)}
                 className={`px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${segmentFilter === f ? 'bg-[#1F2937] text-white shadow-lg' : 'text-gray-400 hover:text-[#1F2937]'}`}
               >
                 {f === 'HighSpending' ? 'Whales 🐋' : f}
               </button>
             ))}
           </div>
        </div>
      </div>

      {/* Main Grid/Table */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex-1 flex flex-col min-h-[600px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
                <th className="p-6 pl-10">Client Identity</th>
                <th className="p-6">Digital Contact</th>
                <th className="p-6">Mobile Uplink</th>
                <th className="p-6">Protocol Volume</th>
                <th className="p-6 pr-10 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={5} className="p-20 text-center font-bold text-gray-300 italic">Synchronizing User Profiles...</td></tr>
              ) : filteredCustomers.length === 0 ? (
                <tr><td colSpan={5} className="p-20 text-center font-bold text-gray-200 italic text-xl">No profiles match session parameters.</td></tr>
              ) : filteredCustomers.map((usr) => (
                <tr key={usr.id} className="hover:bg-gray-50/50 transition-all group">
                  <td className="p-6 pl-10">
                    <div className="flex items-center gap-5">
                       <div className="w-14 h-14 bg-white border-2 border-gray-50 rounded-[20px] flex items-center justify-center font-black text-[#024fe7] text-xl shadow-inner group-hover:scale-110 transition-transform">
                          {usr.name.charAt(0)}
                       </div>
                       <div className="flex flex-col">
                          <span className="font-black text-[#1F2937] text-lg leading-none mb-2">{usr.name}</span>
                          <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest self-start">ID: {usr.id.toString().slice(-4)}</span>
                       </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2 text-gray-500 font-bold text-sm">
                       <Mail size={14} className="text-gray-300" /> {usr.email}
                    </div>
                  </td>
                  <td className="p-6 text-gray-400 font-black text-[10px] tracking-[0.2em]">
                    {usr.phone}
                  </td>
                  <td className="p-6">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border shadow-sm ${usr.total_orders > 10 ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-gray-50 text-gray-400 border-gray-100'}`}>
                       <ShoppingBag size={14} />
                       <span className="font-black text-[10px] uppercase tracking-widest">{usr.total_orders} Transactions</span>
                    </div>
                  </td>
                  <td className="p-6 pr-10 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => {setSelectedCust(usr); setIsViewModalOpen(true);}} className="p-3 text-gray-300 hover:text-[#024fe7] hover:bg-blue-50 rounded-xl transition-all" title="View Full Ledger"><Eye size={22}/></button>
                      <button onClick={() => {setSelectedCust(usr); setEditData(usr); setIsEditMode(true); setIsViewModalOpen(true);}} className="p-3 text-gray-300 hover:text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all" title="Edit Profile"><Edit size={22}/></button>
                      <button onClick={() => handleDelete(usr.id)} className="p-3 text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all" title="Purge Record"><Trash2 size={22}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- CUSTOMER DETAIL / EDIT MODAL --- */}
      {isViewModalOpen && selectedCust && (
        <div className="fixed inset-0 bg-[#0F172A]/50 z-[100] flex justify-center items-center p-4 backdrop-blur-xl animate-in zoom-in duration-300">
           <div className="bg-white max-w-2xl w-full rounded-[48px] shadow-2xl overflow-hidden flex flex-col border border-white/20 max-h-[90vh]">
              
              <div className="p-10 bg-gray-50/80 border-b border-gray-100 flex justify-between items-center">
                 <div>
                    <h3 className="text-3xl font-black text-[#1F2937] tracking-tighter italic">Client <span className="text-[#024fe7]">Registry</span></h3>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mt-2 flex items-center gap-2">
                       <Calendar size={14} /> Registered: {new Date(selectedCust.created_at).toLocaleDateString()}
                    </p>
                 </div>
                 <button onClick={() => {setIsViewModalOpen(false); setIsEditMode(false);}} className="w-12 h-12 flex items-center justify-center text-gray-300 hover:text-rose-500 hover:bg-white rounded-full transition-all border border-transparent shadow-sm"><XCircle size={32}/></button>
              </div>

              <div className="p-10 overflow-y-auto">
                 {isEditMode ? (
                   <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-2">Legal Name</label>
                           <input type="text" className="w-full p-5 bg-gray-50 border-2 border-gray-100 rounded-[24px] font-black text-[#1F2937] outline-none focus:border-[#024fe7] transition-all" value={editData?.name} onChange={(e) => setEditData({...editData, name: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-2">Digital Mail</label>
                           <input type="email" className="w-full p-5 bg-gray-50 border-2 border-gray-100 rounded-[24px] font-black text-[#1F2937] outline-none focus:border-[#024fe7] transition-all" value={editData?.email} onChange={(e) => setEditData({...editData, email: e.target.value})} />
                        </div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-2">Mobile Uplink</label>
                         <input type="text" className="w-full p-5 bg-gray-50 border-2 border-gray-100 rounded-[24px] font-black text-[#1F2937] outline-none focus:border-[#024fe7] transition-all" value={editData?.phone} onChange={(e) => setEditData({...editData, phone: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-2">Physical Coordinates (Address)</label>
                         <textarea className="w-full p-5 bg-gray-50 border-2 border-gray-100 rounded-[24px] font-medium text-gray-600 outline-none focus:border-[#024fe7] transition-all h-32" value={editData?.address} onChange={(e) => setEditData({...editData, address: e.target.value})} />
                      </div>
                      <button onClick={handleUpdate} className="w-full py-6 bg-[#1F2937] text-white rounded-[24px] font-black text-sm flex items-center justify-center gap-3 hover:bg-emerald-600 transition-all shadow-xl">
                         <Save size={20} /> COMMITTED UPDATE TO DB
                      </button>
                   </div>
                 ) : (
                   <div className="space-y-12">
                      <div className="grid grid-cols-2 gap-10">
                         <div className="space-y-6">
                            <div className="flex items-center gap-5">
                               <div className="w-20 h-20 bg-blue-50 text-[#024fe7] rounded-[28px] flex items-center justify-center font-black text-3xl shadow-inner">{selectedCust.name.charAt(0)}</div>
                               <div>
                                  <h4 className="text-2xl font-black text-[#1F2937] tracking-tighter">{selectedCust.name}</h4>
                                  <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border border-emerald-100">Verified Client</span>
                               </div>
                            </div>
                            <div className="space-y-4 pt-4">
                               <div className="flex items-center gap-3 text-gray-500 font-bold text-sm"><Mail size={16} className="text-gray-300"/> {selectedCust.email}</div>
                               <div className="flex items-center gap-3 text-gray-500 font-bold text-sm"><Phone size={16} className="text-gray-300"/> {selectedCust.phone}</div>
                               <div className="flex items-start gap-3 text-gray-400 font-medium text-xs leading-relaxed"><MapPin size={18} className="text-gray-300 shrink-0"/> {selectedCust.address}</div>
                            </div>
                         </div>
                         <div className="bg-gray-50 rounded-[32px] p-8 flex flex-col justify-center items-center text-center">
                            <div className="text-[11px] font-black text-gray-300 uppercase tracking-[0.3em] mb-4">Life-Time Settle</div>
                            <div className="text-5xl font-black text-[#1F2937] tracking-tighter flex items-start gap-1">
                               <span className="text-xl mt-2">₹</span> {Number(selectedCust.total_spend).toLocaleString()}
                            </div>
                            <div className="mt-6 flex items-center gap-6">
                               <div className="flex flex-col">
                                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Transactions</span>
                                  <span className="font-black text-[#1F2937]">{selectedCust.total_orders}</span>
                               </div>
                               <div className="w-px h-8 bg-gray-200"></div>
                               <div className="flex flex-col">
                                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">AOV</span>
                                  <span className="font-black text-[#1F2937]">₹{(selectedCust.total_spend / selectedCust.total_orders).toFixed(0)}</span>
                               </div>
                            </div>
                         </div>
                      </div>

                      <div>
                         <h5 className="text-sm font-black text-[#1F2937] uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                            <ShoppingBag size={18} className="text-[#024fe7]" /> Protocol Order History
                         </h5>
                         <div className="bg-gray-50 rounded-[32px] overflow-hidden border border-gray-100">
                            <table className="w-full text-left">
                               <thead>
                                  <tr className="border-b border-gray-100 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                                     <th className="p-4 pl-8">Sequence ID</th>
                                     <th className="p-4">Global Date</th>
                                     <th className="p-4">Settlement</th>
                                     <th className="p-4 pr-8 text-right">Fulfillment</th>
                                  </tr>
                               </thead>
                               <tbody>
                                  {getCustomerOrders(selectedCust.name).length === 0 ? (
                                    <tr><td colSpan={4} className="p-10 text-center text-gray-300 font-bold italic">No active orders detected for this entity.</td></tr>
                                  ) : getCustomerOrders(selectedCust.name).map((ord) => (
                                    <tr key={ord.id} className="text-xs border-b border-gray-100/50 last:border-0">
                                       <td className="p-4 pl-8 font-black text-[#024fe7] tracking-tighter">{ord.id}</td>
                                       <td className="p-4 font-bold text-gray-400 uppercase leading-none">{new Date(ord.created_at).toLocaleDateString()}</td>
                                       <td className="p-4 font-black text-[#1F2937]">₹{Number(ord.total_amount).toFixed(2)}</td>
                                       <td className="p-4 pr-8 text-right">
                                          <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${ord.order_status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>{ord.order_status}</span>
                                       </td>
                                    </tr>
                                  ))}
                               </tbody>
                            </table>
                         </div>
                      </div>
                   </div>
                 )}
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
