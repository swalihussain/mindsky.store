"use client";

import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useProductStore } from '@/store/productStore';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Star, Truck, Shield, ArrowLeft, ShoppingBag, Heart, Minus, Plus, BadgeCheck, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { products, fetchProducts } = useProductStore();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const addItem = useCartStore((state) => state.addItem);
  
  useEffect(() => {
    if (products.length === 0) fetchProducts();
  }, [fetchProducts, products.length]);

  const product = products.find(p => p.id === id) || products[0];

  if (!product) {
    return (
      <div className="min-h-screen pt-40 flex flex-col items-center justify-center gap-10">
        <div className="w-12 h-12 border-4 border-[#024fe7] border-t-transparent rounded-full animate-spin"></div>
        <span className="text-gray-300 font-black text-xs uppercase tracking-[0.4em]">Calibrating Sensory Matrix...</span>
      </div>
    );
  }

  const handleAddToCart = () => {
    for(let i=0; i<quantity; i++){
      addItem(product);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href="/shop" className="inline-flex items-center gap-2 text-gray-400 hover:text-black font-black text-[10px] uppercase tracking-widest mb-12 transition-all">
          <ArrowLeft size={16} /> Return to Registry
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Imagery Section */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="aspect-square relative rounded-[48px] overflow-hidden bg-gray-50 border border-gray-50 shadow-sm group"
            >
              <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute top-8 left-8 bg-[#024fe7] text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl">
                 Category: {product.category || 'Premium'}
              </div>
            </motion.div>
            
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`aspect-square relative rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${i === 1 ? 'border-[#024fe7]' : 'border-gray-50 opacity-40 hover:opacity-100'}`}>
                  <Image src={product.image} alt="Thumbnail" fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
            <div className="mb-10 pb-10 border-b border-gray-50">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-[#024fe7]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-[#024fe7]" />
                  ))}
                </div>
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-2">4.9 | 100+ Transactions</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-black tracking-tighter italic mb-8 leading-none">{product.name}</h1>
              <div className="flex items-center gap-10">
                <div className="flex flex-col">
                  <span className="text-5xl font-black text-black tracking-tighter italic">₹{product.price.toLocaleString('en-IN')}</span>
                  <span className="text-sm font-bold text-gray-300 line-through opacity-60">₹{(product.price * 1.3).toLocaleString('en-IN')}</span>
                </div>
                <div className="px-5 py-2.5 bg-blue-50 text-[#024fe7] rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
                  Save 30% Today
                </div>
              </div>
            </div>

            <p className="text-gray-400 font-bold text-lg leading-relaxed mb-10">
              {product.description || "High-performance gear designed for the next generation of explorers and creators."}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mb-10">
              {/* Quantity */}
              <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-3xl p-1.5 w-full sm:w-48 shadow-inner">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-black hover:bg-[#024fe7] hover:text-white transition-all"
                >
                  <Minus size={20} />
                </button>
                <span className="font-black text-xl text-black w-10 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-black hover:bg-[#024fe7] hover:text-white transition-all"
                >
                  <Plus size={20} />
                </button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className="brand-button-primary flex-1 flex items-center justify-center gap-3 active:scale-95"
              >
                <ShoppingBag size={22} /> Push to Satchel
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-8 bg-gray-50 rounded-[40px] border border-gray-100 shadow-inner">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#024fe7] shadow-sm">
                     <Truck size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-black uppercase tracking-tight">Express Logistics</p>
                    <p className="text-[10px] font-bold text-gray-400">Arrives in 48-72 hours</p>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#024fe7] shadow-sm">
                     <BadgeCheck size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-black uppercase tracking-tight">Quality Certified</p>
                    <p className="text-[10px] font-bold text-gray-400">Rigorous safety testing</p>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>

        {/* Tabbed Info */}
        <div className="max-w-4xl mx-auto">
           <div className="flex gap-12 border-b border-gray-50 mb-12">
              {['description', 'specifications'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-6 text-xs font-black uppercase tracking-[0.3em] transition-all relative ${activeTab === tab ? 'text-[#024fe7]' : 'text-gray-300 hover:text-black'}`}
                >
                  {tab}
                  {activeTab === tab && <motion.div layoutId="productTab" className="absolute bottom-0 left-0 w-full h-1 bg-[#024fe7] rounded-full" />}
                </button>
              ))}
           </div>

           <div className="min-h-[300px]">
              <AnimatePresence mode="wait">
                {activeTab === 'description' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-gray-400 font-bold text-lg leading-relaxed space-y-6 italic">
                    <p>{product.description || "This premium gear represents the pinnacle of our design philosophy. Crafted with precision and intended for those who demand excellence in every growth stage."}</p>
                    <p>MindSky ensures every component surpasses global safety benchmarks. Because we know that high-performance play requires absolute trust.</p>
                  </motion.div>
                )}
                
                {activeTab === 'specifications' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      { label: "Material", val: "BPA-Free Tactical Polymer" },
                      { label: "Origin", val: "Certified Safe Environment" },
                      { label: "Standards", val: "ISO 9001:2018 Compliant" },
                      { label: "Age Bracket", val: `Stage ${product.ageGroup || 'Universal'}` }
                    ].map((item, idx) => (
                      <div key={idx} className="brand-card p-6 flex items-center justify-between group">
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{item.label}</span>
                        <span className="text-sm font-black text-black group-hover:text-[#024fe7] transition-colors">{item.val}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
           </div>
        </div>

      </div>
    </div>
  );
}

