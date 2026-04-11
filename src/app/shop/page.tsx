"use client";

import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { motion } from 'framer-motion';
import { Search, Filter, ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const mockProducts = [
  { id: '1', name: 'Magic Building Blocks', price: 29.99, rating: 4.8, category: 'Toys', ageGroup: '3-5', image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=600' },
  { id: '2', name: 'Smart Learning Tablet', price: 79.99, rating: 4.7, category: 'Educational', ageGroup: '6-8', image: 'https://images.unsplash.com/photo-1515486191105-ce3fa1b4d0bc?auto=format&fit=crop&q=80&w=600' },
  { id: '3', name: 'Colorful Kids Backpack', price: 34.99, rating: 4.6, category: 'Accessories', ageGroup: '3-5', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600' },
  { id: '4', name: 'Dinosaur Plush Toy', price: 19.99, rating: 4.9, category: 'Toys', ageGroup: '0-2', image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&q=80&w=600' },
  { id: '5', name: 'Art Creativity Set', price: 24.99, rating: 4.5, category: 'Educational', ageGroup: '6-8', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=600' },
  { id: '6', name: 'Baby Cotton Onesie', price: 15.99, rating: 4.8, category: 'Clothing', ageGroup: '0-2', image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=600' },
];

export default function ShopPage() {
  const [filterCat, setFilterCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const addItem = useCartStore((state) => state.addItem);

  const filteredProducts = mockProducts.filter((p) => {
    const matchCat = filterCat === 'All' || p.category === filterCat;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="pt-28 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-heading font-extrabold text-gray-800">MindSky Shop</h1>
          <div className="w-16 h-2 bg-[#4DA6FF] rounded-full mt-2"></div>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-100 rounded-xl focus:border-[#4DA6FF] outline-none"
            />
          </div>
          <select 
            value={filterCat} 
            onChange={(e) => setFilterCat(e.target.value)}
            className="py-3 px-4 bg-white border-2 border-gray-100 rounded-xl outline-none focus:border-[#4DA6FF] appearance-none font-medium text-gray-700"
          >
            <option value="All">All Categories</option>
            <option value="Toys">Toys</option>
            <option value="Educational">Educational</option>
            <option value="Accessories">Accessories</option>
            <option value="Clothing">Clothing</option>
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-[3rem]">
          <h3 className="text-2xl font-bold text-gray-500 mb-2">No products found 😢</h3>
          <p className="text-gray-400">Try adjusting your search or filters!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              key={product.id}
              className="bg-white p-4 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border-2 border-transparent hover:border-[#4DA6FF] group"
            >
              <Link href={`/shop/${product.id}`} className="relative h-56 w-full rounded-[1.5rem] overflow-hidden bg-gray-50 mb-5 block">
                <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-600">
                  {product.ageGroup} Yrs
                </div>
              </Link>
              
              <div className="flex flex-col flex-grow">
                <div className="flex items-center gap-1 mb-2">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  <span className="text-xs text-gray-500 font-medium">{product.rating} Rating</span>
                </div>
                <Link href={`/shop/${product.id}`}>
                  <h3 className="font-bold text-gray-800 text-lg mb-1 hover:text-[#4DA6FF] transition-colors">{product.name}</h3>
                </Link>
                <p className="text-sm text-[#4DA6FF] font-medium mb-4">{product.category}</p>
                <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="font-heading font-black text-2xl text-gray-800">${product.price}</span>
                  <button 
                    onClick={() => addItem(product)}
                    className="bg-gray-100 text-gray-800 p-3 rounded-xl hover:bg-[#FFD966] hover:text-black transition-colors shadow-sm font-medium group-hover:bg-[#FFD966]"
                  >
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
