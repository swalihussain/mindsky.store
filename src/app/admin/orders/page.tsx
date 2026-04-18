"use client";

import { useState, useEffect } from 'react';
import { Eye, Printer, Trash2, XCircle, CheckCircle, Search, Clock, MapPin, Phone, CreditCard, ChevronDown, Loader2, FileText, Download, ShieldCheck, ShoppingBag } from 'lucide-react';

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const json = await res.json();
      if (json.success) setOrders(json.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (id: string, field: string, value: string) => {
    try {
      const body = { [field]: value };
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        fetchOrders();
        if (selectedOrder?.id === id) {
          setSelectedOrder({...selectedOrder, [field]: value});
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteOrder = async (id: string) => {
    if (!confirm('Permanent delete this order record?')) return;
    try {
      const res = await fetch(`/api/orders/${id}`, { method: 'DELETE' });
      if (res.ok) fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredOrders = orders.filter(ord => 
    ord.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    ord.customer_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-full p-4 md:p-8 animate-in fade-in duration-500">
      
      {/* Search & Header */}
      <div className="mb-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6 print:hidden">
        <div>
           <h2 className="text-3xl font-black text-[#1F2937] tracking-tighter">Orders & Invoicing</h2>
           <p className="text-gray-400 mt-1 font-medium italic">Generate formal manifests and monitor fiscal settlements.</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input 
                type="text" 
                placeholder="Search Manifest ID..." 
                className="pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl w-full sm:w-64 focus:border-[#024fe7] outline-none shadow-sm font-bold text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
           </div>
           <div className="bg-emerald-50 px-4 py-3 rounded-2xl border border-emerald-100 flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-500" />
              <span className="text-[10px] font-black uppercase text-emerald-700 tracking-widest">Authorized Ledger</span>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex-1 flex flex-col min-h-[500px] print:hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
                <th className="p-6 pl-10">ENTITY ID</th>
                <th className="p-6">CLIENT</th>
                <th className="p-6">INVOICE</th>
                <th className="p-6">SETTLEMENT</th>
                <th className="p-6">LIFECYCLE</th>
                <th className="p-6 pr-10 text-right">PROTOCOL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {loading ? (
                <tr><td colSpan={6} className="p-20 text-center font-bold text-gray-300">Synchronizing Global Ledger...</td></tr>
              ) : filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-gray-50 group transition-all">
                  <td className="p-6 pl-10 font-black text-[#024fe7] tracking-tighter">{ord.id}</td>
                  <td className="p-6">
                    <div className="flex flex-col">
                       <span className="font-black text-[#1F2937]">{ord.customer_name}</span>
                       <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">{ord.customer_phone || 'NO PHONE'}</span>
                    </div>
                  </td>
                  <td className="p-6 font-black text-gray-300 text-xs tracking-wider">{ord.invoice_id}</td>
                  <td className="p-6 font-black text-[#1F2937]">₹{Number(ord.total).toLocaleString()}</td>
                  <td className="p-6">
                     <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
                       ord.order_status === 'Delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                       ord.order_status === 'Processing' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-gray-50 text-gray-400 border-gray-100'
                     }`}>
                       {ord.order_status}
                     </span>
                  </td>
                  <td className="p-6 pr-10 text-right">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => {setSelectedOrder(ord); setIsViewModalOpen(true);}} className="p-2 text-gray-300 hover:text-[#024fe7] hover:bg-blue-50 rounded-xl transition-all" title="View Details"><Eye size={22}/></button>
                      <button onClick={() => {setSelectedOrder(ord); setTimeout(() => window.print(), 300);}} className="p-2 text-gray-300 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all" title="Print Invoice"><Printer size={22}/></button>
                      <button onClick={() => deleteOrder(ord.id)} className="p-2 text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all" title="Wipe Record"><Trash2 size={22}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- INVOICE / MODAL --- */}
      {isViewModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-[#000000]/40 z-[100] flex justify-center items-center p-4 backdrop-blur-xl animate-in zoom-in duration-300 print:bg-white print:p-0 print:block">
           <div className="bg-white max-w-2xl w-full rounded-[48px] shadow-2xl overflow-hidden flex flex-col border border-white/20 print:shadow-none print:rounded-none print:max-w-full">
              
              <div className="p-10 bg-gray-50 border-b border-gray-100 flex justify-between items-center print:hidden">
                 <div>
                    <h3 className="text-3xl font-black text-[#1F2937] tracking-tighter italic">Entity <span className="text-[#024fe7]">Manifest</span></h3>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mt-1">Status: {selectedOrder.order_status}</p>
                 </div>
                 <button onClick={() => setIsViewModalOpen(false)} className="w-12 h-12 flex items-center justify-center text-gray-300 hover:text-rose-500 hover:bg-white rounded-full transition-all border border-transparent shadow-sm"><XCircle size={32}/></button>
              </div>

              <div id="invoice-content" className="p-10 overflow-y-auto print:p-0">
                 
                 {/* Invoice Print Header */}
                 <div className="hidden print:flex flex-col mb-12 border-b-8 border-black pb-10">
                    <div className="flex justify-between items-start">
                       <div>
                          <h1 className="text-4xl font-black tracking-tighter mb-2 italic">MindSky <span className="text-[#024fe7]">Store</span></h1>
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">123 Playful Towers, Floor 4, KB Road, Calicut, Kerala</p>
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Email: help@mindsky.store | Mob: +91 95XXX XXXX</p>
                       </div>
                       <div className="text-right">
                          <div className="text-5xl font-black text-gray-200 tracking-tighter uppercase select-none opacity-20 transform -rotate-12 origin-right">Official Receipt</div>
                          <div className="mt-4">
                             <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Invoice Number</p>
                             <p className="font-black text-xl">{selectedOrder.invoice_id}</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Top Row: Customer & Meta */}
                 <div className="grid grid-cols-2 gap-10 mb-12">
                    <div className="space-y-6">
                       <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest block ml-1">Client Authorization</label>
                       <div className="flex items-start gap-5">
                          <div className="w-16 h-16 bg-blue-50 text-[#024fe7] rounded-[24px] flex items-center justify-center text-2xl font-black shadow-inner print:hidden">{selectedOrder.customer_name.charAt(0)}</div>
                          <div className="flex flex-col">
                             <span className="font-black text-2xl text-[#1F2937] mb-2">{selectedOrder.customer_name}</span>
                             <span className="flex items-center gap-2 text-gray-400 text-xs font-bold leading-tight"><Phone size={14}/> {selectedOrder.customer_phone}</span>
                             <span className="flex items-start gap-2 text-gray-400 text-xs font-bold leading-relaxed mt-4 max-w-[240px]"><MapPin size={18} className="shrink-0"/> {selectedOrder.address}</span>
                          </div>
                       </div>
                    </div>
                    <div className="flex flex-col justify-end text-right space-y-4">
                       <div className="print:hidden">
                          <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest block mb-2">Protocol ID</label>
                          <span className="font-black text-[#024fe7] tracking-tighter text-2xl">{selectedOrder.id}</span>
                       </div>
                       <div>
                          <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest block mb-2">Global Date</label>
                          <span className="font-black text-[#1F2937] text-lg">{new Date(selectedOrder.created_at).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric'})}</span>
                       </div>
                    </div>
                 </div>

                 {/* Items Table */}
                 <div className="mb-12">
                    <table className="w-full text-left">
                       <thead>
                          <tr className="border-b-2 border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                             <th className="p-4 pl-0">Description</th>
                             <th className="p-4 text-center">Unit</th>
                             <th className="p-4 text-center">Magnitude</th>
                             <th className="p-4 pr-0 text-right">Settlement</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-gray-50">
                          {selectedOrder.items?.map((item: any, idx: number) => (
                             <tr key={idx} className="text-sm">
                                <td className="p-5 pl-0 font-black text-[#1F2937]">{item.name}</td>
                                <td className="p-5 text-center font-bold text-gray-400">₹{item.price.toLocaleString()}</td>
                                <td className="p-5 text-center font-bold text-gray-400 pb-2">×{item.quantity}</td>
                                <td className="p-5 pr-0 text-right font-black text-[#1F2937]">₹{(item.price * item.quantity).toLocaleString()}</td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>

                 {/* Summary Grid */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6 pt-4 print:hidden">
                       <div className="space-y-4">
                          <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest block">Update Lifecycle</label>
                          <select 
                             className="w-full p-5 bg-gray-50 border-2 border-transparent rounded-[24px] font-black text-[#1F2937] focus:border-[#024fe7] outline-none transition-all appearance-none cursor-pointer"
                             value={selectedOrder.order_status}
                             onChange={(e) => handleUpdateStatus(selectedOrder.id, 'order_status', e.target.value)}
                           >
                              <option value="Pending">Pending Process</option>
                              <option value="Processing">Authorization Processing</option>
                              <option value="Shipped">Shipped In-Transit</option>
                              <option value="Delivered">Delivered Successfully</option>
                              <option value="Cancelled">Cancelled Protocol</option>
                          </select>
                       </div>
                       <div className="space-y-4">
                          <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest block">Update Payment</label>
                          <select 
                             className="w-full p-5 bg-gray-50 border-2 border-transparent rounded-[24px] font-black text-[#1F2937] focus:border-[#024fe7] outline-none transition-all appearance-none cursor-pointer"
                             value={selectedOrder.payment_status}
                             onChange={(e) => handleUpdateStatus(selectedOrder.id, 'payment_status', e.target.value)}
                           >
                              <option value="Pending">Payment Pending</option>
                              <option value="Paid">Payment Authorized</option>
                              <option value="Refunded">Settlement Refunded</option>
                          </select>
                       </div>
                    </div>

                    <div className="bg-[#1F2937] p-8 rounded-[36px] text-white flex flex-col justify-between print:bg-white print:text-black print:p-0 print:border-t-4 print:border-black print:rounded-none">
                       <div className="space-y-3 mb-8 print:mb-4">
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] opacity-40 print:opacity-100">
                             <span>Gross Item Total</span>
                             <span>₹{Number(selectedOrder.subtotal || selectedOrder.total).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] opacity-40 print:opacity-100">
                             <span>Logistics Charge</span>
                             <span>₹{selectedOrder.shipping || '99.00'}</span>
                          </div>
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-rose-400 print:text-black">
                             <span>Savings Authorization</span>
                             <span>-₹{selectedOrder.discount || '0.00'}</span>
                          </div>
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] opacity-40 print:opacity-100 italic">
                             <span>GST / Indirect Tax (18%)</span>
                             <span>₹{Number(selectedOrder.tax || ((selectedOrder.subtotal || selectedOrder.total) * 0.18)).toLocaleString()}</span>
                          </div>
                       </div>
                       <div className="pt-6 border-t border-white/10 flex justify-between items-end print:border-black">
                          <div className="flex flex-col">
                             <span className="text-[9px] font-black uppercase tracking-[0.4em] opacity-40 print:opacity-100">Net Settle</span>
                             <span className="text-4xl font-black tracking-tighter italic">₹{Number(selectedOrder.total).toLocaleString()}</span>
                          </div>
                          <div className="text-right print:hidden">
                             <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest ${selectedOrder.payment_status === 'Paid' ? 'bg-emerald-500' : 'bg-amber-500'}`}>{selectedOrder.payment_status}</span>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="mt-12 flex gap-4 print:hidden">
                    <button onClick={() => window.print()} className="flex-1 py-6 bg-[#024fe7] text-white rounded-[24px] font-black text-sm flex items-center justify-center gap-3 hover:bg-[#3b8fd9] transition-all shadow-xl shadow-blue-200 active:scale-95 group">
                       <Printer size={20} className="group-hover:-rotate-6 transition-transform"/> PRINT OFFICIAL INVOICE
                    </button>
                    <button onClick={() => window.print()} className="py-6 px-10 bg-gray-50 text-gray-400 border border-gray-100 rounded-[24px] font-black text-sm flex items-center justify-center gap-3 hover:bg-white hover:text-[#1F2937] transition-all shadow-sm active:scale-95">
                       <Download size={20} /> PDF
                    </button>
                 </div>

                 <div className="hidden print:block mt-20 pt-10 border-t border-gray-100 text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">Thank you for your business. Certified digital manifest for MindSky Store Ecosystem.</p>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
