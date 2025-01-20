/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Reservation } from "../Interfaces/IReservation";
import { IRoomId } from "../Interfaces/IReservation";
import { roomsData } from "../Data/Data"; // Importar los datos de las habitaciones

interface ReservationContextType {
  reservations: Reservation[];
  rooms: IRoomId[]; // Tipo de rooms como IRoomId[]
  finalizeReservation: (reservation: Reservation) => void;
  removeReservation: (id: string) => void;
  addReservation: (reservation: Reservation) => void;
}

const ReservationContext = createContext<ReservationContextType | undefined>(
  undefined
);

export const useReservationContext = (): ReservationContextType => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error(
      "useReservationContext must be used within a ReservationProvider"
    );
  }
  return context;
};

interface ReservationProviderProps {
  children: ReactNode;
}

export const ReservationProvider: React.FC<ReservationProviderProps> = ({
  children,
}) => {
  const [isClient, setIsClient] = useState(false);

  // Llamar a este efecto solo cuando estemos en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const savedReservations = localStorage.getItem("reservations");
    return savedReservations ? JSON.parse(savedReservations) : [];
  });

  const [rooms, setRooms] = useState<IRoomId[]>(roomsData); // Usar los datos importados directamente

  useEffect(() => {
    const saveReservationsToLocalStorage = (newReservations: Reservation[]) => {
      if (isClient) {
        localStorage.setItem("reservations", JSON.stringify(newReservations));
      }
    };

    if (isClient) {
      saveReservationsToLocalStorage(reservations);
    }
  }, [reservations, isClient]); // No es necesario agregar saveReservationsToLocalStorage como dependencia

  const finalizeReservation = (reservation: Reservation) => {
    const updatedReservations = reservations.map((res) =>
      res.id === reservation.id ? { ...res, finalized: true } : res
    );
    setReservations(updatedReservations);
  };

  const removeReservation = (id: string) => {
    const updatedReservations = reservations.filter((res) => res.id !== id);
    setReservations(updatedReservations);
  };

  const addReservation = (reservation: Reservation) => {
    const updatedReservations = [...reservations, reservation];
    setReservations(updatedReservations);
  };

  return (
    <ReservationContext.Provider
      value={{
        reservations,
        rooms, // Proveer los rooms al contexto
        finalizeReservation,
        removeReservation,
        addReservation,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};
