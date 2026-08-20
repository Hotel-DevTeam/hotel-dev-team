import CashClosingForm from '@/components/CashClosing/CashClosingForm'
import ProtectedRouteStaff from '@/components/ProtectedRouteStaff'
import React from 'react'

export default function page() {
  return (
    <ProtectedRouteStaff>
      <CashClosingForm/>
    </ProtectedRouteStaff>
  )
}
