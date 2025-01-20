import RegisterForm from '@/components/Forms/FormsUser/RegisterForm'
import PrivateRouteAdmin from '@/components/ProtectedRoute'
import React from 'react'

//Agregar validacion si esta logueado redirijir al login
export default function page() {
  return (
    <PrivateRouteAdmin>
   <RegisterForm/>
   </PrivateRouteAdmin>
  )
}