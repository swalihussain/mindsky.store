"use client";

import { ShoppingCart, Menu, Search, Heart, X } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const cartCount = useCartStore((state) => state.getCartCount());

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { name: 'Shop All', href: '/shop' },
    { name: 'Categories', href: '/categories' },
    { name: 'By Age', href: '/by-age' },
    { name: 'Brands', href: '/brands' }
  ];

  return (
    <>
      {/* Top Offer Bar */}
      <div className="bg-[#024fe7] text-white py-2 px-4 text-center z-[60] relative">
        <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]">
          Free Delivery Above ₹499 🚚 <span className="mx-4 hidden sm:inline opacity-30">|</span> <span className="hidden sm:inline">Use Code: HERO10 for 10% OFF</span>
        </p>
      </div>

      <nav className={`w-full z-50 transition-all duration-300 ${isScrolled ? 'fixed top-0 bg-white shadow-xl py-2' : 'relative bg-white border-b border-gray-50 py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link href="/" className="group flex items-center gap-2">
                <div className="w-10 h-10 bg-[#024fe7] rounded-xl flex items-center justify-center text-white font-black text-xl group-hover:rotate-6 transition-transform">M</div>
                <span className="font-black text-2xl sm:text-3xl text-black tracking-tighter">MindSky<span className="text-[#024fe7]">.store</span></span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className="relative group text-black font-extrabold text-sm uppercase tracking-widest"
                >
                  {link.name}
                  <span className="absolute -bottom-2 left-0 w-0 h-1 bg-[#024fe7] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* Utility Icons */}
            <div className="hidden md:flex items-center space-x-8">
              <button className="text-black hover:text-[#024fe7] transition-all hover:scale-110">
                <Search size={22} strokeWidth={2.5}/>
              </button>
              <button className="text-black hover:text-[#024fe7] transition-all hover:scale-110">
                <Heart size={22} strokeWidth={2.5}/>
              </button>
              <Link href="/cart" className="relative text-[#024fe7] transition-all hover:scale-110 p-2 bg-blue-50 rounded-2xl">
                <ShoppingCart size={24} strokeWidth={2.5}/>
                {isMounted && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-in zoom-in">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center gap-5">
              <Link href="/cart" className="relative text-[#024fe7] p-2 bg-blue-50 rounded-xl">
                <ShoppingCart size={22} strokeWidth={2.5}/>
                {isMounted && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-[8px] font-black rounded-full w-4 h-4 flex items-center justify-center shadow-lg">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button onClick={() => setIsOpen(!isOpen)} className="text-black p-1 hover:bg-gray-50 rounded-lg">
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-white border-t border-gray-100 flex flex-col px-6 pt-4 pb-10 space-y-4 shadow-2xl">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="block py-4 text-black font-black text-xl uppercase tracking-tighter border-b border-gray-50"
              >
                {link.name}
              </Link>
            ))}
            <div className="grid grid-cols-2 gap-4 pt-6">
               <button className="flex items-center justify-center gap-3 p-5 bg-gray-50 rounded-3xl text-black font-black uppercase text-xs">
                 <Search size={20} /> Search
               </button>
               <button className="flex items-center justify-center gap-3 p-5 bg-gray-50 rounded-3xl text-black font-black uppercase text-xs">
                 <Heart size={20} /> Wishlist
               </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

