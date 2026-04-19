"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Save, Loader2, CheckCircle, Info } from 'lucide-react';

export default function ContactManager() {
  const [settings, setSettings] = useState({
    address: '',
    phone: '',
    email: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/contact-settings');
      const json = await res.json();
      if (json.success) setSettings(json.settings);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    try {
      const res = await fetch('/api/contact-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      alert("Failed to save contact settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <Loader2 className="animate-spin text-[#024fe7]" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <div className="mb-10">
        <h2 className="text-4xl font-black text-[#1F2937] tracking-tighter italic">Communication <span className="text-[#024fe7]">Center</span></h2>
        <p className="text-gray-400 font-bold mt-2">Manage your store's public contact information and location.</p>
      </div>

      <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-[32px] mb-10 flex gap-4 items-start">
         <div className="bg-white p-3 rounded-2xl shadow-sm text-[#024fe7]"><Info size={20}/></div>
         <div>
            <h4 className="font-black text-[#1F2937] text-sm uppercase tracking-tight">Real-time Synchronization</h4>
            <p className="text-gray-500 text-xs font-bold mt-1 leading-relaxed">Changes saved here will instantly update the footer across the entire storefront for all visitors.</p>
         </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Phone */}
           <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Support Phone Number</label>
              <div className="relative group">
                 <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#024fe7] transition-colors"><Phone size={20}/></div>
                 <input 
                   required
                   type="text" 
                   value={settings.phone}
                   onChange={(e) => setSettings({...settings, phone: e.target.value})}
                   className="w-full pl-16 pr-8 py-6 bg-gray-50 border-2 border-transparent rounded-[24px] font-black text-[#1F2937] focus:bg-white focus:border-[#024fe7] outline-none transition-all placeholder:text-gray-200"
                   placeholder="+1 (000) 000-0000"
                 />
              </div>
           </div>

           {/* Email */}
           <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Public Support Email</label>
              <div className="relative group">
                 <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#024fe7] transition-colors"><Mail size={20}/></div>
                 <input 
                   required
                   type="email" 
                   value={settings.email}
                   onChange={(e) => setSettings({...settings, email: e.target.value})}
                   className="w-full pl-16 pr-8 py-6 bg-gray-50 border-2 border-transparent rounded-[24px] font-black text-[#1F2937] focus:bg-white focus:border-[#024fe7] outline-none transition-all placeholder:text-gray-200"
                   placeholder="support@mindsky.store"
                 />
              </div>
           </div>
        </div>

        {/* Address */}
        <div className="space-y-4">
           <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Physical Store Address</label>
           <div className="relative group">
              <div className="absolute left-6 top-8 text-gray-300 group-focus-within:text-[#024fe7] transition-colors"><MapPin size={24}/></div>
              <textarea 
                required
                value={settings.address}
                onChange={(e) => setSettings({...settings, address: e.target.value})}
                className="w-full pl-16 pr-8 py-8 bg-gray-50 border-2 border-transparent rounded-[32px] font-bold text-[#1F2937] focus:bg-white focus:border-[#024fe7] outline-none transition-all min-h-[140px] resize-none leading-relaxed placeholder:text-gray-200"
                placeholder="123 Discovery Way, Learning City..."
              />
           </div>
        </div>

        <div className="pt-6">
           <button 
             disabled={saving}
             className="w-full md:w-auto px-16 py-6 bg-[#1F2937] text-white rounded-[24px] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-[#024fe7] hover:-translate-y-1 transition-all shadow-xl active:scale-95 disabled:opacity-50"
           >
             {saving ? <Loader2 className="animate-spin" size={18} /> : success ? <CheckCircle size={18} className="text-emerald-400" /> : <Save size={18} />}
             {saving ? 'Transmitting Changes...' : success ? 'Settings Authorized!' : 'Authorize & Save Settings'}
           </button>
        </div>
      </form>
    </div>
  );
}
