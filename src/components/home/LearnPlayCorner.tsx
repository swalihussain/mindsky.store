"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Award, FileDown, ArrowRight, Brain } from 'lucide-react';

export default function LearnPlayCorner() {
  const [data, setData] = useState<any>(null);
  const [indices, setIndices] = useState({ fact: 0, tip: 0 });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch('/api/learn-play');
        const json = await res.json();
        if (json.success) {
          setData({
            facts: json.data.fun_facts.filter((f: any) => f.isActive),
            tips: json.data.parenting_tips.filter((t: any) => t.isActive),
            printables: json.data.printables.filter((p: any) => p.isActive)
          });
        }
      } catch (err) {
        console.error("LearnPlay Fetch Failed", err);
      }
    };
    fetchContent();
  }, []);

  if (!data) return (
    <div className="py-24 flex flex-col items-center justify-center gap-4 text-[#1F2937]/20">
       <div className="w-10 h-10 border-4 border-current border-t-transparent rounded-full animate-spin"></div>
       <span className="text-[10px] font-black uppercase tracking-[0.4em]">Syncing Corner...</span>
    </div>
  );

  return (
    <section className="py-24 px-4 bg-white relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* SECTION HEADER - RESET TO STANDARD FONTS */}
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 bg-[#024fe7] text-white rounded-[24px] flex items-center justify-center mx-auto mb-8 shadow-lg shadow-[#024fe7]/20"
          >
            <Brain size={32} />
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-black text-[#1F2937] tracking-tight mb-6">Learn & Play Corner</h2>
          <div className="w-24 h-2 bg-[#024fe7] mx-auto rounded-full mb-8 opacity-20"></div>
          <p className="text-gray-500 font-bold max-w-2xl mx-auto leading-relaxed text-lg">
             We believe that learning should be just as much fun as playing! Explore our weekly tips, fun facts, and activities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* CARD 1: FUN FACT */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-[#FFF9E6] p-12 rounded-[56px] relative group min-h-[460px] flex flex-col shadow-sm hover:shadow-xl hover:shadow-amber-100 transition-all duration-500"
          >
             <div className="w-14 h-14 bg-white text-amber-500 rounded-[22px] shadow-sm flex items-center justify-center mb-10"><Lightbulb size={28} /></div>
             <AnimatePresence mode="wait">
               <motion.div 
                 key={data.facts?.[indices.fact]?.id || 'fact-loading'}
                 style={{ opacity: 1 }}
                 className="flex-1"
               >
                 <h4 className="text-2xl font-extrabold text-[#1F2937] mb-6 tracking-tight">Fun Fact of the Day!</h4>
                 <p className="text-[#1F2937] font-semibold text-xl leading-relaxed tracking-tight select-none opacity-80">
                    "{data.facts?.[indices.fact]?.text || 'Loading fact...'}"
                 </p>
               </motion.div>
             </AnimatePresence>
             
             {/* Pagination HUD */}
             <div className="flex gap-3 mt-10">
                {(data.facts || []).map((_: any, i: number) => (
                  <button 
                    key={i} 
                    onClick={() => setIndices({ ...indices, fact: i })}
                    className={`h-3 rounded-full transition-all duration-500 ${indices.fact === i ? 'w-10 bg-amber-400' : 'w-3 bg-amber-200 hover:bg-amber-300'}`}
                  />
                ))}
             </div>
          </motion.div>

          {/* CARD 2: PARENTING TIP */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#F0F7FF] p-12 rounded-[56px] relative group min-h-[460px] flex flex-col shadow-sm hover:shadow-xl hover:shadow-blue-100 transition-all duration-500"
          >
             <div className="w-14 h-14 bg-white text-[#024fe7] rounded-[22px] shadow-sm flex items-center justify-center mb-10"><Award size={28} /></div>
             <AnimatePresence mode="wait">
               <motion.div 
                 key={data.tips?.[indices.tip]?.id || 'tip-loading'}
                 className="flex-1"
               >
                 <h4 className="text-2xl font-extrabold text-[#1F2937] mb-6 tracking-tight">Parenting Tip</h4>
                 <p className="text-[#1F2937] font-semibold text-xl leading-relaxed tracking-tight select-none opacity-80">
                    "{data.tips?.[indices.tip]?.text || 'Loading tip...'}"
                 </p>
               </motion.div>
             </AnimatePresence>

             {/* Pagination HUD */}
             <div className="flex gap-3 mt-10">
                {(data.tips || []).map((_: any, i: number) => (
                  <button 
                    key={i} 
                    onClick={() => setIndices({ ...indices, tip: i })}
                    className={`h-3 rounded-full transition-all duration-500 ${indices.tip === i ? 'w-10 bg-[#024fe7]' : 'w-3 bg-blue-200 hover:bg-blue-300'}`}
                  />
                ))}
             </div>
          </motion.div>

          {/* CARD 3: FREE PRINTABLE */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#E6F9F0] p-12 rounded-[56px] relative group min-h-[460px] flex flex-col shadow-sm hover:shadow-xl hover:shadow-emerald-100 transition-all duration-500"
          >
             <div className="w-14 h-14 bg-white text-emerald-500 rounded-[22px] shadow-sm flex items-center justify-center mb-10"><FileDown size={28} /></div>
             <div className="flex-1">
                <h4 className="text-2xl font-extrabold text-[#1F2937] mb-6 tracking-tight">{data.printables[0]?.title || 'Free Printable'}</h4>
                <p className="text-[#1F2937] font-semibold text-xl leading-relaxed tracking-tight opacity-80">
                   "{data.printables[0]?.description}"
                </p>
             </div>
             
             <a 
               href={`/api/download?id=${data.printables[0]?.id}`} 
               download
               className="mt-10 bg-emerald-500 text-white px-10 py-5 rounded-[20px] font-black text-xs uppercase tracking-widest flex items-center justify-between hover:bg-emerald-600 transition-all shadow-lg active:scale-95 group outline-none"
             >
                {data.printables[0]?.btnText || 'Download Now'}
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
             </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
