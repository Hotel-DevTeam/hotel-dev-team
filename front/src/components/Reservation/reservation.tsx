/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { useReservationContext } from "../../context/reservationContext";
import { Reservation } from "../../Interfaces/IReservation";

const ReservationsList: React.FC = () => {
  const { reservations } = useReservationContext();
  const [filteredReservations, setFilteredReservations] = useState<
    Reservation[]
  >([]);

  useEffect(() => {
    setFilteredReservations(reservations);
  }, [reservations]);

  return (
    <div className="max-w-6xl mx-auto p-4 text-black">
      <h1 className="text-2xl font-bold text-center mb-6 text-pink-600">
        Historial de Reservas
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-pink-200">
              <th className="px-6 py-3 text-left border-b">Check-in</th>
              <th className="px-6 py-3 text-left border-b">Check-out</th>
              <th className="px-6 py-3 text-left border-b">Habitación ID</th>
              <th className="px-6 py-3 text-left border-b">Pasajeros</th>
              <th className="px-6 py-3 text-left border-b">
                Tipo de Pasajeros
              </th>
              <th className="px-6 py-3 text-left border-b">Reserva</th>
              <th className="px-6 py-3 text-left border-b">Desayuno</th>
              <th className="px-6 py-3 text-left border-b">Precio Total</th>
              <th className="px-6 py-3 text-left border-b">Finalizada</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map((reservation) => (
              <tr key={reservation.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b">
                  {reservation.checkInDate}
                </td>
                <td className="px-6 py-4 border-b">
                  {reservation.checkOutDate}
                </td>
                <td className="px-6 py-4 border-b">{reservation.roomId}</td>
                <td className="px-6 py-4 border-b">
                  {reservation.passengerCount}
                </td>
                <td className="px-6 py-4 border-b">
                  {reservation.passengerType}
                </td>
                <td className="px-6 py-4 border-b">
                  {reservation.reservationMethod}
                </td>
                <td className="px-6 py-4 border-b">
                  {reservation.breakfastIncluded ? "Sí" : "No"}
                </td>
                <td className="px-6 py-4 border-b">
                  ${reservation.totalPrice.toFixed(2)}
                </td>
                <td className="px-6 py-4 border-b">
                  {reservation.finalized ? "Sí" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReservationsList;
