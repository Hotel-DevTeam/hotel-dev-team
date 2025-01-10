import { OrderItem } from "@/Interfaces/interfaces";

interface OrderSummaryProps {
    orderItems: OrderItem[];
  }
  
  const OrderSummary: React.FC<OrderSummaryProps> = ({ orderItems }) => (
    <div className="overflow-x-auto shadow-md rounded bg-white p-12">
      {orderItems.length === 0 ? (
        <p className="text-center text-gray-500">Aún no has agregado productos</p>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-[#CD9C8A] text-white">
              <th className="py-2 px-4">Producto</th>
              <th className="py-2 px-4">Cantidad</th>
              <th className="py-2 px-4">Precio Total</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4 text-center">{item.product.nombre}</td>
                <td className="py-2 px-4 text-center">{item.quantity}</td>
                <td className="py-2 px-4 text-center">${item.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
  export default OrderSummary;
  