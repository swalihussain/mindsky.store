"use client";

import { motion } from 'framer-motion';
import { Droplet, ShieldCheck, Printer, Truck } from 'lucide-react';

const TRUST_FEATURES = [
  {
    icon: Droplet,
    title: "Waterproof Materials",
    description: "Durable and resistant to water, perfect for daily use.",
  },
  {
    icon: ShieldCheck,
    title: "Safe for Kids",
    description: "Non-toxic materials, 100% child-friendly and secure.",
  },
  {
    icon: Printer,
    title: "High Quality Print",
    description: "Vibrant, fade-resistant colors that last all year long.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Get your essentials delivered quickly right to your doorstep.",
  }
];

export default function TrustSection() {
  return (
    <section className="py-[48px] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[8px] md:gap-8">
          {TRUST_FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center p-[8px] bg-white rounded-[20px] border border-gray-100 shadow-sm min-h-[160px] justify-center"
            >
              <div className="w-12 h-12 bg-[#024fe7]/10 rounded-full flex items-center justify-center mb-3">
                <feature.icon className="text-[#024fe7] w-6 h-6" />
              </div>
              <h3 className="text-[14px] md:text-lg font-bold text-black mb-1">{feature.title}</h3>
              <p className="text-[#555555] text-[12px] md:text-sm leading-relaxed line-clamp-2 px-1">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
