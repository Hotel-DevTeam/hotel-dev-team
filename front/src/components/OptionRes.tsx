"use client";
import React, { useEffect, useState, useContext } from "react";
import { ILocation } from "@/Interfaces/IUser";
import { fetchLocations } from "@/components/Fetchs/UserFetchs/UserFetchs";
import { useLocationContext } from "@/context/LocationContext";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";

export default function  OptionRest() {
  const router = useRouter();
  const [ubicaciones, setUbicaciones] = useState<ILocation[]>([]);
  const { setLocation } = useLocationContext();
  const { isAdmin } = useContext(UserContext);

  const handleLocationSelect = (id: string, name: string) => {
    setLocation({ id, name });
    localStorage.setItem("selectedLocation", JSON.stringify({ id, name }));

    if (isAdmin) {
      router.push(`/adminDashboard`);
    } else {
      router.push("/cashOpening");
    }
  };

  useEffect(() => {
    const storedLocation = localStorage.getItem("selectedLocation");
    if (storedLocation) {
      setLocation(JSON.parse(storedLocation));
    }
  }, []);

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-beige">
      <h1 className="text-4xl font-bold text-black mb-6 text-center">
        Nuestros Alojamientos
      </h1>

      <div className="flex flex-col items-center space-y-6">
        {ubicaciones.map((ubicacion) => (
          <div
            key={ubicacion.id}
            onClick={() => {
              if (ubicacion.id && ubicacion.name) {
                handleLocationSelect(ubicacion.id, ubicacion.name);
              } else {
                console.error("ID o nombre de ubicación no válido");
              }
            }}
            className="cursor-pointer border border-[#CD9C8A] rounded-lg p-6 w-80 text-center shadow-lg bg-white hover:bg-orange-50 transition-all duration-300"
          >
           
            <p className="text-lg text-black mb-4">
              Haz clic aquí para ingresar a {" "}
              <span className="text-[#CD9C8A] font-semibold">{ubicacion.name}</span>.
            </p>
          </div>
        ))}
      </div>

      {/*<div className="mt-8">
        <Link
          href="/location/create"
          className="px-8 py-4 bg-[#CD9C8A] text-white font-semibold rounded-lg shadow-lg hover:bg-orange-400 transition-all duration-300"
        >
          Crear Nueva Ubicación
        </Link>
      </div>*/}
    </div>
  );
}