"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin, Phone, Mail, Instagram, Twitter, Facebook as FacebookIcon, Youtube, Send, CreditCard, ShieldCheck } from 'lucide-react';
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
    <footer className="w-full flex flex-col mt-auto overflow-hidden">
      
      {/* Newsletter Section */}
      <section className="bg-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-white p-10 sm:p-20 rounded-[60px] shadow-2xl relative overflow-hidden border border-blue-100">
              <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-[#024fe7]/5 rounded-full blur-3xl"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                 <div>
                    <h3 className="text-4xl md:text-5xl font-black text-black tracking-tighter italic mb-4">
                      Join the <span className="text-[#024fe7]">Family</span>
                    </h3>
                    <p className="text-gray-400 font-bold text-lg leading-relaxed">
                      Synchronize with the MindSky community for special offers, parenting insights, and early access to new collections.
                    </p>
                 </div>
                 <div className="flex flex-col sm:flex-row gap-4">
                    <input 
                      type="email" 
                      placeholder="ENTER DIGITAL UPLINK (EMAIL)" 
                      className="flex-1 bg-gray-50 border-2 border-transparent p-6 rounded-3xl font-black text-xs uppercase tracking-widest focus:border-[#024fe7] outline-none transition-all placeholder:text-gray-200"
                    />
                    <button className="brand-button-primary whitespace-nowrap flex items-center justify-center gap-3">
                      Subscribe <Send size={18} />
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Main Footer Block */}
      <section className="bg-black text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            {/* Brand */}
            <div>
              <Link href="/" className="flex items-center gap-2 mb-8 group">
                <div className="w-12 h-12 bg-[#024fe7] rounded-2xl flex items-center justify-center text-white font-black text-2xl">M</div>
                <span className="font-black text-3xl text-white tracking-tighter">MindSky<span className="text-[#024fe7]">.store</span></span>
              </Link>
              <p className="text-gray-400 font-bold text-sm leading-relaxed mb-10 italic">
                "Smart Choices for Happy Little Minds." Making development tangible through curated play and learning essentials.
              </p>
              <div className="flex gap-4">
                {[Instagram, Twitter, FacebookIcon, Youtube].map((Icon, idx) => (
                  <a key={idx} href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#024fe7] border border-white/5 hover:bg-[#024fe7] hover:text-white transition-all">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-black text-xl text-white mb-10 uppercase tracking-tighter italic">Ecosystem</h4>
              <ul className="space-y-4">
                <li><Link href="/shop" className="text-gray-400 hover:text-[#024fe7] font-bold text-sm transition-colors uppercase tracking-widest">Shop Catalog</Link></li>
                <li><Link href="/categories" className="text-gray-400 hover:text-[#024fe7] font-bold text-sm transition-colors uppercase tracking-widest">Departments</Link></li>
                <li><Link href="/brands" className="text-gray-400 hover:text-[#024fe7] font-bold text-sm transition-colors uppercase tracking-widest">Exclusive Brands</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-[#024fe7] font-bold text-sm transition-colors uppercase tracking-widest">Our Narrative</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-black text-xl text-white mb-10 uppercase tracking-tighter italic">Support</h4>
              <ul className="space-y-4">
                <li><Link href="/contact" className="text-gray-400 hover:text-[#024fe7] font-bold text-sm transition-colors uppercase tracking-widest">Contact Command</Link></li>
                <li><Link href="/shipping" className="text-gray-400 hover:text-[#024fe7] font-bold text-sm transition-colors uppercase tracking-widest">Logistics Policy</Link></li>
                <li><Link href="/returns" className="text-gray-400 hover:text-[#024fe7] font-bold text-sm transition-colors uppercase tracking-widest">Reverse Logistics</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-[#024fe7] font-bold text-sm transition-colors uppercase tracking-widest">Knowledge Base</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-black text-xl text-white mb-10 uppercase tracking-tighter italic">Coordinates</h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <MapPin size={22} className="text-[#024fe7] shrink-0" />
                  <span className="text-gray-400 font-bold text-sm leading-relaxed uppercase">{settings.address}</span>
                </li>
                <li className="flex items-center gap-4">
                  <Phone size={18} className="text-[#024fe7] shrink-0" />
                  <span className="text-gray-400 font-bold text-sm uppercase tracking-widest">{settings.phone}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-10">
            <div className="flex flex-col sm:flex-row items-center gap-10 text-gray-500 font-bold text-[10px] uppercase tracking-widest">
              <p>© {new Date().getFullYear()} MindSky Global. Authorized Presence.</p>
              <div className="flex gap-8">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy manifest</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms of engagement</Link>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                <ShieldCheck size={16} className="text-[#024fe7]" />
                <span className="text-[10px] font-black tracking-widest">SECURE SETTLEMENT</span>
              </div>
              <div className="flex gap-5 filter grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                <CreditCard size={28} />
                <span className="font-black italic text-xl">UPI</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}

