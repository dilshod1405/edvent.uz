import Header from '@/components/ui/header'
import React from 'react'
import FoundationCourses from './FoundationCourses'
import Footer from '@/components/ui/footer'

const page = () => {
  return (
    <div>
        <Header />
        <FoundationCourses />
        <Footer />
    </div>
  )
}

export default page