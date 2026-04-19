"use client";

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useProductStore } from '@/store/productStore';

export default function TrendingSection() {
  const { products, fetchProducts, isLoading } = useProductStore();
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Exclude Name Slips and display other school-related/trending products
  const displayProducts = products
    .filter(p => p.category !== 'Name Slips')
    .slice(0, 8);

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    addItem(product);
  };

  if (isLoading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-4 text-[#1F2937]/20 bg-gray-50/30">
        <div className="w-10 h-10 border-4 border-current border-t-transparent rounded-full animate-spin"></div>
        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Curating Trends...</span>
      </div>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[24px] md:text-4xl font-bold text-gray-900 tracking-tight">
              Back to School Trending
            </h2>
          </motion.div>
          <Link href="/shop" className="text-[#024fe7] font-semibold hover:underline hidden md:block">
            View All →
          </Link>
        </div>

        {displayProducts.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-[32px] border border-dashed border-gray-200">
             <p className="text-gray-400 font-bold italic">"We're curating trending school essentials! Check back soon."</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-6">
            {displayProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-white rounded-[16px] p-[12px] shadow-sm hover:shadow-md hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 group flex flex-col relative border border-gray-100"
            >
              {/* Badges Container */}
              <div className="absolute top-5 left-5 z-10 flex flex-col gap-1.5">
                <span className="bg-[#FF4D4D] text-white text-[11px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide inline-block shadow-sm">
                  Trending
                </span>
                {product.isNew && (
                  <span className="bg-[#024FE7] text-white text-[11px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide inline-block shadow-sm">
                    New
                  </span>
                )}
              </div>

              {/* Wishlist Heart Top-Right */}
              <button className="absolute top-5 right-5 z-10 w-8 h-8 md:w-9 md:h-9 bg-white/90 backdrop-blur-[2px] rounded-full flex items-center justify-center text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition-colors shadow-sm">
                <Heart size={18} className="group-hover:scale-110 transition-transform" />
              </button>

              {/* Image Container: 220px, rounded 14px, cover */}
              <Link href={`/shop/${product.id}`} className="relative h-[220px] w-full rounded-[14px] overflow-hidden bg-gray-100 mb-4 block">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  className="object-cover group-hover:scale-[1.05] transition-transform duration-500 ease-out" 
                />
              </Link>

              {/* Details */}
              <div className="flex flex-col flex-grow px-1">
                <Link href={`/shop/${product.id}`} className="block mb-2">
                  <h3 className="font-semibold text-[14px] md:text-[16px] text-gray-800 leading-snug line-clamp-2 group-hover:text-[#024fe7] transition-colors">
                     {product.name}
                  </h3>
                </Link>

                {/* Pricing Block */}
                <div className="mt-auto pt-2">
                  <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
                    <span className="font-bold text-[16px] md:text-[18px] text-gray-900">
                      ₹{(product.price || 0).toFixed(2)}
                    </span>
                    {product.oldPrice && product.oldPrice > product.price && (
                      <span className="text-[12px] md:text-[14px] text-gray-400 line-through">
                        ₹{product.oldPrice.toFixed(2)}
                      </span>
                    )}
                    {product.discount && (
                      <span className="text-[12px] md:text-[13px] font-bold text-green-600">
                        {product.discount}
                      </span>
                    )}
                  </div>
                </div>
                
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => handleAddToCart(e, product)}
                  className="mt-4 w-full py-[10px] bg-gray-50 hover:bg-[#024fe7] hover:text-white text-gray-700 font-medium text-[14px] rounded-[10px] transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
          </div>
        )}

        <Link href="/shop" className="w-full mt-8 py-3 border border-gray-200 text-center font-semibold text-gray-600 rounded-xl md:hidden block hover:bg-gray-50">
          View All Products
        </Link>
      </div>
    </section>
  );
}
