export interface User {
  id: number;
  firstName: string;
  lastName: string;
  role: "empleado" | "encargado";
}

export interface Product {
  id: number;
  nombre: string;
  price: number; 
  category: "bebidas" | "alimentos" | "servicio";
}

export interface Room {
  id: number;
  roomNumber: string;
  type: "individual" | "doble" | "suite";
}

export interface Order {
  productId: string;  
  quantity: number;   
  unitPrice: number;
  orderId: string;   
}


export interface OrderItem {
  product: Product;
  quantity: number;
  price:string;
}