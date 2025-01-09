/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ILocation } from "@/Interfaces/IUser";
import { fetchLocationById } from "@/components/Fetchs/UserFetchs/UserFetchs";
import Image from "next/image";
import Link from "next/link";
import CreateReservation from "@/components/formReservation/CreateReservation";
import CreateOrder from "@/components/CreateOrder/CreateOrder";

const LocationDetail = () => {
  const [ubicacion, setUbicacion] = useState<ILocation | null>(null);
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  useEffect(() => {
    if (id) {
      const getLocation = async () => {
        try {
          const data = await fetchLocationById(id as string);
          setUbicacion(data);
        } catch (error) {
          console.error("Error al obtener la ubicación:", error);
        }
      };

      getLocation();
    }
  }, [id]);

  if (!ubicacion) return <p>Cargando...</p>;

  const handleGoToProducts = () => {
    router.push(`/adminDashboard/products?locationId=${id}`);
  };

  return (
    <div className=" mt-10 location-detail p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">{ubicacion.name}</h1>
      <p className="text-gray-700 mb-6 text-center">{ubicacion.address}</p>

      <Link href={"/location"}>
        <button className="block mx-auto mb-6 px-4 py-2 bg-[#CD9C8A] text-white font-semibold rounded-md shadow-md hover:bg-orange-400  transition">
          Cambiar ubicación
        </button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Formularios */}
        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Formulario de Reserva */}
            <div>
              <CreateReservation />
            </div>
            {/* Formulario de Orden */}
            <div>
              <CreateOrder />
            </div>
          </div>
        </div>

        {/* Imágenes */}
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-lg shadow-md">
            <Image
              src="https://res.cloudinary.com/dbtfna8ev/image/upload/v1724691645/samples/chair-and-coffee-table.jpg"
              alt="Reservas y habitaciones"
              width={500}
              height={300}
              className="w-full h-full object-cover transition duration-500 hover:opacity-90"
            />
            <div className="absolute inset-0 flex flex-col items-start justify-end p-4 bg-gradient-to-t from-black via-transparent to-transparent">
              <h3 className="text-lg font-medium text-white">
                Reservas y habitaciones
              </h3>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg shadow-md">
            <Image
              src="https://res.cloudinary.com/dbtfna8ev/image/upload/v1731452805/cafetera-hotel-3072366_hpdx8f.webp"
              alt="Productos y Servicios"
              width={500}
              height={300}
              className="w-full h-full object-cover transition duration-500 hover:opacity-90"
            />
            <div className="absolute inset-0 flex flex-col items-start justify-end p-4 bg-gradient-to-t from-black via-transparent to-transparent">
              <h3 className="text-lg font-medium text-white">
                Productos y Servicios
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetail;
