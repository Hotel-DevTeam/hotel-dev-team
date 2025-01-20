/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import { useReservationContext } from "../../context/reservationContext";
import { Reservation } from "../../Interfaces/IReservation";
import { roomsData } from "../../Data/Data"; // Importamos roomsData

const ReservationsList: React.FC = () => {
  const { reservations, finalizeReservation, cancelReservation, updatePrice } =
    useReservationContext();
  const [filter, setFilter] = useState<
    "all" | "finalized" | "unfinalized" | "inProgress"
  >("all");
  const [selectedRoom, setSelectedRoom] = useState<string>("");

  const filteredReservations = reservations.filter((reservation) => {
    if (filter === "finalized") return reservation.status === "finalizada";
    if (filter === "unfinalized") return reservation.status !== "finalizada";
    if (filter === "inProgress") return reservation.status === "en progreso";
    if (selectedRoom) {
      return String(reservation.roomId) === selectedRoom;
    }
    return true;
  });

  const handleFinalizeReservation = (reservation: Reservation) => {
    if (reservation.status === "finalizada") return; // Prevenir múltiples finalizaciones
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

  const handleCancelReservation = (reservation: Reservation) => {
    if (reservation.status === "cancelada") return; // Prevenir múltiples cancelaciones
    Swal.fire({
      title: "¿Cancelar esta reserva?",
      text: "Por favor, ingresa una descripción de la razón para cancelar.",
      input: "textarea",
      inputPlaceholder: "Descripción",
      showCancelButton: true,
      confirmButtonColor: "#FF5100",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        cancelReservation(reservation.id, result.value);
        Swal.fire("Cancelada", "La reserva ha sido cancelada.", "success");
      }
    });
  };

  const handlePriceChange = async (reservation: Reservation) => {
    const dollarRate = await fetch("/api/get-dollar-rate").then((res) =>
      res.json()
    );
    const updatedPrice = reservation.totalPrice * dollarRate.rate;
    updatePrice(reservation.id, updatedPrice);
  };

  return (
    <div className="m-4 space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Lista de Reservas
      </h2>

      {/* Contenedor para los filtros a la izquierda */}
      <div className="flex gap-6 mb-4">
        <div className="w-1/4">
          {/* Filtro con radio buttons */}
          <div className="flex flex-col gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="filter"
                value="all"
                checked={filter === "all"}
                onChange={(e) =>
                  setFilter(
                    e.target.value as
                      | "all"
                      | "finalized"
                      | "unfinalized"
                      | "inProgress"
                  )
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
                  setFilter(
                    e.target.value as
                      | "all"
                      | "finalized"
                      | "unfinalized"
                      | "inProgress"
                  )
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
                  setFilter(
                    e.target.value as
                      | "all"
                      | "finalized"
                      | "unfinalized"
                      | "inProgress"
                  )
                }
                className="form-radio text-orange-400 focus:ring-orange-500"
              />
              <span className="text-gray-700 font-medium">No Finalizadas</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="filter"
                value="inProgress"
                checked={filter === "inProgress"}
                onChange={(e) =>
                  setFilter(
                    e.target.value as
                      | "all"
                      | "finalized"
                      | "unfinalized"
                      | "inProgress"
                  )
                }
                className="form-radio text-orange-400 focus:ring-orange-500"
              />
              <span className="text-gray-700 font-medium">En Progreso</span>
            </label>
          </div>
        </div>

        <div className="w-3/4">
          {/* Filtro por habitación */}
          <div className="mb-4">
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="block mx-auto p-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Filtra por habitación</option>
              {roomsData.map((room) => (
                <option key={room.id} value={room.roomNumber.toString()}>
                  Habitación {room.roomNumber}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Contenedor flex para tarjetas */}
      <div className="flex flex-wrap gap-6">
        {filteredReservations.map((reservation) => {
          const room = roomsData.find((room) => room.id === reservation.roomId);

          // Cambiar estilos según el estado
          let cardClass = "bg-[#CD9C8A] p-6 rounded-lg shadow-lg w-72";
          let buttonClass =
            "bg-orange-400 text-white px-6 py-2 rounded-md hover:text-orange-600 hover:bg-white";

          if (reservation.status === "finalizada") {
            cardClass = "bg-green-200 p-6 rounded-lg shadow-lg w-72";
            buttonClass =
              "bg-green-400 text-white px-6 py-2 rounded-md hover:text-green-600 hover:bg-white";
          } else if (reservation.status === "cancelada") {
            cardClass = "bg-red-200 p-6 rounded-lg shadow-lg w-72";
            buttonClass =
              "bg-red-500 text-white px-6 py-2 rounded-md hover:text-red-600 hover:bg-white";
          }

          return (
            <div key={reservation.id} className={cardClass}>
              <div className="text-black font-semibold text-xl mb-2">
                Habitación: {room ? room.roomNumber : "No especificada"}
              </div>

              <div className="text-black font-semibold text-lg">
                Check-in: {reservation.checkInDate}
              </div>
              <div className="text-black text-md">
                Check-out: {reservation.checkOutDate}
              </div>
              <div className="text-black text-md">
                Pasajeros: {reservation.passengers}
              </div>

              <div className="text-black text-md">
                Precio Total: ${reservation.totalPrice} ARS
              </div>
              <div className="text-black text-md">
                Precio Total: ${reservation.totalPriceUSD.toFixed(2)} USD
              </div>
            </div>
          );
        })}
      </div>

      {/* Botones fuera de la card */}
      <div className="flex justify-center gap-6 mt-6">
        {filteredReservations.map((reservation) => {
          const buttonClass =
            reservation.status === "finalizada"
              ? "bg-green-400 text-white px-6 py-2 rounded-md hover:text-green-600 hover:bg-white"
              : reservation.status === "cancelada"
              ? "bg-red-500 text-white px-6 py-2 rounded-md hover:text-red-600 hover:bg-white"
              : "bg-orange-400 text-white px-6 py-2 rounded-md hover:text-orange-600 hover:bg-white";

          return (
            <div key={reservation.id} className="space-x-4">
              <button
                className={buttonClass}
                onClick={() => handlePriceChange(reservation)}
              >
                Ver Precio Actualizado
              </button>

              <button
                className={buttonClass}
                onClick={() => handleFinalizeReservation(reservation)}
              >
                {reservation.status === "finalizada"
                  ? "Finalizada"
                  : "Finalizar"}
              </button>

              <button
                className={buttonClass}
                onClick={() => handleCancelReservation(reservation)}
              >
                Cancelar
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReservationsList;
