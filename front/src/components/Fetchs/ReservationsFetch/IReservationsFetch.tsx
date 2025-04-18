import { CreateReservationDto } from "@/Interfaces/IReservation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const CreateReservation = async (data: CreateReservationDto) => {
  const response = await fetch(`${apiUrl}/reservations`, {
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


export const CancelReservation = async (reservationId: string) => {
  const response = await fetch(`${apiUrl}/reservations/${reservationId}/cancel`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    }
  });

  if (!response.ok) {
    throw new Error(
      "Error al cancelar reserva."
    );
  }

  return true; 
};

export const CompleteReservation = async (reservationId: string) => {
  const response = await fetch(`${apiUrl}/reservations/${reservationId}/complete`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    }
  });

  if (!response.ok) {
    throw new Error(
      "Error al finalizar reserva."
    );
  }

  return true; 
};


export const fetchGetReservtions = async (locationId: string) => {
  const response = await fetch(`${apiUrl}/reservations?page=1&limit=50000${locationId ? '&locationId=' + locationId : '&locationId=""'}`, {
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

export const fetchGetReservtionById = async (reservationId: string) => {
  const response = await fetch(`${apiUrl}/reservations/${reservationId}`, {
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

export const fetchGetReservtionsByRoom = async (locationId: string) => {
  const response = await fetch(`${apiUrl}/reservations/byRoom?locationId=${locationId}`, {
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

