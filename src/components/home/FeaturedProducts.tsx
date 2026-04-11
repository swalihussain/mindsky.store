"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

// Simple trending mock data
const trendingProducts = [
  { id: '1', name: 'Magic Building Blocks', price: 29.99, rating: 4.8, category: 'Toys', icon: '🧸', image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=600' },
  { id: '2', name: 'Dinosaur Plush Toy', price: 19.99, rating: 4.9, category: 'Toys', icon: '🧸', image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&q=80&w=600' },
  { id: '3', name: 'Smart Learning Tablet', price: 79.99, rating: 4.7, category: 'Educational', icon: '📚', image: 'https://images.unsplash.com/photo-1515486191105-ce3fa1b4d0bc?auto=format&fit=crop&q=80&w=600' },
  { id: '4', name: 'Colorful Backpack', price: 34.99, rating: 4.6, category: 'School Items', icon: '🎒', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600' }
];

export default function FeaturedProducts() {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    addItem(product);
  };

  return (
    <section className="py-20 bg-gray-50 border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🔥</span>
              <span className="text-[#4DA6FF] font-bold tracking-wider uppercase text-sm">Trending Now</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-black text-gray-800">
              Top Rated Goodies
            </h2>
          </motion.div>
          <Link href="/shop" className="text-[#4DA6FF] font-bold hover:underline hidden md:block">
            View All Toys →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[2rem] p-4 shadow-sm hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-300 group flex flex-col relative"
            >
              {/* Wishlist Heart */}
              <button className="absolute top-8 right-8 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition-colors shadow-sm">
                <Heart size={20} className="group-hover:scale-110 transition-transform" />
              </button>

              {/* Image Container with Zoom */}
              <Link href={`/shop/${product.id}`} className="relative h-64 w-full rounded-[1.5rem] overflow-hidden bg-gray-100 mb-6 block cursor-pointer">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                />
              </Link>

              <div className="flex flex-col flex-grow px-2 pb-2">
                {/* Rating */}
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-[#FFD966] fill-[#FFD966]" />
                    <span className="text-sm font-bold text-gray-700">{product.rating}</span>
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{product.icon} {product.category}</span>
                </div>

                <Link href={`/shop/${product.id}`} className="block">
                  <h3 className="font-heading font-bold text-xl text-gray-800 mb-2 group-hover:text-[#4DA6FF] transition-colors">{product.name}</h3>
                </Link>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                  <span className="font-heading font-black text-2xl text-[#4DA6FF]">${product.price}</span>
                  
                  {/* Action Button */}
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => handleAddToCart(e, product)}
                    className="w-12 h-12 bg-gray-50 hover:bg-[#FFD966] text-gray-600 hover:text-amber-900 rounded-2xl flex items-center justify-center transition-colors shadow-sm"
                  >
                    <ShoppingCart size={22} className="group-hover:scale-110 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <Link href="/shop" className="w-full mt-10 p-4 border-2 border-gray-200 text-center font-bold text-gray-600 rounded-xl md:hidden block hover:bg-gray-50">
          View All Toys
        </Link>
      </div>
    </section>
  );
}
