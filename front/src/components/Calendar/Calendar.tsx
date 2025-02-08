/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { useReservationContext } from "@/context/reservationContext";
import dayjs from "dayjs";
import ReservationModal from "./ReservationModal";

const Calendar: React.FC = () => {
  const { reservations } = useReservationContext();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const handleDayClick = (day: string) => {
    setSelectedDate(day); 
  };

  const handleMonthChange = (direction: string) => {
    const newMonth =
      direction === "prev"
        ? currentMonth.subtract(1, "month")
        : currentMonth.add(1, "month");
    setCurrentMonth(newMonth);
  };

  const getReservationsForDay = (day: string) => {
    return reservations.filter((res) => {
      const checkIn = dayjs(res.checkInDate).format("YYYY-MM-DD");
      const checkOut = dayjs(res.checkOutDate).format("YYYY-MM-DD");
      return checkIn <= day && checkOut >= day;
    });
  };

  const renderCalendar = () => {
    const daysInMonth = currentMonth.daysInMonth();
    const startOfMonth = currentMonth.startOf("month").day();
    const calendarDays = [];

    // Rellenar los primeros días en blanco hasta el inicio del mes
    for (let i = 0; i < startOfMonth; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="w-1/7 h-16"></div>);
    }

    // Crear los días del calendario
    for (let day = 1; day <= daysInMonth; day++) {
      const formattedDay = currentMonth.date(day).format("YYYY-MM-DD");
      const reservationsForDay = getReservationsForDay(formattedDay);

      // Colores para el día con reserva
      let dayColorClass = "";
      reservationsForDay.forEach((res) => {
        const checkIn = dayjs(res.checkInDate).format("YYYY-MM-DD");
        const checkOut = dayjs(res.checkOutDate).format("YYYY-MM-DD");
        if (checkIn === formattedDay) {
          dayColorClass = "bg-green-300"; // Check-in
        }
        if (checkOut === formattedDay) {
          dayColorClass = "bg-red-300"; // Check-out
        }
        console.log(checkOut)
        console.log(checkIn)
        console.log(formattedDay)
        if (checkOut === formattedDay && checkIn === formattedDay) {
          dayColorClass = "bg-blue-300"; // Check-out
        }
      });

      calendarDays.push(
        <div
          key={day}
          className={`w-1/7 h-16 flex items-center justify-center cursor-pointer ${dayColorClass} border border-gray-300 rounded-md`}
          onClick={() => handleDayClick(formattedDay)}
        >
          {day}
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => handleMonthChange("prev")}
          className="p-2 bg-blue-500 text-white rounded-lg"
        >
          Anterior
        </button>
        <span className="text-xl font-semibold">
          {currentMonth.format("MMMM YYYY")}
        </span>
        <button
          onClick={() => handleMonthChange("next")}
          className="p-2 bg-blue-500 text-white rounded-lg"
        >
          Siguiente
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">{renderCalendar()}</div>

      {selectedDate && (
        <ReservationModal
          selectedDate={selectedDate}
          closeModal={() => setSelectedDate(null)}
        />
      )}
    </div>
  );
};

export default Calendar;
