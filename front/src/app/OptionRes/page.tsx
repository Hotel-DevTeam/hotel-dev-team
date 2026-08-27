import OptionRest from '@/components/OptionRes'
import ProtectedRouteStaff from '@/components/ProtectedRouteStaff'
import React from 'react'

export default function page() {
  return (
    <ProtectedRouteStaff>
      <OptionRest/>
    </ProtectedRouteStaff>
  )
}
