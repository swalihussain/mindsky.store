"use client";

import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Star, Truck, Shield, ArrowLeft, ShoppingCart, Heart, Minus, Plus, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock product database for demonstration
const mockDB = {
  '1': { id: '1', name: 'Magic Building Blocks', price: 29.99, rating: 4.8, category: 'Toys', ageGroup: '3-5', image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=800', description: "Unleash your child's creativity with these colorful, magnetic building blocks. Safe, durable, and infinitely fun, they help develop spatial reasoning and fine motor skills.", specs: ['100 Pieces', 'BPA-Free Plastic', 'Magnetic Edges', 'Includes Idea Book'] },
  '2': { id: '2', name: 'Smart Learning Tablet', price: 79.99, rating: 4.7, category: 'Educational', ageGroup: '6-8', image: 'https://images.unsplash.com/photo-1515486191105-ce3fa1b4d0bc?auto=format&fit=crop&q=80&w=800', description: "An interactive learning tablet pre-loaded with hundreds of educational games, reading apps, and math puzzles disguised as pure fun.", specs: ['8-inch HD Screen', 'Parental Controls', '10hr Battery', 'Kid-Proof Case'] },
};

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const addItem = useCartStore((state) => state.addItem);
  
  // Safely grab product from mock DB or fallback
  const product = mockDB[id as keyof typeof mockDB] || mockDB['1'];

  const handleAddToCart = () => {
    // Add item with specified quantity
    for(let i=0; i<quantity; i++){
      addItem(product);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 max-w-7xl mx-auto">
      <Link href="/shop" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#4DA6FF] font-medium mb-8 transition-colors">
        <ArrowLeft size={20} /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Imagery */}
        <div className="space-y-4 relative">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="aspect-square relative rounded-[3rem] overflow-hidden bg-gray-50 border-2 border-gray-100 shadow-sm cursor-zoom-in group">
            <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-125 transition-transform duration-700 ease-out" />
            <div className="absolute top-6 left-6 bg-[#FFD966] text-amber-900 text-sm font-bold px-4 py-1.5 rounded-full shadow-md z-10">
              Ages {product.ageGroup}
            </div>
          </motion.div>
          
          {/* Thumbnails */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`w-24 h-24 shrink-0 relative rounded-2xl overflow-hidden border-2 cursor-pointer ${i === 1 ? 'border-[#4DA6FF]' : 'border-gray-200 opacity-60 hover:opacity-100'}`}>
                <Image src={product.image} alt="Thumbnail" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
          <div className="mb-6 border-b border-gray-100 pb-6">
            <p className="text-[#4DA6FF] font-bold text-lg mb-2">{product.category}</p>
            <h1 className="text-4xl md:text-5xl font-heading font-black text-gray-800 mb-4 leading-tight">{product.name}</h1>
            
            <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className={i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"} />
                  ))}
                </div>
                <span className="ml-1 text-gray-800">{product.rating}</span>
                <span className="text-[#4DA6FF] hover:underline cursor-pointer ml-1">(128 Reviews)</span>
              </div>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span className="text-green-500 flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div> In Stock</span>
            </div>
          </div>

          <div className="mb-8">
            <span className="text-5xl font-heading font-black text-[#4DA6FF] drop-shadow-sm">${product.price}</span>
            <span className="text-gray-400 line-through ml-3 text-2xl font-bold">${(product.price * 1.2).toFixed(2)}</span>
            <span className="ml-3 bg-rose-100 text-rose-600 px-2 py-1 rounded font-bold text-sm">Save 20%</span>
          </div>

          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Quantity Selector */}
            <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-2xl px-2 py-2 w-full sm:w-40">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-[#4DA6FF] transition-colors"
              >
                <Minus size={20} />
              </button>
              <span className="font-bold text-xl text-gray-800 w-8 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-[#4DA6FF] transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-[#4DA6FF] hover:bg-[#3d8ad9] text-white font-bold text-lg py-4 px-8 rounded-2xl shadow-[0_4px_0_#2b82d4] hover:shadow-[0_2px_0_#2b82d4] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2"
            >
              <ShoppingCart size={22} /> Add to Cart
            </button>
            
            <button className="w-16 h-16 shrink-0 bg-white border-2 border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:text-rose-500 hover:border-rose-200 transition-colors shadow-sm">
              <Heart size={24} />
            </button>
          </div>

          <Link href="/checkout" className="w-full bg-[#FFD966] text-amber-900 font-bold text-lg py-4 px-8 rounded-2xl shadow-[0_4px_0_#d4a200] hover:shadow-[0_2px_0_#d4a200] hover:translate-y-[2px] transition-all flex items-center justify-center mb-8">
            Buy It Now
          </Link>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#4DA6FF]">
                <Truck size={20} />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">Free Shipping</p>
                <p className="text-xs text-gray-500">Orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                <Shield size={20} />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">Safe for Kids</p>
                <p className="text-xs text-gray-500">Non-toxic materials</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs Section */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 max-w-4xl mx-auto">
        <div className="flex gap-8 border-b border-gray-100 mb-8 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('description')}
            className={`pb-4 font-bold text-lg whitespace-nowrap transition-colors relative ${activeTab === 'description' ? 'text-[#4DA6FF]' : 'text-gray-400 hover:text-gray-800'}`}
          >
            Product Description
            {activeTab === 'description' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 w-full h-1 bg-[#4DA6FF] rounded-t-full" />}
          </button>
          <button 
            onClick={() => setActiveTab('specs')}
            className={`pb-4 font-bold text-lg whitespace-nowrap transition-colors relative ${activeTab === 'specs' ? 'text-[#4DA6FF]' : 'text-gray-400 hover:text-gray-800'}`}
          >
            Specifications
            {activeTab === 'specs' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 w-full h-1 bg-[#4DA6FF] rounded-t-full" />}
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`pb-4 font-bold text-lg whitespace-nowrap transition-colors relative ${activeTab === 'reviews' ? 'text-[#4DA6FF]' : 'text-gray-400 hover:text-gray-800'}`}
          >
            Reviews (128)
            {activeTab === 'reviews' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 w-full h-1 bg-[#4DA6FF] rounded-t-full" />}
          </button>
        </div>

        <div className="min-h-[200px]">
          {activeTab === 'description' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-600 text-lg leading-relaxed space-y-4">
              <p>{product.description}</p>
              <p>MindSky ensures every product meets strictly enforced safety regulations. Because we know that when it comes to play, safety comes first.</p>
            </motion.div>
          )}
          
          {activeTab === 'specs' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
              {product.specs.map((spec, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#FFD966]"></div>
                  <span className="text-gray-700 font-medium">{spec}</span>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'reviews' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50/50">
                <div className="flex justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-gray-800 font-heading">Super fun and durable!</h4>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm">2 days ago</span>
                </div>
                <p className="text-gray-600">My 4-year-old hasn't stopped playing with this since it arrived. Excellent quality, no sharp edges, brightly colored.</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
