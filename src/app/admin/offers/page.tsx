"use client";

import { useState, useEffect } from 'react';
import { Plus, Trash2, Ticket, Percent, BadgePercent, Loader2, XCircle, Save, Edit3, ShieldAlert } from 'lucide-react';

export default function AdminOffers() {
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const [formData, setFormData] = useState({
    id: null,
    code: '',
    discount: '',
    type: 'percentage'
  });

  const fetchOffers = async () => {
    try {
      const res = await fetch('/api/offers');
      const json = await res.json();
      if (json.success) setOffers(json.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = isEditMode ? 'PUT' : 'POST';
      const url = isEditMode ? `/api/offers/${formData.id}` : '/api/offers';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsModalOpen(false);
        setIsEditMode(false);
        setFormData({ id: null, code: '', discount: '', type: 'percentage' });
        fetchOffers();
      }
    } catch (err) {
       console.error(err);
    }
  };

  const handleEdit = (offer: any) => {
    setFormData({
      id: offer.id,
      code: offer.code,
      discount: offer.discount.toString(),
      type: offer.type
    });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const deleteOffer = async (id: number) => {
    if (!confirm('Eliminate this promotion campaign?')) return;
    try {
      const res = await fetch(`/api/offers/${id}`, { method: 'DELETE' });
      if (res.ok) fetchOffers();
    } catch (err) {
       console.error(err);
    }
  };

  return (
    <div className="w-full h-full p-4 md:p-8 animate-in fade-in duration-500">
      <div className="mb-12 flex justify-between items-end">
        <div>
           <h2 className="text-4xl font-black text-[#1F2937] tracking-tighter">Promotions Hub</h2>
           <p className="text-gray-400 mt-1 font-medium italic">Configure high-conversion vouchers and seasonal discount codes.</p>
        </div>
        <button 
          onClick={() => { setIsEditMode(false); setFormData({id: null, code:'', discount:'', type:'percentage'}); setIsModalOpen(true); }}
          className="bg-[#1F2937] text-white px-8 py-4 rounded-[20px] font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-2xl hover:bg-[#024fe7] transition-all group active:scale-95"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Launch Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-full py-20 text-center font-bold text-gray-300">Synchronizing Campaigns...</div>
        ) : offers.length === 0 ? (
          <div className="col-span-full py-20 text-center font-bold text-gray-300">No active promotions in current session.</div>
        ) : offers.map((offer) => (
          <div key={offer.id} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm relative group overflow-hidden flex flex-col justify-between min-h-[220px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50/50 rounded-full -translate-y-12 translate-x-12 flex items-center justify-center pt-8 pr-8">
               <Ticket size={48} className="text-gray-100 rotate-12" />
            </div>

            <div className="relative">
               <div className="flex justify-between items-start mb-6">
                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${offer.type === 'percentage' ? 'bg-emerald-50 text-emerald-500' : 'bg-blue-50 text-[#024fe7]'}`}>
                   {offer.type === 'percentage' ? <Percent size={20}/> : <BadgePercent size={20}/>}
                 </div>
                 <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-100">Active</span>
               </div>
               
               <h3 className="text-3xl font-black text-[#1F2937] italic tracking-tight mb-1">{offer.code}</h3>
               <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">{offer.discount}{offer.type === 'percentage' ? '%' : ' FLAT'} SAVINGS</p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
              <div>
                 <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Usage Count</p>
                 <p className="font-black text-[#1F2937] text-sm">{offer.usageCount} REDEMPTIONS</p>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                 <button onClick={() => handleEdit(offer)} className="p-3 text-gray-300 hover:text-[#024fe7] hover:bg-blue-50 rounded-xl transition-all" title="Edit Campaign"><Edit3 size={18}/></button>
                 <button onClick={() => deleteOffer(offer.id)} className="p-3 text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all" title="Wipe Campaign"><Trash2 size={18}/></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- OFFER LAUNCH / EDIT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#0F172A]/50 z-[100] flex justify-center items-center p-4 backdrop-blur-xl animate-in zoom-in duration-300">
           <form onSubmit={handleSubmit} className="bg-white max-w-md w-full rounded-[48px] shadow-2xl overflow-hidden border border-white/20">
              <div className="p-10 bg-gray-50/80 border-b border-gray-100 flex justify-between items-center">
                 <div>
                    <h3 className="text-3xl font-black text-[#1F2937] tracking-tighter italic">{isEditMode ? 'Modify' : 'Launch'} <span className="text-[#024fe7]">Voucher</span></h3>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mt-1">Campaign Configuration</p>
                 </div>
                 <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-300 hover:text-rose-500 transition-colors"><XCircle size={32}/></button>
              </div>
              <div className="p-10 space-y-8">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-2">Display Code</label>
                    <input 
                      type="text" 
                      required
                      placeholder="E.G. SUMMER25" 
                      className="w-full p-5 bg-gray-50 border-2 border-transparent rounded-[24px] font-black text-[#1F2937] uppercase focus:border-[#024fe7] outline-none transition-all placeholder:text-gray-200"
                      value={formData.code}
                      onChange={(e) => setFormData({...formData, code: e.target.value})}
                    />
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-2">Magnitude</label>
                       <input 
                         type="number" 
                         required
                         placeholder="10" 
                         className="w-full p-5 bg-gray-50 border-2 border-transparent rounded-[24px] font-black text-[#1F2937] focus:border-[#024fe7] outline-none transition-all placeholder:text-gray-200"
                         value={formData.discount}
                         onChange={(e) => setFormData({...formData, discount: e.target.value})}
                       />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-2">Formula</label>
                       <select 
                         className="w-full p-5 bg-gray-50 border-2 border-transparent rounded-[24px] font-black text-[#1F2937] focus:border-[#024fe7] outline-none transition-all appearance-none cursor-pointer"
                         value={formData.type}
                         onChange={(e) => setFormData({...formData, type: e.target.value})}
                       >
                          <option value="percentage">Percentage (%)</option>
                          <option value="flat">Flat (₹)</option>
                       </select>
                    </div>
                 </div>

                 <button type="submit" className="w-full py-6 bg-[#1F2937] text-white rounded-[24px] font-black text-sm flex items-center justify-center gap-3 hover:bg-[#024fe7] transition-all shadow-xl active:scale-95 group">
                    {isEditMode ? <Edit3 size={18} /> : <Plus size={18}/>}
                    {isEditMode ? 'COMMIT CHANGES' : 'AUTHORIZE CAMPAIGN'}
                    {isEditMode && <Save size={18} className="ml-auto opacity-40" />}
                 </button>

                 <div className="bg-amber-50 p-4 rounded-2xl flex items-start gap-3 border border-amber-100">
                    <ShieldAlert size={18} className="text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] font-medium text-amber-700 leading-relaxed italic">Campaign adjustments are logged globally. Valid vouchers affect the checkout sequence immediately.</p>
                 </div>
              </div>
           </form>
        </div>
      )}
    </div>
  );
}
