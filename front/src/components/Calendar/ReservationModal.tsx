/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Reservation } from "../../Interfaces/IReservation";

interface ReservationModalProps {
  selectedDate: string;
  roomName: string;
  reservations: Reservation[];
  closeModal: () => void;
}

const ReservationModal: React.FC<ReservationModalProps> = ({
  selectedDate,
  roomName,
  reservations,
  closeModal,
}) => {
  const [reservationText, setReservationText] = useState<string | null>(null);

  const reservationsForDay = reservations.filter((res) => {
    const checkIn = res.checkInDate.slice(0, 10);
    return checkIn === selectedDate;
  });
  const reservationsEndForDay = reservations.filter((res) => {
    const checkOut = res.checkOutDate.slice(0, 10);
    return checkOut === selectedDate;
  });


  const handleRemoveText = () => {
    setReservationText(null);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4">
        <h3 className="text-2xl font-semibold text-[#264653] text-center mb-6">
          {roomName} — {selectedDate}
        </h3>

        {reservationsForDay.length === 0 && reservationsEndForDay.length === 0 ? (
          <p className="text-[#264653] text-center">
            No hay reservas para este día.
          </p>
        ) : (
          <ul className="space-y-4">
            <h2>Ingresos:</h2>
            {reservationsForDay.map((reservation) => (
              <li
                key={reservation.id}
                className="border-b flex flex-col space-y-2"
              >
                <div className="flex justify-between">
                  {/* <p className="text-[#264653] font-medium">
                    <strong>Nombre:</strong> {reservation.passengerType}
                  </p> */}
                  <p className="text-[#264653] font-medium">
                    <strong>Habitación:</strong> {reservation.room.name}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-[#264653]">
                    <strong>Pasajero:</strong>{" "}
                    {reservation.pax.name + ' ' + reservation.pax.lastname}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-[#264653]">
                    <strong>DNI/Pasaporte:</strong>{" "}
                    {reservation.pax.dniPassport}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-[#264653]">
                    <strong>Teléfono/Celular:</strong>
                    {reservation.pax.phone || ''}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-[#264653]">
                    <strong>Saldo pendiente:</strong> $
                    {reservation.balance}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-[#264653]">
                    <strong>Horario de llegada:</strong>
                    {reservation.arrival}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-[#264653]">
                    <strong>Notas:</strong>
                    {reservation.notasAdicionales ? reservation.notasAdicionales[0] : ''}
                  </p>
                </div>
                {reservation.addPaxIds && reservation.addPaxIds.length > 0 && (
                  <div className="flex flex-col">
                    <p className="text-[#264653] font-medium"><strong>Pasajeros adicionales:</strong></p>
                    <ul className="ml-4 list-disc">
                      {reservation.addPaxIds.map((pax) => (
                        <li key={pax.id} className="text-[#264653]">
                          {pax.name} {pax.lastname} - DNI/Pasaporte: {pax.dniPassport}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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
            <h2>Salidas:</h2>
            {reservationsEndForDay.map((reservation) => (
              <li
                key={reservation.id}
                className="border-b flex flex-col space-y-2"
              >
                <div className="flex justify-between">
                  <p className="text-[#264653] font-medium">
                    <strong>Habitación:</strong> {reservation.room.name}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-[#264653]">
                    <strong>Cantidad de pasajeros:</strong>{" "}
                    {reservation.pax.name + ' ' + reservation.pax.lastname}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-[#264653]">
                    <strong>DNI/Pasaporte:</strong>{" "}
                    {reservation.pax.dniPassport}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-[#264653]">
                    <strong>Saldo pendiente:</strong> $
                    {reservation.balance}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-[#264653]">
                    <strong>Notas:</strong>
                    {reservation.notasAdicionales ? reservation.notasAdicionales[0] : ''}
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
