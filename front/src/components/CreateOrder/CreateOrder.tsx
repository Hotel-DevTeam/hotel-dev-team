/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use client";

import React, { useState } from "react";
import { useOrderContext } from "../../context/OrderContext";
import { products, users, rooms } from "../../helpers/helpers";
import Swal from "sweetalert2";

const CreateOrder: React.FC = () => {
  const { addOrder } = useOrderContext();
  const [selectedProductId, setSelectedProductId] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [user, setUser] = useState<string>("");
  const [roomNumber, setRoomNumber] = useState<string>("");
  const [paidAmount, setPaidAmount] = useState<number>(0); // Aquí se define el estado de 'paidAmount'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const product = products.find((p) => p.id === selectedProductId);
    if (product) {
      addOrder(product, quantity, user, roomNumber);

      await Swal.fire({
        title: "Orden Agregada!",
        text: `Se ha agregado con éxito la orden de ${quantity} unidades de ${product.name}.`,
        icon: "success",
        confirmButtonText: "Aceptar",
      });

      setSelectedProductId(0);
      setQuantity(1);
      setUser("");
      setRoomNumber("");
      setPaidAmount(0); // Resetea el monto pagado después de enviar la orden
    }
  };

  const totalPrice = selectedProductId
    ? products.find((p) => p.id === selectedProductId)?.price! * quantity
    : 0;

  return (
    // Asegúrate de envolver todo en un 'return'
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 py-6 mb-4"
    >
      <h2 className="text-lg font-semibold text-[#264653] mb-4">Crear Orden</h2>

      <div className="mb-4">
        <label
          htmlFor="product"
          className="block text-[#264653] text-sm font-bold mb-2"
        >
          Producto:
        </label>
        <select
          id="product"
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(Number(e.target.value))}
          className="border border-[#CD9C8A] rounded w-full py-2 px-3 text-[#264653] focus:outline-none focus:ring focus:ring-[#FF5100]"
        >
          <option value={0}>Seleccione un producto</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="quantity"
          className="block text-[#264653] text-sm font-bold mb-2"
        >
          Cantidad:
        </label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min={1}
          className="border border-[#CD9C8A] rounded w-full py-2 px-3 text-[#264653] focus:outline-none focus:ring focus:ring-[#FF5100]"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="user"
          className="block text-[#264653] text-sm font-bold mb-2"
        >
          Usuario:
        </label>
        <select
          id="user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
          className="border border-[#CD9C8A] rounded w-full py-2 px-3 text-[#264653] focus:outline-none focus:ring focus:ring-[#FF5100]"
        >
          <option value="">Seleccione un usuario</option>
          {users.map((user) => (
            <option key={user.id} value={`${user.firstName} ${user.lastName}`}>
              {user.firstName} {user.lastName}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="roomNumber"
          className="block text-[#264653] text-sm font-bold mb-2"
        >
          Número de Habitación:
        </label>
        <select
          id="roomNumber"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          required
          className="border border-[#CD9C8A] rounded w-full py-2 px-3 text-[#264653] focus:outline-none focus:ring focus:ring-[#FF5100]"
        >
          <option value="">Seleccione una habitación</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.roomNumber}>
              {room.roomNumber}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="totalPrice"
          className="block text-[#264653] text-sm font-bold mb-2"
        >
          Precio Total:
        </label>
        <input
          type="number"
          id="totalPrice"
          value={totalPrice}
          disabled
          className="border border-[#CD9C8A] rounded w-full py-2 px-3 text-[#264653] focus:outline-none focus:ring focus:ring-[#FF5100]"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="paidAmount"
          className="block text-[#264653] text-sm font-bold mb-2"
        >
          Monto Pagado:
        </label>
        <input
          type="number"
          id="paidAmount"
          value={paidAmount}
          onChange={(e) => setPaidAmount(Number(e.target.value))}
          min={0}
          className="border border-[#CD9C8A] rounded w-full py-2 px-3 text-[#264653] focus:outline-none focus:ring focus:ring-[#FF5100]"
        />
      </div>

      <button
        type="submit"
        className="bg-[#CD9C8A] text-white w-full py-2 rounded-lg focus:outline-none hover:bg-orange-400 transition-all"
      >
        Crear Orden
      </button>
    </form>
  );
};

export default CreateOrder;
