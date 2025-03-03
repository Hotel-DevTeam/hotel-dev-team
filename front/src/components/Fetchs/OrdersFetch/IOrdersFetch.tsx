import { ISalesOrderLines } from "@/Interfaces/IOrders";
import { ISalesOrders } from "@/Interfaces/IOrders";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const createSalesOrder = async (data: ISalesOrders) => {
  const response = await fetch(`${apiUrl}/salesOrders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), 
  });

  if (!response.ok) {
    throw new Error(
      "Error al crear la orden de venta. Por favor, verifica los datos."
    );
  }

  return response.json(); 
};
export const createSalesOrderLine = async (data: ISalesOrderLines) => {
  console.log("Datos que se envían al backend:", JSON.stringify(data)); 
  try {
    const response = await fetch(`${apiUrl}/salesOrderLines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Error en la respuesta del backend:", result);
      throw new Error("Error al crear la línea de detalle.");
    }

    console.log("Respuesta del backend:", result);
    return result;
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
    throw error;
  }
};


export const fetchGetOrders = async () => {
  const response = await fetch(`${apiUrl}/salesOrders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener las órdenes");
  }

  return await response.json();
};

