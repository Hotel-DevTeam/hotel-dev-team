export const fetchDollarRate = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${apiUrl}/exchange-rate/dollar`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al obtener el tipo de cambio");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
