"use client";

import { useState, useEffect } from 'react';
import { AlertTriangle, TrendingDown, Package, Edit, XCircle, CheckCircle, RefreshCcw } from 'lucide-react';

export default function AdminInventory() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [newStock, setNewStock] = useState("");
  const [message, setMessage] = useState('');

  const fetchInventory = async () => {
    try {
      const res = await fetch('/api/products?admin=true');
      const json = await res.json();
      if (json.success) setProducts(json.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const getStatus = (stock: number) => {
    const s = Number(stock);
    if (s === 0) return { label: 'Out of Stock', color: 'bg-rose-50 text-rose-600', icon: true };
    if (s < 10) return { label: 'Low Stock', color: 'bg-amber-50 text-amber-600', icon: true };
    return { label: 'Healthy', color: 'bg-emerald-50 text-emerald-600', icon: false };
  };

  const handleRestockClick = (product: any) => {
    setSelectedProduct(product);
    setNewStock(product.stock.toString());
    setMessage('');
    setIsModalOpen(true);
  };

  const handleUpdateStock = async () => {
    if (!selectedProduct) return;
    try {
      const res = await fetch(`/api/products/${selectedProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...selectedProduct, stock: Number(newStock) })
      });
      const json = await res.json();
      if (json.success) {
        setMessage('Stock updated successfully!');
        fetchInventory();
        setTimeout(() => setIsModalOpen(false), 1500);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full h-full p-4 md:p-8">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-[#1F2937] tracking-tighter">Inventory & Stock</h2>
        <p className="text-gray-500 mt-1 font-medium italic">Monitor global supply levels and manage replenishment cycles.</p>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex-1 flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
                <th className="p-6 pl-10">Product Entity</th>
                <th className="p-6">Current Stock</th>
                <th className="p-6">Supply Status</th>
                <th className="p-6 pr-10 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={4} className="p-20 text-center font-bold text-gray-300">Loading Warehouse Ledger...</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan={4} className="p-20 text-center font-bold text-gray-300">No products mapped for inventory tracking.</td></tr>
              ) : products.map((item) => {
                const status = getStatus(item.stock);
                return (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-all group">
                    <td className="p-6 pl-10">
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 bg-white/50 rounded-2xl flex items-center justify-center border border-gray-100 overflow-hidden shadow-sm">
                           {item.imageUrl || item.image_url ? (
                             <img src={item.imageUrl || item.image_url} alt={item.name} className="w-full h-full object-cover" />
                           ) : (
                             <Package size={22} className="text-gray-200" />
                           )}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-black text-[#1F2937] text-base">{item.name || item.product_name}</span>
                          <span className="text-[10px] text-gray-400 font-black uppercase tracking-wider mt-1">{item.sku}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="font-black text-[#1F2937] bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
                        {item.stock} <span className="text-[10px] text-gray-400 ml-1">UNITS</span>
                      </span>
                    </td>
                    <td className="p-6">
                      <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest ${status.color}`}>
                        {status.icon && <AlertTriangle size={14} className="animate-pulse" />}
                        {status.label}
                      </span>
                    </td>
                    <td className="p-6 pr-10 text-right">
                      <button 
                        onClick={() => handleRestockClick(item)}
                        className="px-6 py-2.5 bg-white hover:bg-[#1F2937] text-[#1F2937] hover:text-white border-2 border-gray-100 hover:border-[#1F2937] rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-sm"
                      >
                        Adjust Stock
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- RESTOCK MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#0F172A]/40 z-[100] flex justify-center items-center p-4 backdrop-blur-md">
          <div className="bg-white max-w-sm w-full rounded-[48px] shadow-2xl border border-gray-100 overflow-hidden flex flex-col animate-in zoom-in duration-200">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
               <h3 className="text-xl font-black text-[#1F2937] tracking-tight">Stock Adjustment</h3>
               <button onClick={() => setIsModalOpen(false)} className="text-gray-300 hover:text-rose-500 transition-colors"><XCircle size={28}/></button>
            </div>
            <div className="p-10">
               {message && (
                 <div className="p-4 mb-6 rounded-2xl bg-emerald-50 text-emerald-700 font-bold text-center border border-emerald-100">
                    {message}
                 </div>
               )}
               <div className="text-center mb-8">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Target Product</div>
                  <div className="font-black text-[#1F2937] text-lg">{selectedProduct?.name || selectedProduct?.product_name}</div>
               </div>
               
               <div>
                  <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 text-center">New Quantity in Warehouse</label>
                  <input 
                    type="number" 
                    value={newStock} 
                    onChange={(e) => setNewStock(e.target.value)}
                    className="w-full p-6 border-4 border-gray-50 rounded-[32px] bg-gray-50 text-center font-black text-3xl text-[#1F2937] focus:border-[#024fe7] focus:bg-white transition-all outline-none" 
                  />
               </div>

               <div className="mt-10 flex flex-col gap-3">
                  <button onClick={handleUpdateStock} className="w-full py-5 bg-[#1F2937] text-white rounded-[24px] font-black text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2">
                     <RefreshCcw size={18} /> CONFIRM ADJUSTMENT
                  </button>
                  <button onClick={() => setIsModalOpen(false)} className="w-full py-4 text-gray-400 font-black text-[11px] uppercase tracking-widest">Cancel</button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
