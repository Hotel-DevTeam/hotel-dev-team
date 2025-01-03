"use client";
import React, { useEffect, useState } from "react";
import { useLocationContext } from "@/context/LocationContext";
import { useRouter } from "next/navigation";

// Mock de movimientos de caja con fecha
const mockCashMovements = [
  {
    monto: 100.5,
    descripcion: "Pago de servicios",
    estado: "Hecho",
    producto: {},
    ubicacion: {},
    tipoMovimiento: "Ingreso",
    fecha: "2024-01-05", // Fecha añadida
  },
  {
    monto: 50.0,
    descripcion: "Compra de materiales",
    estado: "Hecho",
    producto: {},
    ubicacion: {},
    tipoMovimiento: "Egreso",
    fecha: "2024-02-10", // Fecha añadida
  },
  {
    monto: 200.75,
    descripcion: "Pago de impuestos",
    estado: "Cancelado",
    producto: {},
    ubicacion: {},
    tipoMovimiento: "Ingreso",
    fecha: "2024-03-15", // Fecha añadida
  },
];

const MockMovements: React.FC = () => {
  const router = useRouter();
  const [movimientosCaja, setMovimientosCaja] = useState<any[]>([]);
  const [filteredMovements, setFilteredMovements] = useState<any[]>([]);
  const [selectedTipo, setSelectedTipo] = useState<string>("");
  const [selectedEstado, setSelectedEstado] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const { setLocation } = useLocationContext();

  // Reemplazo de la función getCashMovements con el mock
  const getCashMovements = async () => {
    try {
      // Usamos el mock de datos en lugar de la llamada a la API
      setMovimientosCaja(mockCashMovements);
    } catch (error) {
      console.error("Error al obtener los movimientos de caja:", error);
    }
  };

  // Llamamos a getCashMovements cuando el componente se monta
  useEffect(() => {
    getCashMovements();
  }, []);

  // Filtrar movimientos según los filtros seleccionados
  useEffect(() => {
    let filtered = [...movimientosCaja];

    if (selectedTipo) {
      filtered = filtered.filter((movimiento) => movimiento.tipoMovimiento === selectedTipo);
    }

    if (selectedEstado) {
      filtered = filtered.filter((movimiento) => movimiento.estado === selectedEstado);
    }

    if (startDate) {
      filtered = filtered.filter((movimiento) => new Date(movimiento.fecha) >= new Date(startDate));
    }

    if (endDate) {
      filtered = filtered.filter((movimiento) => new Date(movimiento.fecha) <= new Date(endDate));
    }

    setFilteredMovements(filtered);
  }, [movimientosCaja, selectedTipo, selectedEstado, startDate, endDate]);

  // Función para eliminar filtros
  const handleClearFilters = () => {
    setSelectedTipo("");
    setSelectedEstado("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="bg-gradient-to-r font-sans min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 text-center my-16 tracking-wide">
        Movimientos de caja por alojamiento
      </h1>

      <div className="flex justify-center space-x-6 mb-8">
        {/* Filtro por Tipo de Movimiento */}
        <div>
          <label htmlFor="tipoMovimiento" className="block text-lg font-medium text-gray-700 mb-2">
            Filtrar por Tipo de Movimiento
          </label>
          <select
            id="tipoMovimiento"
            value={selectedTipo}
            onChange={(e) => setSelectedTipo(e.target.value)}
            className="p-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Todos</option>
            <option value="Ingreso">Ingreso</option>
            <option value="Egreso">Egreso</option>
          </select>
        </div>

        {/* Filtro por Estado */}
        <div>
          <label htmlFor="estado" className="block text-lg font-medium text-gray-700 mb-2">
            Filtrar por Estado
          </label>
          <select
            id="estado"
            value={selectedEstado}
            onChange={(e) => setSelectedEstado(e.target.value)}
            className="p-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Todos</option>
            <option value="Hecho">Hecho</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>

        {/* Filtro por Fecha */}
        <div>
          <label htmlFor="startDate" className="block text-lg font-medium text-gray-700 mb-2">
            Filtrar por Fecha
          </label>
          <div className="flex space-x-4">
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="p-2 border border-gray-300 rounded-md shadow-sm"
            />
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Botón de eliminar filtros */}
      <div className="text-center mb-6">
        <button
          onClick={handleClearFilters}
          className="inline-block rounded bg-[#FF5100] border border-[#FF5100] px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-[#FF5100] focus:outline-none focus:ring active:text-[#FF5100] transition-all duration-300"
        >
          Eliminar Filtros
        </button>
      </div>

      {filteredMovements.length > 0 ? (
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Movimientos de Caja</h2>
          <ul className="space-y-6">
            {filteredMovements.map((movimiento, index) => (
              <li
                key={index}
                className="p-6 bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col space-y-4">
                  <div>
                    <p className="text-lg font-medium text-gray-800"><strong>Descripción:</strong> {movimiento.descripcion}</p>
                    <p className="text-sm text-gray-500"><strong>Tipo de Movimiento:</strong> {movimiento.tipoMovimiento}</p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-700">
                    <p><strong>Monto:</strong> ${movimiento.monto}</p>
                    <p><strong>Estado:</strong> <span className={movimiento.estado === "Hecho" ? "text-green-500" : movimiento.estado === "Cancelado" ? "text-red-500" : "text-yellow-500"}>{movimiento.estado}</span></p>
                    <p><strong>Fecha:</strong> {new Date(movimiento.fecha).toLocaleDateString()}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-center text-xl text-gray-500">No hay movimientos de caja disponibles.</p>
      )}
    </div>
  );
};

export default MockMovements;
