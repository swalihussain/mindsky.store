"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCmsStore } from '@/store/cmsStore';
import { ShieldCheck, Heart, Sparkles, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function HeroSection() {
  const { data, fetchCMS } = useCmsStore();
  const [banners, setBanners] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchCMS();
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

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners]);

  const defaultImage = "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1920&h=800&fit=crop&fm=webp";

  return (
    <section className="w-full bg-white relative overflow-hidden bg-soft-blue">
      {/* Decorative Circles */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[60%] rounded-full bg-blue-50/30 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[60%] rounded-full bg-blue-50/20 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col items-start z-10 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-8"
            >
              <Sparkles size={16} className="text-[#024fe7]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#024fe7]">Curated for Explorers</span>
            </motion.div>

            <motion.h1 
              className="text-6xl md:text-7xl lg:text-8xl font-black text-black leading-[1.05] tracking-tighter mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {data.hero_title || "Fun & Learning"}
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed max-w-xl mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {data.hero_subtitle || "Professional-grade play-tested gear that sparks creativity and growth in every little mind."}
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link href="/shop" className="brand-button-primary w-full sm:w-auto flex items-center justify-center gap-3">
                Shop Catalog <ArrowRight size={20} />
              </Link>
              <Link href="/categories" className="brand-button-secondary w-full sm:w-auto flex items-center justify-center">
                Explore All
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div 
              className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { icon: ShieldCheck, text: "Safe Products" },
                { icon: Heart, text: "Kid-Friendly" },
                { icon: Sparkles, text: "Parent Approved" }
              ].map((badge, idx) => (
                <div key={idx} className="flex items-center gap-3 group">
                  <div className="w-10 h-10 border-2 border-[#024fe7] rounded-xl flex items-center justify-center text-[#024fe7] group-hover:bg-[#024fe7] group-hover:text-white transition-all">
                    <badge.icon size={18} />
                  </div>
                  <span className="font-black text-[10px] uppercase tracking-widest text-black">{badge.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Illustration */}
          <motion.div
            className="hidden lg:block relative"
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
             <div className="absolute inset-0 bg-blue-50/50 rounded-[60px] blur-3xl -z-10 transition-all duration-1000 group-hover:scale-110"></div>
             <Image 
               src="/kids_minimal_illustration_1776592126276.png" 
               alt="MindSky Illustration"
               width={600}
               height={600}
               className="w-full h-auto drop-shadow-2xl animate-float"
               priority
             />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

