import { Pax } from "./IPax";
 
export interface Room {
  id: number;
  roomNumber: string;
  name: string;
  description: string;
  capacity: number;
  price: number;
  priceUSD: number;
  breakfastIncluded: boolean;
}

export interface IRoomId {
  id: number;
  roomNumber: string;
}

// app/Interfaces/IReservation.ts

export interface Reservation {
  id: string;
  checkInDate: string;
  checkOutDate: string;
  roomId: string | null;
  name: string;
  passengers: string;
  identification: string;
  notasAdicionales: string[];
  pax: Pax;
  addPaxIds: Pax[];
  room: Room;
  passengerCount: number;
  passengerType?: string;
  reservationMethod: string;
  breakfastIncluded: boolean;
  priceArg: number;
  priceUsd: number;
  depositArg: number;
  depositUsd: number;
  balance: number;
  finalized: boolean;
  comments: string;
  status?: string;
  cancellationReason?: string;
  arrival: string;
}

export interface CreateReservationDto {
  checkIn: boolean; // Indica si el huésped ingresó al hotel
  checkInDate: string; // Fecha de ingreso
  checkOut: boolean; // Indica si el huésped se retiró del hotel
  checkOutDate: string; // Fecha de egreso
  pax: {email: string}; // Información del pasajero
  PaxNum: number; // Número de pasajeros
  paxType: number; // Tipo de pasajero (ej. 1 para adulto, 2 para niño)
  bookingPlatform: string; // Plataforma origen de la reserva (ej. 'Booking.com')
  ubicacion: {name: string}; // Ubicación de la reserva
  roomType: {name: string}; // Tipo de habitación
  breakfast: boolean; // Indica si incluye desayuno
  priceArg: number; // Precio en pesos argentinos
  priceUsd: number; // Precio en dólares
  depositArg: number; // Depósito/seña en pesos argentinos
  depositUsd: number; // Depósito/seña en dólares
  balance: number; // Saldo restante
  completed: boolean; // Indica si la reserva está completada
  notasAdicionales: string[]; // Detalles extra sobre el pax o la reserva
}

export interface RoomWithReservations {
  id: string;
  name: string;
  reservations: Reservation[];
}

