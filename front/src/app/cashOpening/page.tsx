import CashOpeningForm from '@/components/CashOpening/CashOpeningForm'
import ProtectedRouteStaff from '@/components/ProtectedRouteStaff'
import React from 'react'

export default function page() {
  return (
    <ProtectedRouteStaff>
      <CashOpeningForm/>
    </ProtectedRouteStaff>
  )
}
