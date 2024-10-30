"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Reservation, Room } from "../Interfaces/IReservation";

interface ReservationContextType {
  reservations: Reservation[];
  rooms: Room[];
  addReservation: (reservation: Reservation) => void;
  removeReservation: (index: number) => void;
  finalizeReservation: (reservation: Reservation) => void;
}

const ReservationContext = createContext<ReservationContextType | undefined>(
  undefined
);

export const ReservationProvider: React.FC<{
  children: React.ReactNode;
  rooms: Room[];
}> = ({ children, rooms }) => {
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const savedReservations = localStorage.getItem("reservations");
    return savedReservations ? JSON.parse(savedReservations) : [];
  });

  const addReservation = (reservation: Reservation) => {
    const newReservations = [...reservations, reservation];
    setReservations(newReservations);
    localStorage.setItem("reservations", JSON.stringify(newReservations));
  };

  const removeReservation = (index: number) => {
    const newReservations = reservations.filter((_, i) => i !== index);
    setReservations(newReservations);
    localStorage.setItem("reservations", JSON.stringify(newReservations));
  };

  const finalizeReservation = (reservation: Reservation) => {
    const newReservations = reservations.map((res) =>
      res.id === reservation.id ? { ...res, finalized: true } : res
    );
    setReservations(newReservations);
    localStorage.setItem("reservations", JSON.stringify(newReservations));
  };

  useEffect(() => {
    localStorage.setItem("reservations", JSON.stringify(reservations));
  }, [reservations]);

  return (
    <ReservationContext.Provider
      value={{
        reservations,
        rooms,
        addReservation,
        removeReservation,
        finalizeReservation,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservationContext = () => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error(
      "useReservationContext must be used within a ReservationProvider"
    );
  }
  return context;
};
