"use client";

import { useState } from 'react';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import Image from 'next/image';

const mockAdminProducts = [
  { id: '1', name: 'Magic Building Blocks', price: 29.99, category: 'Toys', stock: 145, status: 'Active', image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=200' },
  { id: '2', name: 'Smart Learning Tablet', price: 79.99, category: 'Educational', stock: 23, status: 'Low Stock', image: 'https://images.unsplash.com/photo-1515486191105-ce3fa1b4d0bc?auto=format&fit=crop&q=80&w=200' },
  { id: '3', name: 'Colorful Kids Backpack', price: 34.99, category: 'Accessories', stock: 320, status: 'Active', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=200' },
  { id: '4', name: 'Dinosaur Plush Toy', price: 19.99, category: 'Toys', stock: 0, status: 'Out of Stock', image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&q=80&w=200' },
  { id: '5', name: 'Art Creativity Set', price: 24.99, category: 'Educational', stock: 89, status: 'Active', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=200' },
];

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-heading font-extrabold text-gray-800">Products Management</h2>
          <p className="text-gray-500 mt-1">Manage your catalog, stock, and pricing here.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#4DA6FF] text-white px-5 py-2.5 rounded-xl font-bold shadow-sm hover:bg-[#3d8ad9] transition-colors">
          <Plus size={20} /> Add New Product
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#4DA6FF] transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors w-full sm:w-auto justify-center">
            <Filter size={18} /> Filters
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm font-medium uppercase tracking-wider">
                <th className="px-6 py-4 font-heading">Product</th>
                <th className="px-6 py-4 font-heading">Category</th>
                <th className="px-6 py-4 font-heading">Price</th>
                <th className="px-6 py-4 font-heading">Stock</th>
                <th className="px-6 py-4 font-heading">Status</th>
                <th className="px-6 py-4 font-heading text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockAdminProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 relative rounded-lg overflow-hidden border border-gray-100 shrink-0">
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 text-sm">{product.name}</p>
                        <p className="text-xs text-gray-400">ID: PRD-{product.id.padStart(4, '0')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 font-medium">{product.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-gray-800">${product.price}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 font-medium">{product.stock} units</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold
                      ${product.status === 'Active' ? 'bg-green-100 text-green-700' : 
                        product.status === 'Low Stock' ? 'bg-amber-100 text-amber-700' : 
                        'bg-red-100 text-red-700'}`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-[#4DA6FF] hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500 bg-gray-50/50">
          <span>Showing 1 to 5 of 45 products</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-200 rounded text-gray-400 cursor-not-allowed">Prevent</button>
            <button className="px-3 py-1 border border-[#4DA6FF] bg-[#4DA6FF] text-white rounded font-medium">1</button>
            <button className="px-3 py-1 border border-gray-200 hover:bg-gray-100 rounded text-gray-600">2</button>
            <button className="px-3 py-1 border border-gray-200 hover:bg-gray-100 rounded text-gray-600">3</button>
            <button className="px-3 py-1 border border-gray-200 hover:bg-gray-100 rounded text-gray-600">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
