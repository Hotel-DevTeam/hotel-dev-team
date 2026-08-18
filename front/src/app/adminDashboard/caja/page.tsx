import BuscarCaja from '@/components/Caja/FindBox'
import ProtectedRoute from '@/components/ProtectedRoute'
import React from 'react'

export default function page() {
  return (
    <ProtectedRoute>
      <BuscarCaja/>
    </ProtectedRoute>
  )
}
