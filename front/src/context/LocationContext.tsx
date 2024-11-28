"use client"
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define la interfaz para el contexto de Location
interface LocationContextType {
  locationId: string | null;
  setLocationId: (id: string) => void;
}

// Crear el contexto
const LocationContext = createContext<LocationContextType | undefined>(undefined);

// Crear el proveedor de contexto
export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locationId, setLocationId] = useState<string | null>(null);

  return (
    <LocationContext.Provider value={{ locationId, setLocationId }}>
      {children}
    </LocationContext.Provider>
  );
};

// Hook para usar el contexto de Location
export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation debe ser usado dentro de un LocationProvider");
  }
  return context;
};
