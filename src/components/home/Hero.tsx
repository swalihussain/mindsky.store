"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCmsStore } from '@/store/cmsStore';

export default function Hero() {
  const { data, fetchCMS } = useCmsStore();
  const [banners, setBanners] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchCMS();
    // Fetch live banners from the dedicated API
    const fetchBanners = async () => {
      try {
        const res = await fetch('/api/banners');
        const json = await res.json();
        if (json.success) {
          const active = json.data.filter((b: any) => b.isActive);
          setBanners(active);
        }
      } catch (err) {
        console.error("Banner fetch error:", err);
      }
    };
    fetchBanners();
  }, [fetchCMS]);

  // Auto-slide logic
  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners]);

  const defaultImage = "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1920&h=800&fit=crop&fm=webp";

  return (
    <section className="w-full bg-white flex flex-col items-center pt-[100px] pb-[40px]">
      
      <motion.div 
        className="w-[90%] max-w-5xl h-[240px] md:h-[480px] rounded-[48px] shadow-2xl hover:shadow-[#024fe7]/20 transition-all duration-1000 overflow-hidden relative border-4 border-white isolate"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <AnimatePresence mode="wait">
          {banners.length > 0 && banners[currentIndex] ? (
            <motion.div
              key={banners[currentIndex].id}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
               <img 
                 src={banners[currentIndex].imageUrl} 
                 alt={banners[currentIndex].title}
                 className="w-full h-full object-cover"
                 loading="lazy"
               />
               <Link href={banners[currentIndex].link || "#"} className="absolute inset-0 cursor-pointer z-10" />
            </motion.div>
          ) : (
            <motion.img 
              key="default"
              src={defaultImage}
              alt="MindSky Store Default Banner"
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
            />
          )}
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937]/50 to-transparent pointer-events-none"></div>
        
        {/* Navigation Indicators */}
        {banners.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {banners.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/40'}`}
              />
            ))}
          </div>
        )}
      </motion.div>

      <div className="w-[90%] max-w-4xl mx-auto flex flex-col items-center text-center mt-12 px-4">
        <motion.h1 
          className="text-5xl md:text-6xl lg:text-7xl font-black text-[#1F2937] leading-[1.1] tracking-tighter italic"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {data.hero_title || "Fun, Fashion & Learning for Every Kid"}
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-gray-500 font-bold leading-relaxed max-w-3xl mt-8 opacity-80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {data.hero_subtitle || "Discover play-tested, parent-approved gear from toys to trendy clothing at MindSky.store!"}
        </motion.p>

        <motion.div 
          className="w-full flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link href={data.hero_link || "/shop"} className="group relative">
            <div className="absolute inset-x-0 bottom-0 h-2 bg-[#1F2937]/10 rounded-full blur-xl group-hover:bg-[#024fe7]/20 transition-all"></div>
            <button className="relative px-12 h-20 bg-[#1F2937] hover:bg-[#024fe7] text-white font-black text-xl rounded-full shadow-2xl transition-all flex items-center justify-center gap-4 group-hover:-translate-y-2 group-active:scale-95 border-4 border-white/5 tracking-tight uppercase">
               {data.hero_button_text || "ENTER STORE"}
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
