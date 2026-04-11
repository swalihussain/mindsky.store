"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCmsStore } from '@/store/cmsStore';
import { useEffect, useState } from 'react';

export default function Hero() {
  const cmsData = useCmsStore((state) => state.data.hero);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#E6F3FF] via-[#ffffff] to-[#FFf8e1] pt-20 pb-12">
      
      {/* Playful Animated Background Shapes */}
      <motion.div animate={{ rotate: 360, y: [0, -30, 0] }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }} className="absolute -top-10 -left-10 w-40 h-40 bg-[#FFD966] rounded-full opacity-30"></motion.div>
      <motion.div animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }} transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }} className="absolute bottom-20 left-10 w-32 h-32 bg-[#4DA6FF] rounded-3xl rotate-12 opacity-20"></motion.div>
      <motion.div animate={{ y: [0, -50, 0], rotate: [0, 45, 0] }} transition={{ repeat: Infinity, duration: 12, ease: "backInOut" }} className="absolute top-40 right-20 w-24 h-24 bg-[#FF9B9B] rounded-full opacity-30"></motion.div>
      
      {/* Floating Toys / Icons container */}
      <motion.div 
        animate={{ y: [0, -15, 0] }} 
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute top-1/4 left-[15%] text-6xl drop-shadow-lg opacity-80 hidden md:block"
      >
        🧸
      </motion.div>
      <motion.div 
        animate={{ y: [0, 20, 0] }} 
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/3 right-[15%] text-6xl drop-shadow-lg opacity-80 hidden md:block"
      >
        🚀
      </motion.div>
      <motion.div 
        animate={{ y: [0, -25, 0], rotate: [0, -10, 0] }} 
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 left-[20%] text-5xl drop-shadow-lg opacity-80 hidden md:block"
      >
        🎨
      </motion.div>
      <motion.div 
        animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }} 
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-1/3 right-[25%] text-5xl drop-shadow-lg opacity-80 hidden md:block"
      >
        📚
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        
        {/* Offer Highlight */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block px-6 py-2 rounded-full bg-white shadow-xl shadow-blue-100/50 text-[#4DA6FF] font-black text-sm mb-8 border-2 border-dashed border-[#4DA6FF] animate-pulse"
        >
          {cmsData.offerText}
        </motion.div>
        
        {/* Logo / Tagline */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-heading font-black text-gray-800 leading-tight mb-6 drop-shadow-sm tracking-tight"
        >
          {cmsData.title}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-600 mb-12 font-medium max-w-2xl mx-auto"
        >
          {cmsData.subtitle}
        </motion.p>
        
        {/* Animated Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Link href="/shop">
            <motion.button 
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#4DA6FF] text-white font-black text-xl py-5 px-10 rounded-full shadow-[0_8px_0_#2b82d4] hover:shadow-[0_4px_0_#2b82d4] transition-all flex items-center gap-3 w-full sm:w-auto"
            >
              {cmsData.primaryBtnText}
            </motion.button>
          </Link>
          <Link href="/offers">
            <motion.button 
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white border-2 border-gray-200 text-gray-800 font-black text-xl py-5 px-10 rounded-full shadow-[0_8px_0_#e5e7eb] hover:shadow-[0_4px_0_#e5e7eb] hover:border-[#FFD966] transition-all flex items-center gap-3 w-full sm:w-auto"
            >
              {cmsData.secondaryBtnText}
            </motion.button>
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
