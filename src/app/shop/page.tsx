"use client";

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useProductStore } from '@/store/productStore';
import { useCartStore } from '@/store/cartStore';
import { Filter, ShoppingBag, ArrowUpRight, Search, Loader2 } from 'lucide-react';
import Link from 'next/link';

function ShopContent() {
  const searchParams = useSearchParams();
  const { products, categories, brands, ages, isLoading, fetchProducts, fetchCategories } = useProductStore();
  const addToCart = useCartStore((state) => state.addItem);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  // Trigger one-time fetch on mount to ensure data is fresh
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  // Sync with URL params on load or change
  useEffect(() => {
    const catParam = searchParams.get('category');
    const brandParam = searchParams.get('brand');
    const ageParam = searchParams.get('age');
    
    if (catParam) setSelectedCategory(catParam);
    if (brandParam) setSelectedBrand(brandParam);
    if (ageParam) setSelectedAge(ageParam);
  }, [searchParams]);

  // Case-Resilient Filter Logic
  const filteredProducts = products.filter(p => {
    if (selectedCategory) {
      const match = (p.category || "").toLowerCase() === selectedCategory.toLowerCase();
      if (!match) return false;
    }
    if (selectedBrand && p.brand !== selectedBrand) return false;
    if (selectedAge && p.ageGroup !== selectedAge) return false;
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts];
  if (sortOrder === 'price-low') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'price-high') {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else {
    sortedProducts.reverse(); // Newest first
  }

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    });
  };

  return (
    <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-5xl font-heading font-black text-gray-900 mb-4 tracking-tighter italic">Shop All <span className="text-[#024fe7]">Gear</span></h1>
            <p className="text-gray-500 text-lg font-medium">Discover the perfect toys, clothing, and learning tools for every age.</p>
          </div>
          <div className="flex items-center gap-2 text-gray-400 bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm self-start md:self-auto">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
             <span className="text-[10px] font-black uppercase tracking-widest leading-none">Live Inventory Engine</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Sidebar Filters */}
          <div className="w-full md:w-72 shrink-0 space-y-6">
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm sticky top-32">
              <h3 className="font-black flex items-center gap-3 text-lg border-b border-gray-50 pb-6 mb-8 text-[#1F2937]">
                <Filter size={20} className="text-[#024fe7]"/> Master Filters
              </h3>
              
              <div className="space-y-8">
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">Collection</label>
                  <select className="w-full p-4 border border-gray-100 rounded-2xl bg-gray-50 text-[#1F2937] font-bold focus:ring-2 focus:ring-[#024fe7]/10 focus:border-[#024fe7] focus:outline-none transition-all appearance-none" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="">All Collections</option>
                    {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">Age Bracket</label>
                  <select className="w-full p-4 border border-gray-100 rounded-2xl bg-gray-50 text-[#1F2937] font-bold focus:ring-2 focus:ring-[#024fe7]/10 focus:border-[#024fe7] focus:outline-none transition-all appearance-none" value={selectedAge} onChange={(e) => setSelectedAge(e.target.value)}>
                    <option value="">All Ages</option>
                    {ages.map(a => <option key={a.id} value={a.range}>{a.range}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">Manufacturer</label>
                  <select className="w-full p-4 border border-gray-100 rounded-2xl bg-gray-50 text-[#1F2937] font-bold focus:ring-2 focus:ring-[#024fe7]/10 focus:border-[#024fe7] focus:outline-none transition-all appearance-none" value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
                    <option value="">All Brands</option>
                    {brands.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
                  </select>
                </div>

                <button 
                  onClick={() => {setSelectedBrand(''); setSelectedAge(''); setSelectedCategory('');}}
                  className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all border border-transparent mt-4"
                >
                  Clear Global Filters
                </button>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 px-2">
              <span className="text-gray-400 font-bold text-sm tracking-tight">Active Inventory Scope: <strong className="text-[#1F2937] font-black">{sortedProducts.length} Items</strong></span>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Order By:</span>
                <select className="p-3 pl-4 pr-10 border border-gray-100 rounded-2xl bg-white font-bold text-[#1F2937] focus:outline-none focus:border-[#024fe7] shadow-sm appearance-none" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                  <option value="newest">Recent First</option>
                  <option value="price-low">Price: Low - High</option>
                  <option value="price-high">Price: High - Low</option>
                </select>
              </div>
            </div>

            {isLoading ? (
               <div className="flex flex-col items-center justify-center py-40 gap-4">
                  <Loader2 className="w-10 h-10 text-[#024fe7] animate-spin" />
                  <span className="text-gray-300 font-black text-xs uppercase tracking-widest">Hydrating Catalog...</span>
               </div>
            ) : sortedProducts.length === 0 ? (
              <div className="bg-white p-24 text-center rounded-[40px] border border-gray-50 shadow-sm flex flex-col items-center justify-center animate-in fade-in duration-500">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8">
                   <Search size={40} className="text-gray-200" />
                </div>
                <h3 className="text-3xl font-black text-[#1F2937] mb-3 tracking-tighter">Scope Empty</h3>
                <p className="text-gray-400 font-medium max-w-xs">No entries match your current filter parameters. Try expanding your search bracket.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all hover:-translate-y-2 group flex flex-col h-full relative cursor-pointer animate-in slide-in-from-bottom-4 duration-500">
                    {/* Badges */}
                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                      {product.badges?.map(badge => (
                        <span key={badge} className={`text-[9px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-full ${badge.includes('OFF') || badge === 'Sale' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-[#FFD966] text-amber-900 shadow-lg shadow-amber-100'}`}>{badge}</span>
                      ))}
                    </div>

                    <div className="aspect-square bg-gray-50 relative overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    </div>

                    <div className="p-8 flex flex-col flex-1">
                      <div className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-3 leading-none italic">{product.brand || 'Premium Selection'}</div>
                      <h3 className="font-heading font-black text-xl text-[#1F2937] leading-tight mb-6 group-hover:text-[#024fe7] transition-colors">{product.name}</h3>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex flex-col">
                          {product.oldPrice ? (
                            <>
                              <span className="text-2xl font-black text-[#1F2937] leading-none">₹{product.price.toFixed(2)}</span>
                              <span className="text-xs font-bold text-gray-300 line-through mt-1.5 opacity-60">₹{product.oldPrice.toFixed(2)}</span>
                            </>
                          ) : (
                            <span className="text-2xl font-black text-[#1F2937] leading-none">₹{product.price.toFixed(2)}</span>
                          )}
                        </div>
                        <button onClick={(e) => handleAddToCart(e, product)} className="w-14 h-14 rounded-2xl bg-[#1F2937] flex items-center justify-center text-white hover:bg-[#024fe7] hover:scale-110 transition-all shadow-xl active:scale-95">
                          <ShoppingBag size={24} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Pagination */}
            {sortedProducts.length > 0 && (
              <div className="mt-20 flex justify-center pb-10">
                <div className="flex gap-3">
                  <button className="px-6 py-3 border border-gray-100 rounded-2xl bg-white text-gray-300 font-black text-[11px] uppercase tracking-widest disabled:opacity-30">Prev</button>
                  <button className="px-6 py-3 bg-[#1F2937] text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl">01</button>
                  <button className="px-6 py-3 border border-gray-100 rounded-2xl bg-white text-gray-300 font-black text-[11px] uppercase tracking-widest disabled:opacity-30">Next</button>
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
    <Suspense fallback={<div className="pt-32 text-center text-gray-300 font-black uppercase tracking-[0.2em] animate-pulse">Initializing Portal...</div>}>
      <ShopContent />
    </Suspense>
  );
}
