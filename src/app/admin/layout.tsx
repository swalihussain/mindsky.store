"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, Users, Settings, Package, Tag, CreditCard, LogOut } from 'lucide-react';

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

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans pt-20">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex shrink-0">
        <div className="h-20 flex items-center px-6 border-b border-gray-100 shrink-0">
          <Link href="/admin" className="font-heading font-extrabold text-2xl text-[#4DA6FF]">
            MindSky<span className="text-[#FFD966]">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <Link href="/admin" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${pathname === '/admin' ? 'bg-[#4DA6FF] text-white shadow-[0_4px_0_#2b82d4] -translate-y-[1px]' : 'text-gray-600 hover:bg-gray-50'}`}>
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link href="/admin/products" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${pathname.includes('/products') ? 'bg-[#4DA6FF] text-white shadow-[0_4px_0_#2b82d4] -translate-y-[1px]' : 'text-gray-600 hover:bg-gray-50'}`}>
            <Package size={20} /> Products
          </Link>
          <Link href="/admin/orders" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${pathname.includes('/orders') ? 'bg-[#4DA6FF] text-white shadow-[0_4px_0_#2b82d4] -translate-y-[1px]' : 'text-gray-600 hover:bg-gray-50'}`}>
            <ShoppingBag size={20} /> Orders
          </Link>
          <Link href="/admin/customers" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${pathname.includes('/customers') ? 'bg-[#4DA6FF] text-white shadow-[0_4px_0_#2b82d4] -translate-y-[1px]' : 'text-gray-600 hover:bg-gray-50'}`}>
            <Users size={20} /> Customers
          </Link>
          <Link href="/admin/coupons" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors">
            <Tag size={20} /> Coupons
          </Link>
          <Link href="/admin/payments" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors">
            <CreditCard size={20} /> Payments
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-100 shrink-0">
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors">
            <Settings size={20} /> Settings
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors mt-1">
            <LogOut size={20} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 flex flex-col relative z-50 bg-gray-50 h-full overflow-y-auto w-full">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10 w-full shrink-0">
          <h1 className="text-xl font-bold font-heading text-gray-800 hidden sm:block">Control Panel</h1>
          <div className="flex items-center gap-4 ml-auto">
            <span className="text-sm font-medium text-gray-500">Super Admin</span>
            <div className="w-10 h-10 bg-[#FFD966] rounded-full flex items-center justify-center font-bold text-amber-900 border-2 border-white shadow-sm cursor-pointer">
              MA
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
