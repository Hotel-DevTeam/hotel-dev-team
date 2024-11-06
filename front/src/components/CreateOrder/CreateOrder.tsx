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
    }
  };

  const totalPrice = selectedProductId
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    ? products.find((p) => p.id === selectedProductId)?.price! * quantity
    : 0;

  return (
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
          className="border border-gray-300 rounded w-full py-2 px-3 text-[#264653] focus:outline-none focus:ring focus:ring-[#2A9D8F]"
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
          className="border border-gray-300 rounded w-full py-2 px-3 text-[#264653] focus:outline-none focus:ring focus:ring-[#2A9D8F]"
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
          className="border border-gray-300 rounded w-full py-2 px-3 text-[#264653] focus:outline-none focus:ring focus:ring-[#2A9D8F]"
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
          className="border border-gray-300 rounded w-full py-2 px-3 text-[#264653] focus:outline-none focus:ring focus:ring-[#2A9D8F]"
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
        <p className="text-[#264653] text-sm font-bold">
          Precio por unidad: $
          {selectedProductId
            ? products.find((p) => p.id === selectedProductId)?.price
            : 0}
        </p>
        <p className="text-[#264653] text-sm font-bold">
          Precio total: ${totalPrice}
        </p>
      </div>

      <button
        type="submit"
        className="bg-[#F4A261] hover:bg-[#E9C46A] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
      >
        Agregar Orden
      </button>
    </form>
  );
};

export default CreateOrder;
