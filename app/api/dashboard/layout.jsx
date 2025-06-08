import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex bg-[#030613] text-white min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-64 p-4 pt-16 md:pt-4">
        {children}
      </main>
    </div>
  )
}
