import { IProduct } from "@/Interfaces/IUser";
import { Tipo } from "@/Interfaces/IUser";

// Mock data
export const mockProducts: IProduct[] = [
  {
    id: "1",
    tipo: Tipo.Consumible,
    nombre: "Coca Cola",
    Activo: true,
    foto: "https://res.cloudinary.com/dju6fgtcl/image/upload/v1731159595/coca_jxbl5e.jpg",
    ubicacion: { name: "Hotel Villa Rosarito" },
  },
  {
    id: "2",
    tipo: Tipo.Servicio,
    nombre: "Masaje Relajante",
    Activo: true,
    foto: "https://res.cloudinary.com/dju6fgtcl/image/upload/v1731159595/masajes_zifexe.jpg",
    ubicacion: { name: "Spa Del Sol" },
  },
  {
    id: "3",
    tipo: Tipo.Consumible,
    nombre: "Papas Lays",
    Activo: true,
    foto: "https://res.cloudinary.com/dju6fgtcl/image/upload/v1731159595/papas_xhkuit.jpg",
    ubicacion: { name: "Hotel Villa Rosarito" },
  },
];

  