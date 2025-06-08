'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import DashboardLayout from '@/components/DashboardLayout'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import CircularProgress from '@mui/material/CircularProgress';

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
        setError('Foydalanuvchi ma\'lumotlarini olishda xatolik yuz berdi.')
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
        <div className="flex justify-center items-center min-h-[60vh] text-indigo-400 text-xl font-semibold">
          <CircularProgress />
        </div>
      </DashboardLayout>
    )

  if (error)
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-[60vh] text-red-500 text-lg font-semibold">
          {error}
        </div>
      </DashboardLayout>
    )

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto p-6 sm:p-10 bg-gradient-to-r from-indigo-900 via-[#1e293b] to-indigo-900 rounded-3xl shadow-lg text-white"
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
          {/* Profile Photo */}
          <motion.img
            src={user.photo || '/images/default-avatar.png'}
            alt={`${user.first_name} ${user.last_name}`}
            className="w-40 h-40 rounded-full object-cover border-4 border-indigo-500 shadow-lg hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.1 }}
            loading="lazy"
          />

          {/* User Info */}
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold mb-3 tracking-wide">
              {user.first_name} {user.last_name}
            </h1>

            <p className="text-indigo-300 text-lg mb-4">{user.role?.toUpperCase()}</p>

            <div className="space-y-3 text-gray-300 text-lg">
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

        {/* Additional Info or Actions */}
        <motion.div
          className="mt-10 text-center text-indigo-400 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          {/* For example, user statistics, links, or buttons can go here */}
          Foydalanuvchi profilingizni ko‘rmoqdasiz.
        </motion.div>
      </motion.div>
    </DashboardLayout>
  )
}
