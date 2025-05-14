import Header from '@/components/ui/header'
import React from 'react'
import LessonPage from '../LessonPage'


const page = () => {
  return (
    <div>
      <Header />
      <div className='container py-12 mx-auto'>
        <LessonPage />
      </div>
    </div>
  )
}

export default page