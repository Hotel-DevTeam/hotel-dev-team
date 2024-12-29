"use client";
import React, { useEffect, useState, useContext } from "react";
import { ILocation } from "@/Interfaces/IUser";
import { fetchLocations, fetchCashMovements } from "../Fetchs/UserFetchs/UserFetchs"; // Asegúrate de tener la función fetchCashMovements en UserFetchs
import { useLocationContext } from "@/context/LocationContext";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import Image from "next/image";

const CashMovements: React.FC = () => {
  const router = useRouter();
  const [ubicaciones, setUbicaciones] = useState<ILocation[]>([]);
  const [movimientosCaja, setMovimientosCaja] = useState<any[]>([]); // Para almacenar los movimientos de caja
  const { setLocation } = useLocationContext();
  const { isAdmin } = useContext(UserContext);

  const handleLocationSelect = async (id: string, name: string) => {
    setLocation({ id, name });
    localStorage.setItem("selectedLocation", JSON.stringify({ id, name }));
      router.push(`/movimientos/${id}`);
      };

  // Obtención de los movimientos de caja para una ubicación
  const getCashMovements = async (locationId: string) => {
    try {
      const data = await fetchCashMovements(locationId); // Asume que fetchCashMovements hace una llamada a la API
      setMovimientosCaja(data);
    } catch (error) {
      console.error("Error al obtener los movimientos de caja:", error);
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
                  getCashMovements(ubicacion.id); // Obtén los movimientos de caja cuando se seleccione la ubicación
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

      {movimientosCaja.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-center">Movimientos de Caja</h2>
          <ul className="space-y-4 mt-6">
            {movimientosCaja.map((movimiento, index) => (
              <li key={index} className="p-4 border border-gray-300 rounded-md shadow-md">
                <p><strong>Fecha:</strong> {movimiento.fecha}</p>
                <p><strong>Descripción:</strong> {movimiento.descripcion}</p>
                <p><strong>Monto:</strong> ${movimiento.monto}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CashMovements;
