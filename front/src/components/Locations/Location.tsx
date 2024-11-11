"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ILocation } from '@/Interfaces/IUser';
import { fetchLocations } from '../Fetchs/UserFetchs/UserFetchs';

export default function Location() {
  const [ubicaciones, setUbicaciones] = useState<ILocation[]>([]);

  useEffect(() => {
    const getLocations = async () => {
      try {
        const data = await fetchLocations();
        setUbicaciones(data);
      } catch (error) {
        console.error('Error al obtener ubicaciones:', error);
      }
    };
    
    getLocations();
  }, []);

  return (
    <div>
      <h1 className="text-3xl mt-20 font-bold text-center mb-8">Nuestros hoteles</h1>
      <div className="flex flex-col mt-20 sm:flex-col md:flex-row lg:flex-row justify-center flex-wrap">
        {ubicaciones.map((ubicacion) => (
       <section
            key={ubicacion.id}
            className="relative overflow-hidden rounded-lg border-b border-r border-gray-300 bg-white  shadow-lg m-2 w-80 h-64 sm:h-72 md:h-80 lg:h-96 transition-transform duration-300 hover:scale-105"
          >
            <Link href="#" className="cursor-pointer">
              <Image
                alt={ubicacion.name}
                src={ubicacion.imgUrl}  
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                width={970}
                height={250}
                quality={75}
                priority
              />
              <div className="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 h-full flex flex-col justify-end">
                <div className="p-4 sm:p-6">
                  <h3 className="mt-0.5 text-lg text-white">{ubicacion.name}</h3>
                  <h3 className="mt-0.5 text-lg text-white">{ubicacion.address}</h3> 
                </div>
              </div>
            </Link>
          </section>
        ))}
      </div>
      <div className="relative">
  <div className="absolute top-0 right-0 mb-4 mr-4">
    <a
      href="/location/create"
      className="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
    >
      Crear nueva ubicación
    </a>
  </div>
</div>

    </div>
  );
};
 
