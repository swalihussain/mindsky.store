"use client";

import Link from 'next/link';
import { useProductStore } from '@/store/productStore';
import { Layers, Tag } from 'lucide-react';

export default function CategoriesPage() {
  const { categories, products } = useProductStore();

  const getProductCount = (categoryName: string) => {
    // Robust filtering that checks both name and potentially ID matches
    return products.filter(p => 
      (p.category || "").toLowerCase() === (categoryName || "").toLowerCase()
    ).length;
  };

  return (
    <div className="pt-32 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-[#024fe7]/10 text-[#024fe7] rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-3 hover:rotate-0 transition-transform shadow-sm">
            <Layers size={40} />
          </div>
          <h1 className="text-5xl font-heading font-black text-gray-900 mb-4 tracking-tight">Explore <span className="text-[#024fe7]">Collections</span></h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">Find exactly what you're looking for by browsing our premium curated collections.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {categories.length === 0 ? (
             <div className="col-span-full py-20 text-center flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-200">
                   <Tag size={32} />
                </div>
                <p className="text-gray-400 font-bold">No collections found in database.</p>
             </div>
          ) : categories.map((category) => (
            <Link key={category.id} href={`/shop?category=${encodeURIComponent(category.name)}`} className="group block">
              <div className="bg-gray-100 rounded-[2.5rem] overflow-hidden aspect-square relative mb-6 shadow-sm border border-gray-100 group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500">
                {category.imageUrl ? (
                  <img 
                    src={category.imageUrl} 
                    alt={category.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200">
                     <Layers size={48} className="text-gray-300" />
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="text-3xl font-black text-white mb-2 tracking-tight group-hover:text-[#024fe7] transition-colors">{category.name}</h3>
                  <span className="inline-flex items-center px-4 py-1.5 bg-white/20 backdrop-blur-xl rounded-full text-[10px] font-black uppercase tracking-widest text-white border border-white/20">
                    {getProductCount(category.name)} Products
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
