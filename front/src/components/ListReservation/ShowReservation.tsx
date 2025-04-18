/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Reservation } from "../../Interfaces/IReservation";
import { fetchGetReservtionById } from "../Fetchs/ReservationsFetch/IReservationsFetch";

interface ShowReservationModalProps {
  selectedReservation: string;
  closeModal: () => void;
}

const ShowReservationModal: React.FC<ShowReservationModalProps> = ({
  selectedReservation,
  closeModal,
}) => {
  // const { reservations } = useReservationContext();
  const [reservation, setReservation] = useState<Reservation>();
  const [reservationText, setReservationText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchGetReservtionById(selectedReservation);
        setReservation(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Error desconocido");
      }
    };

    loadOrders();
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4">
    {!reservation ? (
        <p className="text-[#264653] text-center">
          No hay reservas para este día.
        </p>
      ) : (
        <ul className="space-y-4">
            <li
              // key={reservation.id}
              className="border-b flex flex-col space-y-2"
            >
              <div className="flex justify-between">
                {/* <p className="text-[#264653] font-medium">
                  <strong>Nombre:</strong> {reservation.passengerType}
                </p> */}
                <p className="text-[#264653] font-medium">
                 <strong>Habitación:</strong> {reservation.room.name
                    }
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[#264653]">
                  <strong>Pasajero:</strong>{" "}
                  {reservation.pax.name + ' ' + reservation.pax.lastname
                    }
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[#264653]">
                  <strong>DNI/Pasaporte:</strong>{" "}
                  {reservation.pax.dniPassport
                    }
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[#264653]">
                  <strong>Teléfono/Celular:</strong>{" "}
                  {reservation.pax.phone
                    }
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[#264653]">
                  <strong>Saldo pendiente:</strong> $
                  {reservation.balance
                    }
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[#264653]">
                  <strong>Horario de llegada: </strong>
                  {reservation.arrival
                    }
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[#264653]">
                  <strong>Notas: </strong>
                  {reservation.notasAdicionales ? reservation.notasAdicionales[0] : ''
                    }
                </p>
              </div>
            </li>
          
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

export default ShowReservationModal;
