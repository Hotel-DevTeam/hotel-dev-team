"use client";

import React, { useState, useEffect } from "react";
import { useOrderContext } from "../../context/OrderContext";
import { products, rooms } from "../../helpers/helpers";
import Swal from "sweetalert2";

// Definir la interfaz para los items de la orden
interface OrderItem {
  product: { id: number; name: string; price: number };
  quantity: number;
}

const CreateOrder: React.FC = () => {
  const { addOrder } = useOrderContext();
  const [selectedProductId, setSelectedProductId] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [user, setUser] = useState<string>(""); // Estado para el usuario
  const [roomNumber, setRoomNumber] = useState<string>("");
  const [paidAmount, setPaidAmount] = useState<number>(0);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]); // Estado para los productos agregados

  useEffect(() => {
    // Obtener los datos del localStorage
    const userData = localStorage.getItem("user");
    console.log("Datos de usuario en localStorage:", userData); // Verifica el valor almacenado

    if (userData) {
      const user = JSON.parse(userData).user;
      setUser(user.email || ""); // Establece el email del usuario si existe
    }
  }, []); // Se ejecuta solo una vez cuando el componente se monta

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const product = products.find((p) => p.id === selectedProductId);
    if (product) {
      // Actualizamos los productos agregados
      setOrderItems([
        ...orderItems,
        { product, quantity }, // Agrega el producto y la cantidad seleccionada
      ]);

      addOrder(product, quantity, user, roomNumber);

      await Swal.fire({
        title: "Orden Agregada!",
        text: `Se ha agregado con éxito la orden de ${quantity} unidades de ${product.name}.`,
        icon: "success",
        confirmButtonText: "Aceptar",
      });

      // Limpiamos el formulario
      setSelectedProductId(0);
      setQuantity(1);
      setRoomNumber("");
      setPaidAmount(0);
    }
  };

  const totalPrice = selectedProductId
    ? products.find((p) => p.id === selectedProductId)?.price ?? 0 * quantity // Usando nullish coalescing (??) para un valor por defecto
    : 0;

  const handleCreateOrder = () => {
    // Aquí puedes enviar la orden con los productos agregados
    if (orderItems.length > 0) {
      // Acción para crear la orden con los productos agregados
      Swal.fire({
        title: "Orden Creada!",
        text: "La orden ha sido creada con éxito.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      // Limpiar los productos agregados
      setOrderItems([]);
    } else {
      Swal.fire({
        title: "Error",
        text: "No hay productos en la orden.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 py-6 mb-4 max-w-xl mx-auto"
      >
        <h2 className="text-lg font-semibold text-[#264653] mb-4">
          Crear Orden
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Producto */}
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
              className="border border-[#CD9C8A] rounded w-full py-2 px-3 text-[#264653] hover:cursor-pointer focus:outline-none focus:ring focus:ring-[#FF5100]"
            >
              <option value={0}>Seleccione un producto</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          {/* Cantidad */}
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
              className="border border-[#CD9C8A] rounded w-full py-2 px-3 text-[#264653] hover:cursor-pointer focus:outline-none focus:ring focus:ring-[#FF5100]"
            />
          </div>

          {/* Usuario */}
          <div className="mb-4">
            <label
              htmlFor="user"
              className="block text-[#264653] text-sm font-bold mb-2"
            >
              Usuario:
            </label>
            <input
              type="text"
              id="user"
              value={user}
              readOnly
              className="border border-[#CD9C8A] rounded w-full py-2 px-3 text-[#264653] hover:cursor-pointer focus:outline-none"
            />
          </div>

          {/* Número de habitación */}
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
              className="border border-[#CD9C8A] rounded w-full py-2 px-3 text-[#264653] hover:cursor-pointer focus:outline-none focus:ring focus:ring-[#FF5100]"
            >
              <option value="">Seleccione una habitación</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.roomNumber}>
                  {room.roomNumber}
                </option>
              ))}
            </select>
          </div>

          {/* Precio total */}
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
              className="border border-[#CD9C8A] rounded w-full py-2 px-3 text-[#264653] hover:cursor-pointer focus:outline-none focus:ring focus:ring-[#FF5100]"
            />
          </div>

          {/* Monto Pagado */}
          <div className="mb-4">
            <label
              htmlFor="paidAmount"
              className="block text-[#264653] hover:cursor-pointer text-sm font-bold mb-2"
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
        </div>

        <button
          type="submit"
          className="bg-[#CD9C8A] text-white w-full py-2 rounded-lg focus:outline-none hover:bg-orange-400 transition-all"
        >
          Agregar Producto
        </button>
      </form>

      {/* Tarjeta para mostrar productos agregados */}
      <div className="bg-white shadow-md rounded px-8 py-6 mt-6 max-w-xl mx-auto">
        <h3 className="text-lg font-semibold text-[#264653] mb-4">
          Productos Agregados
        </h3>
        {orderItems.length > 0 ? (
          <ul>
            {orderItems.map((item, index) => (
              <li key={index} className="flex justify-between mb-2">
                <span>
                  {item.product.name} x{item.quantity}
                </span>
                <span>${(item.product.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No se han agregado productos aún.</p>
        )}
        {/* Botón para crear la orden */}
        <button
          onClick={handleCreateOrder}
          className="bg-[#CD9C8A] text-white w-full mt-4 py-2 rounded-lg focus:outline-none hover:bg-orange-400 transition-all"
        >
          Crear Orden
        </button>
      </div>
    </div>
  );
};

export default CreateOrder;
