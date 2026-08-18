/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Reservation } from "../../Interfaces/IReservation";
import { IRoom } from "@/Interfaces/IUser";
import { UpdateReservation } from "../Fetchs/ReservationsFetch/IReservationsFetch";
import { fetchGetRooms } from "../Fetchs/RoomsFetch/RoomsFetch";
import { UserContext } from "@/context/UserContext";

interface EditReservationModalProps {
  reservation: Reservation;
  closeModal: () => void;
  onSaved: () => void;
}

const EditReservationModal: React.FC<EditReservationModalProps> = ({
  reservation,
  closeModal,
  onSaved,
}) => {
  const { token } = useContext(UserContext);
  const [checkInDate, setCheckInDate] = useState(
    reservation.checkInDate.slice(0, 10)
  );
  const [checkOutDate, setCheckOutDate] = useState(
    reservation.checkOutDate.slice(0, 10)
  );
  const [priceArg, setPriceArg] = useState(reservation.priceArg);
  const [depositArg, setDepositArg] = useState(reservation.depositArg);
  const [balance, setBalance] = useState(reservation.balance);
  const [roomId, setRoomId] = useState(String(reservation.room?.id ?? ""));
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadRooms = async () => {
      const selectedLocation = localStorage.getItem("selectedLocation");
      const locationId = selectedLocation ? JSON.parse(selectedLocation).id : null;
      if (!locationId || !token) return;
      try {
        const data = await fetchGetRooms(locationId, token);
        setRooms(data);
      } catch (error) {
        console.error("Error al obtener las habitaciones:", error);
      }
    };

    loadRooms();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await UpdateReservation(reservation.id, {
        checkInDate,
        checkOutDate,
        priceArg: Number(priceArg),
        depositArg: Number(depositArg),
        balance: Number(balance),
        roomId,
      });
      Swal.fire("Guardado", "La reserva fue actualizada.", "success");
      onSaved();
      closeModal();
    } catch (error) {
      Swal.fire(
        "Error",
        error instanceof Error ? error.message : "No se pudo actualizar la reserva.",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4"
      >
        <h3 className="text-xl font-semibold text-[#264653]">
          Editar reserva
        </h3>

        <div>
          <label className="block text-sm text-[#264653] mb-1">
            Habitación
          </label>
          <select
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="w-full border rounded-md p-2"
            required
          >
            {rooms.length === 0 && reservation.room && (
              <option value={String(reservation.room.id)}>
                {reservation.room.name}
              </option>
            )}
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-[#264653] mb-1">
            Check-in
          </label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-[#264653] mb-1">
            Check-out
          </label>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-[#264653] mb-1">
            Precio total (ARS)
          </label>
          <input
            type="number"
            step="0.01"
            value={priceArg}
            onChange={(e) => setPriceArg(Number(e.target.value))}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-[#264653] mb-1">
            Depósito (ARS)
          </label>
          <input
            type="number"
            step="0.01"
            value={depositArg}
            onChange={(e) => setDepositArg(Number(e.target.value))}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-[#264653] mb-1">
            Saldo restante (ARS)
          </label>
          <input
            type="number"
            step="0.01"
            value={balance}
            onChange={(e) => setBalance(Number(e.target.value))}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        <div className="flex justify-center gap-4 pt-2">
          <button
            type="button"
            onClick={closeModal}
            className="bg-gray-300 text-[#264653] py-2 px-6 rounded-lg shadow-md hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="bg-[#FF5100] text-white py-2 px-6 rounded-lg shadow-md hover:bg-[#FF3A00] focus:outline-none focus:ring-2 focus:ring-[#FF5100] disabled:opacity-50"
          >
            {saving ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditReservationModal;
