"use client";

import AdminDashboard from "@/components/admin/AdminDashboard";
import ContactManager from "@/components/admin/ContactManager";

export default function AdminContactPage() {
  return (
    <AdminDashboard activeTab="contact">
        <ContactManager />
    </AdminDashboard>
  );
}
