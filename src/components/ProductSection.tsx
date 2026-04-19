"use client";

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Star, ShieldCheck, Truck, RotateCcw, Award } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useProductStore } from '@/store/productStore';

export default function ProductSection() {
  const { products, fetchProducts, isLoading } = useProductStore();
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const displayProducts = products.slice(0, 8);

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    addItem(product);
  };

  if (isLoading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-4 text-[#024fe7]/20 bg-white">
        <div className="w-10 h-10 border-4 border-current border-t-transparent rounded-full animate-spin"></div>
        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Synchronizing Master Catalog...</span>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter italic">
                Trending <span className="text-[#024fe7]">Favorites</span>
              </h2>
              <p className="text-gray-400 font-bold mt-4">Discover what parents and kids are loving right now.</p>
            </motion.div>
            <Link href="/shop" className="brand-button-secondary py-3 px-8 text-xs">
              View Collection →
            </Link>
          </div>

          {displayProducts.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-[48px] border-2 border-dashed border-gray-100">
               <p className="text-gray-400 font-bold italic">Checking our live inventory sequence... Return shortly.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {displayProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="group relative flex flex-col h-full bg-white rounded-[40px] border border-gray-50 p-4 transition-all duration-500 hover:border-[#024fe7] hover:shadow-[0_20px_50px_-20px_rgba(2,79,231,0.2)]"
              >
                {/* Badges */}
                <div className="absolute top-8 left-8 z-10 flex flex-col gap-2">
                  {product.isNew && <span className="bg-[#024fe7] text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">New Arrival</span>}
                  {product.isSale && <span className="bg-black text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Limited Offer</span>}
                </div>

                {/* Wishlist */}
                <button className="absolute top-8 right-8 z-10 w-10 h-10 bg-white/80 backdrop-blur-md rounded-2xl flex items-center justify-center text-gray-300 hover:text-rose-500 transition-all border border-gray-50 shadow-sm">
                  <Heart size={20} />
                </button>

                {/* Image */}
                <Link href={`/shop/${product.id}`} className="relative aspect-square w-full rounded-[32px] overflow-hidden bg-gray-50 mb-6 block">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-1000" 
                  />
                </Link>

                {/* Info */}
                <div className="flex flex-col flex-1 px-2">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={i < 4 ? "fill-[#024fe7] text-[#024fe7]" : "text-gray-200"} />
                    ))}
                    <span className="text-[10px] font-black text-gray-300 ml-1">4.8</span>
                  </div>

                  <Link href={`/shop/${product.id}`} className="block mb-4">
                    <h3 className="font-black text-lg text-black leading-tight group-hover:text-[#024fe7] transition-colors line-clamp-2 uppercase italic tracking-tight">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-6">
                    <div className="flex flex-col">
                      <span className="text-2xl font-black text-black tracking-tighter italic">₹{product.price.toLocaleString('en-IN')}</span>
                      {product.oldPrice && (
                        <span className="text-xs font-bold text-gray-300 line-through">₹{product.oldPrice.toLocaleString('en-IN')}</span>
                      )}
                    </div>
                    <button 
                      onClick={(e) => handleAddToCart(e, product)}
                      className="w-14 h-14 bg-[#024fe7] hover:bg-black text-white rounded-2xl flex items-center justify-center transition-all shadow-xl active:scale-95 group/btn"
                    >
                      <ShoppingBag size={24} className="group-hover/btn:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Trust Section */}
      <section className="pb-24 pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: "Secure Payment", desc: "100% encrypted gateway settlement." },
              { icon: RotateCcw, title: "Easy Returns", desc: "No-questions-asked retrieval protocol." },
              { icon: Truck, title: "Quality Tested", desc: "Rigorous standards for every item." },
              { icon: Award, title: "Safe for Kids", desc: "Certified BPA-free & non-toxic materials." }
            ].map((trust, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="brand-card flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-[20px] flex items-center justify-center text-[#024fe7] mb-6 group-hover:bg-[#024fe7] group-hover:text-white transition-all shadow-inner">
                  <trust.icon size={28} />
                </div>
                <h4 className="font-black text-lg text-black mb-2 uppercase tracking-tight">{trust.title}</h4>
                <p className="text-gray-400 text-xs font-bold">{trust.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

