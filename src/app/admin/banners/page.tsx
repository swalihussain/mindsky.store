"use client";

import { useState, useEffect, useRef } from 'react';
import { ImagePlus, Trash2, Link as LinkIcon, ExternalLink, Loader2, XCircle, CheckCircle, Globe, CloudUpload, Eye, Upload } from 'lucide-react';
import Image from 'next/image';

export default function BannerCMS() {
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    link: ''
  });

  const fetchBanners = async () => {
    try {
      const res = await fetch('/api/banners');
      const json = await res.json();
      if (json.success) setBanners(json.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadProgress(true);
    const data = new FormData();
    data.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      });
      const json = await res.json();
      if (json.success) {
        setFormData({ ...formData, imageUrl: json.url });
      } else {
        alert(json.error || "Upload failed");
      }
    } catch (err) {
      alert("Network protocol error during upload.");
    } finally {
      setUploadProgress(false);
    }
  };

  const handleDeploy = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      const res = await fetch('/api/banners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ title: '', imageUrl: '', link: '' });
        fetchBanners();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const deleteBanner = async (id: number) => {
    if (!confirm('Permanent retire this marketing asset?')) return;
    try {
      const res = await fetch(`/api/banners/${id}`, { method: 'DELETE' });
      if (res.ok) fetchBanners();
    } catch (err) {
       console.error(err);
    }
  };

  const toggleStatus = async (id: number, current: boolean) => {
    try {
      await fetch(`/api/banners/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !current })
      });
      fetchBanners();
    } catch (err) {
       console.error(err);
    }
  };

  return (
    <div className="w-full h-full p-4 md:p-8 animate-in fade-in duration-700">
      
      {/* Header Profile */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <h2 className="text-4xl font-black text-[#1F2937] tracking-tighter">Marketing <span className="text-[#024fe7]">Assets</span></h2>
           <p className="text-gray-400 mt-1 font-medium italic">Synchronize high-resolution promotional graphics across the storefront.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#1F2937] text-white px-8 py-4 rounded-[20px] font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-2xl hover:bg-[#024fe7] transition-all group active:scale-95"
        >
          <CloudUpload size={18} className="group-hover:-translate-y-1 transition-transform" /> Deploy New Asset
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        
        {/* Active Count Card */}
        <div className="col-span-full bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex items-center justify-between mb-4">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-[#024fe7] rounded-2xl flex items-center justify-center">
                 <Globe size={24} />
              </div>
              <div>
                 <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Global Rotation</p>
                 <p className="font-black text-[#1F2937] text-xl italic">{banners.filter(b => b.isActive).length} Assets Live</p>
              </div>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black uppercase text-emerald-500 tracking-widest leading-none">Healthy Sequence</span>
           </div>
        </div>

        {loading ? (
          <div className="col-span-full py-20 text-center font-bold text-gray-300">Synchronizing Media Cloud...</div>
        ) : banners.length === 0 ? (
          <div className="col-span-full py-20 text-center font-bold text-gray-300">No marketing assets available for rotation.</div>
        ) : banners.map((banner) => (
          <div key={banner.id} className="bg-white p-6 rounded-[48px] border border-gray-100 shadow-sm relative group overflow-hidden flex flex-col">
            
            {/* Image Preview Container */}
            <div className="w-full aspect-[16/7] relative rounded-[32px] overflow-hidden bg-gray-50 border border-gray-100 mb-6">
               <Image src={banner.imageUrl} alt={banner.title} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" unoptimized />
               <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <span className="text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                     <Eye size={14}/> Resolution Verified
                  </span>
               </div>
               <button 
                 onClick={() => deleteBanner(banner.id)}
                 className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-rose-500 transition-all border border-white/20"
               >
                  <Trash2 size={18} />
               </button>
            </div>

            <div className="px-2">
               <div className="flex justify-between items-start mb-4">
                  <h4 className="text-xl font-black text-[#1F2937] tracking-tight truncate pr-4">{banner.title}</h4>
                  <button 
                    onClick={() => toggleStatus(banner.id, banner.isActive)}
                    className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all ${
                      banner.isActive ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-gray-50 text-gray-400 border-gray-100'
                    }`}
                  >
                    {banner.isActive ? 'In-Flight' : 'Grounded'}
                  </button>
               </div>
               
               <div className="flex items-center gap-3 text-gray-300 mb-6">
                  <LinkIcon size={14} />
                  <span className="text-xs font-bold truncate max-w-[200px]">{banner.link}</span>
               </div>

               <div className="pt-6 border-t border-gray-50 flex justify-between items-center mt-auto">
                  <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none">Uplink ID: #{banner.id.toString().slice(-4)}</span>
                  <span className="text-[10px] font-black text-[#1F2937] uppercase tracking-widest bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">Hero Section</span>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- ASSET DEPLOYMENT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#0F172A]/50 z-[100] flex justify-center items-center p-4 backdrop-blur-xl animate-in zoom-in duration-300">
           <form onSubmit={handleDeploy} className="bg-white max-w-lg w-full rounded-[48px] shadow-2xl overflow-hidden border border-white/20">
              <div className="p-10 bg-gray-50/80 border-b border-gray-100 flex justify-between items-center">
                 <div>
                    <h3 className="text-3xl font-black text-[#1F2937] tracking-tighter italic">Asset <span className="text-[#024fe7]">Deployment</span></h3>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mt-1">Marketing Cloud Authorization</p>
                 </div>
                 <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-300 hover:text-rose-500 transition-colors"><XCircle size={32}/></button>
              </div>
              <div className="p-10 space-y-8">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-2">Manifest Identity (Title)</label>
                    <input 
                      type="text" 
                      required
                      placeholder="E.G. SUMMER COLLECTION 2026" 
                      className="w-full p-5 bg-gray-50 border-2 border-transparent rounded-[24px] font-black text-[#1F2937] uppercase focus:border-[#024fe7] outline-none transition-all placeholder:text-gray-200"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-2">Visual Source (Internal/External)</label>
                    <div className="relative group/upload">
                       {formData.imageUrl ? (
                         <div className="relative w-full aspect-[16/7] rounded-[24px] overflow-hidden border-2 border-[#024fe7] bg-gray-50">
                            <Image src={formData.imageUrl} alt="Preview" fill className="object-cover" unoptimized />
                            <button 
                              type="button" 
                              onClick={() => setFormData({...formData, imageUrl: ''})}
                              className="absolute top-3 right-3 bg-white text-rose-500 p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                            >
                               <Trash2 size={16}/>
                            </button>
                         </div>
                       ) : (
                         <div 
                           onClick={() => fileInputRef.current?.click()}
                           className="w-full aspect-[16/7] bg-gray-50 border-2 border-dashed border-gray-200 rounded-[24px] flex flex-col items-center justify-center cursor-pointer hover:border-[#024fe7] hover:bg-blue-50/50 transition-all group"
                         >
                            {uploadProgress ? (
                               <Loader2 size={32} className="text-[#024fe7] animate-spin" />
                            ) : (
                               <>
                                  <Upload size={32} className="text-gray-300 group-hover:text-[#024fe7] transition-colors mb-4" />
                                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Transmit Local Asset</p>
                               </>
                            )}
                         </div>
                       )}
                       <input 
                         type="file" 
                         ref={fileInputRef}
                         className="hidden" 
                         accept="image/*"
                         onChange={handleFileUpload}
                       />
                       
                       <div className="mt-4 flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                          <ImagePlus size={16} className="text-gray-300" />
                          <input 
                            type="text" 
                            placeholder="OR PASTE REMOTE URL..." 
                            className="bg-transparent border-none outline-none font-black text-[10px] w-full uppercase tracking-widest text-[#1F2937] placeholder:text-gray-200"
                            value={formData.imageUrl}
                            onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                          />
                       </div>
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-2">Redirect Coordinate (Link)</label>
                    <div className="relative">
                       <LinkIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                       <input 
                         type="text" 
                         placeholder="/SHOP or HTTPS://..." 
                         className="w-full pl-14 pr-5 py-5 bg-gray-50 border-2 border-transparent rounded-[24px] font-black text-[#1F2937] focus:border-[#024fe7] outline-none transition-all placeholder:text-gray-200"
                         value={formData.link}
                         onChange={(e) => setFormData({...formData, link: e.target.value})}
                       />
                    </div>
                 </div>

                 <button type="submit" disabled={isUploading || !formData.imageUrl} className="w-full py-6 bg-[#1F2937] text-white rounded-[24px] font-black text-sm flex items-center justify-center gap-3 hover:bg-[#024fe7] transition-all shadow-xl active:scale-95 group disabled:opacity-30">
                    {isUploading ? <Loader2 size={18} className="animate-spin" /> : <CloudUpload size={18} className="group-hover:-translate-y-1 transition-transform" />}
                    AUTHORIZE DEPLOYMENT
                 </button>
              </div>
           </form>
        </div>
      )}
    </div>
  );
}
