'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import DashboardLayout from '@/components/DashboardLayout'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import CircularProgress from '@mui/material/CircularProgress'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()
  const params = useParams()
  const userId = params?.id

  useEffect(() => {
    if (!userId) return
    const fetchUser = async () => {
      try {
        const res = await axios.get(`https://archedu.uz/authentication/users/${userId}/`)
        setUser(res.data)
      } catch (err) {
        setError("Foydalanuvchi ma'lumotlarini olishda xatolik yuz berdi.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [userId])

  if (loading)
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-screen text-indigo-400 text-xl font-semibold">
          <CircularProgress />
        </div>
      </DashboardLayout>
    )

  if (error)
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-screen text-red-500 text-lg font-semibold px-4 text-center">
          {error}
        </div>
      </DashboardLayout>
    )

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto px-4 py-8 sm:px-6 sm:py-12 bg-gradient-to-r from-indigo-900 via-[#1e293b] to-indigo-900 rounded-3xl shadow-lg text-white"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
          {/* Profile Photo */}
          <motion.img
            src={user.photo || '/images/default-avatar.png'}
            alt={`${user.first_name || user.username || 'User'}'s profile photo`}
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-indigo-500 shadow-lg transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
            loading="lazy"
          />

          {/* User Info */}
          <div className="text-center md:text-left w-full">
            <motion.h1
              className="text-3xl sm:text-4xl font-extrabold mb-2 tracking-wide"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {user.first_name} {user.last_name}
            </motion.h1>

            <p className="text-indigo-300 text-base sm:text-lg mb-4">
              {user.role?.toUpperCase()}
            </p>

            <div className="space-y-2 text-gray-300 text-sm sm:text-base">
              <div>
                <span className="font-semibold text-indigo-400 mr-2">Username:</span>
                {user.username}
              </div>
              <div>
                <span className="font-semibold text-indigo-400 mr-2">Email:</span>
                {user.email}
              </div>
            </div>
          </div>
        </div>

        {/* Footer message */}
        <motion.div
          className="mt-10 text-center text-indigo-400 italic text-sm sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.7 }}
        >
          Mening malumotlarim
        </motion.div>
      </motion.div>
    </DashboardLayout>
  )
}
