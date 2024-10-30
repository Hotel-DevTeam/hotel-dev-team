export interface User {
  id: number;
  firstName: string;
  lastName: string;
  role: "empleado" | "encargado";
}

export interface Product {
  id: number;
  name: string;
  price: number; 
  category: "bebidas" | "alimentos" | "servicio";
}

export interface Room {
  id: number;
  roomNumber: string;
  type: "individual" | "doble" | "suite";
}

export interface Order {
  product: Product;
  quantity: number;
  user: string;
  roomNumber: string;
  date: string;
}