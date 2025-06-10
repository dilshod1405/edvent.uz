import Footer from '@/components/ui/footer'
import Header from '@/components/ui/header'
import React from 'react'
import TariffList from './TariffsListPage'

const page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <TariffList />
      <Footer />
    </div>
  )
}

export default page
