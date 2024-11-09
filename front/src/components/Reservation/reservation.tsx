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
  const [filter, setFilter] = useState<"all" | "finalized" | "notFinalized">(
    "all"
  );

  useEffect(() => {
    filterReservations();
  }, [filter, reservations]);

  const filterReservations = () => {
    switch (filter) {
      case "finalized":
        setFilteredReservations(
          reservations.filter((reservation) => reservation.finalized)
        );
        break;
      case "notFinalized":
        setFilteredReservations(
          reservations.filter((reservation) => !reservation.finalized)
        );
        break;
      default:
        setFilteredReservations(reservations);
        break;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 text-black">
      <h1 className="text-2xl font-bold text-center mb-6 text-pink-600">
        Lista de Reservas
      </h1>

      <div className="mb-4 flex justify-center space-x-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-md font-medium text-sm transition ${
            filter === "all" ? "bg-pink-500 text-white" : "bg-pink-200"
          } hover:bg-pink-300`}
        >
          Todas
        </button>
        <button
          onClick={() => setFilter("finalized")}
          className={`px-4 py-2 rounded-md font-medium text-sm transition ${
            filter === "finalized" ? "bg-pink-500 text-white" : "bg-pink-200"
          } hover:bg-pink-300`}
        >
          Finalizadas
        </button>
        <button
          onClick={() => setFilter("notFinalized")}
          className={`px-4 py-2 rounded-md font-medium text-sm transition ${
            filter === "notFinalized" ? "bg-pink-500 text-white" : "bg-pink-200"
          } hover:bg-pink-300`}
        >
          No Finalizadas
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReservations.map((reservation) => (
          <div
            key={reservation.id}
            className="bg-green-100 shadow-lg rounded-lg p-6 hover:bg-green-200 transition duration-300"
          >
            <div className="mb-4">
              <strong className="text-sm text-gray-700">Check-in:</strong>{" "}
              <span>{reservation.checkInDate}</span>
            </div>
            <div className="mb-4">
              <strong className="text-sm text-gray-700">Check-out:</strong>{" "}
              <span>{reservation.checkOutDate}</span>
            </div>
            <div className="mb-4">
              <strong className="text-sm text-gray-700">Habitación ID:</strong>{" "}
              <span>{reservation.roomId}</span>
            </div>
            <div className="mb-4">
              <strong className="text-sm text-gray-700">Pasajeros:</strong>{" "}
              <span>{reservation.passengerCount}</span>
            </div>
            <div className="mb-4">
              <strong className="text-sm text-gray-700">
                Tipo de Pasajeros:
              </strong>{" "}
              <span>{reservation.passengerType}</span>
            </div>
            <div className="mb-4">
              <strong className="text-sm text-gray-700">Reserva:</strong>{" "}
              <span>{reservation.reservationMethod}</span>
            </div>
            <div className="mb-4">
              <strong className="text-sm text-gray-700">Desayuno:</strong>{" "}
              <span>{reservation.breakfastIncluded ? "Sí" : "No"}</span>
            </div>
            <div className="mb-4">
              <strong className="text-sm text-gray-700">Precio Total:</strong>{" "}
              <span>${reservation.totalPrice.toFixed(2)}</span>
            </div>
            <div className="mb-4">
              <strong className="text-sm text-gray-700">Finalizada:</strong>{" "}
              <span>{reservation.finalized ? "Sí" : "No"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationsList;
