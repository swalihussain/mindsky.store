"use client";

import AdminDashboard from "@/components/admin/AdminDashboard";
import StaffManager from "@/components/admin/StaffManager";

export default function AdminStaffPage() {
  return (
    <AdminDashboard activeTab="staff">
        <StaffManager />
    </AdminDashboard>
  );
}
