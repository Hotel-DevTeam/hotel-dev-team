"use client";
import React, { useEffect, useState, useContext } from "react";
import { ILocation } from "@/Interfaces/IUser";
import { fetchLocations } from "../Fetchs/UserFetchs/UserFetchs"; // Eliminamos fetchCashMovements, ya que usaremos el mock
import { useLocationContext } from "@/context/LocationContext";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import Image from "next/image";

// Mock de movimientos de caja
const mockCashMovements = [
  {
    monto: 100.5,
    descripcion: "Pago de servicios",
    estado: "Hecho",
    producto: {},
    ubicacion: {},
    tipoMovimiento: "Ingreso",
  },
  {
    monto: 50.0,
    descripcion: "Compra de materiales",
    estado: "Hecho",
    producto: {},
    ubicacion: {},
    tipoMovimiento: "Egreso",
  },
  {
    monto: 200.75,
    descripcion: "Pago de impuestos",
    estado: "Cancelado",
    producto: {},
    ubicacion: {},
    tipoMovimiento: "Ingreso",
  },
];

const CashMovements: React.FC = () => {
  const router = useRouter();
  const [ubicaciones, setUbicaciones] = useState<ILocation[]>([]);
  const [movimientosCaja, setMovimientosCaja] = useState<any[]>([]);
  const { setLocation } = useLocationContext();

  const handleLocationSelect = async (id: string, name: string) => {
    if (!id) {
      console.error("No se seleccionó un ID válido de ubicación");
      return;
    }
    
    setLocation({ id, name });
    localStorage.setItem("selectedLocation", JSON.stringify({ id, name }));
  router.push("cashMovementsPage/mockMovements")
  };

  // Reemplazo de la función getCashMovements con el mock
  const getCashMovements = async (locationId: string) => {
    try {
      // Usamos el mock de datos en lugar de la llamada a la API
      setMovimientosCaja(mockCashMovements);
    } catch (error) {
      console.error("Error al obtener los movimientos de caja:", error);
    }
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
                <p><strong>Fecha:</strong> {movimiento.fecha || "N/A"}</p>
                <p><strong>Descripción:</strong> {movimiento.descripcion}</p>
                <p><strong>Monto:</strong> ${movimiento.monto}</p>
                <p><strong>Tipo de Movimiento:</strong> {movimiento.tipoMovimiento}</p>
                <p><strong>Estado:</strong> {movimiento.estado}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CashMovements;
