import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function DashboardIndex() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/api/dashboard/kurslarim')
  }, [router])

  return null
}
