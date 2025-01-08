"use client"
import React, { useEffect, useState, useContext } from "react";
import { ILocation } from "@/Interfaces/IUser";
import { fetchCashMovements } from "../Fetchs/MovementsFetch.tsx/MovementsFetch";
import { useLocationContext } from "@/context/LocationContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { fetchLocations } from "../Fetchs/UserFetchs/UserFetchs";
import { ICreateMovement, IMovimientoCaja } from "@/Interfaces/IMovements";

const CashMovements: React.FC = () => {
  const router = useRouter();
  const [ubicaciones, setUbicaciones] = useState<ILocation[]>([]);
  const [movimientosCaja, setMovimientosCaja] = useState<IMovimientoCaja[]>([]);
  const { setLocation } = useLocationContext();

  const handleLocationSelect = async (id: string, name: string) => {
    if (!id) {
      console.error("No se seleccionó un ID válido de ubicación");
      return;
    }

    setLocation({ id, name });
    localStorage.setItem("selectedLocation", JSON.stringify({ id, name }));
    router.push("cashMovementsPage/movements");
  };

  

  useEffect(() => {
    const storedLocation = localStorage.getItem("selectedLocation");
    if (storedLocation) {
      const parsedLocation = JSON.parse(storedLocation);
      console.log("Ubicación cargada desde localStorage:", parsedLocation);
      setLocation(parsedLocation);
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
    <div className="bg-[bisque] font-sans">
      <h1 className="text-2xl sm:text-2xl md:text-2xl lg:text-4xl font-bold text-black text-shadow-md mb-8 mt-20 uppercase tracking-widest text-center">
        Movimientos de caja por alojamiento
      </h1>

      <div className="flex flex-col mt-8 sm:flex-col md:flex-row lg:flex-row justify-center flex-wrap">
        {ubicaciones.map((ubicacion) => (
          <section
            key={ubicacion.id}
            className="relative overflow-hidden rounded-lg border-b border-r border-gray-300 bg-white shadow-lg m-2 w-80 h-64 sm:h-72 md:h-80 lg:h-96 transition-transform duration-300 hover:scale-105"
          >
            <div
              className="cursor-pointer"
              onClick={() => {
                if (ubicacion.id && ubicacion.name) {
                  handleLocationSelect(ubicacion.id, ubicacion.name);
                 
                } else {
                  console.error("ID o nombre de ubicación no válido");
                }
              }}
            >
              <Image
                alt={ubicacion.name || ""}
                src={ubicacion.imgUrl || ""}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                width={970}
                height={250}
                quality={75}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-gray-900/25"></div>
              <h3 className="absolute bottom-0 left-0 w-full bg-black bg-opacity-75 px-3 py-4 text-xs font-medium uppercase tracking-wide text-white text-center">
                {ubicacion.name}
              </h3>
            </div>
          </section>
        ))}
      </div>

    </div>
  );
};

export default CashMovements;
