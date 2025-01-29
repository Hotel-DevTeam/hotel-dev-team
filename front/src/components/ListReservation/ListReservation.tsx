import React, { useState } from "react";
import Swal from "sweetalert2";
import { useReservationContext } from "../../context/reservationContext";
import { Reservation } from "../../Interfaces/IReservation";
import { roomsData } from "../../Data/Data"; // Importamos roomsData
import CurrencyModal from "../DollarComponents/DollarModal"; // Importamos el nuevo modal

const ReservationsList: React.FC = () => {
  const { reservations, finalizeReservation, cancelReservation, updatePrice } =
    useReservationContext();
  const [filter, setFilter] = useState<
    "all" | "finalized" | "unfinalized" | "inProgress"
  >("all");
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Estado para controlar el modal
  const [modalData, setModalData] = useState<{
    pesosAmount: number;
    depositAmount: number;
  } | null>(null);

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

    // Abre el modal con la cantidad en pesos y el depósito
    setModalData({
      pesosAmount: reservation.totalPrice,
      depositAmount: reservation.deposit,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null); // Limpiamos los datos del modal
  };

  return (
    <div className="m-6 space-y-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Lista de Reservas
      </h2>

      {/* Contenedor de filtros */}
      <div className="flex gap-8 mb-6">
        {/* Filtros */}
        <div className="w-1/4 bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Filtrar por Estado
          </h3>
          <div className="flex flex-col gap-6">
            {["all", "finalized", "unfinalized", "inProgress"].map((status) => (
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
                        | "unfinalized"
                        | "inProgress"
                    )
                  }
                  className="form-radio text-orange-500 focus:ring-orange-500"
                />
                <span className="text-lg">
                  {status === "all"
                    ? "Todas"
                    : status === "finalized"
                    ? "Finalizadas"
                    : status === "unfinalized"
                    ? "No Finalizadas"
                    : "En Progreso"}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Filtro por habitación */}
        <div className="w-3/4 bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Filtrar por Habitación
          </h3>
          <select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 bg-gray-50 text-gray-700 focus:ring-2 focus:ring-orange-500"
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

      {/* Tarjetas de reservas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReservations.map((reservation) => {
          const room = roomsData.find((room) => room.id === reservation.roomId);

          // Cambiar clases según estado de la reserva
          let cardClass =
            "bg-white p-6 rounded-lg shadow-lg border border-gray-200";
          let buttonClass =
            "bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 hover:text-white";

          if (reservation.status === "finalizada") {
            cardClass =
              "bg-green-50 p-6 rounded-lg shadow-lg border border-green-200";
            buttonClass =
              "bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 hover:text-white";
          } else if (reservation.status === "cancelada") {
            cardClass =
              "bg-red-50 p-6 rounded-lg shadow-lg border border-red-200";
            buttonClass =
              "bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 hover:text-white";
          }

          return (
            <div key={reservation.id} className={cardClass}>
              <div className="text-lg font-semibold text-gray-800">
                Habitación: {room ? room.roomNumber : "No especificada"}
              </div>
              <div className="text-gray-600 mt-2">
                <div>Check-in: {reservation.checkInDate}</div>
                <div>Check-out: {reservation.checkOutDate}</div>
                <div>Pasajeros: {reservation.passengers}</div>
                <div className="font-semibold text-gray-800">
                  Precio Total: ${reservation.totalPrice} ARS
                </div>
                <div className="font-semibold text-gray-800">
                  Depósito: ${reservation.deposit} ARS
                </div>
                <div className="font-semibold text-gray-800">
                  Saldo Restante: ${reservation.remainingBalance} ARS
                </div>
              </div>

              {/* Botones */}
              <div className="flex gap-4 mt-4">
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
            </div>
          );
        })}
      </div>

      {/* Modal de conversión */}
      {modalData && (
        <CurrencyModal
          isOpen={isModalOpen}
          onClose={closeModal}
          pesosAmount={modalData.pesosAmount}
          depositAmount={modalData.depositAmount}
        />
      )}
    </div>
  );
};

export default ReservationsList;
