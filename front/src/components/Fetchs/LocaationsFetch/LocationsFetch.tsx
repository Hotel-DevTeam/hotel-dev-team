import { ILocation } from "@/Interfaces/IUser";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//Ver rooms

export const fetchGetLocation = async (locationId: string, token: string): Promise<ILocation[]> => {
    try {
      const response = await fetch(`${apiUrl}/location/${locationId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        throw new Error("Error al obtener las habitaciones");
      }
      
      const data: ILocation[] = await response.json(); 
      return data;
    } catch (error) {
      console.error("Error fetching rooms:", error);
      throw error;
    }
  };