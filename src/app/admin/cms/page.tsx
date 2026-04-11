"use client";

import { useState, useEffect } from "react";
import { useCmsStore } from "@/store/cmsStore";
import { Save, RefreshCw, Layout, Megaphone } from "lucide-react";

export default function CmsEditor() {
  const { data, updateHero, updatePromo } = useCmsStore();
  const [mounted, setMounted] = useState(false);
  
  // Local state for form fields
  const [heroForm, setHeroForm] = useState(data.hero);
  const [promoForm, setPromoForm] = useState(data.promo);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMounted(true);
    setHeroForm(data.hero);
    setPromoForm(data.promo);
  }, [data]);

  if (!mounted) return null;

  const handleSaveHero = () => {
    setIsSaving(true);
    updateHero(heroForm);
    setTimeout(() => {
      setIsSaving(false);
      setMessage("Hero section updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    }, 500);
  };

  const handleSavePromo = () => {
    setIsSaving(true);
    updatePromo(promoForm);
    setTimeout(() => {
      setIsSaving(false);
      setMessage("Promo banner updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    }, 500);
  };

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-heading font-extrabold text-gray-800">Home Page Content</h2>
          <p className="text-gray-500 mt-1">Edit the text and calls-to-action on your front page.</p>
        </div>
        {message && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-bold text-sm animate-bounce">
            {message}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-10">
        
        {/* Hero Section Editor */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex items-center gap-3">
            <Layout className="text-[#4DA6FF]" size={24} />
            <h3 className="font-heading font-bold text-xl text-gray-800">Hero Section</h3>
          </div>
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Offer Highlight Text</label>
                <input 
                  type="text" 
                  value={heroForm.offerText}
                  onChange={(e) => setHeroForm({...heroForm, offerText: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4DA6FF] focus:ring-2 focus:ring-[#4DA6FF]/20 outline-none transition-all"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Main Title</label>
                <textarea 
                  rows={2}
                  value={heroForm.title}
                  onChange={(e) => setHeroForm({...heroForm, title: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4DA6FF] focus:ring-2 focus:ring-[#4DA6FF]/20 outline-none transition-all"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Sub-headline</label>
                <textarea 
                  rows={3}
                  value={heroForm.subtitle}
                  onChange={(e) => setHeroForm({...heroForm, subtitle: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4DA6FF] focus:ring-2 focus:ring-[#4DA6FF]/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Primary Button Text</label>
                <input 
                  type="text" 
                  value={heroForm.primaryBtnText}
                  onChange={(e) => setHeroForm({...heroForm, primaryBtnText: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4DA6FF] focus:ring-2 focus:ring-[#4DA6FF]/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Secondary Button Text</label>
                <input 
                  type="text" 
                  value={heroForm.secondaryBtnText}
                  onChange={(e) => setHeroForm({...heroForm, secondaryBtnText: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4DA6FF] focus:ring-2 focus:ring-[#4DA6FF]/20 outline-none transition-all"
                />
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <button 
                onClick={handleSaveHero}
                disabled={isSaving}
                className="flex items-center gap-2 bg-[#4DA6FF] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#3d95eb] transition-colors shadow-lg shadow-blue-100 disabled:opacity-50"
              >
                {isSaving ? <RefreshCw className="animate-spin" size={20} /> : <Save size={20} />}
                Update Hero Section
              </button>
            </div>
          </div>
        </div>

        {/* Promo Banner Editor */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex items-center gap-3">
            <Megaphone className="text-[#FFD966]" size={24} />
            <h3 className="font-heading font-bold text-xl text-gray-800">Promo Banner</h3>
          </div>
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Badge Text</label>
                <input 
                  type="text" 
                  value={promoForm.highlight}
                  onChange={(e) => setPromoForm({...promoForm, highlight: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4DA6FF] focus:ring-2 focus:ring-[#4DA6FF]/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Button Text</label>
                <input 
                  type="text" 
                  value={promoForm.btnText}
                  onChange={(e) => setPromoForm({...promoForm, btnText: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4DA6FF] focus:ring-2 focus:ring-[#4DA6FF]/20 outline-none transition-all"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Banner Heading</label>
                <input 
                  type="text" 
                  value={promoForm.title}
                  onChange={(e) => setPromoForm({...promoForm, title: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4DA6FF] focus:ring-2 focus:ring-[#4DA6FF]/20 outline-none transition-all"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Banner Sub-headline</label>
                <textarea 
                  rows={2}
                  value={promoForm.subtitle}
                  onChange={(e) => setPromoForm({...promoForm, subtitle: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4DA6FF] focus:ring-2 focus:ring-[#4DA6FF]/20 outline-none transition-all"
                />
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <button 
                onClick={handleSavePromo}
                disabled={isSaving}
                className="flex items-center gap-2 bg-[#FFD966] text-amber-900 px-8 py-3 rounded-xl font-bold hover:bg-[#f5cf56] transition-colors shadow-lg shadow-amber-50 disabled:opacity-50"
              >
                {isSaving ? <RefreshCw className="animate-spin" size={20} /> : <Save size={20} />}
                Update Promo Banner
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
