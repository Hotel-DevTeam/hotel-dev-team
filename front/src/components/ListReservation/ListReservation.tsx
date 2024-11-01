"use client";

import { useReservationContext } from "../../../../reservas/src/context/reservationContext";
import { Reservation } from "../../Interfaces/IReservation";

const ListReservation: React.FC = () => {
  const { reservations, finalizeReservation } = useReservationContext();

  return (
    <div className="bg-white shadow-md rounded px-8 py-6 mb-4">
      <h2 className="text-lg font-semibold mb-4">Reservas</h2>
      {reservations.length === 0 ? (
        <p>No hay reservas registradas.</p>
      ) : (
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">Check-in</th>
              <th className="border px-4 py-2">Check-out</th>
              <th className="border px-4 py-2">Habitación</th>
              <th className="border px-4 py-2">Pasajeros</th>
              <th className="border px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation: Reservation) => (
              <tr key={reservation.id}>
                <td className="border px-4 py-2">{reservation.checkInDate}</td>
                <td className="border px-4 py-2">{reservation.checkOutDate}</td>
                <td className="border px-4 py-2">{reservation.roomId}</td>
                <td className="border px-4 py-2">
                  {reservation.passengerCount}
                </td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                    onClick={() => finalizeReservation(reservation)}
                  >
                    Marcar como finalizada
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListReservation;
