import { ISalesOrder, ISalesOrderLine } from "@/Interfaces/IMovements";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const createSalesOrder = async (data: Partial<ISalesOrder>): Promise<ISalesOrder> => {
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

export const createSalesOrderLine = async (data: Partial<ISalesOrderLine>): Promise<ISalesOrderLine> => {
  const response = await fetch(`${apiUrl}/salesOrderlines`, {
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

