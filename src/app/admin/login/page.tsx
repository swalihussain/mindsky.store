"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate checking the password (for mockup purposes: 'mindsky.26')
    if (password === 'mindsky.26') {
      // Set a persistent cookie that the Middleware will verify
      document.cookie = "admin_auth=authorized; path=/; max-age=86400"; // Expires in 24 hrs
      router.push('/admin');
      router.refresh(); 
    } else {
      setError(true);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center relative overflow-hidden">
        
        {/* Soft background glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#E6F3FF] rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="w-20 h-20 bg-blue-50 text-[#024fe7] rounded-full flex items-center justify-center mx-auto mb-6 relative z-10 border-4 border-white shadow-sm">
           <Lock size={36} />
        </div>
        
        <h1 className="text-3xl font-heading font-black text-gray-800 mb-3 relative z-10">Admin Portal</h1>
        <p className="text-gray-500 mb-8 font-medium relative z-10">This control panel is restricted. Please enter the master password to access.</p>
        
        <form onSubmit={handleLogin} className="relative z-10">
          <input 
            type="password" 
            placeholder="Enter password..." 
            value={password}
            onChange={(e) => {setPassword(e.target.value); setError(false);}}
            className={`w-full p-4 rounded-xl border-2 mb-4 focus:outline-none transition-colors text-center text-lg font-bold tracking-widest ${error ? 'border-red-300 focus:border-red-500 bg-red-50/50' : 'border-gray-100 focus:border-[#024fe7] bg-gray-50'}`}
          />
          {error && <p className="text-red-500 text-sm font-bold mb-4 animate-pulse">Incorrect password. Tip: Try "mindsky.26"</p>}
          <button type="submit" className="w-full bg-gray-900 text-white font-bold text-lg py-4 rounded-xl shadow-[0_4px_0_#333333] hover:shadow-[0_2px_0_#333333] hover:translate-y-[2px] transition-all">
            Unlock Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
