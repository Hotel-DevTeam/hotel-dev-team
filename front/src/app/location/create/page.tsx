import CreateLocation from '@/components/Locations/createLocation'
import ProtectedRoute from '@/components/ProtectedRoute'
import React from 'react'

export default function page() {
  return (
   <ProtectedRoute>
     <CreateLocation/>
   </ProtectedRoute>
  )
}
