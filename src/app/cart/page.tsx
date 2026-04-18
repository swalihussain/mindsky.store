"use client";

import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';
import { Trash2, ArrowLeft, Plus, Minus, CreditCard, Ticket, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getCartTotal, appliedPromo, applyPromo, removePromo, getDiscountAmount, getGrandTotal } = useCartStore();
  const [promoInput, setPromoInput] = useState("");
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");

  const handleApplyPromo = async () => {
    if (!promoInput) return;
    setChecking(true);
    setError("");
    try {
      const res = await fetch('/api/offers');
      const json = await res.json();
      if (json.success) {
        const found = json.data.find((o: any) => o.code.toUpperCase() === promoInput.toUpperCase());
        if (found) {
          applyPromo(found);
          setPromoInput("");
        } else {
          setError("Invalid voucher code");
        }
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setChecking(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
        <div className="w-48 h-48 mb-8 relative opacity-80">
          <div className="absolute inset-0 bg-[#E6F3FF] rounded-full animate-pulse"></div>
          <p className="absolute inset-0 flex items-center justify-center text-6xl">🛒</p>
        </div>
        <h1 className="text-4xl font-black text-[#1F2937] tracking-tighter mb-4 italic">Empty <span className="text-[#024fe7]">Storage</span></h1>
        <p className="text-gray-400 mb-10 max-w-md font-medium">Your gear container is currently empty. Initialize a shopping session to add premium items.</p>
        <Link href="/shop" className="bg-[#1F2937] text-white font-black px-10 py-5 rounded-[24px] shadow-2xl hover:bg-[#024fe7] transition-all uppercase text-xs tracking-widest">
          Enter Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 max-w-7xl mx-auto">
      <Link href="/shop" className="inline-flex items-center gap-3 text-gray-400 hover:text-[#024fe7] font-black text-[10px] uppercase tracking-widest mb-10 transition-all">
        <ArrowLeft size={16} /> Backward Movement
      </Link>
      
      <h1 className="text-5xl font-black text-[#1F2937] mb-12 tracking-tighter italic">Gear <span className="text-[#024fe7]">Registry</span> ({items.length})</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row gap-8 bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm relative group">
              <button 
                onClick={() => removeItem(item.id)}
                className="absolute top-8 right-8 text-gray-200 hover:text-rose-500 transition-colors"
                aria-label="Remove item"
              >
                <Trash2 size={24} />
              </button>
              
              <div className="w-full sm:w-40 h-40 relative rounded-3xl overflow-hidden shrink-0 bg-gray-50 border border-gray-100">
                <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              
              <div className="flex flex-col flex-1 justify-between py-1">
                <div>
                   <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-3 block">{item.category}</span>
                   <h3 className="text-2xl font-black text-[#1F2937] mb-4 pr-10 leading-tight">{item.name}</h3>
                   <p className="font-black text-2xl text-[#1F2937] tracking-tighter">₹{item.price.toLocaleString('en-IN')}</p>
                </div>
                
                <div className="flex items-center justify-between mt-8">
                  <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-2xl border border-gray-100">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-rose-500 transition-all"><Minus size={18} /></button>
                    <span className="font-black w-8 text-center text-[#1F2937]">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-emerald-500 transition-all"><Plus size={18} /></button>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Row Total</p>
                    <p className="font-black text-xl text-[#1F2937] tracking-tighter">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:w-96 shrink-0">
          <div className="bg-white p-10 rounded-[48px] border border-gray-50 shadow-2xl sticky top-28 overflow-hidden">
            <h3 className="text-2xl font-black text-[#1F2937] mb-10 tracking-tight italic flex items-center gap-3">
               <CreditCard size={24} className="text-[#024fe7]"/> Settlement
            </h3>
            
            {/* Promo Code Logic */}
            <div className="mb-10">
               <label className="block text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4 ml-1">Voucher Authorization</label>
               {appliedPromo ? (
                 <div className="bg-emerald-50 p-4 border border-emerald-100 rounded-2xl flex items-center justify-between animate-in zoom-in duration-300">
                    <div className="flex items-center gap-3">
                       <CheckCircle size={20} className="text-emerald-500" />
                       <span className="font-black text-emerald-700 text-xs">CODE: {appliedPromo.code}</span>
                    </div>
                    <button onClick={removePromo} className="text-emerald-300 hover:text-rose-500 transition-colors"><XCircle size={18} /></button>
                 </div>
               ) : (
                 <div className="flex gap-2">
                    <div className="relative flex-1">
                       <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                       <input 
                         type="text" 
                         className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-black text-xs uppercase focus:bg-white focus:border-[#024fe7] transition-all outline-none" 
                         placeholder="MINDSKY..." 
                         value={promoInput}
                         onChange={(e) => setPromoInput(e.target.value)}
                       />
                    </div>
                    <button 
                      onClick={handleApplyPromo}
                      disabled={checking || !promoInput}
                      className="px-5 bg-[#1F2937] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-[#024fe7] transition-all disabled:opacity-30"
                    >
                       {checking ? <Loader2 size={18} className="animate-spin" /> : 'Apply'}
                    </button>
                 </div>
               )}
               {error && <p className="text-[10px] text-rose-500 font-black mt-2 ml-1 italic">{error}</p>}
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-400 font-black text-[10px] uppercase tracking-widest">
                <span>Catalog Gross</span>
                <span className="text-[#1F2937]">₹{getCartTotal().toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-400 font-black text-[10px] uppercase tracking-widest">
                <span>Logistics Est.</span>
                <span className="text-[#1F2937]">₹99.00</span>
              </div>
              {appliedPromo && (
                <div className="flex justify-between text-emerald-500 font-black text-[10px] uppercase tracking-widest">
                  <span>Savings Applied</span>
                  <span>-₹{getDiscountAmount().toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>
            
            <div className="border-t border-dashed border-gray-100 pt-8 mb-10">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Final Commit</span>
                <span className="text-4xl font-black text-[#1F2937] tracking-tighter">
                  ₹{getGrandTotal().toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <Link href="/checkout" className="w-full flex items-center justify-center gap-3 bg-[#1F2937] text-white font-black py-5 rounded-[24px] shadow-2xl hover:bg-[#024fe7] transition-all text-xs tracking-[0.2em] mb-4 group uppercase">
              Initiate Checkout <CreditCard size={18} className="group-hover:scale-110 transition-transform" />
            </Link>
            <p className="text-[9px] text-center text-gray-300 font-black uppercase tracking-[0.2em] mt-6">Secured Bank Protocol Active</p>
          </div>
        </div>
      </div>
    </div>
  );
}
