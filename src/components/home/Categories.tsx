"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

const categories = [
  { name: 'Toys', icon: '🧸', color: 'bg-rose-100', text: 'text-rose-500', link: '/shop?category=toys' },
  { name: 'Kids Clothing', icon: '👕', color: 'bg-blue-100', text: 'text-blue-500', link: '/shop?category=clothing' },
  { name: 'School Items', icon: '🎒', color: 'bg-amber-100', text: 'text-amber-500', link: '/shop?category=school' },
  { name: 'Baby Products', icon: '🍼', color: 'bg-teal-100', text: 'text-teal-500', link: '/shop?category=baby' },
  { name: 'Accessories', icon: '🎁', color: 'bg-purple-100', text: 'text-purple-500', link: '/shop?category=accessories' },
];

export default function Categories() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-black text-gray-800 mb-4 inline-block relative">
            Shop By <span className="text-[#4DA6FF]">Category</span>
            <span className="absolute -bottom-2 right-0 w-1/2 h-2 bg-[#FFD966] rounded-full"></span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {categories.map((cat, index) => (
            <Link href={cat.link} key={index} className="group block">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.08, y: -10 }}
                className={`${cat.color} rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-transparent group-hover:border-white h-full`}
              >
                <div className="text-6xl mb-6 drop-shadow-md group-hover:scale-110 transition-transform duration-300 origin-bottom">
                  {cat.icon}
                </div>
                <h3 className={`font-bold font-heading text-lg md:text-xl ${cat.text} tracking-wide`}>
                  {cat.name}
                </h3>
              </motion.div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
