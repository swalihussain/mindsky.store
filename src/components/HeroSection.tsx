"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCmsStore } from '@/store/cmsStore';

export default function HeroSection() {
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
    <section className="w-full bg-white flex flex-col items-center pt-[100px] pb-[48px]">
      
      <motion.div 
        className="w-full md:w-[90%] max-w-5xl h-[240px] md:h-[480px] rounded-[16px] md:rounded-[48px] shadow-2xl hover:shadow-[#024fe7]/20 transition-all duration-1000 overflow-hidden relative border-4 border-white isolate mx-auto"
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

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center mt-8 md:mt-12 px-4">
        <motion.h1 
          className="text-[26px] md:text-5xl lg:text-7xl font-bold text-black leading-[1.3] tracking-tight max-w-[320px] md:max-w-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {data.hero_title || "Smart Name Labels & School Essentials for Kids"}
        </motion.h1>
        
        <motion.p 
          className="text-[16px] md:text-xl text-[#555555] font-normal leading-[1.5] max-w-[300px] md:max-w-3xl mt-[16px] md:mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {data.hero_subtitle || "Make school time fun, organized, and stylish."}
        </motion.p>

        <motion.div 
          className="w-full flex flex-col sm:flex-row justify-center items-center gap-[12px] mt-[24px] md:mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link href="/shop?category=Name%20Slips" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-6 h-[48px] md:h-16 bg-[#024FE7] text-white font-semibold text-base rounded-[12px] transition-all flex items-center justify-center py-[14px]">
               {data.hero_button_text || "Shop Name Slips"}
            </button>
          </Link>

          <Link href="/shop" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-6 h-[48px] md:h-16 bg-white text-black border-2 border-[#024FE7] font-semibold text-base rounded-[12px] transition-all flex items-center justify-center py-[14px]">
               Explore School Essentials
            </button>
          </Link>
        </motion.div>

        {/* Hero Trust Badges */}
        <motion.div
          className="grid grid-cols-2 w-full sm:flex sm:flex-wrap justify-center items-center gap-[8px] mt-10 md:mt-14 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {["Waterproof Labels", "Kid Safe", "Long Lasting", "Premium Print"].map((badge, idx) => (
            <div key={idx} className="flex items-center justify-center gap-2 bg-white px-[8px] py-[8px] rounded-[20px] border border-gray-100 w-full sm:w-auto h-[40px] shadow-sm">
              <div className="w-2 h-2 rounded-full bg-[#024FE7] shrink-0"></div>
              <span className="text-[13px] md:text-base font-medium text-[#555555] truncate">{badge}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
