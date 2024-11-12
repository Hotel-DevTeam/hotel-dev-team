"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ILocation } from '@/Interfaces/IUser';
import { fetchLocationById } from '@/components/Fetchs/UserFetchs/UserFetchs';
import Image from 'next/image';

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
    <div className="location-detail">
      <h1>{ubicacion.name}</h1>
      <p>{ubicacion.address}</p>
      <Image src={ubicacion.imgUrl} alt={ubicacion.name} width={970} height={250} />
      <h1>Aqui se cargaran Reservas y productos segun la ubicacion</h1>
    </div>
  );
};

export default LocationDetail;
