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
import { IRoom } from '@/Interfaces/IUser';
// import { roomsData } from "../Data/Data"; // Importar los datos de las habitaciones
import { fetchGetRooms } from '../components/Fetchs/RoomsFetch/RoomsFetch';
import { UserContext } from '@/context/UserContext';
import { useLocationContext } from '@/context/LocationContext';
import Swal from "sweetalert2"; // Importar SweetAlert2 para el modal

interface ReservationContextType {
  reservations: Reservation[];
  rooms: IRoom[]; // Tipo de rooms como IRoomId
  addReservation: (newReservation: Reservation) => void;
  removeReservation: (id: string) => void;
  finalizeReservation: (reservation: Reservation) => void;
  cancelReservation: (id: string, description: string) => void;
  updatePrice: (id: string, newPrice: number) => void;
}

const ReservationContext = createContext<ReservationContextType | undefined>(
  undefined
);

export const ReservationProvider = ({ children }: { children: ReactNode }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  // const [rooms, setRooms] = useState<IRoomId[]>([]);
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const { token } = useContext(UserContext);
  const { location } = useLocationContext();

  useEffect(() => {
    // Cargar reservas del localStorage al iniciar
    const savedReservations = localStorage.getItem("reservations");
    if (savedReservations) {
      setReservations(JSON.parse(savedReservations));
    }
  }, []);

  useEffect(() => {
        const loadRooms = async () => {
          try {
            if (location) {
              if (!token) return;
              const roomsData = await fetchGetRooms(location.id, token);  
              setRooms(roomsData);
            } else {
              console.error("No location selected");
            }
          } catch (error) {
            console.error("Error al obtener las habitaciones:", error);
          }
        };
    
        loadRooms();
      }, [location]);

  useEffect(() => {
    // Guardar reservas en localStorage cada vez que cambian
    localStorage.setItem("reservations", JSON.stringify(reservations));
  }, [reservations]);

  const addReservation = (newReservation: Reservation) => {
    setReservations((prev) => [...prev, newReservation]);
  };

  const removeReservation = (id: string) => {
    setReservations((prev) =>
      prev.filter((reservation) => reservation.id !== id)
    );
  };

  const finalizeReservation = (reservation: Reservation) => {
    setReservations((prev) =>
      prev.map((res) =>
        res.id === reservation.id ? { ...res, status: "finalizada" } : res
      )
    );
  };

  const cancelReservation = (id: string, description: string) => {
    setReservations((prev) =>
      prev.map((res) =>
        res.id === id
          ? { ...res, status: "cancelada", cancelDescription: description }
          : res
      )
    );
  };

  const updatePrice = (id: string, newPrice: number) => {
    setReservations((prev) =>
      prev.map((res) =>
        res.id === id ? { ...res, totalPrice: newPrice } : res
      )
    );
  };

  return (
    <ReservationContext.Provider
      value={{
        reservations,
        rooms,
        addReservation,
        removeReservation,
        finalizeReservation,
        cancelReservation,
        updatePrice,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservationContext = (): ReservationContextType => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error(
      "useReservationContext must be used within a ReservationProvider"
    );
  }
  return context;
};
