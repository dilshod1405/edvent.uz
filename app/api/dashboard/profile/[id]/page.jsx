'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import DashboardLayout from '@/components/DashboardLayout'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import CircularProgress from '@mui/material/CircularProgress'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { id: userId } = useParams()

  useEffect(() => {
    if (!userId) return
    const fetchUser = async () => {
      try {
        const res = await axios.get(`https://archedu.uz/authentication/users/${userId}/`)
        setUser(res.data)
      } catch (err) {
        setError("Foydalanuvchi ma'lumotlarini olishda xatolik yuz berdi.")
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [userId])

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-screen">
          <CircularProgress color="primary" />
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="text-center text-red-500 text-lg py-10 px-4">{error}</div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#0f172a] rounded-3xl shadow-xl p-6 sm:p-10 flex flex-col md:flex-row items-center gap-8"
        >
          {/* Profile Picture */}
          <div className="flex-shrink-0">
            <img
              src={user.photo || '/images/default-avatar.png'}
              alt="User avatar"
              className="w-40 h-40 rounded-full object-cover border-4 border-indigo-500 shadow-md"
            />
          </div>

          {/* Profile Info */}
          <div className="text-white w-full">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              {user.first_name} {user.last_name}
            </h1>
            <p className="text-indigo-300 font-medium mb-6">{user.role?.toUpperCase()}</p>

            <div className="space-y-3 text-base sm:text-lg text-gray-300">
              <div>
                <span className="font-semibold text-indigo-400">Username:</span> {user.username}
              </div>
              <div>
                <span className="font-semibold text-indigo-400">Email:</span> {user.email}
              </div>
            </div>

            <p className="mt-6 italic text-indigo-400">
              Bu sahifada sizning shaxsiy profilingiz aks ettirilgan.
            </p>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
