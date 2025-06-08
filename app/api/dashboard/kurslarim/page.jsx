'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import DashboardLayout from '@/components/DashboardLayout'
import CircularProgress from '@mui/material/CircularProgress'
import { useRouter } from 'next/navigation'

export default function Kurslarim() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/education/user/paid-courses/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          },
        })
        setCourses(res.data)
      } catch (err) {
        console.error('Xatolik:', err)
        router.push('/signin')
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [router])

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-[#030613] text-white px-6 md:px-20 py-12">
        <h1 className="text-3xl font-bold mb-10 text-indigo-400">Mening Kurslarim</h1>

        {loading ? (
          <div className="flex justify-center items-center h-60">
            <CircularProgress />
          </div>
        ) : courses.length === 0 ? (
          <p className="text-gray-400">Siz hali hech qanday kurs sotib olmadingiz.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-[#0f172a] rounded-3xl p-6 shadow-lg border border-indigo-600 hover:shadow-indigo-500/40 hover:border-indigo-500 transition duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <img
                    src={course.photo}
                    alt={course.title}
                    className="w-full h-40 object-cover rounded-xl mb-4"
                  />
                  <div className="flex items-center gap-3 mb-3">
                    <BookOpen className="text-indigo-500 w-6 h-6" />
                    <h3 className="text-xl font-semibold text-white">{course.title}</h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed line-clamp-5">{course.description}</p>
                </div>
                <div className="mt-4 flex items-center justify-between text-indigo-400 font-semibold text-sm">
                  <span>⏱ {course.duration} oy</span>
                  <Link
                    href={`/course/${course.id}`}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm tracking-wide"
                  >
                    Kirish
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
