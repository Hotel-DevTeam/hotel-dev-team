/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import { useReservationContext } from "@/context/reservationContext";
import dayjs from "dayjs";
import ReservationModal from "./ReservationModal";
import { fetchGetReservtions, fetchGetReservtionsByRoom } from "../Fetchs/ReservationsFetch/IReservationsFetch";
import { Reservation, RoomWithReservations } from "@/Interfaces/IReservation";

const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [reservations2, setReservations2] = useState<RoomWithReservations>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchGetReservtions();
        const data2 = await fetchGetReservtionsByRoom();
        //setReservations(data.reservations);
        setReservations2(data2);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Error desconocido");
      } finally {
        setLoading(false); // Esto asegura que el estado de loading se cambie cuando termine la carga
      }
    };

    loadOrders();
  }, []);

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

  const getReservationsForDay = (day: string, resArr: Reservation[]) => {
    return resArr.filter((res) => {
      const checkIn = res.checkInDate.slice(0, 10);
      const checkOut = res.checkOutDate.slice(0, 10);
      return checkIn == day || checkOut == day;
    });
  };

  const renderCalendarByRoom = (roomName: string, roomReservations: Reservation[]) => {
    const daysInMonth = currentMonth.daysInMonth();
    const startOfMonth = currentMonth.startOf("month").day();
    const calendarDays = [];
    

    for (let i = 0; i < 7; i++) {
      if(i == 3){calendarDays.push(<div key={`empty-${i + roomName + i}`} className="text-center w-1/7 h-16"><h1 className="text-l font-semibold">{roomName}</h1></div>);}
      else{calendarDays.push(<div key={`empty-${i + roomName + i}`} className="w-1/7 h-16"></div>);}
    }

    for (let i = 0; i < startOfMonth; i++) {
      calendarDays.push(<div key={`empty-${i + roomName}`} className="w-1/7 h-16"></div>);
    }

    let waitingForEnd = false
    for (let day = 1; day <= daysInMonth; day++) {
      const formattedDay = currentMonth.date(day).format("YYYY-MM-DD");
      const reservationsForDay = getReservationsForDay(formattedDay, roomReservations);

      let dayColorClass = "";
      reservationsForDay.forEach((res) => {
        const checkIn = res.checkInDate.slice(0, 10);
        const checkOut = res.checkOutDate.slice(0, 10);

         
        
        if (checkIn === formattedDay) {
            dayColorClass = "bg-yellow-300";
            waitingForEnd = true
        } //Primer día
        if (checkOut === formattedDay) {
            dayColorClass = "bg-yellow-300";
            waitingForEnd = false
        }//último día
        if (checkOut === formattedDay && checkIn === formattedDay) {
          dayColorClass = "bg-blue-300";
        }//mismo día
      });
      if (waitingForEnd && !dayColorClass) {
        dayColorClass = "bg-yellow-300";
      } else if(!waitingForEnd && !dayColorClass){
        dayColorClass = "bg-green-300";
      }

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


    for (let i = 0; i < 42 - Number(startOfMonth) - daysInMonth; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="w-1/7 h-16"></div>);
    }

    return calendarDays;
  };


  const renderCalendar = () => {
    if (loading) {
      return <div>Loading...</div>;
    }
    const te: React.JSX.Element[][] = []
    Object.entries(reservations2 || {}).forEach(([roomId, roomData]) => {
      te.push(renderCalendarByRoom(roomData.name, roomData.reservations))
    });
    return te;
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
