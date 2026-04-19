"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquare, Quote, Heart, BadgeCheck, Loader2, Plus, XCircle, Send, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ReviewSection() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
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
        setReviews(approved); 
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

  const next = () => {
    if (reviews.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }
  };
  const prev = () => {
    if (reviews.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    }
  };

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-4 text-[#024fe7]/20 bg-white">
         <Loader2 className="animate-spin" size={32} />
         <span className="font-black text-[10px] uppercase tracking-[0.4em]">Synchronizing Atmosphere...</span>
      </div>
    );
  }

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-16 gap-10">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black tracking-tighter italic">
              Parent <span className="text-[#024fe7]">Sentiment</span>
            </h2>
            <p className="text-gray-400 font-bold mt-4 max-w-xl">
              Real voices from our community of parents and little explorers.
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="brand-button-primary"
          >
            Share Your Experience
          </button>
        </div>

        {reviews.length > 0 ? (
          <div className="relative group/slider">
             <div className="overflow-hidden rounded-[60px] p-2">
                <motion.div 
                  className="flex gap-8"
                  animate={{ x: `-${currentIndex * (100 / (reviews.length > 3 ? 3 : reviews.length))}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                   {reviews.map((review, idx) => (
                      <motion.div 
                        key={review.id}
                        className="min-w-full md:min-w-[45%] lg:min-w-[31%] brand-card flex flex-col items-start bg-white border border-gray-50 shadow-sm"
                      >
                         <div className="flex gap-1 mb-6 text-[#024fe7]">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={18} className={i < review.rating ? "fill-[#024fe7]" : "text-gray-100"} />
                            ))}
                         </div>
                         <p className="text-black font-medium text-lg leading-relaxed mb-10 italic">
                           "{review.text}"
                         </p>
                         <div className="mt-auto flex items-center gap-4 w-full pt-8 border-t border-gray-50">
                            <div className="w-12 h-12 bg-[#024fe7] text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg">
                              {review.user.charAt(0)}
                            </div>
                            <div className="flex flex-col">
                               <div className="flex items-center gap-2">
                                  <span className="font-black text-black text-sm uppercase italic">{review.user}</span>
                                  <BadgeCheck size={16} className="text-[#024fe7]" />
                               </div>
                               <span className="text-[10px] font-black text-[#024fe7] uppercase tracking-widest">Verified Buyer</span>
                            </div>
                         </div>
                      </motion.div>
                   ))}
                </motion.div>
             </div>
             
             {/* Slider Controls */}
             <div className="absolute top-1/2 -left-4 sm:-left-8 -translate-y-1/2 z-20">
                <button onClick={prev} className="w-12 h-12 sm:w-16 sm:h-16 bg-white border border-gray-100 rounded-full flex items-center justify-center text-black shadow-xl hover:bg-[#024fe7] hover:text-white transition-all">
                  <ChevronLeft size={24} />
                </button>
             </div>
             <div className="absolute top-1/2 -right-4 sm:-right-8 -translate-y-1/2 z-20">
                <button onClick={next} className="w-12 h-12 sm:w-16 sm:h-16 bg-white border border-gray-100 rounded-full flex items-center justify-center text-black shadow-xl hover:bg-[#024fe7] hover:text-white transition-all">
                  <ChevronRight size={24} />
                </button>
             </div>
          </div>
        ) : (
          <div className="py-20 text-center bg-gray-50 rounded-[48px] border-2 border-dashed border-gray-200">
             <p className="text-gray-400 font-bold italic">Synchronizing community sentiment... Check back soon.</p>
          </div>
        )}

        {/* --- FEEDBACK Transmission MODAL --- */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/40 z-[200] flex justify-center items-center p-4 backdrop-blur-xl">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9, y: 40 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.9, y: 40 }}
                 className="bg-white max-w-lg w-full rounded-[48px] shadow-2xl overflow-hidden relative"
               >
                  {submitted ? (
                     <div className="p-20 text-center">
                        <div className="w-24 h-24 bg-blue-50 text-[#024fe7] rounded-3xl flex items-center justify-center mx-auto mb-8 animate-bounce">
                           <CheckCircle2 size={48} />
                        </div>
                        <h3 className="text-3xl font-black text-black tracking-tighter mb-4 italic">Experience <span className="text-[#024fe7]">Captured!</span></h3>
                        <p className="text-gray-400 font-bold italic">Your voice is now pending synchronization.</p>
                     </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="p-10 sm:p-14">
                       <div className="flex justify-between items-center mb-10">
                          <h3 className="text-4xl font-black text-black tracking-tighter italic">Voice <span className="text-[#024fe7]">Capture</span></h3>
                          <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-300 hover:text-black transition-colors"><XCircle size={32}/></button>
                       </div>
                       <div className="space-y-6">
                          <div>
                             <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-3 block">Reporter Identity</label>
                             <input 
                               required
                               type="text" 
                               className="w-full p-5 bg-gray-50 border-2 border-transparent rounded-2xl font-black text-black focus:border-[#024fe7] outline-none transition-all placeholder:text-gray-200"
                               placeholder="YOUR NAME"
                               value={formData.user}
                               onChange={(e) => setFormData({...formData, user: e.target.value.toUpperCase()})}
                             />
                          </div>
                          <div>
                             <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-3 block">Sentiment Rating</label>
                             <div className="flex bg-gray-50 p-5 rounded-2xl items-center justify-center gap-4">
                                {[...Array(5)].map((_, i) => (
                                   <Star 
                                     key={i} 
                                     size={24} 
                                     className={`cursor-pointer transition-all ${i < formData.rating ? 'fill-[#024fe7] text-[#024fe7]' : 'text-gray-200'}`}
                                     onClick={() => setFormData({...formData, rating: i + 1})}
                                   />
                                ))}
                             </div>
                          </div>
                          <div>
                             <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-3 block">Narrative</label>
                             <textarea 
                               required
                               placeholder="The magic of your discovery..." 
                               className="w-full p-6 bg-gray-50 border-2 border-transparent rounded-3xl font-medium text-black focus:border-[#024fe7] outline-none h-32 transition-all placeholder:text-gray-200"
                               value={formData.text}
                               onChange={(e) => setFormData({...formData, text: e.target.value})}
                             />
                          </div>
                          <button type="submit" disabled={submitting} className="brand-button-primary w-full flex items-center justify-center gap-3 disabled:opacity-50">
                             {submitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                             Transmit Voice
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

