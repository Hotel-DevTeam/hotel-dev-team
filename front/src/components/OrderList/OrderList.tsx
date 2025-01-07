"use client";

import { useOrderContext } from "../../context/OrderContext";

const OrderPage: React.FC = () => {
  const { orders, removeOrder } = useOrderContext();

  const markAsDelivered = (orderId: number) => {
    console.log(`Orden con ID ${orderId} marcada como entregada.`);
  };

  return (
    <div className="p-6 bg-[#F1FAEE] rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-[#264653] mb-4">
        Órdenes Realizadas
      </h2>
      {orders.length === 0 ? (
        <p className="text-[#264653]">No hay órdenes realizadas.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-[#F1FAEE] rounded-lg shadow-md p-6 border border-[#E9C46A] hover:shadow-lg transition-shadow"
            >
              <p className="text-[#264653]">
                <strong>Producto:</strong> {order.product.nombre} <br />
                <strong>Cantidad:</strong> {order.quantity} <br />
                <strong>Precio por unidad:</strong> ${order.product.price} <br />
                <strong>Precio total:</strong> $
                {order.product.price * order.quantity} <br />
                <strong>Usuario:</strong> {order.user} <br />
                <strong>Número de habitación:</strong> {order.roomNumber} <br />
                <strong>Fecha:</strong> {order.date}
              </p>
              <div className="mt-4">
                <button
                  onClick={() => markAsDelivered(order.product.id)}
                  className="bg-[#2A9D8F] hover:bg-[#21867A] text-white py-2 px-4 rounded-lg w-full mb-2 transition-all"
                >
                  Entregado
                </button>
                <button
                  onClick={() => removeOrder(order.product.id)}
                  className="bg-[#CD9C8A] hover:bg-[#D1495B] text-white py-2 px-4 rounded-lg w-full transition-all"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
