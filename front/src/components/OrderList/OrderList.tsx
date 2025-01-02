"use client";

import { useOrderContext } from "../../context/OrderContext";

const OrderPage: React.FC = () => {
  const { orders, removeOrder } = useOrderContext();

  const markAsDelivered = (orderId: number) => {
    // Aquí puedes agregar la lógica para marcar como entregado.
    console.log(`Orden con ID ${orderId} marcada como entregada.`);
  };

  return (
    <div className="p-6 bg-[#F1FAEE] rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-[#264653] mb-4">
        Órdenes Realizadas
      </h2>
      {orders.length === 0 ? (
        <p className="text-[#264653]">No hay órdenes realizadas.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border border-[#E9C46A]"
            >
              <p className="text-[#264653]">
                <strong>Producto:</strong> {order.product.name} <br />
                <strong>Cantidad:</strong> {order.quantity} <br />
                <strong>Precio por unidad:</strong> ${order.product.price}{" "}
                <br />
                <strong>Precio total:</strong> $
                {order.product.price * order.quantity} <br />
                <strong>Usuario:</strong> {order.user} <br />
                <strong>Número de habitación:</strong> {order.roomNumber} <br />
                <strong>Fecha:</strong> {order.date}
              </p>
              <div className="flex flex-col gap-2 mt-4">
                <button
                  onClick={() => markAsDelivered(order.product.id)}
                  className="bg-[#2A9D8F] hover:bg-[#21867A] text-white font-bold py-1 px-3 rounded transition-colors"
                >
                  Entregado
                </button>
                <button
                  onClick={() => removeOrder(order.product.id)}
                  className="bg-[#E76F51] hover:bg-[#D1495B] text-white font-bold py-1 px-3 rounded transition-colors"
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
