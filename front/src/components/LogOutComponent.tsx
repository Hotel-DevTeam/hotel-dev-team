"use client";
import React, { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import { useRouter } from 'next/navigation';

export default function LogOutComponent() {
  const {logOut } = useContext(UserContext);
  const router = useRouter();

  const handleLogout = () => {
    logOut();
    router.push('/login'); 
  };


  return (
    <>
     
        <nav className="navbar">
          <button 
            onClick={handleLogout}
            className="group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring"
          >
            <span className="absolute inset-0 border border-red-600 group-active:border-red-500"></span>
            <span
              className="block border border-red-600 bg-red-600 px-12 py-3 transition-transform active:border-red-500 active:bg-red-500 group-hover:-translate-x-1 group-hover:-translate-y-1"
            >
              Cerrar sesión
            </span>
          </button>
        </nav>
     
    </>
  );
}