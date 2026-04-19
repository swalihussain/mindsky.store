"use client";

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Image as ImageIcon, XCircle, CheckCircle, UploadCloud } from 'lucide-react';

export default function CategoryManager() {
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    parent: 'None'
  });

  const [message, setMessage] = useState({ type: '', text: '' });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [catRes, prodRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/products?admin=true')
      ]);
      
      const catJson = await catRes.json();
      const prodJson = await prodRes.json();

      if (catJson.success) setCategories(catJson.data);
      if (prodJson.success) setProducts(prodJson.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append('file', file);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: data });
      const json = await res.json();
      if (json.success) {
        setFormData({ ...formData, imageUrl: json.url });
        setMessage({ type: 'success', text: 'Image uploaded!' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Upload failed' });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!formData.name) return;

    const url = isEditing ? `/api/categories/${currentId}` : '/api/categories';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const json = await res.json();

      if (json.success) {
        setMessage({ type: 'success', text: `Category ${isEditing ? 'updated' : 'created'}!` });
        fetchData();
        setTimeout(() => setIsModalOpen(false), 1500);
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Action failed' });
    }
  };

  const handleDelete = async (id: any) => {
    if (!confirm('Are you sure?')) return;
    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        alert('Deleted!');
        fetchData();
      }
    } catch (err) {
      alert('Delete failed');
    }
  };

  const openAddModal = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({ name: '', description: '', imageUrl: '', parent: 'None' });
    setMessage({ type: '', text: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (cat: any) => {
    setIsEditing(true);
    setCurrentId(cat.id);
    setFormData({
      name: cat.name,
      description: cat.description || '',
      imageUrl: cat.imageUrl || '',
      parent: cat.parent || 'None'
    });
    setMessage({ type: '', text: '' });
    setIsModalOpen(true);
  };

  // Helper to count products in a category
  const getProductCount = (categoryName: string) => {
    return products.filter(p => (p.category || p.category_id) === categoryName).length;
  };

  return (
    <div className="w-full flex flex-col h-full p-4 md:p-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-black text-[#1F2937] tracking-tight">Categories</h2>
          <p className="text-gray-500 mt-1 font-medium">Manage global product collections and hierarchies.</p>
        </div>
        <button onClick={openAddModal} className="bg-[#024fe7] hover:bg-[#3b8fd9] text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg transition-all active:scale-95">
          <Plus size={22} /> Add Category
        </button>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden flex-1 flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
                <th className="p-6 pl-10">Visual</th>
                <th className="p-6 font-black">Collection Name</th>
                <th className="p-6 font-black">Parent Hierarchy</th>
                <th className="p-6 font-black text-center">Items</th>
                <th className="p-6 pr-10 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={5} className="p-20 text-center font-bold text-gray-300">Loading data engine...</td></tr>
              ) : categories.length === 0 ? (
                <tr><td colSpan={5} className="p-20 text-center font-bold text-gray-300">No categories mapped yet.</td></tr>
              ) : categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="p-6 pl-10">
                    <div className="h-14 w-14 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 overflow-hidden shadow-sm">
                      {cat.imageUrl ? (
                        <img src={cat.imageUrl} alt={cat.name} className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon size={24} className="text-gray-200" />
                      )}
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col">
                      <span className="font-black text-[#1F2937] text-lg tracking-tight">{cat.name}</span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase mt-1">ID: {cat.id}</span>
                    </div>
                  </td>
                  <td className="p-6">
                     <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${cat.parent === 'None' ? 'bg-gray-100 text-gray-400' : 'bg-blue-50 text-[#024fe7]'}`}>
                        {cat.parent}
                     </span>
                  </td>
                  <td className="p-6 text-center">
                    <span className="font-black text-[#1F2937] bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
                      {getProductCount(cat.name)} <span className="text-[10px] text-gray-400 ml-1">UNITS</span>
                    </span>
                  </td>
                  <td className="p-6 pr-10 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button onClick={() => openEditModal(cat)} className="p-2 text-gray-400 hover:text-[#024fe7] hover:bg-blue-50 rounded-xl transition-all"><Edit size={20}/></button>
                      <button onClick={() => handleDelete(cat.id)} className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"><Trash2 size={20}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- ADD / EDIT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#0F172A]/40 z-[100] flex justify-center items-center p-4 backdrop-blur-md">
          <div className="bg-white max-w-xl w-full rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden flex flex-col animate-in zoom-in duration-200">
            <div className="p-10 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
               <h3 className="text-2xl font-black text-[#1F2937] tracking-tight">{isEditing ? 'Configure Collection' : 'New Collection'}</h3>
               <button onClick={() => setIsModalOpen(false)} className="text-gray-300 hover:text-rose-500 transition-colors"><XCircle size={32}/></button>
            </div>
            <div className="p-10">
               {message.text && (
                 <div className={`p-4 mb-8 rounded-2xl font-bold flex items-center gap-3 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                   {message.type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />} {message.text}
                 </div>
               )}
               <form onSubmit={handleSubmit} className="space-y-8">
                 <div>
                    <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Category Name *</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required className="w-full p-5 border border-gray-100 rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#024fe7]/10 focus:border-[#024fe7] font-bold text-lg" />
                 </div>
                 
                 <div className="grid grid-cols-2 gap-8">
                   <div className="col-span-2">
                      <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Hierarchy Parent</label>
                      <select value={formData.parent} onChange={(e) => setFormData({...formData, parent: e.target.value})} className="w-full p-5 border border-gray-100 rounded-2xl bg-gray-50 font-bold">
                        <option value="None">None (Top Level)</option>
                        {categories.filter(c => c.id !== currentId).map(c => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                   </div>
                 </div>

                 <div>
                    <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Collection Cover Asset</label>
                    <div className="flex items-center gap-6">
                       <div className="w-28 h-28 border-2 border-dashed border-gray-200 rounded-[24px] overflow-hidden bg-gray-50 shrink-0 flex justify-center items-center relative">
                         {formData.imageUrl ? (
                           <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                         ) : (
                           <UploadCloud size={28} className="text-gray-200" />
                         )}
                         {uploading && <div className="absolute inset-0 bg-white/70 flex items-center justify-center font-black text-xs text-[#024fe7] animate-pulse">BUSY...</div>}
                       </div>
                       <input type="file" id="catFile" onChange={handleImageUpload} className="hidden" />
                       <label htmlFor="catFile" className="px-6 py-3 bg-white border border-gray-200 text-gray-600 rounded-2xl text-[13px] font-bold cursor-pointer hover:shadow-md transition-all active:scale-95">Choose Visual</label>
                    </div>
                 </div>

                 <div className="flex justify-end gap-4 pt-4">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 text-gray-400 font-bold">Dismiss</button>
                    <button type="submit" className="px-10 py-4 bg-[#1F2937] text-white rounded-[20px] font-black text-sm shadow-xl active:scale-95 transition-all">
                       {isEditing ? 'COMMIT UPDATES' : 'LAUNCH COLLECTION'}
                    </button>
                 </div>
               </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
