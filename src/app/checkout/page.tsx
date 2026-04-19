"use client";

import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';
import { CreditCard, Truck, ShieldCheck, ArrowRight, CheckCircle2, MapPin, Phone, Package, Lock, Clock, Info } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export default function CheckoutPage() {
  const { items, getCartTotal, getDiscountAmount, getGrandTotal, clearCart, appliedPromo } = useCartStore();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: ''
  });

  const handleOrderComplete = async () => {
    setIsProcessing(true);
    try {
      const orderData = {
        customer_name: `${formData.firstName} ${formData.lastName}`,
        customer_phone: formData.phone,
        customer_email: formData.email,
        address: `${formData.address}, ${formData.city}, ${formData.zip}`,
        items: items.map(item => ({ name: item.name, quantity: item.quantity, price: item.price })),
        total_amount: getGrandTotal(),
        payment_status: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (res.ok) {
        setStep(3);
        clearCart();
      } else {
        alert("System encountered a protocol error during settlement.");
      }
    } catch (err) {
      console.error("SETTLEMENT_PROTOCOL_FAILURE:", err);
      alert("System encountered a critical protocol failure. Check console coordinates.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-black text-[#1F2937] tracking-tighter italic mb-4">Registry <span className="text-[#024fe7]">Empty</span></h1>
        <Link href="/shop" className="text-[#024fe7] font-black uppercase text-xs tracking-widest hover:underline">Return to Catalog</Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50/50 min-h-screen pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Step Indicator */}
        <div className="mb-12">
          <h1 className="text-5xl font-black text-[#1F2937] tracking-tighter italic mb-8">Checkout <span className="text-[#024fe7]">Sequence</span></h1>
          <div className="flex items-center gap-4 bg-white p-4 rounded-3xl border border-gray-100 shadow-sm max-w-2xl px-6">
            <div className={`flex items-center gap-3 px-6 py-2 rounded-2xl transition-all ${step >= 1 ? 'bg-[#1F2937] text-white shadow-lg' : 'text-gray-300'}`}>
              <span className="font-black text-xs">01</span>
              <span className="font-black text-[10px] uppercase tracking-widest hidden sm:inline">Coordinates</span>
            </div>
            <div className="flex-1 h-px bg-gray-100 italic font-black text-[10px] text-gray-200 text-center tracking-widest">PROTOCOL</div>
            <div className={`flex items-center gap-3 px-6 py-2 rounded-2xl transition-all ${step >= 2 ? 'bg-[#1F2937] text-white shadow-lg' : 'text-gray-300'}`}>
              <span className="font-black text-xs">02</span>
              <span className="font-black text-[10px] uppercase tracking-widest hidden sm:inline">Settlement</span>
            </div>
            <div className="flex-1 h-px bg-gray-100 italic font-black text-[10px] text-gray-200 text-center tracking-widest">FINAL</div>
            <div className={`flex items-center gap-3 px-6 py-2 rounded-2xl transition-all ${step >= 3 ? 'bg-[#1F2937] text-white shadow-lg' : 'text-gray-300'}`}>
              <span className="font-black text-xs">03</span>
              <span className="font-black text-[10px] uppercase tracking-widest hidden sm:inline">Commit</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Area */}
          <div className="flex-1">
            {step === 1 && (
              <div className="bg-white p-10 rounded-[48px] border border-gray-100 shadow-sm mb-6 animate-in slide-in-from-bottom-6 duration-500">
                <h2 className="text-2xl font-black text-[#1F2937] mb-8 flex items-center gap-4 tracking-tight"><Truck size={28} className="text-[#024fe7]"/> Shipping Coordinates</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-2">First Identity</label>
                    <input type="text" className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl font-black text-[#1F2937] focus:border-[#024fe7] outline-none transition-all placeholder:text-gray-200" placeholder="E.g. Swalih" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-2">Last Identity</label>
                    <input type="text" className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl font-black text-[#1F2937] focus:border-[#024fe7] outline-none transition-all placeholder:text-gray-200" placeholder="E.g. Hussain" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-2">Digital Uplink (Email)</label>
                    <input type="email" className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl font-black text-[#1F2937] focus:border-[#024fe7] outline-none transition-all placeholder:text-gray-200" placeholder="swalih@mindsky.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-2">Mobile Contact</label>
                    <input type="text" className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl font-black text-[#1F2937] focus:border-[#024fe7] outline-none transition-all placeholder:text-gray-200" placeholder="+91 95XXX XXXX" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-2">Physical Coordinates (Address)</label>
                    <input type="text" className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl font-black text-[#1F2937] focus:border-[#024fe7] outline-none transition-all placeholder:text-gray-200" placeholder="123 Playful Towers, Floor 4" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-2">City</label>
                    <input type="text" className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl font-black text-[#1F2937] focus:border-[#024fe7] outline-none transition-all placeholder:text-gray-200" placeholder="Calicut" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-2">Postal ID</label>
                    <input type="text" className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl font-black text-[#1F2937] focus:border-[#024fe7] outline-none transition-all placeholder:text-gray-200" placeholder="673001" value={formData.zip} onChange={(e) => setFormData({...formData, zip: e.target.value})} />
                  </div>
                </div>
                <button 
                  onClick={() => setStep(2)}
                  disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.address}
                  className="mt-10 w-full md:w-auto px-12 py-5 bg-[#1F2937] text-white font-black rounded-3xl shadow-2xl hover:bg-[#024fe7] transition-all flex items-center justify-center gap-3 uppercase text-[10px] tracking-widest disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Authorize Payment <ArrowRight size={18} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white p-10 rounded-[48px] border border-gray-100 shadow-sm mb-6 animate-in slide-in-from-right-6 duration-500">
                <h2 className="text-2xl font-black text-[#1F2937] mb-8 flex items-center gap-4 tracking-tight"><CreditCard size={28} className="text-[#024fe7]"/> Settlement Protocol</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {['UPI / QR', 'Credit Card', 'Cash on Delivery', 'Stripe Secure'].map((m) => (
                    <button 
                      key={m}
                      onClick={() => setPaymentMethod(m)}
                      className={`p-6 border-2 rounded-3xl text-left transition-all flex flex-col justify-between h-32 ${paymentMethod === m ? 'border-[#024fe7] bg-blue-50/50 shadow-inner' : 'border-gray-50 hover:border-gray-200'}`}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === m ? 'border-[#024fe7] bg-[#024fe7]' : 'border-gray-200'}`}>
                         {paymentMethod === m && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                      <span className="font-black text-xs uppercase tracking-widest text-[#1F2937]">{m}</span>
                    </button>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={() => setStep(1)} className="px-8 py-5 text-gray-400 font-black uppercase text-[10px] tracking-widest hover:text-[#1F2937] transition-colors">
                    Revisit Coordinates
                  </button>
                  <button 
                    onClick={handleOrderComplete}
                    disabled={!paymentMethod || isProcessing}
                    className={`flex-1 px-12 py-5 font-black rounded-[24px] shadow-2xl transition-all flex items-center justify-center gap-4 uppercase text-[10px] tracking-[0.2em]
                      ${paymentMethod ? 'bg-[#1F2937] text-white hover:bg-[#024fe7]' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}
                  >
                    {isProcessing ? 'SYNCHRONIZING...' : `Commit Order: ₹${getGrandTotal().toLocaleString('en-IN')}`} <Lock size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white p-16 rounded-[60px] border border-gray-100 shadow-2xl text-center animate-in zoom-in duration-700">
                <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-[32px] flex items-center justify-center mx-auto mb-10 shadow-inner">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-5xl font-black text-[#1F2937] tracking-tighter italic mb-4">Sequence <span className="text-[#024fe7]">Successful</span></h2>
                <p className="text-gray-400 mb-10 max-w-sm mx-auto font-medium">Your gear manifest is authorized for immediate fulfillment by MindSky Admin Ecosystem.</p>
                
                <Link href="/" className="inline-block px-12 py-6 bg-[#1F2937] text-white font-black rounded-[24px] shadow-xl hover:bg-[#024fe7] transition-all uppercase text-[10px] tracking-widest">
                  Terminate Session (Home)
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar Summary */}
          <div className="lg:w-96 shrink-0">
            <div className="bg-white p-8 rounded-[48px] border border-gray-100 shadow-sm sticky top-28 overflow-hidden">
              <h3 className="text-[11px] font-black text-gray-300 uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
                 <Package size={18} className="text-[#024fe7]"/> Registry Manifest
              </h3>
              
              <div className="space-y-6 mb-10 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-5 border-b border-gray-50 pb-6 last:border-0 last:pb-0">
                    <div className="w-16 h-16 relative rounded-2xl overflow-hidden shrink-0 bg-gray-50 border border-gray-100">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-[#1F2937] text-xs truncate uppercase tracking-tight">{item.name}</p>
                      <p className="text-gray-400 text-[10px] font-black uppercase mt-1">QTY: {item.quantity}</p>
                      <p className="font-black text-[#1F2937] text-sm mt-2 tracking-tighter">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-10">
                <div className="flex justify-between text-[10px] font-black text-gray-300 uppercase tracking-widest">
                  <span>Gross Settle</span>
                  <span className="text-[#1F2937]">₹{getCartTotal().toLocaleString('en-IN')}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                    <span>Voucher ({appliedPromo.code})</span>
                    <span>-₹{getDiscountAmount().toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-[10px] font-black text-gray-300 uppercase tracking-widest">
                   <span>Logistics</span>
                   <span className="text-[#1F2937]">₹99.00</span>
                </div>
              </div>

              <div className="border-t-2 border-dashed border-gray-100 -mx-8 p-8 -mb-8 bg-gray-50/50">
                <div className="flex justify-between items-center">
                  <span className="font-black text-[10px] text-gray-400 uppercase tracking-[0.2em]">Grand Protocol</span>
                  <span className="text-3xl font-black text-[#1F2937] tracking-tighter italic">₹{getGrandTotal().toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
