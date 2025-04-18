/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useReservationContext } from "@/context/reservationContext";
import { Reservation } from "../../Interfaces/IReservation";
import { fetchGetReservtions } from "../Fetchs/ReservationsFetch/IReservationsFetch";

interface ReservationModalProps {
  selectedDate: string;
  closeModal: () => void;
}

const ReservationModal: React.FC<ReservationModalProps> = ({
  selectedDate,
  closeModal,
}) => {
  // const { reservations } = useReservationContext();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [reservationText, setReservationText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [savedLocation, setSavedLocation] = useState<string>('')


  useEffect(() => {
    const selectedLocation = localStorage.getItem("selectedLocation");
    const locationId = selectedLocation ? JSON.parse(selectedLocation).id : null;
    if (locationId) {
      setSavedLocation(locationId);
    } else {
      setError("No hay ubicación seleccionada");
    }
  }, []);


  useEffect(() => {
    const loadOrders = async () => {
      if (!savedLocation) return;

      try {
        const data = await fetchGetReservtions(savedLocation);
        setReservations(data.reservations);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Error desconocido");
      }
    };

    loadOrders();
  }, [savedLocation]);

  const reservationsForDay = reservations.filter((res) => {
    const checkIn = res.checkInDate.slice(0, 10);
    return checkIn === selectedDate;
  });
  const reservationsEndForDay = reservations.filter((res) => {
    console.log(reservations)
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
          Reservas para {selectedDate}
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
