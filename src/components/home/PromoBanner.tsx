"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useCmsStore } from '@/store/cmsStore';

export default function PromoBanner() {
  const cmsData = useCmsStore((state) => state.data.promo);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const bannerY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const objectRotate1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const objectRotate2 = useTransform(scrollYProgress, [0, 1], [360, 0]);
  const objectScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  if (!mounted) return null;

  return (
    <section ref={ref} className="py-24 px-4 overflow-hidden bg-[#FFD966] relative rounded-[4rem] mx-2 sm:mx-6 shadow-md border-b-[8px] border-[#d4a200]">
      {/* Moving Background Elements */}
      <motion.div style={{ y: bannerY }} className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_10%)] bg-[length:60px_60px]"></div>
      </motion.div>

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100 }}
          className="bg-white inline-block px-6 py-2 rounded-full text-amber-600 font-bold mb-8 shadow-sm transform -rotate-2"
        >
          ✨ {cmsData.highlight}
        </motion.div>
        
        <h2 className="text-5xl md:text-7xl font-heading font-black text-gray-900 mb-8 leading-[1.1] drop-shadow-sm">
          {cmsData.title}
        </h2>
        
        <p className="text-xl md:text-2xl text-amber-900 max-w-2xl mx-auto mb-10 font-medium">
          {cmsData.subtitle}
        </p>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gray-900 text-white font-bold text-xl py-5 px-12 rounded-full shadow-[0_6px_0_#333333] hover:shadow-[0_4px_0_#333333] hover:translate-y-[2px] transition-all"
        >
          {cmsData.btnText}
        </motion.button>
      </div>

      {/* Floating Star/Shape Animations */}
      <motion.div 
        style={{ rotate: objectRotate1, scale: objectScale }}
        className="absolute top-10 left-10 md:left-32 text-6xl drop-shadow-xl"
      >
        ⭐
      </motion.div>
      <motion.div 
        style={{ rotate: objectRotate2 }}
        className="absolute bottom-10 right-10 md:right-32 text-6xl drop-shadow-xl"
      >
        🚀
      </motion.div>
      <motion.div 
        style={{ rotate: objectRotate1 }}
        className="absolute top-1/2 left-4 md:left-20 text-5xl opacity-50 drop-shadow-lg"
      >
        🪐
      </motion.div>
      <motion.div 
        style={{ rotate: objectRotate2 }}
        className="absolute top-20 right-4 md:right-20 text-5xl opacity-50 drop-shadow-lg"
      >
        🎨
      </motion.div>
    </section>
  );
}
