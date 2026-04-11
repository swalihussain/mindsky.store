"use client";

import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';
import { CreditCard, Truck, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export default function CheckoutPage() {
  const { items, getCartTotal } = useCartStore();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');

  const total = getCartTotal() + 5 + (getCartTotal() * 0.08); // Include shipping and tax

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty.</h1>
        <Link href="/shop" className="text-[#4DA6FF] font-bold hover:underline">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-extrabold text-gray-800">Checkout</h1>
          <div className="flex items-center gap-4 mt-6">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#4DA6FF]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-[#4DA6FF] text-white' : 'bg-gray-200'}`}>1</div>
              <span className="font-medium hidden sm:inline">Details</span>
            </div>
            <div className={`flex-1 h-1 rounded-full ${step >= 2 ? 'bg-[#4DA6FF]' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#4DA6FF]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-[#4DA6FF] text-white' : 'bg-gray-200'}`}>2</div>
              <span className="font-medium hidden sm:inline">Payment</span>
            </div>
            <div className={`flex-1 h-1 rounded-full ${step >= 3 ? 'bg-[#4DA6FF]' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-[#4DA6FF]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 3 ? 'bg-[#4DA6FF] text-white' : 'bg-gray-200'}`}>3</div>
              <span className="font-medium hidden sm:inline">Confirmation</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Form Area */}
          <div className="flex-1">
            {step === 1 && (
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm mb-6">
                <h2 className="text-2xl font-bold font-heading mb-6 flex items-center gap-2"><Truck size={24} className="text-[#4DA6FF]"/> Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#4DA6FF]" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#4DA6FF]" placeholder="Doe" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                    <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#4DA6FF]" placeholder="john@example.com" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Street Address</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#4DA6FF]" placeholder="123 Playful Street" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#4DA6FF]" placeholder="Toytown" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Zip/Postal Code</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#4DA6FF]" placeholder="12345" />
                  </div>
                </div>
                <button 
                  onClick={() => setStep(2)}
                  className="mt-8 w-full md:w-auto px-8 py-4 bg-[#FFD966] text-amber-900 font-bold rounded-xl shadow-[0_4px_0_#d4a200] hover:translate-y-[2px] hover:shadow-[0_2px_0_#d4a200] transition-all flex items-center justify-center gap-2"
                >
                  Continue to Payment <ArrowRight size={20} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm mb-6">
                <h2 className="text-2xl font-bold font-heading mb-6 flex items-center gap-2"><CreditCard size={24} className="text-[#4DA6FF]"/> Payment Method</h2>
                
                <div className="space-y-4 mb-8">
                  {/* Credit Card Option */}
                  <label className={`block p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-[#4DA6FF] bg-blue-50' : 'border-gray-100 hover:border-gray-300'}`}>
                    <div className="flex items-center gap-4">
                      <input type="radio" name="payment" className="w-5 h-5 accent-[#4DA6FF]" onChange={() => setPaymentMethod('card')} />
                      <div className="flex justify-between w-full items-center">
                        <span className="font-bold text-gray-800">Credit / Debit Card</span>
                        <div className="flex gap-2">
                          <div className="w-10 h-6 bg-blue-900 rounded select-none text-[8px] text-white flex items-center justify-center font-bold">VISA</div>
                          <div className="w-10 h-6 bg-red-600 rounded select-none text-[8px] text-white flex items-center justify-center font-bold">MC</div>
                        </div>
                      </div>
                    </div>
                  </label>
                  
                  {/* Stripe Option */}
                  <label className={`block p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'stripe' ? 'border-[#4DA6FF] bg-blue-50' : 'border-gray-100 hover:border-gray-300'}`}>
                    <div className="flex items-center gap-4">
                      <input type="radio" name="payment" className="w-5 h-5 accent-[#4DA6FF]" onChange={() => setPaymentMethod('stripe')} />
                      <span className="font-bold text-gray-800 flex-1">Stripe Checkout</span>
                      <div className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-xs font-bold">Stripe</div>
                    </div>
                  </label>
                  
                  {/* Razorpay Option */}
                  <label className={`block p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'razorpay' ? 'border-[#4DA6FF] bg-blue-50' : 'border-gray-100 hover:border-gray-300'}`}>
                    <div className="flex items-center gap-4">
                      <input type="radio" name="payment" className="w-5 h-5 accent-[#4DA6FF]" onChange={() => setPaymentMethod('razorpay')} />
                      <span className="font-bold text-gray-800 flex-1">Razorpay / UPI</span>
                    </div>
                  </label>

                  {/* Cash on Delivery Option */}
                  <label className={`block p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-[#4DA6FF] bg-blue-50' : 'border-gray-100 hover:border-gray-300'}`}>
                    <div className="flex items-center gap-4">
                      <input type="radio" name="payment" className="w-5 h-5 accent-[#4DA6FF]" onChange={() => setPaymentMethod('cod')} />
                      <span className="font-bold text-gray-800 flex-1">Cash on Delivery</span>
                    </div>
                  </label>
                </div>

                {paymentMethod === 'card' && (
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8 grid grid-cols-2 gap-4">
                     <div className="col-span-2">
                       <label className="block text-sm font-bold text-gray-700 mb-2">Card Number</label>
                       <input type="text" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#4DA6FF]" placeholder="0000 0000 0000 0000" />
                     </div>
                     <div>
                       <label className="block text-sm font-bold text-gray-700 mb-2">Expiry Date</label>
                       <input type="text" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#4DA6FF]" placeholder="MM/YY" />
                     </div>
                     <div>
                       <label className="block text-sm font-bold text-gray-700 mb-2">CVC</label>
                       <input type="text" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#4DA6FF]" placeholder="123" />
                     </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={() => setStep(1)} className="px-6 py-4 bg-white text-gray-600 font-bold rounded-xl border-2 border-gray-200 hover:bg-gray-50 transition-colors">
                    Back
                  </button>
                  <button 
                    onClick={() => setStep(3)}
                    disabled={!paymentMethod}
                    className={`flex-1 px-8 py-4 font-bold rounded-xl shadow-[0_4px_0_rgba(0,0,0,0.1)] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-2
                      ${paymentMethod ? 'bg-[#4DA6FF] text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                  >
                    Place Order - ${total.toFixed(2)} <ShieldCheck size={20} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white p-12 rounded-[2rem] border border-gray-100 shadow-sm text-center">
                <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-3xl font-bold font-heading mb-4 text-gray-800">Order Confirmed! 🎉</h2>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">Thank you for shopping at MindSky. Your order #MS-{Math.floor(Math.random() * 10000)} has been placed successfully and the toys are preparing for launch!</p>
                
                <Link href="/" className="inline-block px-8 py-4 bg-[#FFD966] text-amber-900 font-bold rounded-xl shadow-sm hover:bg-amber-300 transition-colors">
                  Return to Home
                </Link>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-96 shrink-0">
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm sticky top-28">
              <h3 className="text-xl font-bold font-heading text-gray-800 mb-6">In Your Cart</h3>
              
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 relative rounded-lg overflow-hidden shrink-0 bg-gray-50 border border-gray-100">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-800 text-sm truncate">{item.name}</p>
                      <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                      <p className="font-bold text-gray-800 text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-dashed border-gray-200 pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-800">${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className="font-bold text-gray-800">$5.00</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tax</span>
                  <span className="font-bold text-gray-800">${(getCartTotal() * 0.08).toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t bg-gray-50 -mx-6 p-6 -mb-6 rounded-b-[2rem]">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-600">Grand Total</span>
                  <span className="text-2xl font-black font-heading text-[#4DA6FF]">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
