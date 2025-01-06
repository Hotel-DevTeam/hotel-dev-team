

"use client";

import { createContext, useContext, useState, ReactNode } from "react"; // Agregar ReactNode
import { IRoomId } from "../Interfaces/IReservation";
import { Reservation } from "../Interfaces/IReservation";
import { roomsData } from "../Data/Data";

interface ReservationContextProps {
  reservations: Reservation[];
  rooms: IRoomId[];
  addReservation: (reservation: Reservation) => void;
  finalizeReservation: (reservation: Reservation) => void;
  removeReservation: (id: string) => void;
}

interface ReservationProviderProps {
  children: ReactNode; // Agregar children aquí
}

const ReservationContext = createContext<ReservationContextProps | undefined>(
  undefined
);

export const useReservationContext = (): ReservationContextProps => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error(
      "useReservationContext must be used within a ReservationProvider"
    );
  }
  return context;
};

export const ReservationProvider: React.FC<ReservationProviderProps> = ({
  children,
}) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [rooms, setRooms] = useState<IRoomId[]>(roomsData);

  const addReservation = (reservation: Reservation) => {
    setReservations((prevReservations) => [...prevReservations, reservation]);
  };

  const finalizeReservation = (reservation: Reservation) => {
    setReservations((prevReservations) =>
      prevReservations.map((r) =>
        r.id === reservation.id ? { ...r, finalized: true } : r
      )
    );
  };

  const removeReservation = (id: string) => {
    setReservations((prevReservations) =>
      prevReservations.filter((reservation) => reservation.id !== id)
    );
  };

  return (
    <ReservationContext.Provider
      value={{
        reservations,
        rooms,
        addReservation,
        finalizeReservation,
        removeReservation,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};
