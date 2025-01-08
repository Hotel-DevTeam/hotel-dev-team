"use client";

import { useState, useEffect } from "react";
import { useReservationContext } from "@/context/reservationContext";
import Swal from "sweetalert2";
import { Reservation } from "../../Interfaces/IReservation";

const CreateReservation: React.FC = () => {
  const { addReservation, rooms } = useReservationContext();
  const [checkInDate, setCheckInDate] = useState<string>("");
  const [checkOutDate, setCheckOutDate] = useState<string>("");
  const [roomId, setRoomId] = useState<number | null>(null);
  const [adultCount, setAdultCount] = useState<number>(1);
  const [childCount, setChildCount] = useState<number>(0);
  const [passengerType, setPassengerType] = useState<string>("adulto");
  const [reservationMethod, setReservationMethod] = useState<string>("");
  const [breakfast, setBreakfast] = useState<boolean>(false);
  const [deposit, setDeposit] = useState<number>(0);
  const [remainingBalance, setRemainingBalance] = useState<number>(0);
  const [comments, setComments] = useState<string>("");

  // Para almacenar el tipo de cambio del dólar
  const [dollarRate, setDollarRate] = useState<number>(0);

  // Definir variables para el total
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalPriceUSD, setTotalPriceUSD] = useState<number>(0);

  // Obtener el tipo de cambio desde el backend
  useEffect(() => {
    const fetchDollarRate = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/exchange-rate/Dollar"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Respuesta completa de la API:", data); // Ver toda la respuesta

        // Verifica si 'cotizaciones' existe y es un array
        if (
          data &&
          data.cotizaciones &&
          Array.isArray(data.cotizaciones) &&
          data.cotizaciones.length > 0
        ) {
          const dollarValue = data.cotizaciones[0]?.venta;
          console.log("Valor del dólar:", dollarValue); // Verificamos el valor del dólar

          if (dollarValue && !isNaN(dollarValue) && dollarValue > 0) {
            setDollarRate(dollarValue); // Si es válido, lo asignamos
          } else {
            throw new Error(
              "Tipo de cambio inválido (valor no mayor a 0 o no es un número válido)"
            );
          }
        } else {
          console.log(
            "No se encontraron cotizaciones válidas en la respuesta."
          );
          throw new Error("No se encontraron cotizaciones válidas");
        }
      } catch (error) {
        console.error("Error fetching dollar rate:", error);
        Swal.fire({
          title: "Error",
          text: "No se pudo obtener el tipo de cambio. Intenta nuevamente más tarde.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    };

    fetchDollarRate();
  }, []);

  useEffect(() => {
    console.log("Total Price:", totalPrice); // Log de totalPrice
    console.log("Deposit:", deposit); // Log de deposit
    // Validamos que el tipo de cambio sea un número válido y mayor a 0
    if (dollarRate > 0) {
      const calculatedRemainingBalance = totalPrice - deposit;
      setRemainingBalance(calculatedRemainingBalance);

      // Convertir a dólares solo si el tipo de cambio es válido
      const calculatedTotalPriceUSD = totalPrice / dollarRate;
      setTotalPriceUSD(calculatedTotalPriceUSD);
    } else {
      setRemainingBalance(0);
      setTotalPriceUSD(0); // Si no se ha obtenido un tipo de cambio válido, asignar 0
    }
  }, [totalPrice, deposit, dollarRate]);

  // Calcular el precio total y el saldo pendiente
  useEffect(() => {
    console.log("Recalculating remaining balance and USD total...");
    const calculatedRemainingBalance = totalPrice - deposit;
    setRemainingBalance(calculatedRemainingBalance);

    // Convertir a Dólares
    const calculatedTotalPriceUSD = totalPrice / dollarRate;
    setTotalPriceUSD(calculatedTotalPriceUSD);
  }, [totalPrice, deposit, dollarRate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newReservation: Reservation = {
      id: new Date().toISOString(),
      checkInDate,
      checkOutDate,
      roomId,
      passengers: `Adultos: ${adultCount}, Niños: ${childCount}`,
      passengerCount: adultCount + childCount,
      passengerType,
      reservationMethod,
      breakfastIncluded: breakfast,
      totalPrice, // Precio en Pesos
      totalPriceUSD, // Precio en Dólares
      deposit,
      depositUSD: deposit / 100,
      remainingBalance,
      finalized: false,
      comments,
    };

    console.log("New Reservation Data:", newReservation); // Log de la reserva antes de agregarla

    addReservation(newReservation);

    Swal.fire({
      title: "Reserva creada",
      text: "La reserva se ha realizado con éxito.",
      icon: "success",
      confirmButtonColor: "#FF5100",
      confirmButtonText: "Aceptar",
    });

    // Limpiar los campos del formulario
    setCheckInDate("");
    setCheckOutDate("");
    setRoomId(null);
    setAdultCount(1);
    setChildCount(0);
    setPassengerType("adulto");
    setReservationMethod("");
    setBreakfast(false);
    setDeposit(0);
    setRemainingBalance(0);
    setComments("");
    setTotalPrice(0);
    setTotalPriceUSD(0);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-6xl mx-auto mt-20 bg-white shadow-lg rounded-lg px-8 py-6 space-y-6"
    >
      <h2 className="text-2xl font-semibold text-[#264653] mb-6 text-center">
        Crear Reserva
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Habitación */}
        <div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            Habitación:
          </label>
          <select
            value={roomId ?? ""}
            onChange={(e) => setRoomId(Number(e.target.value))}
            className="border border-[#CD9C8A] rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#FF5100]"
            required
          >
            <option value="">Seleccione una habitación</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.roomNumber}
              </option>
            ))}
          </select>
        </div>

        {/* Fecha de check-in */}
        <div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            Check-in:
          </label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            required
            className="border border-[#CD9C8A] rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#FF5100]"
          />
        </div>

        {/* Fecha de check-out */}
        <div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            Check-out:
          </label>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            required
            className="border border-[#CD9C8A] rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#FF5100]"
          />
        </div>

        {/* Adultos */}
        <div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            Adultos:
          </label>
          <input
            type="number"
            value={adultCount}
            onChange={(e) => setAdultCount(Number(e.target.value))}
            min={1}
            className="border border-[#CD9C8A] rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#FF5100]"
          />
        </div>

        {/* Niños */}
        <div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            Niños:
          </label>
          <input
            type="number"
            value={childCount}
            onChange={(e) => setChildCount(Number(e.target.value))}
            min={0}
            className="border border-[#CD9C8A] rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#FF5100]"
          />
        </div>

        {/* Precio Total en Pesos */}
        <div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            Precio Total:
          </label>
          <input
            type="number"
            value={totalPrice}
            onChange={(e) => setTotalPrice(Number(e.target.value))}
            className="border border-[#CD9C8A] rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#FF5100]"
          />
        </div>

        {/* Depósito en Pesos */}
        <div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            Depósito:
          </label>
          <input
            type="number"
            value={deposit}
            onChange={(e) => setDeposit(Number(e.target.value))}
            className="border border-[#CD9C8A] rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#FF5100]"
          />
        </div>

        {/* Saldo Pendiente */}
        <div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            Saldo Pendiente:
          </label>
          <input
            type="text"
            value={`$${remainingBalance.toLocaleString()}`}
            readOnly
            className="border border-[#CD9C8A] rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#FF5100]"
          />
        </div>

        {/* Precio en Dólares */}
        <div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            Precio Total en Dólares:
          </label>
          <input
            type="text"
            value={`$${totalPriceUSD.toFixed(2)}`}
            readOnly
            className="border border-[#CD9C8A] rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#FF5100]"
          />
        </div>
      </div>

      {/* Desayuno */}
      <div>
        <label className="block text-sm font-medium text-[#264653] mb-1">
          Desayuno incluido:
        </label>
        <input
          type="checkbox"
          checked={breakfast}
          onChange={() => setBreakfast(!breakfast)}
          className="focus:ring-2 focus:ring-[#FF5100]"
        />
      </div>

      {/* Comentarios */}
      <div>
        <label className="block text-sm font-medium text-[#264653] mb-1">
          Comentarios:
        </label>
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          className="border border-[#CD9C8A] rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#FF5100]"
        ></textarea>
      </div>

      <div className="flex justify-center mt-4">
        <button
          type="submit"
          className="bg-[#FF5100] text-white py-2 px-6 rounded-lg shadow-md hover:bg-[#FF3A00] focus:outline-none focus:ring-2 focus:ring-[#FF5100]"
        >
          Crear Reserva
        </button>
      </div>
    </form>
  );
};

export default CreateReservation;
