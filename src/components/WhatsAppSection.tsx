"use client";

import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";

export default function WhatsAppSection() {
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
    <section className="py-[48px] px-4 bg-gray-50/50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center">
         
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="flex flex-col items-center gap-4 mb-8"
         >
            <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-lg">
               <MessageCircle size={28} className="fill-white" />
            </div>
            <h2 className="text-[26px] md:text-6xl font-bold text-black tracking-tight leading-tight">
              Order With <span className="text-[#25D366]">WhatsApp</span>
            </h2>
         </motion.div>

         <motion.a 
           href={waLink}
           target="_blank"
           rel="noopener noreferrer"
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="w-full sm:w-auto bg-[#25D366] text-white px-10 h-[48px] rounded-[12px] font-semibold text-base flex items-center justify-center gap-2 shadow-sm transition-all py-[14px]"
         >
            {settings.button_text} 
            <ArrowRight size={18} />
         </motion.a>

         <p className="mt-8 text-[#555555] font-normal text-[14px] max-w-xs mx-auto leading-relaxed">
            Immediate assistance • Direct expert support • Personal shopping experience
         </p>
      </div>
    </section>
  );
}
