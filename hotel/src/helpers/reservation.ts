interface Reservation {
  checkIn: Date;
  checkOut: Date;
  roomId: string;
  passengers: string;
  passengerCount: number;
  passengerType: string;
  bookingSource: string;
  breakfastIncluded: boolean;
  totalPrice: number;
  totalPriceUSD: number;
  deposit: number;
  depositUSD: number;
  remainingBalance: number;
  completed: boolean;
}

const generateReservations = (count: number): Reservation[] => {
  const reservations: Reservation[] = [];

  for (let i = 0; i < count; i++) {
    const reservation: Reservation = {
      checkIn: new Date(Date.now() + Math.random() * 10000000000),
      checkOut: new Date(Date.now() + Math.random() * 10000000000 + 86400000),
      roomId: `room-${i + 1}`,
      passengers: `Passenger ${i + 1}`,
      passengerCount: Math.floor(Math.random() * 5) + 1,
      passengerType: Math.random() > 0.5 ? "Adult" : "Child",
      bookingSource: "Website",
      breakfastIncluded: Math.random() > 0.5,
      totalPrice: Math.random() * 1000,
      totalPriceUSD: Math.random() * 1000,
      deposit: Math.random() * 500,
      depositUSD: Math.random() * 500,
      remainingBalance: Math.random() * 500,
      completed: Math.random() > 0.5,
    };
    reservations.push(reservation);
  }

  return reservations;
};

const filterReservations = (
  reservations: Reservation[],
  completed: boolean
): Reservation[] => {
  return reservations.filter(
    (reservation) => reservation.completed === completed
  );
};

export { generateReservations, filterReservations };
