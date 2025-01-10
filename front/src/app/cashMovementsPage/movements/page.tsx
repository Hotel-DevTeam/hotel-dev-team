"use client"
import React, { useEffect, useState } from "react";
import { useLocationContext } from "@/context/LocationContext";
import { fetchCashMovements } from "@/components/Fetchs/MovementsFetch.tsx/MovementsFetch";
import { IMovimientoCaja } from "@/Interfaces/IMovements";

const Movements: React.FC = () => {
  const [movimientosCaja, setMovimientosCaja] = useState<IMovimientoCaja[]>([]);
  const [filteredMovements, setFilteredMovements] = useState<IMovimientoCaja[]>([]);
  const [selectedTipo, setSelectedTipo] = useState<string>("");
  const [selectedEstado, setSelectedEstado] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const { location } = useLocationContext(); // Obtenemos la ubicación seleccionada desde el contexto

  // Llamada para obtener los movimientos de caja
  const getCashMovements = async () => {
    if (location?.id) {
      const movements = await fetchCashMovements(); // Pasamos el ID de ubicación seleccionado
      setMovimientosCaja(movements);
    }
  };

  // Llamamos a getCashMovements cuando el componente se monta o cuando cambia la ubicación
  useEffect(() => {
    getCashMovements();
  }, [location]);

  // Filtrar movimientos según los filtros seleccionados
  useEffect(() => {
    let filtered = [...movimientosCaja];

    // Filtrado por tipo de movimiento
    if (selectedTipo) {
      filtered = filtered.filter((movimiento: IMovimientoCaja) => movimiento.tipoMovimiento === selectedTipo);
    }

    // Filtrado por estado
    if (selectedEstado) {
      filtered = filtered.filter((movimiento: IMovimientoCaja) => movimiento.estado === selectedEstado);
    }

    // Filtrado por fecha
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start) {
      filtered = filtered.filter((movimiento: IMovimientoCaja) => new Date(movimiento.fecha) >= start);
    }

    if (end) {
      filtered = filtered.filter((movimiento: IMovimientoCaja) => new Date(movimiento.fecha) <= end);
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
    <div className="flex justify-center items-center space-x-2 my-16">
      <h1 className="text-4xl font-bold text-gray-800 tracking-wide">
        Movimientos de caja 
      </h1>
      <h2 className="text-4xl font-bold tracking-wide text-[#CD9C8A]">
        {location?.name}
      </h2>
    </div>
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
          <ul className="space-y-6">
            {filteredMovements.map((movimiento: IMovimientoCaja) => {
              console.log(movimiento);  // Esto te permitirá ver cada 'movimiento' en la consola
              return (
                <li
                  key={movimiento.id}
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
                      <p><strong>Fecha:</strong> {movimiento.fecha ? new Date(movimiento.fecha).toLocaleDateString() : "Fecha no disponible"}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p className="text-center text-xl text-gray-500">No hay movimientos de caja disponibles.</p>
      )}
    </div>
  );
};

export default Movements;
