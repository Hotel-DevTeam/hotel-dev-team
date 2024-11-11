"use client"
import React from 'react';
import CreateProduct from '@/components/Products/CreateProduct';


/* import { NotificationsForms } from '@/components/Notifications/NotificationsForms';
import CreateProduct from '@/components/Products/CreateProduct';
import { UserContext } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'

export default function UploadProducts() {

    const { isAdmin } = useContext(UserContext);
  const router = useRouter()

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [loading, setLoading] = useState(true);

  //Ruta privada
  useEffect(() => {
    if (!isAdmin) {
      setNotificationMessage('Debes ser administrador para poder cargar productos');
      setShowNotification(true);
      setLoading(false)

      setTimeout(() => {
        setShowNotification(false);
        router.push("/login");
                }, 2000);
     } else {
      setLoading(false); 
    }
  }, [isAdmin, router]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );

    return (
      <>
       {isAdmin && <CreateProduct /> }
       {showNotification && <NotificationsForms message={notificationMessage} />}
             </>
    );
  }*/

    export default function UploadProducts() {
      return (
        <>
      <CreateProduct />
               </>
      );
    }