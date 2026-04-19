"use client";

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useProductStore } from '@/store/productStore';
import { Tag } from 'lucide-react';

const COLORS = [
  { bg: 'bg-rose-100', text: 'text-rose-500' },
  { bg: 'bg-blue-100', text: 'text-blue-500' },
  { bg: 'bg-amber-100', text: 'text-amber-500' },
  { bg: 'bg-teal-100', text: 'text-teal-500' },
  { bg: 'bg-purple-100', text: 'text-purple-500' },
];

export default function CategorySection() {
  const { categories, fetchCategories, isCategoriesLoading } = useProductStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  if (isCategoriesLoading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-4 text-[#024fe7]/20">
        <div className="w-10 h-10 border-4 border-current border-t-transparent rounded-full animate-spin"></div>
        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Syncing Departments...</span>
      </div>
    );
  }

  return (
    <section className="py-[48px] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left md:text-center mb-[16px] md:mb-16 mt-4 md:mt-0"
        >
          <h2 className="text-[22px] md:text-5xl font-heading font-bold text-black px-0 md:px-4">
            Shop By Categories
          </h2>
        </motion.div>

        {/* Categories Grid */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
          {categories.length === 0 ? (
             <div className="w-full py-20 text-center bg-gray-50 rounded-[48px] border-2 border-dashed border-gray-200">
                <p className="text-gray-400 font-bold italic">"Preparing our curated departments... Add categories in Admin to begin!"</p>
             </div>
          ) : (() => {
             const priorityOrder = ['Name Slips', 'Back to School', 'Kids Accessories', 'Toys', 'Journals'];
             const sortedCategories = [...categories].sort((a, b) => {
                const idxA = priorityOrder.indexOf(a.name);
                const idxB = priorityOrder.indexOf(b.name);
                if (idxA !== -1 && idxB !== -1) return idxA - idxB;
                if (idxA !== -1) return -1;
                if (idxB !== -1) return 1;
                return 0;
             });

             return sortedCategories.map((cat, index) => {
               const color = COLORS[index % COLORS.length];
               const isFeatured = cat.name === 'Name Slips';
               
               return (
                  <Link href={`/shop?category=${encodeURIComponent(cat.name)}`} key={cat.id || index} className={`group block ${isFeatured ? 'w-full md:w-[calc(40%-1rem)]' : 'w-[calc(50%-0.5rem)] md:w-[calc(30%-1rem)]'}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className={`
                        ${isFeatured ? 'bg-white border-2 border-[#024FE7]' : 'bg-white border border-gray-100'} shadow-sm
                        relative rounded-[14px] p-4 md:p-8 flex flex-col items-center justify-center text-center transition-all duration-300 h-full
                      `}
                    >
                     {isFeatured && (
                       <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#024FE7] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md whitespace-nowrap z-10">
                         Featured Category
                       </div>
                     )}

                     <div className={`mb-4 ${isFeatured ? 'h-24 w-24' : 'h-16 w-16'} bg-white/60 rounded-2xl flex items-center justify-center overflow-hidden shrink-0`}>
                       {cat.imageUrl ? (
                         <img src={cat.imageUrl} alt={cat.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                       ) : (
                         <Tag className={isFeatured ? 'text-[#024FE7]' : color.text} size={isFeatured ? 40 : 32} />
                       )}
                     </div>
                     <h3 className={`font-black font-heading ${isFeatured ? 'text-xl md:text-2xl text-[#024FE7]' : `text-base md:text-xl ${color.text}`} tracking-tight leading-tight`}>
                       {cat.name}
                     </h3>
                   </motion.div>
                 </Link>
               );
             });
          })()}
        </div>

      </div>
    </section>
  );
}
