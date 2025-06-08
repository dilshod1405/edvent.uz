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
    // localStorage dan id kalitini o‘qib olamiz
    const storedUserId = localStorage.getItem('id')
    if (storedUserId) setUserId(storedUserId)
    else setUserId(null)
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

  const renderNavLinks = (onClick) =>
    [
      ...navLinks.map(({ name, href, icon: Icon }) => {
        const isActive = pathname === href
        return (
          <Link
            key={name}
            href={href}
            onClick={onClick}
            className={`flex items-center gap-3 px-5 py-3 rounded-lg transition-all duration-200 font-medium ${
              isActive
                ? 'bg-[#4F39F6] text-white shadow'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Icon size={20} />
            <span>{name}</span>
          </Link>
        )
      }),
      <button
        key="logout"
        onClick={() => {
          if (onClick) onClick()
          handleLogout()
        }}
        className="flex items-center gap-3 px-5 py-3 mt-2 pt-4 border-t border-white/20 text-white hover:text-red-400 transition-all hover:cursor-pointer"
      >
        <LogOut size={20} />
        Chiqib ketish
      </button>,
    ]

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#030613] text-white fixed top-0 left-0 w-full z-50 border-b border-gray-800">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <img src="/images/e.png" className="h-10 w-10" alt="Logo" />
        </Link>
        <button onClick={() => setIsOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col fixed top-0 left-0 h-screen w-64 bg-[#030613] border-r border-gray-800 text-white z-40">
        <div className="px-6 py-8 border-b border-gray-800 text-center">
          <Link href="/">
            <img src="/images/e.png" className="h-20 w-20 mx-auto rounded-lg hover:scale-105 transition" alt="Logo" />
          </Link>
        </div>

        <nav className="flex-1 px-6 py-4 space-y-2">{renderNavLinks()}</nav>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />

            {/* Mobile Sidebar */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-64 bg-[#030613] border-r border-gray-800 text-white z-50 flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-6 border-b border-gray-800">
                <img src="/images/e.png" className="h-16 w-16" alt="Logo" />
                <button onClick={() => setIsOpen(false)}>
                  <X size={26} />
                </button>
              </div>

              <nav className="flex-1 px-6 py-4 space-y-2 overflow-y-auto">
                {renderNavLinks(() => setIsOpen(false))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
