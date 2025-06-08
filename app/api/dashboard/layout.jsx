import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex bg-[#030613] text-white min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-0 p-6 md:p-10 pt-20 md:pt-6 max-w-full">
        {children}
      </main>
    </div>
  )
}
