"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Reservation, Room } from "../Interfaces/IReservation";

interface ReservationContextProps {
  reservations: Reservation[];
  rooms: Room[];
  addReservation: (reservation: Reservation) => void;
  finalizeReservation: (reservation: Reservation) => void;
  removeReservation: (id: number) => void; // Agregamos la función para eliminar reservas
}

interface ReservationProviderProps {
  children: React.ReactNode;
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
  const [isClient, setIsClient] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: 1,
      roomNumber: "101",
      description: "Habitación estándar",
      price: 100,
      capacity: 2,
      priceUSD: 100,
      breakfastIncluded: true,
    },
    {
      id: 2,
      roomNumber: "102",
      description: "Habitación deluxe",
      price: 150,
      capacity: 2,
      priceUSD: 150,
      breakfastIncluded: false,
    },
  ]);

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

  const removeReservation = (id: number) => {
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
        removeReservation, // Exponemos la nueva función
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};
