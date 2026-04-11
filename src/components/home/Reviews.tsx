"use client";

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

const reviews = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Mother of 2",
    content: "Absolutely love the quality of the toys. My kids spend hours with the magnetic blocks! The delivery was so fast and the packaging was adorable.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: 2,
    name: "Michael Thompson",
    role: "Teacher",
    content: "As an educator, I highly recommend MindSky's educational section. The STEM kits are perfect for young learners and incredibly durable.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: 3,
    name: "Jessica Wong",
    role: "Parent",
    content: "The kids' clothing line is so soft and the colors don't fade after washing. Plus, my daughter loves the playful designs!",
    rating: 4,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
  }
];

export default function Reviews() {
  return (
    <section className="py-24 px-4 bg-white relative overflow-hidden">
      {/* Decorative SVG Pattern */}
      <div className="absolute top-0 right-0 opacity-5 w-1/2 h-full bg-[radial-gradient(circle_at_center,_var(--color-secondary)_0%,_transparent_100%)]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-gray-800 mb-4">Happy Parents & Kids</h2>
          <div className="w-24 h-2 bg-[#4DA6FF] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white border-2 border-gray-100 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 relative"
            >
              <div className="absolute -top-6 right-8 bg-[#E6F3FF] text-[#4DA6FF] p-3 rounded-full">
                <Quote size={24} className="fill-current" />
              </div>
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className={i < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"} />
                ))}
              </div>

              <p className="text-gray-600 text-lg mb-8 italic">"{review.content}"</p>

              <div className="flex items-center gap-4 mt-auto">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#4DA6FF]">
                  <Image src={review.avatar} alt={review.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 font-heading">{review.name}</h4>
                  <p className="text-gray-500 text-sm">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
