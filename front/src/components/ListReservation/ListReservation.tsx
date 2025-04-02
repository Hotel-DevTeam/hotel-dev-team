/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useReservationContext } from "../../context/reservationContext";
import { Reservation } from "../../Interfaces/IReservation";
import ShowReservationModal from "./ShowReservation";
import CurrencyForm from "../DollarComponents/DollarReservation"; // Importamos el nuevo formulario
import { fetchGetReservtions, CancelReservation, CompleteReservation } from "../Fetchs/ReservationsFetch/IReservationsFetch";

const ReservationsList: React.FC = () => {
  const { rooms, finalizeReservation, cancelReservation, updatePrice } =
    useReservationContext();
  const [filter, setFilter] = useState<
    "all" | "finalized" | "inProgress" | "cancelled"
  >("all");
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [selectedReservation, setSelectedReservation] = useState<string>("");
  const [showPriceForm, setShowPriceForm] = useState<null | string>(null); // Estado para mostrar el formulario
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
      const loadOrders = async () => {
        try {
          const data = await fetchGetReservtions();
          setReservations(data.reservations);
        } catch (error) {
          setError(error instanceof Error ? error.message : "Error desconocido");
        } finally {
          setLoading(false);
        }
      };

      loadOrders();
    }, []);
  
  // Filtrar reservas por estado y habitación
  const filteredReservations = reservations.filter((reservation) => {
    // Filtro por estado
    const statusFilter =
      filter === "all" ||
      (filter === "finalized" && reservation.status === "finalizada") ||
      (filter === "inProgress" && reservation.status === "en progreso") ||
      (filter === "cancelled" && reservation.status === "cancelada");

    // Filtro por habitación
    const roomFilter =
      selectedRoom === "" || reservation.roomId === selectedRoom;

    return statusFilter && roomFilter;
  });

  const handleFinalizeReservation = (reservation: Reservation) => {
    if (reservation.status === "finalizada") return;
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
    if (reservation.status === "cancelada") return;

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
        const cancellationReason = result.value;
        cancelReservation(reservation.id, cancellationReason);
        reservation.cancellationReason = cancellationReason;
        Swal.fire("Cancelada", "La reserva ha sido cancelada.", "success");
      }
    });
  };

  const handlePriceChange = async (reservation: Reservation) => {
    const dollarRate = await fetch("/api/get-dollar-rate").then((res) =>
      res.json()
    );
    const updatedPrice = reservation.priceArg * dollarRate.rate;
    updatePrice(reservation.id, updatedPrice);
  };

  // Función para manejar la apertura del formulario
  const togglePriceForm = (reservationId: string | null) => {
    setShowPriceForm(showPriceForm === reservationId ? null : reservationId);
  };

  return (
    <div className="m-6 space-y-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Lista de Reservas
      </h2>

      {/* Filtros de Estado y Habitación */}
      <div className="flex gap-8 mb-6">
        {/* Filtro de Estado */}
        {/* <div className="w-1/4 bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Filtrar por Estado
          </h3>
          <div className="flex flex-col gap-6">
            {["all", "finalized", "inProgress", "cancelled"].map((status) => (
              <label
                key={status}
                className="flex items-center gap-3 cursor-pointer text-gray-700"
              >
                <input
                  type="radio"
                  name="filter"
                  value={status}
                  checked={filter === status}
                  onChange={(e) =>
                    setFilter(
                      e.target.value as
                        | "all"
                        | "finalized"
                        | "inProgress"
                        | "cancelled"
                    )
                  }
                  className="form-radio text-orange-500 focus:ring-orange-500"
                />
                <span className="text-lg">
                  {status === "all"
                    ? "Todas"
                    : status === "finalized"
                    ? "Finalizadas"
                    : status === "cancelled"
                    ? "Canceladas"
                    : "En Progreso"}
                </span>
              </label>
            ))}
          </div>
        </div> */}

        {/* Filtro por Habitación */}
        {/* <div className="w-3/4 bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Filtrar por Habitación
          </h3>
          <select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 bg-gray-50 text-gray-700 focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Filtra por habitación</option>
            {rooms.map((room) => (              
              <option key={room.id} value={room.id.toString()}>
                {`Habitación ${room.name}`}
              </option>
            ))}
          </select>
        </div>*/}
      </div> 

      {/* Lista de Reservas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReservations.map((reservation) => {
          const room = rooms.find((room) => room.id === reservation.roomId);
          let cardClass =
            "bg-white p-6 rounded-lg shadow-lg border border-gray-200";
          let buttonClass =
            "bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 hover:text-white";
          let completeButtonClass =
            "bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 hover:text-white";

          if (reservation.status === "completed") {
            cardClass =
              "bg-green-50 p-6 rounded-lg shadow-lg border border-green-200";
            buttonClass =
              "bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 hover:text-white";
            completeButtonClass = "invisible";
          } else if (reservation.status === "cancelled") {
            cardClass =
              "bg-red-50 p-6 rounded-lg shadow-lg border border-red-200";
            buttonClass =
              "bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 hover:text-white";
            completeButtonClass = "invisible";
          }

          return (
            <div key={reservation.id} className={cardClass}>
              <div className="text-lg font-semibold text-gray-800">
                Habitación: {reservation.room ? reservation.room.name : "No especificada"}
              </div>
              <div className="text-gray-600 mt-2">
                <div>Check-in: {reservation.checkInDate.slice(0,10)}</div>
                <div>Check-out: {reservation.checkOutDate.slice(0,10)}</div> 
                <div>Pasajero: {reservation.pax.name} {reservation.pax.lastname}</div>
                <div className="font-semibold text-gray-800">
                  Precio Total: ${reservation.priceArg} ARS
                </div>
                <div className="font-semibold text-gray-800">
                  Depósito: ${reservation.depositArg} ARS
                </div>
                <div className="font-semibold text-gray-800">
                  Saldo Restante: ${reservation.balance} ARS
                </div>
                {reservation.status === "cancelada" &&
                  reservation.cancellationReason && (
                    <div className="mt-2 text-gray-500 font-semibold">
                      Motivo de la cancelación: {reservation.cancellationReason}
                    </div>
                  )}
              </div>

              <div className="flex gap-4 mt-4">
                {/*<button
                  className={buttonClass}
                  onClick={() => togglePriceForm(reservation.id)}
                >
                  Ver Precio Actualizado
                </button>*/}

                <button
                  className={buttonClass}
                  onClick={() => setSelectedReservation(reservation.id)}
                >
                  Detalles
                </button>
                <button
                  className={completeButtonClass}
                  onClick={() => CompleteReservation(reservation.id).then(()=>window.location.reload())}
                >
                  Finalizar
                </button>

                <button
                  className={completeButtonClass}
                  onClick={() => CancelReservation(reservation.id).then(()=>window.location.reload())}
                >
                  Cancelar
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mostrar el formulario de precio actualizado fuera de las tarjetas */}
      {showPriceForm && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <CurrencyForm
            pesosAmount={
              filteredReservations.find(
                (reservation) => reservation.id === showPriceForm
              )?.priceArg || 0
            }
            depositAmount={
              filteredReservations.find(
                (reservation) => reservation.id === showPriceForm
              )?.depositArg || 0
            }
          />
        </div>
      )}

      {selectedReservation && (
              <ShowReservationModal
                selectedReservation={selectedReservation}
                closeModal={() => setSelectedReservation("")}
              />
            )}
    </div>
  );
};

export default ReservationsList;
