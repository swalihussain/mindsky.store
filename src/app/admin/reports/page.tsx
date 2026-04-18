"use client";

export default function ReportsPage() {
  return (
    <div className="w-full h-full">
      <div className="mb-8">
        <h2 className="text-3xl font-heading font-extrabold text-gray-900">Revenue & Reporting</h2>
        <p className="text-gray-500 mt-1">Detailed P&L, conversion rates, and gross checkout graphs.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center py-32 h-[60vh] flex flex-col items-center justify-center">
         <h3 className="text-3xl font-black text-gray-300 mb-2">Metrics Rendering Instance...</h3>
         <p className="text-gray-400 font-medium">Link this module to a real database pipeline to generate accurate daily revenue timelines.</p>
      </div>
    </div>
  );
}
