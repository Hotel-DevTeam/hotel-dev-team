import { Room } from "../Interfaces/IReservation";

export const rooms: Room[] = [
  {
    id: 1,
    roomNumber: "101",
    description: "Habitación estándar con cama doble.",
    capacity: 2,
    price: 100, 
    priceUSD: 20,
    breakfastIncluded: false,
  },
  {
    id: 2,
    roomNumber: "102",
    description: "Habitación familiar con dos camas dobles.",
    capacity: 4,
    price: 150,
    priceUSD: 30,
    breakfastIncluded: true,
  },
  {
    id: 3,
    roomNumber: "103",
    description: "Suite de lujo con vista al mar.",
    capacity: 2,
    price: 250,
    priceUSD: 50,
    breakfastIncluded: true,
  },
  {
    id: 4,
    roomNumber: "104",
    description: "Habitación económica para una persona.",
    capacity: 1,
    price: 80,
    priceUSD: 15,
    breakfastIncluded: false,
  },
  {
    id: 5,
    roomNumber: "105",
    description: "Habitación deluxe con jacuzzi.",
    capacity: 2,
    price: 300,
    priceUSD: 60,
    breakfastIncluded: true,
  },
];
