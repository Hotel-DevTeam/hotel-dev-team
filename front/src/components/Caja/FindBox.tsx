"use client";
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { ICaja } from '@/Interfaces/ICaja';
import { fetchFindBoxBy, fetchFindBoxById } from '../Fetchs/CajaFetch/CajaFetch';

export default function BuscarCajaPorFecha() {
  const [cajas, setCajas] = useState<ICaja[]>([]);
  const [cajaSeleccionada, setCajaSeleccionada] = useState<ICaja | null>(null);
  const [error, setError] = useState<string>('');
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>('');
  const [paginaActual, setPaginaActual] = useState<number>(1);
  const cajasPorPagina = 5;

  // Obtener todas las cajas
  useEffect(() => {
    const fetchCajas = async () => {
      try {
        const data = await fetchFindBoxBy();
        // Ordenar las cajas por fecha en orden decreciente
        const cajasOrdenadas = data.sort((a: ICaja, b: ICaja) =>
          dayjs(b.fecha).diff(dayjs(a.fecha))
        );
        setCajas(cajasOrdenadas);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado.');
      }
    };

    fetchCajas();
  }, []);

  // Buscar caja por ID
  const handleBuscarCajaPorId = async (id: string) => {
    try {
      const data = await fetchFindBoxById(id);
      setCajaSeleccionada(data);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado.');
      setCajaSeleccionada(null);
    }
  };

  // ✅ Filtrar cajas por fecha seleccionada
  const cajasFiltradas = fechaSeleccionada
    ? cajas.filter((caja) =>
        dayjs(caja.fecha).format('YYYY-MM-DD') === fechaSeleccionada
      )
    : cajas;

  // 📄 Calcular paginación
  const indiceInicio = (paginaActual - 1) * cajasPorPagina;
  const indiceFin = indiceInicio + cajasPorPagina;
  const cajasPaginadas = cajasFiltradas.slice(indiceInicio, indiceFin);
  const totalPaginas = Math.ceil(cajasFiltradas.length / cajasPorPagina);

  return (
    <div className="p-6 max-w-3xl mt-20 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4"> Buscar Movimientos por Fecha</h2>

      {/* 📅 Selector de fecha */}
      <input
        type="date"
        value={fechaSeleccionada}
        onChange={(e) => {
          setFechaSeleccionada(e.target.value);
          setPaginaActual(1); // Reiniciar a la página 1
        }}
        className="w-full px-4 py-2 border rounded-md mb-4"
      />

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* 📄 Lista de cajas paginadas */}
      {cajasPaginadas.length > 0 ? (
        <div className="mt-6">
          {cajasPaginadas.map((caja) => (
            <div
              key={caja.id}
              onClick={() => handleBuscarCajaPorId(caja.id)}
              className="p-4 mb-4 border rounded-md cursor-pointer hover:bg-gray-100"
            >
              <p><strong>Fecha:</strong> {dayjs(caja.fecha).format('DD/MM/YYYY')}</p>
              <p><strong>Saldo Inicial:</strong> ${caja.saldoInicial}</p>
              <p><strong>Saldo Final:</strong> ${caja.saldoFinal}</p>
              <p className='flex justify-end text-[#CD9C8A] font-bold'>Haz click para ver más</p>
            </div>
          ))}

          {/* 📄 Controles de paginación */}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setPaginaActual(paginaActual - 1)}
              disabled={paginaActual === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
            >
              ⬅️ Anterior
            </button>
            <span>Página {paginaActual} de {totalPaginas}</span>
            <button
              onClick={() => setPaginaActual(paginaActual + 1)}
              disabled={paginaActual === totalPaginas}
              className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
            >
              Siguiente ➡️
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-gray-600">No hay cajas disponibles para esta fecha.</p>
      )}

      {/* ✅ Detalle de la caja seleccionada */}
      {cajaSeleccionada && (
        <div className="mt-6 p-4 border rounded-md bg-gray-50">
          <h3 className="text-xl font-semibold mb-2">📊 Detalles del Movimiento</h3>
          <p><strong>Fecha:</strong> {dayjs(cajaSeleccionada.fecha).format('DD/MM/YYYY HH:mm')}</p>
          <p><strong>Saldo Inicial:</strong> ${cajaSeleccionada.saldoInicial}</p>
          <p><strong>Saldo Final:</strong> ${cajaSeleccionada.saldoFinal}</p>
          <p><strong>Ingreso Efectivo:</strong> ${cajaSeleccionada.ingresoEfectivo}</p>
          <p><strong>Ingreso Tarjeta:</strong> ${cajaSeleccionada.ingresoTarjeta}</p>
          <p><strong>Cargo Habitación:</strong> ${cajaSeleccionada.cargoHabitacion}</p>
          <p><strong>Egresos:</strong> ${cajaSeleccionada.egresos}</p>
        </div>
      )}
    </div>
  );
}
