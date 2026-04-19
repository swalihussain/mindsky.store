"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Package, 
  Tag, 
  ShoppingBag, 
  Users, 
  Star, 
  Settings, 
  MessageCircle, 
  PhoneCall, 
  LogOut,
  ChevronRight,
  UserCircle,
  Mail
} from "lucide-react";

interface AdminDashboardProps {
  children: React.ReactNode;
  activeTab: string;
}

export default function AdminDashboard({ children, activeTab }: AdminDashboardProps) {
  const pathname = usePathname();
  
  // MOCK LOGGED IN USER (In a real app, this would come from a session/context)
  const currentUser = {
    name: "Admin Setup",
    role: "Super Admin" as const // Change this to test other roles: "Admin", "Manager", "Staff", "Support Agent"
  };

  const allMenuItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard, path: '/admin/dashboard', roles: ["Super Admin", "Admin", "Manager", "Staff", "Support Agent"] },
    { id: 'products', label: 'Products', icon: Package, path: '/admin/products', roles: ["Super Admin", "Admin"] },
    { id: 'categories', label: 'Categories', icon: Tag, path: '/admin/categories', roles: ["Super Admin", "Admin"] },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, path: '/admin/orders', roles: ["Super Admin", "Admin", "Manager", "Staff", "Support Agent"] },
    { id: 'customers', label: 'Intelligence', icon: Users, path: '/admin/customers', roles: ["Super Admin", "Admin", "Manager", "Support Agent"] },
    { id: 'reviews', label: 'Feedback', icon: Star, path: '/admin/reviews', roles: ["Super Admin", "Admin"] },
    { id: 'whatsapp', label: 'WhatsApp', icon: PhoneCall, path: '/admin/whatsapp', roles: ["Super Admin"] },
    { id: 'contact', label: 'Public Reach', icon: Mail, path: '/admin/contact', roles: ["Super Admin", "Admin", "Support Agent"] },
    { id: 'staff', label: 'Governance', icon: Users, path: '/admin/staff', roles: ["Super Admin"] },
    { id: 'cms', label: 'Atmosphere', icon: Settings, path: '/admin/cms', roles: ["Super Admin"] },
  ];

  const menuItems = allMenuItems.filter(item => item.roles.includes(currentUser.role));

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      {/* Sidebar */}
      <aside className="w-80 bg-[#1F2937] text-white flex flex-col shadow-2xl relative z-50">
        <div className="p-10 border-b border-white/5">
          <Link href="/" className="flex flex-col">
            <span className="text-2xl font-black italic tracking-tighter text-[#024fe7]">MindSky<span className="text-white">.Admin</span></span>
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-500 mt-2">Enterprise Ecosystem</span>
          </Link>
        </div>

        <nav className="flex-1 py-10 px-4 space-y-2">
          {menuItems.map((item) => (
            <Link 
              key={item.id} 
              href={item.path}
              className={`flex items-center justify-between px-6 py-4 rounded-[20px] transition-all duration-300 group ${
                activeTab === item.id 
                ? 'bg-[#024fe7] text-white shadow-lg shadow-[#024fe7]/20 scale-[1.02]' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-4">
                <item.icon size={20} className={activeTab === item.id ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'} />
                <span className="font-black text-xs uppercase tracking-widest">{item.label}</span>
              </div>
              {activeTab === item.id && <ChevronRight size={16} />}
            </Link>
          ))}
        </nav>

        <div className="p-8 border-t border-white/5">
          <button className="w-full flex items-center justify-center gap-3 py-4 bg-white/5 hover:bg-rose-500/10 hover:text-rose-500 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest group">
            <LogOut size={16} className="opacity-40 group-hover:opacity-100" /> Sign Out Asset
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        <header className="h-24 bg-white border-b border-gray-100 flex items-center justify-between px-12 sticky top-0 z-40 backdrop-blur-md bg-white/80">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-[#024fe7] font-black text-xs shadow-inner">MS</div>
              <span className="font-black text-[#1F2937] text-xs uppercase tracking-widest">Active Session: Explorer-01</span>
           </div>
           
           <div className="flex items-center gap-8">
              <div className="flex flex-col items-end">
                 <span className="font-black text-[#1F2937] text-[10px] uppercase tracking-widest">Authorized Superuser</span>
                 <span className="text-[#024fe7] font-bold text-[10px] italic">Access Level: Unified Management</span>
              </div>
              <div className="w-12 h-12 bg-gray-50 rounded-[18px] border-2 border-white shadow-sm overflow-hidden p-1 flex items-center justify-center">
                 <UserCircle size={32} className="text-gray-300" />
              </div>
           </div>
        </header>

        <div className="p-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {children}
        </div>
      </main>
    </div>
  );
}
