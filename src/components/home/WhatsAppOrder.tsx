"use client";

import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";

export default function WhatsAppOrder() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch('/api/whatsapp-settings')
      .then(res => res.json())
      .then(json => {
        if (json.success) setSettings(json.settings);
      });
  }, []);

  if (!settings) return (
    <div className="py-24 flex flex-col items-center justify-center gap-4 text-[#25D366]/20 bg-gray-50/30">
       <div className="w-10 h-10 border-4 border-current border-t-transparent rounded-full animate-spin"></div>
       <span className="text-[10px] font-black uppercase tracking-[0.4em]">Linking Terminal...</span>
    </div>
  );

  if (!settings.enabled) return null;

  const message = encodeURIComponent(settings.default_message || "Hello!");
  const waLink = `https://wa.me/${settings.number}?text=${message}`;

  return (
    <section className="py-24 px-4 bg-gray-50/50 relative overflow-hidden">
      {/* Background Pattern Simulation */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none grayscale">
         <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center">
         
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="flex items-center gap-6 mb-10"
         >
            <h2 className="text-5xl md:text-7xl font-black text-[#1F2937] tracking-tighter italic">
              Order With <span className="text-[#25D366]">WhatsApp</span>
            </h2>
            <div className="w-12 h-12 md:w-16 md:h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-xl animate-bounce">
               <MessageCircle size={32} className="md:size-40 fill-white" />
            </div>
         </motion.div>

         <motion.a 
           href={waLink}
           target="_blank"
           rel="noopener noreferrer"
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           whileHover={{ scale: 1.05 }}
           whileTap={{ scale: 0.95 }}
           viewport={{ once: true }}
           className="bg-[#25D366] hover:bg-[#128C7E] text-white px-12 py-6 rounded-full font-black text-xl md:text-2xl flex items-center gap-4 shadow-[0_20px_40px_rgba(37,211,102,0.2)] transition-all group outline-none"
         >
            {settings.button_text} 
            <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
         </motion.a>

         <p className="mt-10 text-gray-400 font-bold italic text-sm">
            Immediate assistance • Direct expert support • Personal shopping experience
         </p>
      </div>
    </section>
  );
}
