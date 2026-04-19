import { useState, useEffect } from 'react';
import { 
  Save, Layout, Type, MousePointer2, CheckCircle, Loader2, Sparkles, 
  MessageSquareQuote, Brain, Lightbulb, Award, FileDown, Plus, Trash2,
  ToggleRight, ToggleLeft, ImageIcon, FileText, Hash, X
} from 'lucide-react';

export default function AtmosphereCMS() {
  const [cmsData, setCmsData] = useState<any>(null);
  const [lpData, setLpData] = useState<any>({ fun_facts: [], parenting_tips: [], printables: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeDepartment, setActiveDepartment] = useState<'branding' | 'education'>('branding');
  const [activeLpTab, setActiveLpTab] = useState<'facts' | 'tips' | 'printables'>('facts');

  const fetchData = async () => {
    try {
      const [cmsRes, lpRes] = await Promise.all([
        fetch('/api/cms'),
        fetch('/api/learn-play')
      ]);
      const [cmsJson, lpJson] = await Promise.all([cmsRes.json(), lpRes.json()]);
      
      if (cmsJson.success) {
        setCmsData({
          ...cmsJson.data,
          promo: cmsJson.data.promo || { highlight: '', title: '', subtitle: '', btnText: '' }
        });
      }
      if (lpJson.success) setLpData(lpJson.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCmsSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cmsData)
      });
      if (res.ok) {
        setMessage('Branding Realignment Published!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (err) { console.error(err); } 
    finally { setSaving(false); }
  };

  const updateLpItem = async (type: string, id: number, updates: any) => {
    try {
      const res = await fetch('/api/learn-play', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, id, updates })
      });
      if (res.ok) fetchData();
    } catch (err) { console.error(err); }
  };

  const addLpItem = async (type: string) => {
    const emptyStates: any = {
      fun_facts: { title: 'New Fun Fact', text: '', icon: 'Lightbulb', isActive: true },
      parenting_tips: { title: 'New Parenting Tip', text: '', icon: 'Award', isActive: true },
      printables: { title: 'New Printable', description: '', file_url: '', btnText: 'Download Now', downloads: 0, isActive: true }
    };
    try {
      const res = await fetch('/api/learn-play', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, content: emptyStates[type] })
      });
      if (res.ok) fetchData();
    } catch (err) { console.error(err); }
  };

  const deleteLpItem = async (type: string, id: number) => {
    if (!confirm('Permanently retire this asset?')) return;
    try {
      const res = await fetch(`/api/learn-play?type=${type}&id=${id}`, { method: 'DELETE' });
      if (res.ok) fetchData();
    } catch (err) { console.error(err); }
  };

  if (loading) return (
     <div className="flex-1 flex flex-col items-center justify-center py-40 gap-4 text-gray-200">
        <Loader2 className="w-10 h-10 animate-spin" />
        <span className="font-black text-[10px] uppercase tracking-[0.4em]">Syncing Master Narrative...</span>
     </div>
  );

  return (
    <div className="max-w-6xl w-full h-full pb-20 animate-in slide-in-from-bottom-4 duration-700">
      
      {/* GLOBAL HUD HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
           <h2 className="text-5xl font-black text-[#1F2937] tracking-tighter italic">FrontPage <span className="text-[#024fe7]">HQ</span></h2>
           <p className="text-gray-400 mt-2 font-medium italic">Integrated Narrative & Educational Control Terminal.</p>
        </div>
        
        <div className="flex gap-3 bg-white p-2 rounded-[28px] shadow-sm border border-gray-100">
           <button 
             onClick={() => setActiveDepartment('branding')}
             className={`flex items-center gap-3 px-8 py-3.5 rounded-[22px] font-black text-[10px] uppercase tracking-widest transition-all ${activeDepartment === 'branding' ? 'bg-[#1F2937] text-white' : 'text-gray-400 hover:bg-gray-50'}`}
           >
             <Layout size={16} /> Brand Flow
           </button>
           <button 
             onClick={() => setActiveDepartment('education')}
             className={`flex items-center gap-3 px-8 py-3.5 rounded-[22px] font-black text-[10px] uppercase tracking-widest transition-all ${activeDepartment === 'education' ? 'bg-[#024fe7] text-white shadow-lg' : 'text-gray-400 hover:bg-gray-50'}`}
           >
             <Brain size={16} /> Learn & Play
           </button>
        </div>
      </div>

      {message && (
        <div className="mb-10 p-6 bg-emerald-50 text-emerald-600 rounded-[32px] font-black text-xs flex items-center justify-between border border-emerald-100 shadow-sm animate-in zoom-in duration-500">
           <div className="flex items-center gap-4">
              <CheckCircle size={24} /> {message}
           </div>
        </div>
      )}

      {activeDepartment === 'branding' ? (
        <div className="space-y-12 animate-in fade-in duration-500">
           <div className="flex justify-end mb-4">
              <button 
                onClick={handleCmsSave} 
                disabled={saving}
                className="bg-[#1F2937] hover:bg-[#024fe7] text-white px-10 py-5 rounded-[22px] font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-2xl transition-all active:scale-95 disabled:opacity-50"
              >
                {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} 
                {saving ? 'Transmitting...' : 'Save Brand Manifest'}
              </button>
           </div>

           {/* HERO SECTION CMS SECTION */}
           <div className="bg-white rounded-[60px] border border-gray-100 p-12 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-10 opacity-[0.02] transition-transform group-hover:scale-125 duration-1000 -rotate-12 pointer-events-none"><Layout size={280} /></div>
              <h3 className="text-2xl font-black text-[#1F2937] mb-12 flex items-center gap-4 tracking-tight relative z-10 italic">
                 <div className="w-12 h-12 bg-blue-50 text-[#024fe7] rounded-full flex items-center justify-center"><Type size={20} /></div>
                 Main Attraction Sequence
              </h3>
              
              <div className="grid grid-cols-1 gap-10 relative z-10">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-gray-300 ml-2">Primary Title</label>
                    <input 
                      type="text" 
                      className="w-full p-6 bg-gray-50 border-2 border-transparent rounded-[24px] font-black text-xl text-[#1F2937] focus:bg-white focus:border-[#024fe7] outline-none transition-all"
                      value={cmsData?.hero_title}
                      onChange={(e) => setCmsData({...cmsData, hero_title: e.target.value})}
                    />
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-gray-300 ml-2">Contextual Narrative</label>
                    <textarea 
                      className="w-full p-8 bg-gray-50 border-2 border-transparent rounded-[32px] font-medium text-gray-600 focus:bg-white focus:border-[#024fe7] outline-none h-40 transition-all leading-relaxed"
                      value={cmsData?.hero_subtitle}
                      onChange={(e) => setCmsData({...cmsData, hero_subtitle: e.target.value})}
                    />
                 </div>
              </div>
           </div>

           {/* FOOTER CMS SECTION */}
           <div className="bg-[#1F2937] rounded-[60px] shadow-2xl p-12 text-white relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-[400px] h-[400px] bg-[#024fe7] rounded-full blur-[140px] opacity-10"></div>
              <h3 className="text-2xl font-black mb-12 flex items-center gap-4 tracking-tight relative z-10 italic">
                 <div className="w-12 h-12 bg-white/10 text-white rounded-full flex items-center justify-center"><MessageSquareQuote size={20} /></div>
                 Global Footer Wisdom
              </h3>
              <textarea 
                className="w-full p-10 bg-white/5 border-2 border-white/5 rounded-[40px] font-medium text-gray-300 focus:bg-white focus:text-[#1F2937] focus:border-[#024fe7] transition-all outline-none h-48 leading-relaxed shadow-inner"
                value={cmsData?.footer_description}
                onChange={(e) => setCmsData({...cmsData, footer_description: e.target.value})}
              />
           </div>
        </div>
      ) : (
        <div className="space-y-12 animate-in fade-in duration-500">
           {/* LEARN & PLAY SUB-TABS */}
           <div className="flex gap-3 mb-8">
              {[
                { id: 'facts', label: 'Fun Facts', color: 'bg-amber-50 text-amber-500' },
                { id: 'tips', label: 'Parenting Tip', color: 'bg-blue-50 text-[#024fe7]' },
                { id: 'printables', label: 'Printables', color: 'bg-emerald-50 text-emerald-500' }
              ].map(t => (
                <button 
                  key={t.id} 
                  onClick={() => setActiveLpTab(t.id as any)}
                  className={`px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${activeLpTab === t.id ? t.color : 'text-gray-400 hover:bg-gray-50'}`}
                >
                  {t.label}
                </button>
              ))}
              <div className="ml-auto">
                 <button 
                   onClick={() => addLpItem(activeLpTab === 'facts' ? 'fun_facts' : activeLpTab === 'tips' ? 'parenting_tips' : 'printables')}
                   className="bg-[#1F2937] text-white px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-[#024fe7] transition-all"
                 >
                   Deploy New Record
                 </button>
              </div>
           </div>

           <div className="grid grid-cols-1 gap-8">
              {(activeLpTab === 'facts' ? lpData.fun_facts : activeLpTab === 'tips' ? lpData.parenting_tips : lpData.printables).map((item: any) => (
                <div key={item.id} className="bg-white rounded-[56px] border border-gray-100 p-10 shadow-sm relative group">
                   <div className="absolute top-10 right-10 flex gap-2">
                      <button onClick={() => updateLpItem(activeLpTab === 'facts' ? 'fun_facts' : activeLpTab === 'tips' ? 'parenting_tips' : 'printables', item.id, { isActive: !item.isActive })}>
                         {item.isActive ? <ToggleRight className="text-emerald-500" size={32}/> : <ToggleLeft className="text-gray-300" size={32}/>}
                      </button>
                      <button onClick={() => deleteLpItem(activeLpTab === 'facts' ? 'fun_facts' : activeLpTab === 'tips' ? 'parenting_tips' : 'printables', item.id)} className="text-gray-300 hover:text-rose-500"><X size={24}/></button>
                   </div>

                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      <div className="space-y-6">
                         <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase text-gray-300 ml-2">Heading Title</label>
                            <input 
                              type="text" 
                              className="w-full p-5 bg-gray-50 border-transparent border-2 rounded-[20px] font-black text-[#1F2937] focus:bg-white focus:border-[#024fe7] outline-none transition-all uppercase italic"
                              value={item.title}
                              onChange={(e) => updateLpItem(activeLpTab === 'facts' ? 'fun_facts' : activeLpTab === 'tips' ? 'parenting_tips' : 'printables', item.id, { title: e.target.value })}
                            />
                         </div>
                         <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase text-gray-300 ml-2">Content Narrative</label>
                            <textarea 
                              className="w-full p-6 bg-gray-50 border-transparent border-2 rounded-[28px] font-medium text-gray-600 focus:bg-white focus:border-[#024fe7] h-32 transition-all italic leading-relaxed"
                              value={activeLpTab === 'printables' ? item.description : item.text}
                              onChange={(e) => updateLpItem(activeLpTab === 'facts' ? 'fun_facts' : activeLpTab === 'tips' ? 'parenting_tips' : 'printables', item.id, { [activeLpTab === 'printables' ? 'description' : 'text']: e.target.value })}
                            />
                         </div>
                      </div>
                      
                      {activeLpTab === 'printables' && (
                        <div className="flex flex-col justify-end gap-6 bg-gray-50/50 p-8 rounded-[40px] border border-dashed border-gray-100">
                           <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                              <span className="text-[10px] font-black uppercase text-gray-400 ml-2">Pulses Detected</span>
                              <span className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-lg font-black text-xs">{item.downloads} DOWNLOADS</span>
                           </div>
                           <input 
                             type="text" 
                             className="w-full p-5 bg-white border-gray-100 border-2 rounded-2xl font-black text-xs focus:border-[#024fe7] outline-none"
                             placeholder="Asset Payload URL (PDF/IMAGE)"
                             value={item.file_url}
                             onChange={(e) => updateLpItem('printables', item.id, { file_url: e.target.value })}
                           />
                        </div>
                      )}
                   </div>
                </div>
              ))}
           </div>
        </div>
      )}
    </div>
  );
}
