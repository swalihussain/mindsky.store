"use client";

import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';
import { Trash2, ArrowLeft, Plus, Minus, CreditCard } from 'lucide-react';
import Image from 'next/image';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getCartTotal } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
        <div className="w-48 h-48 mb-8 relative opacity-80">
          <div className="absolute inset-0 bg-[#E6F3FF] rounded-full animate-pulse"></div>
          <p className="absolute inset-0 flex items-center justify-center text-6xl">🛒</p>
        </div>
        <h1 className="text-4xl font-heading font-extrabold text-gray-800 mb-4">Your cart is empty!</h1>
        <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't added any fun products to your cart yet. Let's find something exciting!</p>
        <Link href="/shop" className="bg-[#FFD966] text-amber-900 font-bold px-8 py-4 rounded-full shadow-[0_4px_0_#d4a200] hover:translate-y-[2px] transition-all">
          Explore Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 max-w-7xl mx-auto">
      <Link href="/shop" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#4DA6FF] font-medium mb-8 transition-colors">
        <ArrowLeft size={20} /> Continue Shopping
      </Link>
      
      <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-gray-800 mb-10">Shopping Cart <span className="text-[#4DA6FF]">({items.length})</span></h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items List */}
        <div className="flex-1 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row gap-6 bg-white p-6 rounded-[2rem] border-2 border-gray-50 shadow-sm relative pr-12 sm:pr-6">
              <button 
                onClick={() => removeItem(item.id)}
                className="absolute top-6 right-6 text-gray-300 hover:text-red-500 transition-colors"
                aria-label="Remove item"
              >
                <Trash2 size={24} />
              </button>
              
              <div className="w-full sm:w-32 h-32 relative rounded-2xl overflow-hidden shrink-0 bg-gray-50">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              
              <div className="flex flex-col flex-1 justify-between py-1">
                <div>
                  <h3 className="text-xl font-bold font-heading text-gray-800 pr-8">{item.name}</h3>
                  <p className="text-sm text-[#4DA6FF] font-medium mb-2">{item.category}</p>
                  <p className="font-heading font-black text-xl text-gray-900">${item.price}</p>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-full border border-gray-100">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-bold w-6 text-center text-gray-800">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-green-500 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 font-medium">Subtotal</p>
                    <p className="font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:w-96 shrink-0">
          <div className="bg-white p-8 rounded-[2rem] border-2 border-gray-100 shadow-xl sticky top-28">
            <h3 className="text-2xl font-bold font-heading text-gray-800 mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600 font-medium">
                <span>Subtotal</span>
                <span className="text-gray-800 font-bold">${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 font-medium">
                <span>Shipping Estimate</span>
                <span className="text-gray-800 font-bold">$5.00</span>
              </div>
              <div className="flex justify-between text-gray-600 font-medium">
                <span>Tax Estimate</span>
                <span className="text-gray-800 font-bold">${(getCartTotal() * 0.08).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="border-t border-dashed border-gray-200 pt-6 mb-8 mt-2">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-800">Total</span>
                <span className="text-3xl font-black font-heading text-[#4DA6FF]">
                  ${(getCartTotal() + 5 + (getCartTotal() * 0.08)).toFixed(2)}
                </span>
              </div>
            </div>

            <Link href="/checkout" className="w-full flex items-center justify-center gap-2 bg-[#4DA6FF] text-white font-bold py-4 rounded-full shadow-[0_4px_0_#2b82d4] hover:shadow-[0_2px_0_#2b82d4] hover:translate-y-[2px] transition-all text-lg tracking-wide mb-4">
              Checkout Now <CreditCard size={20} />
            </Link>
            <p className="text-xs text-center text-gray-400 font-medium mt-4">Secure checkout. We accept all major credit cards and PayPal.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
