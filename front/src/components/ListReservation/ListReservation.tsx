"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import { useReservationContext } from "../../context/reservationContext";
import { Reservation } from "../../Interfaces/IReservation";

const ReservationsList: React.FC = () => {
  const { reservations, rooms, finalizeReservation, removeReservation } =
    useReservationContext();
  const [filter, setFilter] = useState<"all" | "finalized" | "unfinalized">(
    "all"
  );
  const [selectedRoom, setSelectedRoom] = useState<string>("");

  const filteredReservations = reservations.filter((reservation) => {
    if (filter === "finalized") return reservation.finalized;
    if (filter === "unfinalized") return !reservation.finalized;
    if (selectedRoom) {
      // Filtramos por habitación si se ha seleccionado una
      const room = rooms.find((room) => room.id === reservation.roomId);
      return room?.roomNumber === selectedRoom;
    }
    return true;
  });

  const handleFinalizeReservation = (reservation: Reservation) => {
    Swal.fire({
      title: "¿Finalizar esta reserva?",
      text: "Una vez finalizada no podrás revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF5100",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, finalizar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        finalizeReservation(reservation);
        Swal.fire(
          "Finalizada",
          "La reserva ha sido marcada como finalizada.",
          "success"
        );
      }
    });
  };

  const handleRemoveReservation = (id: string) => {
    Swal.fire({
      title: "¿Eliminar esta reserva?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF5100",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        removeReservation(id);
        Swal.fire(
          "Eliminada",
          "La reserva ha sido eliminada exitosamente.",
          "success"
        );
      }
    });
  };

  return (
    <div className="m-4 space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Lista de Reservas
      </h2>

      {/* Filtro con radio buttons y selección de habitación */}
      <div className="flex justify-center gap-6 mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="filter"
            value="all"
            checked={filter === "all"}
            onChange={(e) =>
              setFilter(e.target.value as "all" | "finalized" | "unfinalized")
            }
            className="form-radio text-orange-400 focus:ring-orange-500"
          />
          <span className="text-gray-700 font-medium">Todas</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="filter"
            value="finalized"
            checked={filter === "finalized"}
            onChange={(e) =>
              setFilter(e.target.value as "all" | "finalized" | "unfinalized")
            }
            className="form-radio text-orange-400 focus:ring-orange-500"
          />
          <span className="text-gray-700 font-medium">Finalizadas</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="filter"
            value="unfinalized"
            checked={filter === "unfinalized"}
            onChange={(e) =>
              setFilter(e.target.value as "all" | "finalized" | "unfinalized")
            }
            className="form-radio text-orange-400 focus:ring-orange-500"
          />
          <span className="text-gray-700 font-medium">No Finalizadas</span>
        </label>
      </div>

      {/* Filtro por habitación */}
      <div className="mb-4">
        <select
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
          className="block mx-auto p-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Filtra por habitación</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.roomNumber}>
              Habitación {room.roomNumber}
            </option>
          ))}
        </select>
      </div>

      {/* Contenedor flex para tarjetas */}
      <div className="flex flex-wrap gap-6">
        {filteredReservations.map((reservation) => {
          // Encontramos la habitación asociada a la reserva
          const room = rooms.find((room) => room.id === reservation.roomId);

          return (
            <div
              key={reservation.id}
              className="bg-[#CD9C8A] p-6 rounded-lg shadow-lg transition transform hover:scale-105 w-72"
            >
              {/* Habitación destacada */}
              <div className="text-white font-semibold text-xl mb-2">
                Habitación: {room ? room.roomNumber : "No especificada"}
              </div>

              <div className="text-white font-semibold text-lg">
                Check-in: {reservation.checkInDate}
              </div>
              <div className="text-white text-md">
                Check-out: {reservation.checkOutDate}
              </div>
              <div className="text-white text-md">
                Pasajeros: {reservation.passengers}
              </div>
              <div className="text-white text-md">
                Precio Total: $USD {reservation.totalPrice}
              </div>

              <div className="text-white text-md">
                Desayuno: {reservation.breakfastIncluded ? "Sí" : "No"}
              </div>
              <div className="text-white text-md">
                Depósito: $USD {reservation.deposit}
              </div>

              <div className="text-white text-md">
                Saldo Pendiente: $USD {reservation.remainingBalance}
              </div>
              <div className="text-white text-md">
                Comentarios: {reservation.comments}
              </div>

              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => handleFinalizeReservation(reservation)}
                  disabled={reservation.finalized}
                  className="bg-orange-400 text-white px-6 py-2 rounded-md hover:text-orange-600 hover:bg-white disabled:bg-gray-400"
                >
                  {reservation.finalized ? "Finalizado" : "Finalizar Reserva"}
                </button>

               
                <button
                  onClick={() =>
                    //handleRemoveReservation(parseInt(reservation.id, 10))
                    handleRemoveReservation(reservation.id)
                  } 
                  className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReservationsList;
