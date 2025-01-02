"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ILocation } from "@/Interfaces/IUser";
import { fetchLocations } from "../Fetchs/UserFetchs/UserFetchs";

export default function Location() {
  const [ubicaciones, setUbicaciones] = useState<ILocation[]>([]);

  useEffect(() => {
    const getLocations = async () => {
      try {
        const data = await fetchLocations();
        setUbicaciones(data);
      } catch (error) {
        console.error("Error al obtener ubicaciones:", error);
      }
    };

    getLocations();
  }, []);

  return (
    <div className="bg-[#CD9C8A] font-sans">
      <h1 className="text-2xl sm:text-2xl md:text-2xl lg:text-4xl text-white text-shadow-md mb-8 mt-32 uppercase tracking-widest text-center">
        Nuestros alojamientos
      </h1>

      <div className="flex flex-col mt-8 sm:flex-col md:flex-row lg:flex-row justify-center flex-wrap">
        {ubicaciones.map((ubicacion) => (
          <section
            key={ubicacion.id}
            className="relative overflow-hidden rounded-lg border-b border-r border-[#CD9C8A] bg-white shadow-xl m-5 mb-10 w-80 h-64 sm:h-72 md:h-80 lg:h-96 transition-transform duration-300 hover:scale-105"
          >
            <Link href={`/location/${ubicacion.id}`} className="cursor-pointer">
              <Image
                alt={ubicacion.name || ''}
                src={ubicacion.imgUrl || ''}  

                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                width={970}
                height={250}
                quality={75}
                priority
              />
              <div className="relative bg-gradient-to-t from-[#5D737E]/50 to-[#5D737E]/25 h-full flex flex-col justify-end">
                <div className="p-4 sm:p-6">
                  <h3 className="mt-1.5 inline-block bg-black bg-opacity-75 px-3 py-2 text-xs font-medium uppercase tracking-wide text-white">
                    {ubicacion.name}
                  </h3>
                </div>
              </div>
            </Link>
          </section>
        ))}
      </div>

      <div className="relative">
        <div className="absolute top-0 right-0 mb-4 mr-4">
          <Link
            href="/location/create"
            className="inline-block mx-auto mb-6 px-4 py-2 border bg-teal-500 text-white font-semibold rounded-md shadow-md hover:bg-teal-600 transition"
          >
            Crear nueva ubicación
          </Link>
        </div>
      </div>
    </div>
  );
}
