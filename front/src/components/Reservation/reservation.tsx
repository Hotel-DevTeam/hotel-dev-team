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
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-pink-600">
        Lista de Reservas
      </h1>

      <div className="mb-4 flex justify-center space-x-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded ${
            filter === "all" ? "bg-pink-500 text-white" : "bg-pink-200"
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 rounded ${
            filter === "completed" ? "bg-pink-500 text-white" : "bg-pink-200"
          }`}
        >
          Finalizadas
        </button>
        <button
          onClick={() => setFilter("notCompleted")}
          className={`px-4 py-2 rounded ${
            filter === "notCompleted" ? "bg-pink-500 text-white" : "bg-pink-200"
          }`}
        >
          No Finalizadas
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredReservations.map((reservation, index) => (
          <div
            key={index}
            className="bg-green-100 shadow-md rounded-lg p-4 hover:bg-green-200 transition duration-200"
          >
            <div className="mb-2">
              <strong>Check-in:</strong>{" "}
              <span>{reservation.checkIn.toLocaleDateString()}</span>
            </div>
            <div className="mb-2">
              <strong>Check-out:</strong>{" "}
              <span>{reservation.checkOut.toLocaleDateString()}</span>
            </div>
            <div className="mb-2">
              <strong>Habitación ID:</strong> <span>{reservation.roomId}</span>
            </div>
            <div className="mb-2">
              <strong>Pasajeros:</strong> <span>{reservation.passengers}</span>
            </div>
            <div className="mb-2">
              <strong>Cantidad de Pasajeros:</strong>{" "}
              <span>{reservation.passengerCount}</span>
            </div>
            <div className="mb-2">
              <strong>Tipo de Pasajeros:</strong>{" "}
              <span>{reservation.passengerType}</span>
            </div>
            <div className="mb-2">
              <strong>Reserva:</strong> <span>{reservation.bookingSource}</span>
            </div>
            <div className="mb-2">
              <strong>Desayuno:</strong>{" "}
              <span>{reservation.breakfastIncluded ? "Sí" : "No"}</span>
            </div>
            <div className="mb-2">
              <strong>Precio Total:</strong>{" "}
              <span>${reservation.totalPrice.toFixed(2)}</span>
            </div>
            <div className="mb-2">
              <strong>Finalizada:</strong>{" "}
              <span>{reservation.completed ? "Sí" : "No"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationsList;
