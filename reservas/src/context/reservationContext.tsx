"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Reservation, Room } from "../interfaces/interfaces";

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
    // Cargar reservas desde localStorage al iniciar
    const savedReservations = localStorage.getItem("reservations");
    return savedReservations ? JSON.parse(savedReservations) : [];
  });

  const addReservation = (reservation: Reservation) => {
    const newReservations = [...reservations, reservation];
    setReservations(newReservations);
    localStorage.setItem("reservations", JSON.stringify(newReservations)); // Guardar en localStorage
  };

  const removeReservation = (index: number) => {
    const newReservations = reservations.filter((_, i) => i !== index);
    setReservations(newReservations);
    localStorage.setItem("reservations", JSON.stringify(newReservations)); // Guardar en localStorage
  };

  const finalizeReservation = (reservation: Reservation) => {
    const newReservations = reservations.map((res) =>
      res === reservation ? { ...res, finalized: true } : res
    );
    setReservations(newReservations);
    localStorage.setItem("reservations", JSON.stringify(newReservations)); // Guardar en localStorage
  };

  useEffect(() => {
    // Sincronizar reservas con localStorage
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
