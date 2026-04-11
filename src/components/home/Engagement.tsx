"use client";

import { motion } from 'framer-motion';
import { Lightbulb, Award, Download, ArrowRight, Brain } from 'lucide-react';

export default function Engagement() {
  const features = [
    {
      title: "Fun Fact of the Day!",
      description: "Did you know that octopuses have three hearts? Two pump blood to the gills, and one pumps it to the rest of the body!",
      icon: Lightbulb,
      color: "bg-yellow-100 text-yellow-600 border-yellow-200"
    },
    {
      title: "Parenting Tip",
      description: "Encourage 15 minutes of unstructured imaginative play every day to boost your child's creative problem-solving skills.",
      icon: Award,
      color: "bg-blue-100 text-blue-600 border-blue-200"
    },
    {
      title: "Free Printable",
      description: "Download our weekly math challenge worksheet! Perfect for ages 5-8.",
      icon: Download,
      color: "bg-green-100 text-green-600 border-green-200",
      action: "Download Now"
    }
  ];

  return (
    <section className="py-24 px-4 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 bg-[#4DA6FF] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg text-white"
          >
            <Brain size={32} />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-gray-800 mb-4">Learn & Play Corner</h2>
          <div className="w-24 h-2 bg-[#4DA6FF] mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">We believe that learning should be just as much fun as playing! Explore our weekly tips, fun facts, and activities.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`p-8 rounded-[2rem] border-2 shadow-sm ${feature.color} flex flex-col h-full bg-opacity-30 backdrop-blur-sm relative overflow-hidden`}
            >
              {/* Decorative circle */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-40 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4"></div>
              
              <feature.icon size={40} className="mb-6" />
              <h3 className="font-heading font-bold text-2xl mb-4 text-gray-800">{feature.title}</h3>
              <p className="text-gray-700 text-lg flex-grow leading-relaxed mb-6 font-medium">"{feature.description}"</p>
              
              {feature.action ? (
                <button className="flex items-center gap-2 mt-auto font-bold text-green-700 hover:text-green-900 group">
                  {feature.action} <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <div className="mt-auto flex items-center gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full bg-current opacity-${(i+1)*30}`}></div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
