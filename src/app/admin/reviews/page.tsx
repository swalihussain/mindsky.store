"use client";

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Star, MessageSquare, ShieldAlert, Loader2, User, Package, Pencil, Save, Trash2, X } from 'lucide-react';

export default function AdminReviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      const json = await res.json();
      if (json.success) setReviews(json.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const moderate = async (id: number, status: string) => {
    try {
      const res = await fetch('/api/reviews', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
      if (res.ok) fetchReviews();
    } catch (err) {
       console.error(err);
    }
  };

  const handleEdit = (rev: any) => {
    setEditingReview({ ...rev });
    setIsModalOpen(true);
  };

  const saveEdit = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingReview)
      });
      if (res.ok) {
        setIsModalOpen(false);
        fetchReviews();
      }
    } catch (err) {
       console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const deleteReview = async (id: number) => {
    if (!confirm('Permanent retire this feedback record?')) return;
    try {
      const res = await fetch(`/api/reviews?id=${id}`, { method: 'DELETE' });
      if (res.ok) fetchReviews();
    } catch (err) {
       console.error(err);
    }
  };

  return (
    <div className="w-full h-full p-4 md:p-8 animate-in fade-in duration-500">
      
      {/* HUD Header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <h2 className="text-4xl font-black text-[#1F2937] tracking-tighter italic">Social <span className="text-[#024fe7]">Feedback</span></h2>
           <p className="text-gray-400 mt-1 font-medium italic">Monitor sentiment, verify authenticity, and curate community dialogue.</p>
        </div>
        <div className="bg-amber-50 px-6 py-3 rounded-[24px] border border-amber-100 flex items-center gap-3 shadow-sm">
           <ShieldAlert size={20} className="text-amber-500" />
           <span className="text-[10px] font-black uppercase tracking-widest text-amber-700">{reviews.filter(r => r.status === 'Pending').length} Pending Sequence Authorizations</span>
        </div>
      </div>

      <div className="bg-white rounded-[48px] border border-gray-100 shadow-sm overflow-hidden flex-1 flex flex-col min-h-[500px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
                <th className="p-8 pl-12">Correspondent</th>
                <th className="p-8">Product Context</th>
                <th className="p-8">Content Sentiment</th>
                <th className="p-8">Rating Scope</th>
                <th className="p-8 pr-12 text-right">Moderation Protocol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={5} className="p-20 text-center font-bold text-gray-300 italic animate-pulse">Decoding User Sentiment...</td></tr>
              ) : reviews.length === 0 ? (
                <tr><td colSpan={5} className="p-20 text-center font-bold text-gray-300 italic">No feedback entries captured for current epoch.</td></tr>
              ) : reviews.map((rev) => (
                <tr key={rev.id} className="hover:bg-gray-50/50 transition-all group">
                  <td className="p-8 pl-12">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-blue-50 text-[#024fe7] rounded-[18px] flex items-center justify-center font-black text-lg shadow-inner">{rev.user.charAt(0)}</div>
                       <span className="font-black text-[#1F2937] text-base tracking-tight uppercase">{rev.user}</span>
                    </div>
                  </td>
                  <td className="p-8 font-black text-[#024fe7] text-xs tracking-widest uppercase">
                    <div className="flex items-center gap-2">
                       <Package size={14} className="opacity-40" /> {rev.product}
                    </div>
                  </td>
                  <td className="p-8">
                    <div className="text-gray-500 text-sm italic max-w-xs leading-relaxed group-hover:text-gray-900 transition-colors">
                       "{rev.text}"
                    </div>
                  </td>
                  <td className="p-8">
                    <div className="flex items-center gap-1">
                       {[...Array(5)].map((_, i) => (
                         <Star key={i} size={16} fill={i < rev.rating ? "#FFD966" : "none"} className={i < rev.rating ? "text-[#FFD966]" : "text-gray-100"} />
                       ))}
                    </div>
                  </td>
                  <td className="p-8 pr-12 text-right">
                    <div className="flex justify-end gap-2 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <button 
                        onClick={() => handleEdit(rev)}
                        className="p-3 bg-gray-50 text-gray-400 hover:text-[#024fe7] hover:bg-white rounded-xl transition-all border border-transparent hover:border-blue-100"
                        title="Edit Review"
                      >
                         <Pencil size={20}/>
                      </button>
                      <button 
                        onClick={() => deleteReview(rev.id)}
                        className="p-3 bg-gray-50 text-gray-400 hover:text-rose-500 hover:bg-white rounded-xl transition-all border border-transparent hover:border-rose-100"
                        title="Retire Asset"
                      >
                         <Trash2 size={20}/>
                      </button>
                      
                      <div className="w-px h-10 bg-gray-100 mx-2"></div>

                      {rev.status === 'Pending' ? (
                        <>
                          <button onClick={() => moderate(rev.id, 'Approved')} className="px-6 py-3 bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white rounded-[18px] text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all border border-emerald-100 shadow-sm"><CheckCircle size={16}/> Authorize</button>
                          <button onClick={() => moderate(rev.id, 'Rejected')} className="px-6 py-3 bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white rounded-[18px] text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all border border-rose-100 shadow-sm"><XCircle size={16}/> Deny</button>
                        </>
                      ) : (
                         <span className={`px-5 py-2.5 rounded-[16px] text-[10px] font-black uppercase tracking-widest border ${rev.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>{rev.status}</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- REVIEW EDITOR MODAL --- */}
      {isModalOpen && editingReview && (
        <div className="fixed inset-0 bg-[#0F172A]/40 z-[200] flex justify-center items-center p-4 backdrop-blur-xl animate-in zoom-in duration-300">
           <div className="bg-white max-w-xl w-full rounded-[64px] shadow-2xl overflow-hidden border border-white/20">
              <div className="p-12 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                 <div>
                    <h3 className="text-4xl font-black text-[#1F2937] tracking-tighter italic">Review <span className="text-[#024fe7]">Editor</span></h3>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mt-2">Sentiment Manifest Realignment</p>
                 </div>
                 <button onClick={() => setIsModalOpen(false)} className="text-gray-300 hover:text-rose-500 border border-transparent p-2 rounded-full hover:bg-white transition-all shadow-sm"><X size={32}/></button>
              </div>
              <div className="p-12 space-y-10">
                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-2">Correspondent Identity</label>
                    <input 
                      type="text" 
                      className="w-full p-6 bg-gray-50 border-2 border-transparent rounded-[24px] font-black text-[#1F2937] focus:bg-white focus:border-[#024fe7] outline-none transition-all"
                      value={editingReview.user}
                      onChange={(e) => setEditingReview({...editingReview, user: e.target.value})}
                    />
                 </div>

                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-2">Narrative Content</label>
                    <textarea 
                      className="w-full p-8 bg-gray-50 border-2 border-transparent rounded-[32px] font-medium text-[#1F2937] focus:bg-white focus:border-[#024fe7] outline-none h-40 transition-all leading-relaxed shadow-inner"
                      value={editingReview.text}
                      onChange={(e) => setEditingReview({...editingReview, text: e.target.value})}
                    />
                 </div>

                 <div className="flex justify-between items-center bg-gray-50 p-6 rounded-[24px]">
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Sentiment Scope</span>
                    <div className="flex gap-2">
                       {[...Array(5)].map((_, i) => (
                         <Star 
                           key={i} 
                           size={24} 
                           fill={i < editingReview.rating ? "#FFD966" : "none"} 
                           className={`cursor-pointer transition-transform hover:scale-125 ${i < editingReview.rating ? "text-[#FFD966]" : "text-gray-200"}`}
                           onClick={() => setEditingReview({...editingReview, rating: i + 1})}
                         />
                       ))}
                    </div>
                 </div>

                 <button 
                   onClick={saveEdit} 
                   disabled={saving}
                   className="w-full py-7 bg-[#1F2937] text-white rounded-[28px] font-black text-sm flex items-center justify-center gap-3 hover:bg-[#024fe7] transition-all shadow-xl shadow-blue-100 active:scale-95 disabled:opacity-50 uppercase tracking-widest"
                 >
                    {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    Authorize Realignment
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
