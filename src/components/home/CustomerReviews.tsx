"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare, Quote, Heart, BadgeCheck } from 'lucide-react';

export default function CustomerReviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('/api/reviews');
        const json = await res.json();
        if (json.success) {
          // Only show approved reviews or those with high ratings
          const approved = json.data.filter((r: any) => r.status === 'Approved');
          setReviews(approved.slice(0, 3)); // Show top 3
        }
      } catch (err) {
        console.error("Review fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading || (reviews.length === 0 && !loading)) {
    return null; // Don't show if no approved reviews exist
  }

  return (
    <section className="py-24 px-4 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
           <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             whileInView={{ opacity: 1, scale: 1 }}
             className="bg-emerald-50 text-emerald-500 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-2 border border-emerald-100"
           >
              <Heart size={14} className="fill-emerald-500" /> Customer Sentiment
           </motion.div>
           <h2 className="text-5xl md:text-6xl font-black text-[#1F2937] tracking-tighter italic mb-4">Real <span className="text-[#024fe7]">Voice</span></h2>
           <p className="text-gray-400 font-bold max-w-xl mx-auto italic">Direct testimonials from our global community of MindSky explorers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {reviews.map((review, idx) => (
             <motion.div 
               key={review.id}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.1 }}
               viewport={{ once: true }}
               className="bg-white p-10 rounded-[48px] border border-gray-100 shadow-sm relative group hover:shadow-xl transition-all duration-700 overflow-hidden"
             >
                <div className="absolute -top-10 -right-10 opacity-[0.03] rotate-12 group-hover:rotate-0 transition-transform duration-1000">
                   <Quote size={200} />
                </div>

                <div className="flex gap-1 mb-6">
                   {[...Array(5)].map((_, i) => (
                     <Star 
                       key={i} 
                       size={18} 
                       className={`${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-100'}`} 
                     />
                   ))}
                </div>

                <p className="text-[#1F2937] font-bold text-lg leading-relaxed mb-8 italic relative z-10">
                   "{review.text}"
                </p>

                <div className="flex items-center gap-4 border-t border-gray-50 pt-8 mt-auto">
                   <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-xl font-black text-gray-400 uppercase">
                      {review.user.charAt(0)}
                   </div>
                   <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                         <span className="font-black text-[#1F2937] text-sm uppercase tracking-tight">{review.user}</span>
                         <BadgeCheck size={14} className="text-[#024fe7]" />
                      </div>
                      <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest mt-1">Verified Purchase</span>
                   </div>
                </div>

                <div className="mt-6">
                   <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                      RE: {review.product}
                   </span>
                </div>
             </motion.div>
           ))}
        </div>

        <div className="mt-20 flex justify-center">
           <div className="flex items-center gap-3 bg-white px-8 py-4 rounded-[24px] shadow-sm border border-gray-100">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Global Satisfaction Score:</span>
              <div className="flex items-center gap-2">
                 <span className="font-black text-[#1F2937] text-lg">4.9/5.0</span>
                 <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-emerald-500 text-emerald-500" />)}
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
