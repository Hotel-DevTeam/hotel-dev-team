import { ICaja, ICloseCaja, ICreateCaja } from "@/Interfaces/ICaja";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchFindBoxBy = async (): Promise<ICaja[]> => {
    try {
      const response = await fetch(`${apiUrl}/caja`);
      if (!response.ok) {
        throw new Error('Error al obtener las cajas.');
      }
      const data: ICaja[] = await response.json();
      return data;
    }  catch (err) {
        console.error('Error:', err);
        throw new Error('Ocurrió un error inesperado.');
      }
      
  };
  
  export const fetchFindBoxById = async (id: string): Promise<ICaja> => {
    try {
      const response = await fetch(`${apiUrl}/caja/${id}`);
      if (!response.ok) {
        throw new Error('Caja no encontrada.');
      }
      const data: ICaja = await response.json();
      return data;
    } catch (err) {
      console.error('Error:', err);
      throw new Error('Ocurrió un error inesperado.');
    }
    
  };


export const fetchCreateCaja = async (caja: ICreateCaja) => {
  try {
    const response = await fetch(`${apiUrl}/caja`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(caja),
    });
    return response.json();
  } catch (error) {
    console.error("Error al crear la caja:", error);
    throw error;
  }
};

//Actualizar caja
export const fetchUpdateCaja = async (id: string, caja: ICloseCaja) => {
  try {
    const response = await fetch(`${apiUrl}/caja/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(caja),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar caja.');
    }

    return response.json();
  } catch (error) {
    console.error("Error al actualizar la caja:", error);
    throw error;
  }
};
