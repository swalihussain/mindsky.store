"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin, Phone, Mail, MessageCircle, Camera, Globe, Video } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Footer() {
  const pathname = usePathname();
  const [settings, setSettings] = useState({
    address: "123 Fun Street, Playville, Learning State 45678",
    phone: "+1 (800) MINDSKY",
    email: "hello@mindsky.store"
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/contact-settings');
        const json = await res.json();
        if (json.success && json.settings) {
          setSettings(json.settings);
        }
      } catch (err) {
        console.error("Footer: Failed to load communication settings", err);
      }
    };
    fetchSettings();
  }, []);
  
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-white pt-12 pb-8 md:pt-20 md:pb-10 border-t border-gray-100 relative overflow-hidden mt-auto">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#E6F3FF] opacity-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand Info - Order 1 */}
          <div className="flex flex-col items-start text-left">
            <Link href="/" className="font-heading font-extrabold text-[32px] text-[#024fe7] inline-block mb-4 tracking-tighter">
              MindSky.store
            </Link>
            <p className="text-gray-500 mb-8 font-medium leading-relaxed text-[15px] max-w-[320px] md:max-w-none">
              Making learning fun and play educational. Your one-stop shop for kids' toys, clothing, and learning essentials.
            </p>
            <div className="flex gap-3 text-gray-400 mb-4 md:mb-0">
               {[MessageCircle, Camera, Globe, Video].map((Icon, i) => (
                 <a key={i} href="#" className="w-10 h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center hover:text-[#024fe7] hover:border-[#024fe7] transition-all shadow-sm">
                   <Icon size={20} />
                 </a>
               ))}
            </div>
          </div>

          {/* EXPLORE - Order 2 */}
          <div className="flex flex-col items-start text-left">
            <h4 className="font-heading font-bold text-[16px] text-black mb-6 uppercase tracking-widest whitespace-nowrap">Explore</h4>
            <ul className="flex flex-col items-start w-full gap-4">
              {['About Us', 'Shop All', 'Categories', 'Our Brands', 'Blog'].map((link) => (
                <li key={link} className="w-full">
                  <Link href={`/${link.toLowerCase().replace(' ', '-')}`} className="text-gray-500 hover:text-[#024fe7] text-[15px] font-semibold transition-colors block">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT - Order 3 */}
          <div className="flex flex-col items-start text-left">
            <h4 className="font-heading font-bold text-[16px] text-black mb-6 uppercase tracking-widest whitespace-nowrap">Support</h4>
            <ul className="flex flex-col items-start w-full gap-4">
              {['Contact Us', 'Shipping', 'Refunds', 'FAQs', 'Tracking'].map((link) => (
                <li key={link} className="w-full">
                  <Link href={`/${link.toLowerCase().replace(' ', '-')}`} className="text-gray-500 hover:text-[#024fe7] text-[15px] font-semibold transition-colors block">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* GET IN TOUCH - Order 4 */}
          <div className="flex flex-col items-start text-left">
            <h4 className="font-heading font-bold text-[16px] text-black mb-6 uppercase tracking-widest whitespace-nowrap">Get in Touch</h4>
            <div className="flex flex-col items-start w-full gap-6">
              {/* Location */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-[#024fe7] shrink-0">
                  <MapPin size={22} />
                </div>
                <div className="flex flex-col">
                   <span className="text-gray-500 font-bold text-[15px] leading-tight">
                     {settings.address}
                   </span>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-[#024fe7] shrink-0">
                  <Phone size={20} />
                </div>
                <span className="text-gray-500 font-bold text-[15px]">
                  {settings.phone}
                </span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-[#024fe7] shrink-0">
                  <Mail size={20} />
                </div>
                <span className="text-gray-500 font-bold text-[15px] truncate">
                  {settings.email}
                </span>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-400 text-xs font-black uppercase tracking-[0.2em]">
          <p>© {new Date().getFullYear()} MindSky Store. Premium Kids Gear.</p>
          <div className="flex gap-10">
            <Link href="/privacy" className="hover:text-[#024fe7] transition-all">Privacy</Link>
            <Link href="/terms" className="hover:text-[#024fe7] transition-all">Terms</Link>
          </div>
          <div className="flex items-center gap-3 grayscale opacity-50">
            <span className="border border-gray-200 px-3 py-1 rounded-lg">UPI</span>
            <span className="border border-gray-200 px-3 py-1 rounded-lg">CARDS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
