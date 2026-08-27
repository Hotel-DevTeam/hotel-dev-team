import Panel from '@/components/AdminDashboard/Panel'
import ProtectedRoute from '@/components/ProtectedRoute'
import React from 'react'

export default function page() {
  return (
    <ProtectedRoute>
      <Panel/>
    </ProtectedRoute>
  )
}
