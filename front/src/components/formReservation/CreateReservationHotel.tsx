/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, useContext } from "react";
import { UserContext } from '@/context/UserContext';
import { useReservationContext } from "@/context/reservationContext";
import { fetchGetRoomById, fetchGetRooms } from '../Fetchs/RoomsFetch/RoomsFetch';
import { useLocationContext } from '@/context/LocationContext';
import Swal from "sweetalert2";
import { Reservation } from "../../Interfaces/IReservation";
import CurrencyConverterForm from "../DollarComponents/DollarReservation"; // Importamos el componente
import { IRoom } from '@/Interfaces/IUser';
import { fetchGetLocation } from "../Fetchs/LocaationsFetch/LocationsFetch";
import { CreateReservation } from "../Fetchs/ReservationsFetch/IReservationsFetch";

const CreateReservationHotel: React.FC = () => {
  const { addReservation, rooms } = useReservationContext();
  const { token } = useContext(UserContext);
  const { location } = useLocationContext();
  const [roomss, setRooms] = useState<IRoom[]>([]); 
  const [checkInDate, setCheckInDate] = useState<string>("");
  const [checkOutDate, setCheckOutDate] = useState<string>("");
  const [roomId, setRoomId] = useState<string | null>(null);
  const [adultCount, setAdultCount] = useState<number>(1);
  const [childCount, setChildCount] = useState<number>(0);
  const [passengerType, setPassengerType] = useState<string>("adulto");
  const [reservationMethod, setReservationMethod] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [identification, setIdentification] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [breakfast, setBreakfast] = useState<boolean>(false);
  const [deposit, setDeposit] = useState<number>(0);
  const [remainingBalance, setRemainingBalance] = useState<number>(0);
  const [comments, setComments] = useState<string>("");
  const [arrival, setArrival] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [additionalSections, setAdditionalSections] = useState<{ id: number; name: string; lastname: string; identification: string }[]>([]);

  const handleAddSection = () => {
  setAdditionalSections([
    ...additionalSections,
    { id: Date.now(), name: "", lastname: "", identification: "" },
  ]);
  };

  const handleSectionChange = (
    id: number,
    field: "name" | "lastname" | "identification",
    value: string
  ) => {
    setAdditionalSections((prevSections) => {
      const updatedSections = prevSections.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      );
  
      console.log("Secciones actualizadas:", updatedSections); // Verifica que el estado se actualiza correctamente
  
      return updatedSections;
    });
  };
  


  const handleTotalPriceChange = (price: number) => {
    setTotalPrice(price);
    setRemainingBalance(price - deposit);
  };

  const handleDepositChange = (amount: number) => {
    setDeposit(amount);
    setRemainingBalance(totalPrice - amount);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedLocation = JSON.parse(localStorage.getItem("selectedLocation") || '');

    // const locationInfo = await fetchGetLocation(selectedLocation.id, token || '')
    const roomsData = await fetchGetRoomById(roomId || '', token || '');
    
    const newReservation = {
      checkIn: false,
      checkInDate,
      checkOut: false,
      checkOutDate,
      pax: {
        name,
        lastname,
        dniPassport: identification,
        email,
        phone,
        birthdate: birthday,
        isActive: true
      },
      PaxNum: adultCount + childCount,
      paxType: 1,
      bookingPlatform: reservationMethod,
      ubicacion:{name: selectedLocation.name},
      roomType:{name: roomsData[0].name},
      breakfast,
      priceArg: totalPrice,
      priceUsd: 0,
      depositArg: deposit,
      depositUsd: 0,
      balance: remainingBalance,
      completed: false,
      notasAdicionales: [comments],
      arrival,
    };

    // addReservation(newReservation);

    Swal.fire({
      title: "Reserva creada",
      text: "La reserva se ha realizado con éxito.",
      icon: "success",
      confirmButtonColor: "#FF5100",
      confirmButtonText: "Aceptar",
    });

    CreateReservation(newReservation)
    setCheckInDate("");
    setCheckOutDate("");
    setRoomId(null);
    setAdultCount(1);
    setName("");
    setLastname("");
    setIdentification("");
    setEmail("");
    setPhone("");
    setBirthday("");
    setChildCount(0);
    setPassengerType("adulto");
    setReservationMethod("");
    setBreakfast(false);
    setDeposit(0);
    setRemainingBalance(0);
    setComments("");
    setArrival("");
    setTotalPrice(0);
  };

  useEffect(() => {
      const loadRooms = async () => {
        try {
          if (location) {
            if (!token) return;
            const roomsData = await fetchGetRooms(location.id, token);
            setRooms(roomsData);
          } else {
            console.error("No location selected");
          }
        } catch (error) {
          console.error("Error al obtener las habitaciones:", error);
        }
      };
  
      loadRooms();
    }, [location]);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-6xl mx-auto mt-20 bg-white shadow-lg rounded-lg px-8 py-6 space-y-6"
    >
      <h2 className="text-2xl font-semibold text-[#264653] mb-6 text-center">
        Crear Reserva
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            Nombre:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-[#CD9C8A] rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#FF5100]"
          />
        </div>
        {/* Apellido */}
        <div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            Apellido:
          </label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="border border-[#CD9C8A] rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#FF5100]"
          />
        </div>
        {/* Identificación */}
        <div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            DNI/Pasaporte:
          </label>
          <input
            type="text"
            value={identification}
            onChange={(e) => setIdentification(e.target.value)}
            className="border border-[#CD9C8A] rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#FF5100]"
          />
        </div>
        {/* E-mail */}
        {/*<div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            E-Mail:
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-[#CD9C8A] rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#FF5100]"
          />
        </div>*/}
        {/* Número de teléfono */}
        <div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            Celular:
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border border-[#CD9C8A] rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#FF5100]"
          />
        </div>

        {/* Tipo de pasajero */}
        <div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            Tipo de pasajero:
          </label>
          <select
            value={passengerType}
            onChange={(e) => setPassengerType(e.target.value)}
            className="border border-[#CD9C8A] rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#FF5100]"
          >
            <option value="adulto">Adulto</option>
            <option value="niño">Niño</option>
          </select>
        </div>

        {/* Fecha de Nacimiento */}
        <div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            Fecha de Nacimiento:
          </label>
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            className="border border-[#CD9C8A] rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#FF5100]"
          />
        </div>
        {/* Fecha de entrada */}
        <div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            Check-in:
          </label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            className="border border-[#CD9C8A] rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#FF5100]"
          />
        </div>

        {/* Fecha de salida */}
        <div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            Check-out:
          </label>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            className="border border-[#CD9C8A] rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#FF5100]"
          />
        </div>

        {/* Hora de llegada */}
        <div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            Hora de llegada:
          </label>
          <input
            type="text"
            value={arrival}
            onChange={(e) => setArrival(e.target.value)}
            className="border border-[#CD9C8A] rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#FF5100]"
          />
        </div>

        {/* Número de habitación */}
        <div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            Número de habitación:
          </label>
          <select
            value={roomId || ""}
            onChange={(e) => setRoomId(e.target.value)}
            className="border border-[#CD9C8A] rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#FF5100]"
          >
            <option value="">Selecciona una habitación</option>
            {roomss && roomss.length > 0 ? (
              roomss
                // .filter((room) => room.id !== 7) // Filtra el ID 7
                .map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name}
                  </option>
                ))
            ) : (
              <option disabled>No hay habitaciones disponibles</option>
            )}
          </select>
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

        {/* Método de reserva */}
        <div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            Método de reserva:
          </label>
          <input
            type="text"
            value={reservationMethod}
            onChange={(e) => setReservationMethod(e.target.value)}
            className="border border-[#CD9C8A] rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#FF5100]"
          />
        </div>

        {/* Desayuno */}
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={breakfast}
            onChange={() => setBreakfast(!breakfast)}
            className="mr-2"
          />
          <label className="text-sm font-medium text-[#264653]">
            Desayuno incluido
          </label>
        </div>

        {/* Precio total */}
        <div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            Precio total:
          </label>
          <input
            type="text"
            value={totalPrice || ""}
            onChange={(e) => {
              const newValue = e.target.value;
              if (/^\d*\.?\d*$/.test(newValue)) {
                handleTotalPriceChange(Number(newValue) || 0);
              }
            }}
            inputMode="decimal"
            className="border border-[#CD9C8A] rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#FF5100]"
          />
        </div>

        {/* Depósito */}
        <div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            Seña:
          </label>
          <input
            type="text"
            value={deposit || ""}
            onChange={(e) => {
              const newValue = e.target.value;
              if (/^\d*\.?\d*$/.test(newValue)) {
                handleDepositChange(Number(newValue) || 0);
              }
            }}
            inputMode="decimal"
            className="border border-[#CD9C8A] rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#FF5100]"
          />
        </div>

        {/* Saldo restante en pesos */}
        <div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            Saldo restante en pesos:
          </label>
          <input
            type="text"
            value={remainingBalance || ""}
            readOnly
            className="border border-[#CD9C8A] rounded-lg w-full px-3 py-2 text-[#264653] bg-gray-200"
          />
        </div>

        {/* Conversión a dólares */}
        <CurrencyConverterForm
          pesosAmount={totalPrice}
          depositAmount={deposit}
        />
      </div>

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


        {/* Renderizado de secciones adicionales */}
        {additionalSections.length ? <h2 className="text-2xl font-semibold text-[#264653] mb-6 text-center">Pasajeros adicionales:</h2> : <div/>}
        {additionalSections.map((section) => (
          <div key={section.id} className="block">
            <div>
              <label className="block text-sm font-medium text-[#264653] mb-1">Nombre:</label>
              <input
                type="text"
                value={section.name}
                onChange={(e) => handleSectionChange(section.id, "name", e.target.value)}
                className="border border-[#CD9C8A] rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#FF5100]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#264653] mb-1">Apellido:</label>
              <input
                type="text"
                value={section.lastname}
                onChange={(e) => handleSectionChange(section.id, "lastname", e.target.value)}
                className="border border-[#CD9C8A] rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#FF5100]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#264653] mb-1">DNI/Pasaporte:</label>
              <input
                type="text"
                value={section.identification}
                onChange={(e) => handleSectionChange(section.id, "identification", e.target.value)}
                className="border border-[#CD9C8A] rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#FF5100]"
              />
            </div>
            <hr/>
            <br/>
          </div>
        ))}

      <div className="flex justify-center mt-4 gap-6">
        <button
          type="submit"
          className="bg-[#FF5100] text-white py-2 px-6 rounded-lg shadow-md hover:bg-[#FF3A00] focus:outline-none focus:ring-2 focus:ring-[#FF5100]"
        >
          Crear Reserva
        </button>
        <button
          type="button"
          onClick={handleAddSection}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600"
        >
          Añadir Pasajero
        </button>
      </div>
    </form>
  );
};

export default CreateReservationHotel;
