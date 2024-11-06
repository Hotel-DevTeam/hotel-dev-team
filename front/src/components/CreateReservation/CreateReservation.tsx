"use client";

import React, { useState } from "react";
import { useReservationContext } from "../../context/reservationContext";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Room, Reservation } from "../../Interfaces/IReservation";

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
  const [finalized, setFinalized] = useState<boolean>(false);

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
    setFinalized(false); // Reiniciar campo 'finalized'
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white shadow-lg rounded-lg px-8 py-6 space-y-6"
    >
      <h2 className="text-2xl font-semibold text-[#264653] mb-6 text-center">
        Crear Reserva
      </h2>

      <div className="space-y-4">
        {/* Check-in and Check-out Dates */}
        <div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            Check-in:
          </label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            required
            className="border border-gray-300 rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            Check-out:
          </label>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            required
            className="border border-gray-300 rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
          />
        </div>

        {/* Room Selection */}
        <div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            Habitación:
          </label>
          <select
            value={roomId ?? ""}
            onChange={(e) => setRoomId(Number(e.target.value))}
            className="border border-gray-300 rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
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

        {/* Passenger Details */}
        <div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            Adultos:
          </label>
          <input
            type="number"
            value={adultCount}
            onChange={(e) => setAdultCount(Number(e.target.value))}
            min={1}
            className="border border-gray-300 rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            Niños:
          </label>
          <input
            type="number"
            value={childCount}
            onChange={(e) => setChildCount(Number(e.target.value))}
            min={0}
            className="border border-gray-300 rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
          />
        </div>

        {/* Additional Fields */}
        <div>
          <label className="inline-flex items-center text-sm font-medium text-[#264653]">
            <input
              type="checkbox"
              checked={finalized}
              onChange={(e) => setFinalized(e.target.checked)}
              className="form-checkbox text-[#2A9D8F]"
            />
            <span className="ml-2">Reserva Finalizada</span>
          </label>
        </div>

        {/* Additional Pricing Fields */}
        <div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            Precio total USD:
          </label>
          <input
            type="number"
            value={totalPriceUSD}
            onChange={(e) => setTotalPriceUSD(Number(e.target.value))}
            className="border border-gray-300 rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            Depósito USD:
          </label>
          <input
            type="number"
            value={depositUSD}
            onChange={(e) => setDepositUSD(Number(e.target.value))}
            className="border border-gray-300 rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            Balance Pendiente:
          </label>
          <input
            type="number"
            value={remainingBalance}
            onChange={(e) => setRemainingBalance(Number(e.target.value))}
            className="border border-gray-300 rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#F4A261] hover:bg-[#E9C46A] text-white font-semibold py-3 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
        >
          Crear Reserva
        </button>
      </div>
    </form>
  );
};

export default CreateReservation;
