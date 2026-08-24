import React from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f4f3f0] text-[#0a0a0f] font-sans antialiased">
      {children}
    </div>
  );
}
