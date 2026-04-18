"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquare, Quote, Heart, BadgeCheck, Loader2, Plus, XCircle, Send, CheckCircle2 } from 'lucide-react';

export default function Reviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    user: '',
    product: '',
    text: '',
    rating: 5
  });

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      const json = await res.json();
      if (json.success) {
        const approved = json.data.filter((r: any) => r.status === 'Approved');
        setReviews(approved.slice(0, 3)); 
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setIsModalOpen(false);
          setSubmitted(false);
          setFormData({ user: '', product: '', text: '', rating: 5 });
        }, 2500);
      }
    } catch (err) {
      alert("Submission protocol failed.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-4 text-gray-200">
         <Loader2 className="animate-spin" size={32} />
         <span className="font-black text-[10px] uppercase tracking-[0.4em]">Synchronizing Atmosphere...</span>
      </div>
    );
  }

  return (
    <section className="py-32 px-4 bg-gray-50/50 relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#024fe7] rounded-full blur-[160px] opacity-[0.03] -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col items-center text-center mb-20">
           <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             whileInView={{ opacity: 1, scale: 1 }}
             className="bg-emerald-50 text-emerald-500 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-8 flex items-center gap-3 border border-emerald-100 shadow-sm"
           >
              <Heart size={14} className="fill-emerald-500" /> Community Sentiment
           </motion.div>
           <h2 className="text-6xl md:text-7xl font-black text-[#1F2937] tracking-tighter italic mb-4">Real <span className="text-[#024fe7]">Voice.</span></h2>
           <p className="text-gray-400 font-bold max-w-xl mx-auto italic leading-relaxed opacity-60">Verified testimonials from our global ecosystem of parents and explorers.</p>
           
           <button 
             onClick={() => setIsModalOpen(true)}
             className="mt-12 bg-[#1F2937] text-white px-10 py-5 rounded-[24px] font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-[#024fe7] transition-all shadow-xl active:scale-95 group"
           >
              <Plus size={18} className="group-hover:rotate-90 transition-transform"/> Write My Experience
           </button>
        </div>

        {reviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
             <AnimatePresence>
                {reviews.map((review, idx) => (
                  <motion.div 
                    key={review.id}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: idx * 0.15, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-white p-12 rounded-[56px] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] relative group hover:shadow-[0_40px_80px_rgba(0,0,0,0.05)] hover:-translate-y-3 transition-all duration-1000 overflow-hidden flex flex-col min-h-[440px]"
                  >
                     <div className="absolute -top-12 -right-12 opacity-[0.03] rotate-12 group-hover:rotate-0 transition-transform duration-1000 pointer-events-none">
                        <Quote size={280} />
                     </div>
                     <div className="flex gap-1.5 mb-8">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={20} className={`${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-100'}`} />
                        ))}
                     </div>
                     <p className="text-[#1F2937] font-bold text-xl leading-[1.6] mb-12 italic relative z-10 tracking-tight">"{review.text}"</p>
                     <div className="flex items-center gap-4 border-t border-gray-50 pt-10 mt-auto bg-white/50 backdrop-blur-sm px-2">
                        <div className="w-14 h-14 bg-[#1F2937] text-white rounded-[24px] flex items-center justify-center text-2xl font-black shadow-lg uppercase">{review.user.charAt(0)}</div>
                        <div className="flex flex-col text-left">
                           <div className="flex items-center gap-2">
                              <span className="font-black text-[#1F2937] text-base uppercase tracking-tighter">{review.user}</span>
                              <BadgeCheck size={16} className="text-[#024fe7] fill-[#024fe7]/10" />
                           </div>
                           <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1.5">Verified Explorer</span>
                        </div>
                     </div>
                  </motion.div>
                ))}
             </AnimatePresence>
          </div>
        )}

        {/* --- FEEDBACK TRANSMission MODAL --- */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 bg-[#0F172A]/60 z-[200] flex justify-center items-center p-4 backdrop-blur-xl transition-all duration-300">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9, y: 40 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.9, y: 40 }}
                 className="bg-white max-w-lg w-full rounded-[64px] shadow-2xl overflow-hidden relative border border-white/20"
               >
                  {submitted ? (
                     <div className="p-20 text-center animate-in zoom-in duration-500">
                        <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
                           <CheckCircle2 size={48} className="animate-pulse"/>
                        </div>
                        <h3 className="text-3xl font-black text-[#1F2937] tracking-tighter mb-4 italic">Experience <span className="text-emerald-500">Captured!</span></h3>
                        <p className="text-gray-400 font-bold italic">Your voice is now pending moderator authorization.</p>
                     </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                       <div className="p-12 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center">
                          <div>
                             <h3 className="text-4xl font-black text-[#1F2937] tracking-tighter italic">Voice <span className="text-[#024fe7]">Capture</span></h3>
                             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mt-2">Global Community Submission</p>
                          </div>
                          <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-300 hover:text-rose-500 transition-colors"><XCircle size={40}/></button>
                       </div>
                       <div className="p-12 space-y-8">
                          <div className="grid grid-cols-2 gap-6">
                             <div className="space-y-4">
                                <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-2">Public Name</label>
                                <input 
                                  required
                                  type="text" 
                                  placeholder="E.G. SWALIH H." 
                                  className="w-full p-6 bg-gray-50 border-2 border-transparent rounded-[24px] font-black text-[#1F2937] focus:bg-white focus:border-[#024fe7] outline-none transition-all uppercase placeholder:text-gray-200"
                                  value={formData.user}
                                  onChange={(e) => setFormData({...formData, user: e.target.value})}
                                />
                             </div>
                             <div className="space-y-4">
                                <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-2">Exploration Goal</label>
                                <div className="flex bg-gray-50 p-6 rounded-[24px] items-center justify-center gap-2">
                                   {[...Array(5)].map((_, i) => (
                                      <Star 
                                        key={i} 
                                        size={22} 
                                        className={`cursor-pointer transition-all hover:scale-125 ${i < formData.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200 hover:text-amber-200'}`}
                                        onClick={() => setFormData({...formData, rating: i + 1})}
                                      />
                                   ))}
                                </div>
                             </div>
                          </div>
                          <div className="space-y-4">
                             <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-2">Narrative of Experience</label>
                             <textarea 
                               required
                               placeholder="Tell us about the magic of your discovery..." 
                               className="w-full p-8 bg-gray-50 border-2 border-transparent rounded-[32px] font-medium text-[#1F2937] focus:bg-white focus:border-[#024fe7] outline-none h-40 transition-all leading-relaxed placeholder:text-gray-300"
                               value={formData.text}
                               onChange={(e) => setFormData({...formData, text: e.target.value})}
                             />
                          </div>
                          <button type="submit" disabled={submitting} className="w-full py-6 bg-[#1F2937] text-white rounded-[24px] font-black text-sm flex items-center justify-center gap-3 hover:bg-[#024fe7] transition-all shadow-[0_20px_40px_rgba(0,0,0,0.1)] active:scale-95 group disabled:opacity-50 uppercase">
                             {submitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                             Transmit Experience
                          </button>
                       </div>
                    </form>
                  )}
               </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
