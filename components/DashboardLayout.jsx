import Sidebar from './Sidebar'

export default function DashboardLayout({ children }) {
  return (
    <div className="flex bg-[#030613] text-white min-h-screen">
      {/* Chap tomonda sticky sidebar */}
      <Sidebar />
      
      {/* O'ng tomonda scroll qilingan content */}
      <main className="flex-1 p-6 md:ml-64 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
