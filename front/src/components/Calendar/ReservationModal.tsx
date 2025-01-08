/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useReservationContext } from "@/context/reservationContext";
import { Reservation } from "../../Interfaces/IReservation";

interface ReservationModalProps {
  selectedDate: string;
  closeModal: () => void;
}

const ReservationModal: React.FC<ReservationModalProps> = ({
  selectedDate,
  closeModal,
}) => {
  const { reservations } = useReservationContext();
  const [reservationText, setReservationText] = useState<string | null>(null);

  const reservationsForDay = reservations.filter((res) => {
    const checkIn = res.checkInDate.slice(0, 10);
    return checkIn === selectedDate;
  });

  const handleRemoveText = () => {
    setReservationText(null);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4">
        <h3 className="text-2xl font-semibold text-[#264653] text-center mb-6">
          Reservas para {selectedDate}
        </h3>

        {reservationsForDay.length === 0 ? (
          <p className="text-[#264653] text-center">
            No hay reservas para este día.
          </p>
        ) : (
          <ul className="space-y-4">
            {reservationsForDay.map((reservation) => (
              <li
                key={reservation.id}
                className="border-b py-4 flex flex-col space-y-2"
              >
                <div className="flex justify-between">
                  <p className="text-[#264653] font-medium">
                    <strong>Nombre:</strong> {reservation.passengerType}
                  </p>
                  <p className="text-[#264653] font-medium">
                    <strong>Habitación:</strong> {reservation.roomId}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-[#264653]">
                    <strong>Fecha de salida:</strong> {reservation.checkOutDate}
                  </p>
                  <p className="text-[#264653]">
                    <strong>Cantidad de pasajeros:</strong>{" "}
                    {reservation.passengerCount}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-[#264653]">
                    <strong>Saldo pendiente:</strong> $
                    {reservation.remainingBalance} USD
                  </p>
                </div>
                {reservationText && (
                  <button
                    onClick={handleRemoveText}
                    className="text-red-500 self-end"
                  >
                    X
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}

        <div className="flex justify-center">
          <button
            onClick={closeModal}
            className="bg-[#FF5100] text-white py-2 px-6 rounded-lg shadow-md hover:bg-[#FF3A00] focus:outline-none focus:ring-2 focus:ring-[#FF5100]"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;
