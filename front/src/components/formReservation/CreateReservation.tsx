/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import Swal from "sweetalert2"; // Importa SweetAlert2
import { useReservationContext } from "@/context/reservationContext";
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
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalPriceUSD, setTotalPriceUSD] = useState<number>(0);
  const [deposit, setDeposit] = useState<number>(0);
  const [depositUSD, setDepositUSD] = useState<number>(0);
  const [remainingBalance, setRemainingBalance] = useState<number>(0);
  const [comments, setComments] = useState<string>("");

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
      totalPrice,
      totalPriceUSD: totalPriceUSD,
      deposit,
      depositUSD,
      remainingBalance: totalPrice - deposit,
      finalized: false,
      comments,
    };

    addReservation(newReservation);

    // Mostrar mensaje de éxito con SweetAlert2
    Swal.fire({
      title: "Reserva creada",
      text: "La reserva se ha realizado con éxito.",
      icon: "success",
      confirmButtonColor: "#FF5100",
      confirmButtonText: "Aceptar",
    });

    // Resetear el formulario
    setCheckInDate("");
    setCheckOutDate("");
    setRoomId(null);
    setAdultCount(1);
    setChildCount(0);
    setPassengerType("adulto");
    setReservationMethod("");
    setBreakfast(false);
    setTotalPrice(0);
    setTotalPriceUSD(0);
    setDeposit(0);
    setDepositUSD(0);
    setRemainingBalance(0);
    setComments("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto mt-20 bg-white shadow-lg rounded-lg px-8 py-6 space-y-6"
    >
      <h2 className="text-2xl font-semibold text-[#264653] mb-6 text-center">
        Crear Reserva
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Check-in Date */}
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

        {/* Check-out Date */}
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

        {/* Room Selection */}
        <div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            Habitación:
          </label>
          <select
            value={roomId ?? ""}
            onChange={(e) => {
              const selectedRoomId = Number(e.target.value);
              setRoomId(selectedRoomId);

              // Actualiza el totalPrice y totalPriceUSD según el precio de la habitación seleccionada
              const selectedRoom = rooms.find(
                (room) => room.id === selectedRoomId
              );
              if (selectedRoom) {
                setTotalPrice(selectedRoom.price); // Establece el precio total en base a la habitación
                setTotalPriceUSD(selectedRoom.price / 100); // Calcula el precio en USD (si es necesario)
              }
            }}
            className="border border-[#CD9C8A] rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#FF5100]"
            required
          >
            <option value="">Seleccione una habitación</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.roomNumber} - ${room.price} por noche
              </option>
            ))}
          </select>
        </div>

        {/* Adult Count */}
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

        {/* Child Count */}
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

        {/* Breakfast Option */}
        <div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            ¿Desayuno incluido?
          </label>
          <input
            type="checkbox"
            checked={breakfast}
            onChange={(e) => setBreakfast(e.target.checked)}
            className="rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#FF5100]"
          />
        </div>

        {/* Total Price */}
        <div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            Precio Total: $USD
          </label>
          <input
            type="number"
            value={totalPrice}
            onChange={(e) => setTotalPrice(Number(e.target.value))}
            min={0}
            className="border border-[#CD9C8A] rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#FF5100]"
          />
        </div>

        {/* Deposit */}
        <div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            Depósito : $USD.
          </label>
          <input
            type="number"
            value={deposit}
            onChange={(e) => setDeposit(Number(e.target.value))}
            min={0}
            className="border border-[#CD9C8A] rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#FF5100]"
          />
        </div>

        {/* Remaining Balance */}
        <div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            Saldo pendiente: $USD
          </label>
          <input
            type="number"
            value={totalPrice - deposit}
            disabled
            className="border border-[#CD9C8A] rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#FF5100]"
          />
        </div>

        {/* Comments */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-[#264653] mb-1">
            Comentarios:
          </label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={4}
            className="border border-[#CD9C8A] rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#FF5100]"
          />
        </div>
      </div>

      <div className="flex justify-center">
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
