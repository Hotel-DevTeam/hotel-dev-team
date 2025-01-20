import { ISalesOrder, ISalesOrderLine } from "@/Interfaces/IMovements";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const createSalesOrder = async (data: ISalesOrder) => {
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

export const createSalesOrderLine = async (data: ISalesOrderLine) => {
  const response = await fetch(`${apiUrl}/salesOrderLines`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(
      "Error al crear la línea de detalle. Por favor, verifica los datos."
    );
  }

  return response.json();
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

