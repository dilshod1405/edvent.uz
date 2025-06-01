'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, GraduationCap, FileBadge, ClipboardList, LogOut, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

const Sidebar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    router.push('/signin')
  }

  const links = [
    { name: 'Profil', href: '/api/dashboard/profil', icon: <User size={20} /> },
    { name: 'Kurslarim', href: '/api/dashboard/kurslarim', icon: <GraduationCap size={20} /> },
    { name: 'Sertifikatlarim', href: '/api/dashboard/sertifikatlarim', icon: <FileBadge size={20} /> },
    { name: 'Imtihonlarim', href: '/api/dashboard/imtihonlar', icon: <ClipboardList size={20} /> },
  ]

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden p-4 bg-[#030613] text-white fixed top-0 left-0 z-50 w-full flex justify-between items-center border-b border-gray-700">
        <div className="flex items-center gap-2 font-extrabold">
          <Link href="/">
            <img
              src="/images/e.png"
              alt="Edvent Logo"
              className="w-12 h-12 object-contain max-w-full max-h-full"
            />
          </Link>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open Sidebar"
          className="focus:outline-none"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col fixed top-0 left-0 h-screen w-64 bg-[#030613] border-r border-gray-800 text-white z-40">
        {/* Logo */}
        <div className="flex items-center gap-2 font-extrabold px-8 py-8 border-b border-gray-800 select-none">
          <Link href="/">
            <img
              src="/images/e.png"
              alt="Edvent Logo"
              className="w-28 h-28 object-contain max-w-full max-h-full rounded-lg hover:scale-105 transition-transform duration-200 ease-in-out cursor-pointer mx-auto" 
            />
          </Link>
        </div>

        {/* Links */}
        <nav className="flex flex-col flex-1 p-6 space-y-2">
          {links.map(({ name, href, icon }) => {
            const isActive = pathname === href
            return (
              <motion.div
                key={href}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Link
                  href={href}
                  className={`group flex items-center gap-4 px-5 py-3 rounded-lg font-semibold select-none
                    ${isActive
                      ? 'bg-[#4F39F6] shadow-lg text-white'
                      : 'hover:bg-white/10 text-white/80 hover:text-white transition-colors'
                    }
                  `}
                >
                  <span className={`${isActive ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                    {icon}
                  </span>
                  <span>{name}</span>
                </Link>
              </motion.div>
            )
          })}
        </nav>

        {/* Logout at bottom */}
        <motion.div className="px-6 pb-8">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-5 py-3 rounded-lg bg-red-700 hover:bg-red-800 hover:cursor-pointer text-white font-semibold select-none w-full"
          >
            <LogOut size={20} />
            Logout
          </button>
        </motion.div>
      </aside>

      {/* Mobile Sidebar with animation */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-40"
              aria-hidden="true"
            />
            {/* Sidebar panel */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-screen w-64 bg-[#030613] border-r border-gray-800 text-white z-50 flex flex-col"
            >
              <div className="flex items-center justify-between px-8 py-8 border-b border-gray-800">
                <img
                  src="/images/e.png"
                  alt="Edvent Logo"
                  className="w-28 h-28 object-contain max-w-full max-h-full"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Sidebar"
                  className="focus:outline-none"
                >
                  <X size={28} />
                </button>
              </div>

              <nav className="flex flex-col p-6 space-y-2 flex-1 overflow-auto">
                {links.map(({ name, href, icon }) => {
                  const isActive = pathname === href
                  return (
                    <motion.div
                      key={href}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Link
                        href={href}
                        className={`group flex items-center gap-4 px-5 py-3 rounded-lg font-semibold select-none
                          ${
                            isActive
                              ? 'bg-[#4F39F6] shadow-lg text-white'
                              : 'hover:bg-white/10 text-white/80 hover:text-white transition-colors'
                          }
                        `}
                        onClick={() => setIsOpen(false)}
                      >
                        <span className={`${isActive ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                          {icon}
                        </span>
                        <span>{name}</span>
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>

              <motion.div className="px-6 pb-8">
                <button
                  onClick={() => {
                    setIsOpen(false)
                    handleLogout()
                  }}
                  className="flex items-center gap-3 px-5 py-3 rounded-lg bg-red-700 hover:bg-red-800 text-white font-semibold select-none w-full"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Sidebar
