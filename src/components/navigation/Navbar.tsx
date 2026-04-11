"use client";

import { ShoppingCart, Menu, Search, User, Heart } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const cartCount = useCartStore((state) => state.getCartCount());

  return (
    <nav className="fixed top-0 w-full z-50 glass shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="font-heading font-extrabold text-3xl text-[var(--color-secondary)]">
              MindSky<span className="text-[var(--color-highlight)]">.store</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/shop" className="text-gray-700 hover:text-[var(--color-secondary)] font-medium transition-colors">Shop</Link>
            <Link href="/categories" className="text-gray-700 hover:text-[var(--color-secondary)] font-medium transition-colors">Categories</Link>
            <Link href="/age" className="text-gray-700 hover:text-[var(--color-secondary)] font-medium transition-colors">By Age</Link>
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
              {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-[var(--color-highlight)] text-[var(--color-foreground)] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">{cartCount}</span>}
            </Link>
            <Link href="/admin" className="text-gray-600 hover:text-[var(--color-secondary)] transition-colors">
              <User size={22} />
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <Link href="/cart" className="text-gray-600 hover:text-[var(--color-secondary)] transition-colors relative">
              <ShoppingCart size={22} />
              {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-[var(--color-highlight)] text-[var(--color-foreground)] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">{cartCount}</span>}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-[var(--color-secondary)] focus:outline-none">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 flex flex-col px-4 pt-2 pb-6 space-y-2 shadow-lg absolute w-full">
          <Link href="/shop" className="block px-3 py-3 rounded-xl hover:bg-[var(--color-accent)] text-gray-700 font-medium">Shop</Link>
          <Link href="/categories" className="block px-3 py-3 rounded-xl hover:bg-[var(--color-accent)] text-gray-700 font-medium">Categories</Link>
          <Link href="/age" className="block px-3 py-3 rounded-xl hover:bg-[var(--color-accent)] text-gray-700 font-medium">By Age</Link>
          <Link href="/brands" className="block px-3 py-3 rounded-xl hover:bg-[var(--color-accent)] text-gray-700 font-medium">Brands</Link>
          <div className="flex justify-around pt-4 mt-2 border-t border-gray-100">
             <button className="p-2 text-gray-600 bg-gray-50 rounded-full"><Search size={20} /></button>
             <button className="p-2 text-gray-600 bg-gray-50 rounded-full"><Heart size={20} /></button>
             <Link href="/admin" className="p-2 text-gray-600 bg-gray-50 rounded-full"><User size={20} /></Link>
          </div>
        </div>
      )}
    </nav>
  );
}
