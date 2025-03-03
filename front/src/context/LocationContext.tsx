"use client";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState, useEffect } from "react";

// Definimos la interfaz para el contexto del usuario
interface ILocationContextType {
  userId: string | null;
  location: { id: string; name: string } | null;
  setLocation: (location: { id: string; name: string }) => void;
  clearLocation: () => void;
}

// Crear el contexto inicial
export const LocationContext = createContext<ILocationContextType | undefined>(
  undefined
);

// Proveedor del contexto
export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userId] = useState<string | null>(null);
  const [location, setLocationState] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isClient, setIsClient] = useState(false); // Estado para verificar si estamos en el cliente

  const router = useRouter();

  // Asegurarse de que useEffect se ejecute solo en el cliente
  useEffect(() => {
    setIsClient(true);
    const savedLocation = localStorage.getItem("selectedLocation");
    if (savedLocation) {
      setLocationState(JSON.parse(savedLocation));
    }
  }, []); // Este efecto solo se ejecutará una vez, en el cliente

  const setLocation = (location: { id: string; name: string }) => {
    if (isClient) {
      // Solo actualizar el localStorage en el cliente
      setLocationState(location);
      localStorage.setItem("selectedLocation", JSON.stringify(location));
    }
  };

  const clearLocation = () => {
    if (isClient) {
      setLocationState(null);
      localStorage.removeItem("selectedLocation");
      router.push("/location");
    }
  };

  return (
    <LocationContext.Provider
      value={{ userId, location, setLocation, clearLocation }}
    >
      {children}
    </LocationContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error(
      "useLocationContext debe usarse dentro de un LocationProvider"
    );
  }
  return context;
};
