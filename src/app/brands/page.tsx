"use client";

import Link from 'next/link';
import { useProductStore } from '@/store/productStore';
import { Star } from 'lucide-react';

export default function BrandsPage() {
  const { brands, products } = useProductStore();

  const getProductCount = (brandName: string) => {
    return products.filter(p => p.brand === brandName).length;
  };

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Star size={32} />
          </div>
          <h1 className="text-4xl font-heading font-extrabold text-gray-900 mb-4">Premium Brands</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">Shop authentic, high-quality gear from the brands you know and trust.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <Link key={brand.id} href={`/shop?brand=${encodeURIComponent(brand.name)}`} className="block group">
              <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 flex flex-col items-center justify-center text-center hover:bg-white hover:shadow-xl hover:border-[#024fe7] transition-all aspect-square relative">
                <div className="w-24 h-24 mb-6 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all filter grayscale group-hover:grayscale-0">
                  {/* Using standard img tags to prevent next/image unmatched domains errors */}
                  <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{brand.name}</h3>
                <span className="text-sm font-medium text-gray-500">{getProductCount(brand.name)} Items</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
