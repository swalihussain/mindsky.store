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

export default function Categories() {
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-black text-gray-800 mb-4 inline-block relative">
            Shop By <span className="text-[#024fe7]">Category</span>
            <span className="absolute -bottom-2 right-0 w-1/2 h-2 bg-[#FFD966] rounded-full opacity-30"></span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {categories.length === 0 ? (
             <div className="col-span-full py-20 text-center bg-gray-50 rounded-[48px] border-2 border-dashed border-gray-200">
                <p className="text-gray-400 font-bold italic">"Preparing our curated departments... Add categories in Admin to begin!"</p>
             </div>
          ) : categories.map((cat, index) => {
            const color = COLORS[index % COLORS.length];
            return (
              <Link href={`/shop?category=${encodeURIComponent(cat.name)}`} key={cat.id || index} className="group block">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`${color.bg} rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-transparent group-hover:border-white h-full min-h-[180px]`}
                >
                  <div className="mb-4 h-16 w-16 bg-white/50 rounded-2xl flex items-center justify-center overflow-hidden">
                    {cat.imageUrl ? (
                      <img src={cat.imageUrl} alt={cat.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                    ) : (
                      <Tag className={color.text} size={32} />
                    )}
                  </div>
                  <h3 className={`font-black font-heading text-lg md:text-xl ${color.text} tracking-tight leading-tight`}>
                    {cat.name}
                  </h3>
                </motion.div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
