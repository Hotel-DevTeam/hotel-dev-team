"use client"
import { NotificationsForms } from '@/components/Notifications/NotificationsForms';
import AllProducts from '@/components/Products/AllProducts';
import { UserContext } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';

export default function Productspage() {
  const { isAdmin } = useContext(UserContext);
  const router = useRouter();

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Ruta privada
  useEffect(() => {
    if (!isAdmin) {
      setNotificationMessage("Debes ser administrador para ver los productos");
      setShowNotification(true);
      router.push("/");
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
      {isAdmin && <AllProducts />}
      {showNotification && <NotificationsForms message={notificationMessage} />}
    </>
  );
}
