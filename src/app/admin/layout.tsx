"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, ShoppingBag, Users, Settings, Package, Tag, 
  CreditCard, LogOut, FileText, ImageIcon, BarChart3, Star, Layers, 
  ShieldCheck, Box, MonitorSmartphone, Brain, MessageCircle 
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // If the user is on the login page, strip away the sidebar structure entirely
  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-gray-50 font-sans pt-20">{children}</div>;
  }

  const handleLogout = () => {
    document.cookie = "admin_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = '/admin/login';
  };

  const navLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Categories', path: '/admin/categories', icon: Layers },
    { name: 'Inventory / Stock', path: '/admin/inventory', icon: Box },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
    { name: 'Customers', path: '/admin/customers', icon: Users },
    { name: 'Offers & Coupons', path: '/admin/offers', icon: Tag },
    { name: 'Reviews', path: '/admin/reviews', icon: Star },
    { name: 'Homepage CMS', path: '/admin/homepage', icon: FileText },
    { name: 'WhatsApp Settings', path: '/admin/whatsapp', icon: MessageCircle },
    { name: 'Banner CMS', path: '/admin/banners', icon: ImageIcon },
    { name: 'Reports & Revenue', path: '/admin/reports', icon: BarChart3 },
    { name: 'Users & Permissions', path: '/admin/users', icon: ShieldCheck },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans pt-20">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-100 shrink-0">
          <Link href="/admin" className="font-heading font-extrabold text-2xl text-[#024fe7]">
            MindSky<span className="text-[#FFD966]">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.path || (link.path !== '/admin' && pathname.startsWith(link.path));
            
            return (
              <Link 
                key={link.name} 
                href={link.path} 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-[#024fe7] text-white shadow-[0_3px_0_#013ca3] -translate-y-[1px]' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={18} /> {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100 shrink-0">
          <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors">
            <Settings size={18} /> Settings
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors mt-1">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 flex flex-col relative z-50 bg-gray-50 h-full overflow-y-auto w-full">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10 w-full shrink-0 shadow-sm">
          <h1 className="text-xl font-bold font-heading text-gray-800 hidden sm:block">Control Panel</h1>
          
          <div className="flex items-center gap-6 ml-auto">
            <Link href="/" target="_blank" className="text-sm font-bold text-[#024fe7] hover:underline flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
               <MonitorSmartphone size={16} /> Live View
            </Link>
            <div className="flex items-center gap-3 border-l border-gray-200 pl-6">
              <div className="flex flex-col text-right">
                <span className="text-sm font-bold text-gray-800 leading-none">Super Admin</span>
                <span className="text-xs font-medium text-gray-500 mt-1">Full Access</span>
              </div>
              <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center font-bold text-white shadow-sm cursor-pointer border-2 border-white ring-2 ring-gray-100">
                SA
              </div>
            </div>
          </div>
        </header>
        <div className="p-8 w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
