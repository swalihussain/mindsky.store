"use client";

import { useState, useEffect } from 'react';
import { Search, Plus, Filter, Edit, Trash2, XCircle, CheckCircle, UploadCloud } from 'lucide-react';

export default function ProductManager() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '', category: '', brand: '',
    price: '', discountPrice: '', stock: '',
    imageUrl: '', ageGroup: '', status: 'Active', sku: ''
  });

  const [message, setMessage] = useState({ type: '', text: '' });

  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch('/api/products?admin=true'),
        fetch('/api/categories')
      ]);
      const prodJson = await prodRes.json();
      const catJson = await catRes.json();
      
      if (prodJson.success) setProducts(prodJson.data);
      if (catJson.success) setCategories(catJson.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
    if (!formData.name || !formData.price || !formData.category) {
       setMessage({ type: 'error', text: 'Missing required fields.' });
       return;
    }

    const url = isEditing ? `/api/products/${currentId}` : '/api/products';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      
      if (res.ok && json.success) {
        setMessage({ type: 'success', text: isEditing ? 'Product updated!' : 'Product saved!' });
        fetchData(); 
        setTimeout(() => setIsModalOpen(false), 1500);
      } else {
        setMessage({ type: 'error', text: json.error || 'Operation failed' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Something went wrong.' });
    }
  };

  const handleEdit = (product: any) => {
    if (!product || !product.id) return;
    setIsEditing(true);
    setCurrentId(product.id);
    setFormData({
      name: product.name || product.product_name || '',
      category: product.category || product.category_id || '',
      brand: product.brand || product.brand_id || '',
      price: product.price ? product.price.toString() : '',
      discountPrice: product.discountPrice || product.discount_price ? (product.discountPrice || product.discount_price).toString() : '',
      stock: product.stock ? product.stock.toString() : '0',
      imageUrl: product.imageUrl || product.image_url || '',
      ageGroup: product.ageGroup || product.age_group || '',
      status: product.status || 'Active',
      sku: product.sku || ''
    });
    setMessage({ type: '', text: '' });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: any) => {
    if (!id || !confirm('Permanently delete?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("Deleted!");
        fetchData(); 
      }
    } catch (err) {
      alert("Delete failed.");
    }
  };

  const openAddModal = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({ name: '', category: '', brand: '', price: '', discountPrice: '', stock: '10', imageUrl: '', ageGroup: '', status: 'Active', sku: '' });
    setMessage({ type: '', text: '' });
    setIsModalOpen(true);
  };

  return (
    <div className="w-full flex flex-col h-full relative p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-heading font-extrabold text-gray-900 leading-tight tracking-tight">Products</h2>
          <p className="text-gray-500 mt-1 font-medium">Manage global inventory and product configurations.</p>
        </div>
        <button onClick={openAddModal} className="bg-[#024fe7] hover:bg-[#3b8fd9] text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg transition-all active:scale-95">
          <Plus size={22} /> Add Product
        </button>
      </div>

      {loading ? (
         <div className="flex-1 flex justify-center items-center text-gray-300 font-bold">Initializing Inventory Engine...</div>
      ) : (
        <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex-1 flex flex-col min-h-[500px]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  <th className="p-6 pl-10">Product</th>
                  <th className="p-6">Collection</th>
                  <th className="p-6">Price</th>
                  <th className="p-6">Stock</th>
                  <th className="p-6">Status</th>
                  <th className="p-6 pr-10 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.length === 0 ? (
                  <tr><td colSpan={6} className="p-20 text-center text-gray-300 font-bold italic">No items found.</td></tr>
                ) : products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition-all group">
                    <td className="p-6 pl-10">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shrink-0">
                           <img src={product.imageUrl || product.image_url || '/placeholder.jpg'} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                           <span className="font-black text-[#1F2937] text-base leading-tight">{product.name || product.product_name}</span>
                           <span className="text-[10px] text-gray-400 font-black mt-1 uppercase tracking-widest">{product.sku}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="bg-blue-50 text-[#024fe7] px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider">{product.category || product.category_id || 'Global'}</span>
                    </td>
                    <td className="p-6">
                       <div className="flex flex-col">
                          <span className="font-black text-[#1F2937] text-lg">₹{parseFloat(product.price || 0).toFixed(2)}</span>
                          {(product.discountPrice || product.discount_price) && (
                            <span className="text-[10px] text-gray-300 line-through">₹{parseFloat(product.discountPrice || product.discount_price).toFixed(2)}</span>
                          )}
                       </div>
                    </td>
                    <td className="p-6">
                      <span className="font-black text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">{product.stock} <span className="text-[9px] opacity-40 ml-1">UNITS</span></span>
                    </td>
                    <td className="p-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        product.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="p-6 pr-10 text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEdit(product)} className="p-2 text-gray-300 hover:text-[#024fe7] hover:bg-blue-50 rounded-xl transition-all"><Edit size={22}/></button>
                        <button onClick={() => handleDelete(product.id)} className="p-2 text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"><Trash2 size={22}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#0F172A]/50 z-[100] flex justify-center items-center p-4 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-white max-w-2xl w-full rounded-[48px] shadow-2xl border border-white/20 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-10 border-b border-gray-50 flex justify-between items-center bg-gray-50/50 shrink-0">
               <div>
                 <h3 className="text-3xl font-black text-[#1F2937] tracking-tighter">{isEditing ? 'COMMIT UPDATES' : 'LAUNCH PRODUCT'}</h3>
                 <p className="text-sm text-gray-400 mt-1 font-bold">Configure your item details below.</p>
               </div>
               <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 flex items-center justify-center text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all border border-transparent hover:border-rose-100"><XCircle size={32}/></button>
            </div>

            <div className="p-10 overflow-y-auto">
               {message.text && (
                 <div className={`p-4 mb-8 rounded-[20px] font-black text-sm flex items-center gap-3 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
                   {message.text}
                 </div>
               )}

               <form id="productForm" onSubmit={handleSubmit} className="space-y-10">
                 <div>
                    <label className="block text-[11px] font-black uppercase tracking-[0.3em] text-gray-300 mb-4">Visual Asset</label>
                    <div className="flex items-center gap-8">
                       <div className="w-32 h-32 border-4 border-dashed border-gray-100 rounded-[32px] overflow-hidden bg-gray-50 shrink-0 flex items-center justify-center relative">
                         {formData.imageUrl ? <img src={formData.imageUrl} className="w-full h-full object-cover" /> : <UploadCloud size={32} className="text-gray-200" />}
                         {uploading && <div className="absolute inset-0 bg-white/80 flex items-center justify-center font-black text-[10px] text-[#024fe7]">UPLOADING</div>}
                       </div>
                       <div className="flex-1">
                          <input type="file" id="file" onChange={handleImageUpload} className="hidden" />
                          <label htmlFor="file" className="px-6 py-4 bg-white border-2 border-gray-100 text-gray-500 rounded-3xl text-sm font-black cursor-pointer inline-flex items-center gap-2 hover:border-[#024fe7] hover:text-[#024fe7] transition-all">Select Image</label>
                       </div>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-8">
                   <div className="col-span-2">
                     <label className="block text-[11px] font-black uppercase tracking-[0.3em] text-gray-300 mb-2">Internal Name *</label>
                     <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full p-5 border-2 border-gray-50 rounded-[24px] bg-gray-50 focus:bg-white focus:border-[#024fe7] transition-all font-black text-lg text-[#1F2937]" />
                   </div>

                   <div>
                     <label className="block text-[11px] font-black uppercase tracking-[0.3em] text-gray-300 mb-2">Collection *</label>
                     <select name="category" value={formData.category} onChange={handleInputChange} required className="w-full p-5 border-2 border-gray-50 rounded-[24px] bg-gray-50 font-black text-[#1F2937]">
                       <option value="">Select Category</option>
                       {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                     </select>
                   </div>

                   <div>
                     <label className="block text-[11px] font-black uppercase tracking-[0.3em] text-gray-300 mb-2">Retail Price (₹) *</label>
                     <input type="number" name="price" value={formData.price} onChange={handleInputChange} required className="w-full p-5 border-2 border-gray-50 rounded-[24px] bg-gray-50 font-black text-lg text-[#1F2937]" />
                   </div>

                   <div>
                     <label className="block text-[11px] font-black uppercase tracking-[0.3em] text-gray-300 mb-2">Stock Inventory *</label>
                     <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} required className="w-full p-5 border-2 border-gray-50 rounded-[24px] bg-gray-50 font-black text-lg text-[#1F2937]" />
                   </div>

                   <div>
                     <label className="block text-[11px] font-black uppercase tracking-[0.3em] text-gray-300 mb-2">Reference SKU</label>
                     <input type="text" name="sku" value={formData.sku} onChange={handleInputChange} className="w-full p-5 border-2 border-gray-50 rounded-[24px] bg-gray-50 font-black text-[#1F2937]" />
                   </div>
                 </div>
               </form>
            </div>

            <div className="p-10 border-t border-gray-50 bg-gray-50/50 flex justify-end gap-4 shrink-0">
               <button onClick={() => setIsModalOpen(false)} className="px-10 py-4 bg-white border-2 border-gray-100 text-gray-400 font-black rounded-3xl hover:bg-gray-100 transition-all">CANCEL</button>
               <button form="productForm" type="submit" className="px-12 py-4 bg-[#1F2937] text-white font-black rounded-3xl shadow-2xl hover:bg-black transition-all active:scale-95">CONFIRM</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
