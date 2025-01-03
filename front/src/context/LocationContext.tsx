"use client"
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Definimos la interfaz para el contexto del usuario
interface ILocationContextType {
  userId: string | null;
  location: { id: string; name: string } | null;
  setLocation: (location: { id: string; name: string }) => void;
  clearLocation: () => void;
}

// Crear el contexto inicial
export const LocationContext = createContext<ILocationContextType | undefined>(undefined);

// Proveedor del contexto
export const LocationProvider : React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userId] = useState<string | null>(null); 
  const [location, setLocationState] = useState<{ id: string; name: string } | null>(
    JSON.parse(localStorage.getItem("selectedLocation") || "null")
  );

  const router = useRouter();

  const setLocation = (location: { id: string; name: string }) => {
    setLocationState(location);
    localStorage.setItem("selectedLocation", JSON.stringify(location));
  };

 
    const clearLocation = () => {
      setLocationState(null);
      localStorage.removeItem("selectedLocation");
      router.push("/location");
  };

 
  return (
    <LocationContext.Provider value={{ userId, location, setLocation, clearLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useUserContext debe usarse dentro de un UserProvider");
  }
  return context;
};


