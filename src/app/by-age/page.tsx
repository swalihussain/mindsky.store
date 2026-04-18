"use client";

import Link from 'next/link';
import { useProductStore } from '@/store/productStore';
import { Baby } from 'lucide-react';

export default function ByAgePage() {
  const { ages, products } = useProductStore();

  const getProductCount = (ageRange: string) => {
    return products.filter(p => p.ageGroup === ageRange).length;
  };

  return (
    <div className="pt-28 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Baby size={32} />
          </div>
          <h1 className="text-4xl font-heading font-extrabold text-gray-900 mb-4">Shop By Age</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">Safety and fun matched perfectly to your child's developmental stage.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {ages.map((age) => (
            <Link key={age.id} href={`/shop?age=${encodeURIComponent(age.range)}`} className="block group">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all text-center">
                <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 text-2xl font-black ${age.color}`}>
                   {(age.id === '1') ? '🍼' : (age.id === '2') ? '🎨' : (age.id === '3') ? '🚲' : (age.id === '4') ? '🎮' : '📱'}
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-[#024fe7] transition-colors">{age.range}</h3>
                <p className="text-gray-500 font-medium mb-4">{age.label}</p>
                <div className="inline-flex items-center px-4 py-1.5 bg-gray-50 rounded-full text-sm font-bold text-gray-600 group-hover:bg-[#E6F3FF] group-hover:text-[#024fe7] transition-colors">
                  {getProductCount(age.range)} Products
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
