"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Reservation, Room } from "../Interfaces/IReservation";

interface ReservationContextProps {
  reservations: Reservation[];
  rooms: Room[];
  addReservation: (reservation: Reservation) => void;
  finalizeReservation: (reservation: Reservation) => void;
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
  // Estado para verificar si estamos en el cliente
  const [isClient, setIsClient] = useState(false);

  // Inicializar el estado de las reservas y habitaciones solo después de que el cliente se haya montado
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

  // Cargar datos desde localStorage solo en el cliente
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

  // Guardar en localStorage cuando las reservas cambian
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

  return (
    <ReservationContext.Provider
      value={{ reservations, rooms, addReservation, finalizeReservation }}
    >
      {children}
    </ReservationContext.Provider>
  );
};
