export interface Reservation {
  id: string;
  checkInDate: string;
  checkOutDate: string;
  roomId: number | null;
  passengers: string;
  passengerCount: number;
  passengerType?: string;
  reservationMethod: string;
  breakfastIncluded: boolean;
  totalPrice: number;
  totalPriceUSD: number;
  deposit: number;
  depositUSD: number;
  remainingBalance: number;
  finalized: boolean;
  comments: string;
}

export interface Room {
  id: number;
  roomNumber: string;
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
