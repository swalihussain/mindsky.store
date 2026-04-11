import Link from 'next/link';
import { MapPin, Phone, Mail, MessageCircle, Camera, Globe, Video } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 pt-20 pb-10 border-t border-gray-100 relative overflow-hidden mt-auto">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#E6F3FF] opacity-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div>
            <Link href="/" className="font-heading font-extrabold text-3xl text-[#4DA6FF] inline-block mb-6">
              MindSky<span className="text-[#FFD966]">.store</span>
            </Link>
            <p className="text-gray-600 mb-6 font-medium leading-relaxed">
              Making learning fun and play educational. Your one-stop shop for kids' toys, clothing, and learning essentials.
            </p>
            <div className="flex gap-4 text-gray-400">
              <a href="#" className="hover:text-[#4DA6FF] transition-colors"><MessageCircle size={24} /></a>
              <a href="#" className="hover:text-[#4DA6FF] transition-colors"><Camera size={24} /></a>
              <a href="#" className="hover:text-[#4DA6FF] transition-colors"><Globe size={24} /></a>
              <a href="#" className="hover:text-[#4DA6FF] transition-colors"><Video size={24} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-xl text-gray-800 mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-gray-600 hover:text-[#4DA6FF] font-medium transition-colors">About Us</Link></li>
              <li><Link href="/shop" className="text-gray-600 hover:text-[#4DA6FF] font-medium transition-colors">Shop All Products</Link></li>
              <li><Link href="/categories" className="text-gray-600 hover:text-[#4DA6FF] font-medium transition-colors">Categories</Link></li>
              <li><Link href="/brands" className="text-gray-600 hover:text-[#4DA6FF] font-medium transition-colors">Our Brands</Link></li>
              <li><Link href="/blog" className="text-gray-600 hover:text-[#4DA6FF] font-medium transition-colors">Kids Learn Blog</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-heading font-bold text-xl text-gray-800 mb-6">Support</h4>
            <ul className="space-y-4">
              <li><Link href="/contact" className="text-gray-600 hover:text-[#4DA6FF] font-medium transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping" className="text-gray-600 hover:text-[#4DA6FF] font-medium transition-colors">Shipping Policy</Link></li>
              <li><Link href="/returns" className="text-gray-600 hover:text-[#4DA6FF] font-medium transition-colors">Returns & Refunds</Link></li>
              <li><Link href="/faq" className="text-gray-600 hover:text-[#4DA6FF] font-medium transition-colors">FAQs</Link></li>
              <li><Link href="/track-order" className="text-gray-600 hover:text-[#4DA6FF] font-medium transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-xl text-gray-800 mb-6">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-600 font-medium">
                <MapPin size={24} className="text-[#4DA6FF] shrink-0" />
                <span>123 Fun Street, Playville, Learning State 45678</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600 font-medium">
                <Phone size={20} className="text-[#4DA6FF] shrink-0" />
                <span>+1 (800) MINDSKY</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600 font-medium">
                <Mail size={20} className="text-[#4DA6FF] shrink-0" />
                <span>hello@mindsky.store</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm font-medium">
          <p>© {new Date().getFullYear()} MindSky Store. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-[#4DA6FF] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#4DA6FF] transition-colors">Terms of Service</Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-gray-200 px-2 py-1 rounded text-xs font-bold text-gray-700">UPI</span>
            <span className="bg-gray-200 px-2 py-1 rounded text-xs font-bold text-gray-700">Cards</span>
            <span className="bg-gray-200 px-2 py-1 rounded text-xs font-bold text-gray-700">PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
