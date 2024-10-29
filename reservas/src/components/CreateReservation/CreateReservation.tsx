"use client";

import React, { useState } from "react";
import { useReservationContext } from "../../context/reservationContext";
import { Room, Reservation } from "../../interfaces/interfaces";

const CreateReservation: React.FC = () => {
  const { addReservation, rooms } = useReservationContext(); // Obtener habitaciones del contexto
  const [checkInDate, setCheckInDate] = useState<string>("");
  const [checkOutDate, setCheckOutDate] = useState<string>("");
  const [roomId, setRoomId] = useState<number | null>(null);
  const [passengers, setPassengers] = useState<string>("");
  const [passengerCount, setPassengerCount] = useState<number>(1);
  const [passengerType, setPassengerType] = useState<string>("");
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
      checkInDate,
      checkOutDate,
      roomId,
      passengers,
      passengerCount,
      passengerType,
      reservationMethod,
      breakfastIncluded: breakfast,
      totalPrice,
      totalPriceUSD,
      deposit,
      depositUSD,
      remainingBalance,
      finalized: false,
      comments,
    };
    addReservation(newReservation);
    // Restablecer campos del formulario
    setCheckInDate("");
    setCheckOutDate("");
    setRoomId(null);
    setPassengers("");
    setPassengerCount(1);
    setPassengerType("");
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
      className="bg-white shadow-md rounded px-8 py-6 mb-4"
    >
      <h2 className="text-lg font-semibold mb-4">Crear Reserva</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Check-in:
        </label>
        <input
          type="date"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
          required
          className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Check-out:
        </label>
        <input
          type="date"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
          required
          className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Habitación:
        </label>
        <select
          value={roomId ?? ""}
          onChange={(e) => setRoomId(Number(e.target.value))}
          className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
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
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Pasajeros:
        </label>
        <input
          type="text"
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
          className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Cantidad de pasajeros:
        </label>
        <input
          type="number"
          value={passengerCount}
          onChange={(e) => setPassengerCount(Number(e.target.value))}
          min={1}
          className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Tipo de pasajeros:
        </label>
        <input
          type="text"
          value={passengerType}
          onChange={(e) => setPassengerType(e.target.value)}
          className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Método de reserva:
        </label>
        <input
          type="text"
          value={reservationMethod}
          onChange={(e) => setReservationMethod(e.target.value)}
          className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={breakfast}
            onChange={(e) => setBreakfast(e.target.checked)}
            className="form-checkbox"
          />
          <span className="ml-2">¿Desayuno incluido?</span>
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Precio total:
        </label>
        <input
          type="number"
          value={totalPrice}
          onChange={(e) => setTotalPrice(Number(e.target.value))}
          className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Precio total en USD:
        </label>
        <input
          type="number"
          value={totalPriceUSD}
          onChange={(e) => setTotalPriceUSD(Number(e.target.value))}
          className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Seña:
        </label>
        <input
          type="number"
          value={deposit}
          onChange={(e) => setDeposit(Number(e.target.value))}
          className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Seña en USD:
        </label>
        <input
          type="number"
          value={depositUSD}
          onChange={(e) => setDepositUSD(Number(e.target.value))}
          className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Saldo restante:
        </label>
        <input
          type="number"
          value={remainingBalance}
          onChange={(e) => setRemainingBalance(Number(e.target.value))}
          className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Comentarios:
        </label>
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500"
      >
        Crear Reserva
      </button>
    </form>
  );
};

export default CreateReservation;
