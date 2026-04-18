"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminRootRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/dashboard');
  }, [router]);

  return (
    <div className="flex h-full items-center justify-center p-12 text-gray-400">
      <div className="animate-pulse">Loading dashboard...</div>
    </div>
  );
}
