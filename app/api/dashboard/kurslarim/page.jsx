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
      <div className="px-4 sm:px-6 md:px-10 lg:px-16 py-8 md:py-12 bg-[#030613] min-h-screen">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-10 text-indigo-400">
          Mening Kurslarim
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-60">
            <CircularProgress />
          </div>
        ) : courses.length === 0 ? (
          <p className="text-gray-400 text-center text-base sm:text-lg">Siz hali hech qanday kurs sotib olmadingiz.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-[#0f172a] rounded-xl p-3 sm:p-4 border border-indigo-600 shadow hover:shadow-indigo-500/20 hover:border-indigo-500 transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <img
                    src={course.photo}
                    alt={course.title}
                    className="w-full h-36 sm:h-40 md:h-44 object-cover rounded-lg mb-3"
                  />
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="text-indigo-500 w-4 h-4" />
                    <h3 className="text-sm sm:text-base font-semibold text-white line-clamp-2">
                      {course.title}
                    </h3>
                  </div>
                  <p className="text-gray-400 text-xs sm:text-sm leading-snug line-clamp-2">
                    {course.description}
                  </p>
                </div>
                <div className="mt-3 flex flex-col sm:flex-row items-center justify-between text-indigo-400 font-medium text-xs sm:text-sm gap-2 sm:gap-0">
                  <span>⏱ {course.duration} ta modul</span>
                  <Link
                    href={`/course/${course.id}`}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded text-xs sm:text-sm w-full sm:w-auto text-center"
                  >
                    Ko‘rish
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
