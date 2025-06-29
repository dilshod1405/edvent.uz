'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Menu,
  X,
  User,
  GraduationCap,
  FileBadge,
  ClipboardList,
  LogOut,
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    setUserId(localStorage.getItem('id'))
  }, [])

  const navLinks = [
    { name: 'Profil', href: userId ? `/api/dashboard/profile/${userId}` : '/api/dashboard/profile', icon: User },
    { name: 'Kurslarim', href: '/api/dashboard/kurslarim', icon: GraduationCap },
    { name: 'Sertifikatlarim', href: '/api/dashboard/sertifikatlarim', icon: FileBadge },
    { name: 'Imtihonlarim', href: '/api/dashboard/imtihonlar', icon: ClipboardList },
  ]

  const handleLogout = () => {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    localStorage.removeItem('id')
    router.push('/signin')
  }

  const renderLinks = (onClick) =>
    navLinks.map(({ name, href, icon: Icon }) => {
      const isActive = pathname === href
      return (
        <Link
          key={name}
          href={href}
          onClick={onClick}
          className={`flex items-center gap-3 px-5 py-3 rounded-lg text-sm font-medium transition ${
            isActive
              ? 'bg-indigo-600 text-white shadow'
              : 'text-white/70 hover:bg-white/10 hover:text-white'
          }`}
        >
          <Icon size={18} />
          {name}
        </Link>
      )
    })

  return (
    <>
      {/* Top bar for mobile */}
      <div className="md:hidden flex justify-between items-center px-4 py-3 fixed top-0 w-full bg-[#030613] z-50 border-b border-gray-700">
        <Link href="/" className="flex items-center gap-2">
          <img src="/images/e.png" alt="logo" className="h-10 w-10" />
        </Link>
        <button onClick={() => setIsOpen(true)}>
          <Menu size={26} className="text-white" />
        </button>
      </div>

      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col fixed top-0 left-0 w-64 h-screen bg-[#030613] border-r border-gray-800 text-white z-40">
        <div className="flex flex-col items-center py-8 border-b border-gray-800">
          <Link href="/">
            <img src="/images/e.png" className="h-20 w-20 rounded-xl hover:scale-105 transition" alt="Logo" />
          </Link>
        </div>
        <nav className="flex flex-col px-4 py-4 space-y-1">
          {renderLinks()}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-5 py-3 mt-4 text-sm text-white/80 hover:text-red-400 transition border-t border-white/10 pt-4"
          >
            <LogOut size={18} />
            Chiqib ketish
          </button>
        </nav>
      </aside>

      {/* Mobile sidebar + overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 w-64 h-full bg-[#030613] text-white z-50 border-r border-gray-800"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-700">
                <img src="/images/e.png" className="h-12 w-12" alt="Logo" />
                <button onClick={() => setIsOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              <nav className="flex flex-col px-4 py-4 space-y-1 overflow-y-auto">
                {renderLinks(() => setIsOpen(false))}
                <button
                  onClick={() => {
                    setIsOpen(false)
                    handleLogout()
                  }}
                  className="flex items-center gap-3 px-5 py-3 mt-4 text-sm text-white/80 hover:text-red-400 transition border-t border-white/10 pt-4"
                >
                  <LogOut size={18} />
                  Chiqib ketish
                </button>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
