/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { useReservationContext } from "../../context/reservationContext";
import { Reservation } from "../../Interfaces/IReservation";

const ReservationsList: React.FC = () => {
  const { reservations, finalizeReservation } = useReservationContext();
  const [filter, setFilter] = useState<"all" | "finalized" | "unfinalized">(
    "all"
  );

  const filteredReservations = reservations.filter((reservation) => {
    if (filter === "finalized") return reservation.finalized;
    if (filter === "unfinalized") return !reservation.finalized;
    return true;
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Lista de Reservas</h2>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value as any)}
        className="border border-gray-300 rounded-lg w-full px-3 py-2"
      >
        <option value="all">Todas</option>
        <option value="finalized">Finalizadas</option>
        <option value="unfinalized">No Finalizadas</option>
      </select>

      <ul>
        {filteredReservations.map((reservation, index) => (
          <li key={reservation.id} className="bg-gray-100 p-4 rounded-lg">
            <div>Check-in: {reservation.checkInDate}</div>
            <div>Check-out: {reservation.checkOutDate}</div>
            <div>Pasajeros: {reservation.passengers}</div>
            <div>Precio Total: ${reservation.totalPrice}</div>
            <button
              onClick={() => finalizeReservation(reservation)}
              disabled={reservation.finalized}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
              {reservation.finalized ? "Finalizado" : "Finalizar Reserva"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationsList;
