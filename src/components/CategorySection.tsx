"use client";

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useProductStore } from '@/store/productStore';
import { Tag, Sparkles, LayoutGrid } from 'lucide-react';

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
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black tracking-tighter italic">
              Shop By <span className="text-[#024fe7]">Category</span>
            </h2>
            <p className="text-gray-400 font-bold mt-4 max-w-xl">
              Curated departments designed to spark joy and foster development across all growth stages.
            </p>
          </div>
          <Link href="/categories" className="brand-button-secondary whitespace-nowrap">
            All Departments
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.length === 0 ? (
             <div className="col-span-full py-20 text-center bg-gray-50 rounded-[48px] border-2 border-dashed border-gray-200">
                <p className="text-gray-400 font-bold italic">"Preparing our curated departments... Add categories in Admin to begin!"</p>
             </div>
          ) : categories.map((cat, index) => (
            <Link href={`/shop?category=${encodeURIComponent(cat.name)}`} key={cat.id || index} className="group">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="brand-card h-full flex flex-col items-start"
              >
                <div className="mb-6 h-16 w-16 bg-blue-50 rounded-2xl flex items-center justify-center overflow-hidden border border-blue-100 group-hover:bg-[#024fe7] transition-all">
                  {cat.imageUrl ? (
                    <img src={cat.imageUrl} alt={cat.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  ) : (
                    <LayoutGrid className="text-[#024fe7] group-hover:text-white transition-all" size={32} />
                  )}
                </div>
                <h3 className="font-black text-xl text-black mb-3 tracking-tight group-hover:text-[#024fe7] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-gray-400 text-sm font-medium line-clamp-2 leading-relaxed">
                  {cat.description || `High-quality ${cat.name.toLowerCase()} selection for growing minds.`}
                </p>
                <div className="mt-8 flex items-center gap-2 text-[#024fe7] font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                  Explore Now <Tag size={12} />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

