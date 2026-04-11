"use client";

import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';

export default function Newsletter() {
  return (
    <section className="py-24 px-4 bg-white relative">
      <div className="max-w-6xl mx-auto rounded-[3rem] bg-gradient-to-br from-[#4DA6FF] to-[#80bdff] text-white overflow-hidden relative shadow-2xl">
        {/* Background bubbles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-10 w-48 h-48 bg-blue-300 opacity-30 rounded-full blur-xl translate-y-1/2"></div>

        <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-heading font-black mb-6 leading-tight">Join the MindSky Family! 🎈</h2>
            <p className="text-xl text-blue-50 font-medium mb-2">Get exclusive offers, parenting tips, and fun activities delivered to your inbox.</p>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2 w-full bg-white rounded-3xl p-6 shadow-xl"
          >
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-gray-600 text-sm font-bold mb-2 ml-1">Parent's Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input type="email" placeholder="hello@example.com" className="w-full bg-gray-50 border-2 border-gray-100 text-gray-800 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#4DA6FF] transition-colors" required />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-600 text-sm font-bold mb-2 ml-1">Child's Age Group (For personalized tips)</label>
                <select className="w-full bg-gray-50 border-2 border-gray-100 text-gray-800 rounded-xl py-3 px-4 focus:outline-none focus:border-[#4DA6FF] transition-colors cursor-pointer appearance-none">
                  <option value="">Select Age Group</option>
                  <option value="0-2">Baby / Toddler (0-2 years)</option>
                  <option value="3-5">Preschool (3-5 years)</option>
                  <option value="6-8">Kids (6-8 years)</option>
                  <option value="9+">Pre-teens (9+ years)</option>
                </select>
              </div>

              <button type="submit" className="mt-2 w-full bg-[#FFD966] text-amber-900 font-bold py-4 rounded-xl shadow-[0_4px_0_#d4a200] hover:shadow-[0_2px_0_#d4a200] hover:translate-y-[2px] transition-all flex justify-center items-center gap-2 text-lg">
                Join MindSky Family <ArrowRight size={20} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
