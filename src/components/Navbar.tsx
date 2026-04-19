"use client";

import { ShoppingCart, Menu, Search, Heart, X } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const cartCount = useCartStore((state) => state.getCartCount());

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <nav className="fixed top-0 w-full z-50 glass shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="font-black text-3xl text-[#024fe7]">
              MindSky.store
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/shop" className="text-gray-700 hover:text-[var(--color-secondary)] font-medium transition-colors">Shop</Link>
            <Link href="/categories" className="text-gray-700 hover:text-[var(--color-secondary)] font-medium transition-colors">Categories</Link>
            <Link href="/by-age" className="text-gray-700 hover:text-[var(--color-secondary)] font-medium transition-colors">By Age</Link>
            <Link href="/brands" className="text-gray-700 hover:text-[var(--color-secondary)] font-medium transition-colors">Brands</Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-600 hover:text-[var(--color-secondary)] transition-colors">
              <Search size={22} />
            </button>
            <button className="text-gray-600 hover:text-[var(--color-secondary)] transition-colors">
              <Heart size={22} />
            </button>
            <Link href="/cart" className="text-gray-600 hover:text-[var(--color-secondary)] transition-colors relative">
              <ShoppingCart size={22} />
              {isMounted && cartCount > 0 && <span className="absolute -top-2 -right-2 bg-[var(--color-highlight)] text-[var(--color-foreground)] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">{cartCount}</span>}
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <Link href="/cart" className="text-gray-600 hover:text-[var(--color-secondary)] transition-colors relative">
              <ShoppingCart size={22} />
              {isMounted && cartCount > 0 && <span className="absolute -top-2 -right-2 bg-[var(--color-highlight)] text-[var(--color-foreground)] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">{cartCount}</span>}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-[var(--color-secondary)] focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white border-t-2 border-[#024fe7] flex flex-col px-4 pt-2 pb-6 space-y-2 shadow-2xl">
          <Link href="/shop" onClick={() => setIsOpen(false)} className="block px-3 py-4 rounded-2xl hover:bg-blue-50 text-gray-800 font-black italic text-lg border-b border-gray-50 uppercase tracking-tighter">Shop</Link>
          <Link href="/categories" onClick={() => setIsOpen(false)} className="block px-3 py-4 rounded-2xl hover:bg-blue-50 text-gray-800 font-black italic text-lg border-b border-gray-50 uppercase tracking-tighter">Categories</Link>
          <Link href="/by-age" onClick={() => setIsOpen(false)} className="block px-3 py-4 rounded-2xl hover:bg-blue-50 text-gray-800 font-black italic text-lg border-b border-gray-50 uppercase tracking-tighter">By Age</Link>
          <Link href="/brands" onClick={() => setIsOpen(false)} className="block px-3 py-4 rounded-2xl hover:bg-blue-50 text-gray-800 font-black italic text-lg border-b border-gray-50 uppercase tracking-tighter">Brands</Link>
          <div className="flex justify-around pt-6 mt-4">
             <button className="p-3 text-gray-600 bg-gray-50 rounded-2xl"><Search size={20} /></button>
             <button className="p-3 text-gray-600 bg-gray-50 rounded-2xl"><Heart size={20} /></button>
          </div>
        </div>
      </div>
    </nav>
  );
}
