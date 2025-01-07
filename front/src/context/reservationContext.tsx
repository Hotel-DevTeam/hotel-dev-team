"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Reservation } from "../Interfaces/IReservation";
import { roomsData } from "../Data/Data";

interface ReservationContextProps {
  reservations: Reservation[];
  rooms: { id: number; roomNumber: string }[];
  addReservation: (reservation: Reservation) => void;
  finalizeReservation: (reservation: Reservation) => void;
  removeReservation: (id: string) => void;
}

interface ReservationProviderProps {
  children: React.ReactNode;
}

const ReservationContext = createContext<ReservationContextProps | undefined>(
  undefined
);
console.log(roomsData);

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
  const [isClient, setIsClient] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [rooms, setRooms] = useState(roomsData); // Usamos los datos importados

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const savedReservations = localStorage.getItem("reservations");
      const savedRooms = localStorage.getItem("rooms");

      if (savedReservations) {
        setReservations(JSON.parse(savedReservations));
      }

      if (savedRooms) {
        setRooms(JSON.parse(savedRooms));
      }
    }
  }, [isClient]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("reservations", JSON.stringify(reservations));
      localStorage.setItem("rooms", JSON.stringify(rooms));
    }
  }, [reservations, rooms, isClient]);

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
        removeReservation, // Exponemos la función para eliminar reservas
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
  
};
