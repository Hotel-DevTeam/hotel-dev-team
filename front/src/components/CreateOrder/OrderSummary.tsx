// OrderSummary.tsx
"use client";
import React from "react";
import { FaTrashAlt } from "react-icons/fa"; // Importa el ícono de react-icons
import { IOrderItem } from "@/Interfaces/IOrders"; // Ajusta la ruta según corresponda

interface OrderSummaryProps {
  orderItems: IOrderItem[];
  onRemoveItem: (index: number) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ orderItems, onRemoveItem }) => {
  return (
    <table className="min-w-full">
      <thead>
        <tr>
          <th className="px-4 py-2">Producto</th>
          <th className="px-4 py-2">Cantidad</th>
          <th className="px-4 py-2">Precio Unitario</th>
          <th className="px-4 py-2">Total</th>
          <th className="px-4 py-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {orderItems.map((item, index) => (
          <tr key={index} className="border-t">
            <td className="px-4 py-2">{item.product.nombre}</td>
            <td className="px-4 py-2">{item.quantity}</td>
            <td className="px-4 py-2">{item.price}</td>
            <td className="px-4 py-2">{item.totalAmount}</td>
            <td className="px-4 py-2">
              <button
                onClick={() => onRemoveItem(index)}
                title="Eliminar producto"
                className="text-red-500 hover:text-red-700"
              >
                <FaTrashAlt />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderSummary;
