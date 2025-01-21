"use client";

import React, { useState, useEffect } from "react";
import { fetchGetOrders } from "../Fetchs/OrdersFetch/IOrdersFetch";

// Interfaces para los tipos de datos
interface User {
  name: string;
}

interface Location {
  name: string;
}

interface OrderLine {
  id: string;
  productId:string;
  quantity: number;
  unitPrice: string;
  lineTotal: string;
  orderId: string;
}

interface Order {
  id: string;
  totalAmount: string;
  status: string;
  date: string;
  user: User;
  location: Location;
  orderLines: OrderLine[];
}

const OrderPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [showUserInfo, setShowUserInfo] = useState<{ [key: string]: boolean }>({});
  const [showLocationInfo, setShowLocationInfo] = useState<{ [key: string]: boolean }>({});
  const [filterDate, setFilterDate] = useState<string>("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchGetOrders();
        console.log("data:",  data)
        setOrders(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const handleToggleUserInfo = (orderId: string) => {
    setShowUserInfo((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const handleToggleLocationInfo = (orderId: string) => {
    setShowLocationInfo((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  // Filtrar y ordenar las órdenes
  const filteredOrders = orders
    .filter((order) => {
      if (!filterDate) return true;
      const orderDate = new Date(order.date).toISOString().split("T")[0]; // Normaliza la fecha de la orden
      return orderDate === filterDate; // Compara con la fecha seleccionada
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Ordenar de más reciente a más antigua

  if (loading) {
    return <div className="text-center text-xl text-gray-600">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{`Error: ${error}`}</div>;
  }

  return (
    <div className="p-6 space-y-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-[#CD9C8A] mb-6">Órdenes</h1>

      {/* Filtro por fecha */}
      <div className="mb-6">
        <label htmlFor="filterDate" className="text-sm text-gray-600 mr-2">Filtrar por fecha:</label>
        <input
          id="filterDate"
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-lg rounded-md p-6 max-w-xs w-full flex flex-col items-center"
          >
            <div className="space-y-3 mb-4 text-center">
            <h3 className="font-bold text-xl mt-6 mb-2 text-[#CD9C8A]">Líneas de Pedido</h3>
            {order.orderLines.map((line) => (
              <div key={line.id} className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">Cantidad: <span className="font-bold">{line.quantity}</span></p>
                <p className="text-sm text-gray-600">Precio Unitario: <span className="font-bold">${line.unitPrice}</span></p>
                <p className="text-sm text-gray-600">Total de Línea: <span className="font-bold">${line.lineTotal}</span></p>
              <p className="text-sm text-gray-600 mb-2">Estado: <span className="font-bold">{order.status}</span></p>
              <p className="text-sm text-gray-600 mb-4">Fecha: <span className="font-bold">{new Date(order.date).toLocaleDateString()}</span></p>
              </div>
            ))}
            </div>


            <div>
              <button
                onClick={() => handleToggleUserInfo(order.id)}
                className="text-[#CD9C8A] hover:text-[#b77f6d] text-sm font-medium mb-2"
              >
                {showUserInfo[order.id] ? "Ocultar" : "Ver empleado"}
              </button>
              {showUserInfo[order.id] && (
                <div className="mb-4 space-y-2">
                  <p className="text-sm text-gray-700 font-bold">Nombre: {order.user.name}</p>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => handleToggleLocationInfo(order.id)}
                className="text-[#CD9C8A] hover:text-[#b77f6d] text-sm font-medium mb-2"
              >
                {showLocationInfo[order.id] ? "Ocultar" : "Ver ubicación"}
              </button>
              {showLocationInfo[order.id] && (
                <div className="mb-4 space-y-2">
                  <p className="text-sm text-gray-700 font-bold">{order.location.name}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
