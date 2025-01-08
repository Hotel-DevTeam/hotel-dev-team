import { ICreateMovement } from "@/Interfaces/IMovements";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const crearMovimiento = async (movimiento: ICreateMovement) => {
   
      try {
      const response = await fetch(`${apiUrl}/movimientos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movimiento),
      });
  
      if (!response.ok) {
        throw new Error('Error al crear el movimiento');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
// Ver movimientos
export const fetchCashMovements = async () => {
  const response = await fetch(`${apiUrl}/movimientos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener los movimientos");
  }

  return await response.json();
};
