"use client";

import { useOrderContext } from "../../context/OrderContext";

const OrderPage: React.FC = () => {
  const { orders, removeOrder } = useOrderContext();

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Órdenes Realizadas</h2>
      {orders.length === 0 ? (
        <p className="text-gray-600">No hay órdenes realizadas.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-300"
            >
              <strong>Producto:</strong> {order.product.name} <br />
              <strong>Cantidad:</strong> {order.quantity} <br />
              <strong>Precio por unidad:</strong> ${order.product.price} <br />
              <strong>Precio total:</strong> $
              {order.product.price * order.quantity} <br />
              <strong>Usuario:</strong> {order.user} <br />
              <strong>Número de habitación:</strong> {order.roomNumber} <br />
              <button
                onClick={() => removeOrder(order.product.id)}
                className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded transition-colors"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
