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
      <div className="px-6 sm:px-8 md:px-10 lg:px-16 py-8 md:py-12 text-white bg-[#030613] min-h-screen">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-indigo-400">
          Mening Kurslarim
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-60">
            <CircularProgress />
          </div>
        ) : courses.length === 0 ? (
          <p className="text-gray-400 text-center text-lg">Siz hali hech qanday kurs sotib olmadingiz.</p>
        ) : (
          <div
            className="
              grid gap-8
              grid-cols-1
              sm:grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-3
            "
          >
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-[#0f172a] rounded-2xl p-6 shadow-md border border-indigo-600 hover:shadow-indigo-500/30 hover:border-indigo-500 transition duration-300 flex flex-col justify-between w-full min-w-[280px]"
              >
                <div>
                  <img
                    src={course.photo}
                    alt={course.title}
                    className="w-full h-44 sm:h-48 md:h-52 lg:h-56 object-cover rounded-xl mb-5"
                    style={{ minHeight: '176px' }}
                  />
                  <div className="flex items-center gap-3 mb-3">
                    <BookOpen className="text-indigo-500 w-6 h-6" />
                    <h3 className="text-xl font-semibold text-white line-clamp-2">
                      {course.title}
                    </h3>
                  </div>
                  <p className="text-gray-300 text-base leading-relaxed line-clamp-3 sm:line-clamp-5">
                    {course.description}
                  </p>
                </div>
                <div className="mt-5 flex items-center justify-between text-indigo-400 font-semibold text-base">
                  <span>⏱ {course.duration} oy</span>
                  <Link
                    href={`/course/${course.id}`}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg text-base tracking-wide"
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
