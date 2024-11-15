"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ILocation } from '@/Interfaces/IUser';
import { fetchLocationById } from '@/components/Fetchs/UserFetchs/UserFetchs';
import Image from 'next/image';
import Link from 'next/link';

const LocationDetail = () => {
  const [ubicacion, setUbicacion] = useState<ILocation | null>(null);
  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    if (id) {
      const getLocation = async () => {
        try {
          const data = await fetchLocationById(id as string);
          setUbicacion(data);
        } catch (error) {
          console.error('Error al obtener la ubicación:', error);
        }
      };

      getLocation();
    }
  }, [id]);

  if (!ubicacion) return <p>Cargando...</p>;

  return (
    <div className="location-detail p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-center">{ubicacion.name}</h1>
      <p className="text-gray-700 mb-4 text-center">{ubicacion.address}</p>
      
      <Link href="/location">
        <button className="block mx-auto mb-6 px-4 py-2 bg-teal-500 text-white font-semibold rounded-md shadow-md hover:bg-teal-600 transition">
          Cambiar ubicación
        </button>
      </Link>
      
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <li>
          <a
            href="#"
            className="group relative block overflow-hidden rounded-lg shadow-2xl transform transition-transform duration-300 hover:scale-105 hover:shadow-3xl"
          >
            <Image
              src="https://res.cloudinary.com/dbtfna8ev/image/upload/v1724691645/samples/chair-and-coffee-table.jpg"
              alt="Reservas y habitaciones"
              width={500}
              height={300}
              className="w-full h-48 md:h-56 object-cover transition duration-500 group-hover:opacity-90"
            />
            <div className="absolute inset-0 flex flex-col items-start justify-end p-4 bg-gradient-to-t from-black via-transparent to-transparent">
              <h3 className="text-lg font-medium text-white">Reservas y habitaciones</h3>
              <span className="mt-1.5 inline-block bg-black bg-opacity-75 px-3 py-2 text-xs font-medium uppercase tracking-wide text-white">
                Ingresar
              </span>
            </div>
          </a>
        </li>

        <li>
          <Link href={`/location/${id}/products`} className="group relative block overflow-hidden rounded-lg shadow-2xl transform transition-transform duration-300 hover:scale-105 hover:shadow-3xl">
              <Image
                src="https://res.cloudinary.com/dbtfna8ev/image/upload/v1731452805/cafetera-hotel-3072366_hpdx8f.webp"
                alt="Productos y Servicios"
                width={500}
                height={300}
                className="w-full h-48 md:h-56 object-cover transition duration-500 group-hover:opacity-90"
              />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-4 bg-gradient-to-t from-black via-transparent to-transparent">
                <h3 className="text-lg font-medium text-white">Productos y Servicios</h3>
                <span className="mt-1.5 inline-block bg-black bg-opacity-75 px-3 py-2 text-xs font-medium uppercase tracking-wide text-white">
                  Ingresar
                </span>
              </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default LocationDetail;
