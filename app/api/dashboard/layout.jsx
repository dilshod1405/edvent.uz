'use client'

import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({ children }) {
  return (
    <div className="flex bg-[#030613] text-white min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 pt-20 md:p-10 md:pt-6 md:ml-64 w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  )
}
