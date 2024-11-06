"use client";

import { useEffect, useState } from "react";
import {
  generateReservations,
  filterReservations,
} from "../../helpers/reservation";

const ReservationsList: React.FC = () => {
  const [reservations, setReservations] = useState<any[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<any[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "notCompleted">(
    "all"
  );

  useEffect(() => {
    const generatedReservations = generateReservations(10);
    setReservations(generatedReservations);
    setFilteredReservations(generatedReservations);
  }, []);

  useEffect(() => {
    const updatedFilteredReservations = filterReservations();
    setFilteredReservations(updatedFilteredReservations);
  }, [filter, reservations]);

  const filterReservations = () => {
    switch (filter) {
      case "completed":
        return reservations.filter((reservation) => reservation.completed);
      case "notCompleted":
        return reservations.filter((reservation) => !reservation.completed);
      default:
        return reservations;
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
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 rounded-md font-medium text-sm transition ${
            filter === "completed" ? "bg-pink-500 text-white" : "bg-pink-200"
          } hover:bg-pink-300`}
        >
          Finalizadas
        </button>
        <button
          onClick={() => setFilter("notCompleted")}
          className={`px-4 py-2 rounded-md font-medium text-sm transition ${
            filter === "notCompleted" ? "bg-pink-500 text-white" : "bg-pink-200"
          } hover:bg-pink-300`}
        >
          No Finalizadas
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReservations.map((reservation, index) => (
          <div
            key={index}
            className="bg-green-100 shadow-lg rounded-lg p-6 hover:bg-green-200 transition duration-300"
          >
            <div className="mb-4">
              <strong className="text-sm text-gray-700">Check-in:</strong>{" "}
              <span>{reservation.checkIn.toLocaleDateString()}</span>
            </div>
            <div className="mb-4">
              <strong className="text-sm text-gray-700">Check-out:</strong>{" "}
              <span>{reservation.checkOut.toLocaleDateString()}</span>
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
              <span>{reservation.bookingSource}</span>
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
              <span>{reservation.completed ? "Sí" : "No"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationsList;
