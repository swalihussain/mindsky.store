"use client";

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useProductStore } from '@/store/productStore';
import { useCartStore } from '@/store/cartStore';
import { Filter, ShoppingBag, ArrowRight, Search, Loader2, Star, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import { motion } from "framer-motion";

function ShopContent() {
  const searchParams = useSearchParams();
  const { products, categories, brands, ages, isLoading, fetchProducts, fetchCategories } = useProductStore();
  const addToCart = useCartStore((state) => state.addItem);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  useEffect(() => {
    const catParam = searchParams.get('category');
    const brandParam = searchParams.get('brand');
    const ageParam = searchParams.get('age');
    
    if (catParam) setSelectedCategory(catParam);
    if (brandParam) setSelectedBrand(brandParam);
    if (ageParam) setSelectedAge(ageParam);
  }, [searchParams]);

  const filteredProducts = products.filter(p => {
    if (selectedCategory) {
      const match = (p.category || "").toLowerCase() === selectedCategory.toLowerCase();
      if (!match) return false;
    }
    if (selectedBrand && p.brand !== selectedBrand) return false;
    if (selectedAge && p.ageGroup !== selectedAge) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts];
  if (sortOrder === 'price-low') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'price-high') {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else {
    sortedProducts.reverse();
  }

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen relative overflow-hidden bg-soft-blue">
      {/* Decorative Blur */}
      <div className="absolute top-[-5%] right-[-5%] w-64 h-64 bg-[#024fe7]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div>
            <h1 className="text-6xl md:text-7xl font-black text-black tracking-tighter italic leading-none">
              Explore <span className="text-[#024fe7]">Catalog</span>
            </h1>
            <p className="text-gray-400 font-bold mt-6 max-w-xl text-lg uppercase tracking-tight">
               Discover the perfect gear for development and play, sorted by precision.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-white px-8 py-4 rounded-[32px] border border-blue-50 shadow-xl self-start md:self-auto">
             <div className="relative">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500 absolute inset-0 animate-ping"></div>
             </div>
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black">Live Inventory Engine</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="bg-white p-10 rounded-[48px] border border-gray-50 shadow-sm sticky top-32">
              <h3 className="font-black flex items-center gap-3 text-lg mb-10 text-black uppercase tracking-tight italic">
                <Filter size={20} className="text-[#024fe7]"/> Master Filters
              </h3>
              
              <div className="space-y-10">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-4">Department</label>
                  <select className="w-full p-5 bg-gray-50 border-2 border-transparent rounded-[24px] font-black text-xs uppercase tracking-widest text-black focus:border-[#024fe7] outline-none transition-all appearance-none" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="">ALL COLLECTIONS</option>
                    {categories.map(c => <option key={c.id} value={c.name}>{c.name.toUpperCase()}</option>)}
                  </select>
                </div>
                
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-4">Age Bracket</label>
                  <select className="w-full p-5 bg-gray-50 border-2 border-transparent rounded-[24px] font-black text-xs uppercase tracking-widest text-black focus:border-[#024fe7] outline-none transition-all appearance-none" value={selectedAge} onChange={(e) => setSelectedAge(e.target.value)}>
                    <option value="">ALL AGE GROUPS</option>
                    {ages.map(a => <option key={a.id} value={a.range}>{a.range.toUpperCase()}</option>)}
                  </select>
                </div>

                <button 
                  onClick={() => {setSelectedBrand(''); setSelectedAge(''); setSelectedCategory('');}}
                  className="w-full py-4 text-[10px] font-black uppercase tracking-[0.4em] text-gray-200 hover:text-rose-500 transition-all"
                >
                  Reset Parameters
                </button>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-6 px-4">
              <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">Scope: <strong className="text-black font-black">{sortedProducts.length} Items</strong></span>
              <div className="flex items-center gap-4 bg-white p-2 rounded-[20px] border border-gray-50 shadow-sm">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 ml-4">Sequence:</span>
                <select className="p-3 bg-gray-50 rounded-2xl font-black text-[10px] uppercase tracking-widest text-[#024fe7] focus:outline-none border-none appearance-none" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                  <option value="newest">Latest First</option>
                  <option value="price-low">Lowest Price</option>
                  <option value="price-high">Highest Price</option>
                </select>
              </div>
            </div>

            {isLoading ? (
               <div className="flex flex-col items-center justify-center py-40 gap-6">
                  <Loader2 className="w-12 h-12 text-[#024fe7] animate-spin" />
                  <span className="text-gray-300 font-black text-[10px] uppercase tracking-[0.4em]">Hydrating Master Catalog...</span>
               </div>
            ) : sortedProducts.length === 0 ? (
              <div className="bg-white p-24 text-center rounded-[60px] border border-gray-50 shadow-sm flex flex-col items-center justify-center">
                <div className="w-24 h-24 bg-gray-50 rounded-[32px] flex items-center justify-center mb-8">
                   <LayoutGrid size={40} className="text-gray-200" />
                </div>
                <h3 className="text-4xl font-black text-black mb-4 tracking-tighter italic">Scope <span className="text-[#024fe7]">Empty</span></h3>
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest leading-relaxed">Try expanding your exploration parameters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {sortedProducts.map((product, index) => (
                  <motion.div 
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative flex flex-col h-full bg-white rounded-[40px] border border-gray-50 p-4 transition-all duration-500 hover:border-[#024fe7] hover:shadow-[0_20px_50px_-20px_rgba(2,79,231,0.2)]"
                  >
                    <div className="absolute top-8 left-8 z-10">
                      {product.discountPrice && (
                         <span className="bg-[#024fe7] text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Special Offer</span>
                      )}
                    </div>
                    
                    <Link href={`/shop/${product.id}`} className="relative aspect-square w-full rounded-[32px] overflow-hidden bg-gray-50 mb-6 block">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    </Link>

                    <div className="px-2 flex flex-col flex-1">
                      <div className="flex items-center gap-1 mb-4 text-[#024fe7]">
                         {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-[#024fe7]" />)}
                      </div>
                      <h3 className="font-black text-xl text-black leading-tight mb-6 line-clamp-2 group-hover:text-[#024fe7] transition-colors uppercase italic tracking-tighter">{product.name}</h3>
                      
                      <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-6">
                        <div className="flex flex-col">
                          <span className="text-2xl font-black text-black tracking-tighter italic">₹{product.price.toLocaleString('en-IN')}</span>
                          {product.oldPrice && <span className="text-[10px] font-bold text-gray-300 line-through">₹{product.oldPrice.toLocaleString('en-IN')}</span>}
                        </div>
                        <button onClick={(e) => handleAddToCart(e, product)} className="w-14 h-14 bg-[#024fe7] hover:bg-black text-white rounded-2xl flex items-center justify-center transition-all shadow-xl active:scale-95">
                          <ShoppingBag size={24} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            
            {/* Nav */}
            {sortedProducts.length > 0 && (
              <div className="mt-24 flex justify-center pb-20">
                <div className="flex items-center gap-3 bg-white p-3 rounded-[32px] border border-gray-50 shadow-xl">
                  <button className="w-12 h-12 flex items-center justify-center text-gray-200 font-black italic disabled:opacity-30">«</button>
                  <button className="px-8 py-3 bg-[#024fe7] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest">Sequence 01</button>
                  <button className="w-12 h-12 flex items-center justify-center text-gray-200 font-black italic disabled:opacity-30">»</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="pt-40 text-center text-gray-200 font-black uppercase tracking-[0.4em] animate-pulse">Initializing Portal...</div>}>
      <ShopContent />
    </Suspense>
  );
}

