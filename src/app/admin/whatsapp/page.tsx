"use client";

import { useState, useEffect } from 'react';
import { 
  MessageCircle, Phone, Type, Save, CheckCircle, Loader2, 
  Settings, ToggleRight, ToggleLeft 
} from 'lucide-react';

export default function WhatsAppSettingsCMS() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/whatsapp-settings')
      .then(res => res.json())
      .then(json => {
        if (json.success) setSettings(json.settings);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/whatsapp-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        setMessage('WhatsApp Uplink Realigned!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
     <div className="flex-1 flex flex-col items-center justify-center py-40 gap-4 text-gray-200">
        <Loader2 className="w-10 h-10 animate-spin" />
        <span className="font-black text-[10px] uppercase tracking-[0.4em]">Establishing secure uplink...</span>
     </div>
  );

  return (
    <div className="max-w-4xl w-full h-full pb-20 p-4 md:p-8 animate-in slide-in-from-right-4 duration-700">
      
      {/* Header HUD */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
           <h2 className="text-5xl font-black text-[#1F2937] tracking-tighter italic">WhatsApp <span className="text-[#25D366]">Settings</span></h2>
           <p className="text-gray-400 mt-2 font-medium italic">Configure your direct conversational shopping terminal.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-[#1F2937] hover:bg-[#25D366] text-white px-10 py-5 rounded-[22px] font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-2xl transition-all active:scale-95 disabled:opacity-50"
        >
          {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
          {saving ? 'Transmitting...' : 'Save Uplink Config'}
        </button>
      </div>

      {message && (
        <div className="mb-10 p-6 bg-emerald-50 text-emerald-600 rounded-[32px] font-black text-xs flex items-center justify-between border border-emerald-100 shadow-sm animate-in zoom-in">
           <div className="flex items-center gap-4">
              <CheckCircle size={24} /> {message}
           </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8">
         {/* MAIN TERMINAL CONFIG */}
         <div className="bg-white rounded-[56px] border border-gray-100 p-12 shadow-sm relative overflow-hidden group">
            <div className="absolute top-10 right-10 flex flex-col items-end gap-3">
               <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Uplink Status</span>
               <button onClick={() => setSettings({...settings, enabled: !settings.enabled})}>
                  {settings.enabled ? <ToggleRight size={48} className="text-[#25D366]" /> : <ToggleLeft size={48} className="text-gray-200" />}
               </button>
            </div>

            <div className="space-y-10 max-w-2xl text-[#1F2937]">
               <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-300 ml-2">WhatsApp Number (With Country Code)</label>
                  <div className="relative group/input">
                     <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within/input:text-[#25D366] transition-colors"><Phone size={20}/></div>
                     <input 
                       type="text" 
                       placeholder="e.g. 919876543210"
                       className="w-full p-6 pl-16 bg-gray-50 border-2 border-transparent rounded-[24px] font-black text-xl focus:bg-white focus:border-[#25D366] outline-none transition-all shadow-inner"
                       value={settings.number}
                       onChange={(e) => setSettings({...settings, number: e.target.value})}
                     />
                  </div>
               </div>

               <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-300 ml-2">Auto Message manifesting</label>
                  <div className="relative group/input">
                     <div className="absolute left-6 top-7 text-gray-300 group-focus-within/input:text-[#25D366] transition-colors"><MessageCircle size={20}/></div>
                     <textarea 
                       placeholder="Hello, I want to place an order..."
                       className="w-full p-6 pl-16 bg-gray-50 border-2 border-transparent rounded-[32px] font-medium text-gray-600 focus:bg-white focus:border-[#25D366] outline-none h-32 transition-all leading-relaxed shadow-inner"
                       value={settings.default_message}
                       onChange={(e) => setSettings({...settings, default_message: e.target.value})}
                     />
                  </div>
               </div>

               <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-300 ml-2">Button Action Text</label>
                  <div className="relative group/input">
                     <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within/input:text-[#25D366] transition-colors"><Type size={20}/></div>
                     <input 
                       type="text" 
                       placeholder="Order Now"
                       className="w-full p-6 pl-16 bg-gray-50 border-2 border-transparent rounded-[24px] font-black text-xs uppercase tracking-[0.2em] focus:bg-white focus:border-[#25D366] outline-none transition-all shadow-inner"
                       value={settings.button_text}
                       onChange={(e) => setSettings({...settings, button_text: e.target.value})}
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
