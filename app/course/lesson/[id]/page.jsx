import Header from '@/components/ui/header'
import React from 'react'
import LessonPage from '../LessonPage'
import Footer from '@/components/ui/footer'


const page = () => {
  return (
    <div>
      <Header />
      <div className='container py-12 mx-auto'>
        <LessonPage />
      </div>
      <Footer />
    </div>
  )
}

export default page