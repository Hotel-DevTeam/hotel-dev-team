import { User, Product, Room } from "../Interfaces/interfaces";

export const users: User[] = [
  { id: 1, firstName: "Juan", lastName: "Pérez", role: "empleado" },
  { id: 2, firstName: "Ana", lastName: "Gómez", role: "empleado" },
  { id: 3, firstName: "Carlos", lastName: "Martínez", role: "encargado" },
];

export const products: Product[] = [
  { id: 1, name: "Botella de Agua", price: 500, category: "bebidas" },
  { id: 2, name: "Hamburguesa", price: 1500, category: "alimentos" },
  { id: 3, name: "Servicio de Spa", price: 3000, category: "servicio" },
];

export const rooms: Room[] = [
  { id: 1, roomNumber: "101", type: "individual" },
  { id: 2, roomNumber: "202", type: "doble" },
  { id: 3, roomNumber: "303", type: "suite" },
];

////////////////////////

