'use client'

import { useEffect, useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/skeleton'
import { useRouter } from 'next/navigation'

export default function Kurslarim() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/education/user/paid-courses/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`, 
          },
        })
        if (!res.ok) throw new Error('Xatolik yuz berdi')
        const data = await res.json()
        setCourses(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl font-bold mb-4">Mening Kurslarim</h1>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-[200px] w-full rounded-xl" />
            ))}
          </div>
        ) : courses.length === 0 ? (
          <p>Siz hali hech qanday kurs sotib olmadingiz.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card
                key={course.id}
                onClick={() => router.push(`/course/${course.id}`)}
                className="cursor-pointer p-4 hover:shadow-lg transition-shadow rounded-2xl"
              >
                <img
                  src={course.photo}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded-xl mb-3"
                />
                <h2 className="text-lg font-semibold">{course.title}</h2>
                <p className="text-sm text-gray-500 line-clamp-3">{course.description}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
