"use client";
import React, { useState, useEffect, useContext } from "react";
import { useOrderContext } from "../../context/OrderContext";
import { fetchGetProducts } from "../Fetchs/ProductsFetchs/ProductsFetchs";
import Swal from "sweetalert2";
import { UserContext } from "@/context/UserContext";
import { OrderItem } from "@/Interfaces/interfaces";
import { IProduct, IRoom } from "@/Interfaces/IUser";
import { fetchGetRooms } from "../Fetchs/RoomsFetch/RoomsFetch";
import { useLocationContext } from "@/context/LocationContext";  

const CreateOrder: React.FC = () => {
  const { token } = useContext(UserContext);
  const { addOrder } = useOrderContext();
  const { location } = useLocationContext();  
  const [user, setUser] = useState<string>('');
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('1');
  const [rooms, setRooms] = useState<IRoom[]>([]); 
  const [roomNumber, setRoomNumber] = useState("");
  const [paidAmount, setPaidAmount] = useState<string>('0');
  const [productPrice, setProductPrice] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<string>('0.00');
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  // Función para manejar el cambio en la cantidad
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '' || !isNaN(parseFloat(value))) {
      setQuantity(value);
    }
  };

  // Función para manejar el cambio en el producto
  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProductId = e.target.value;
    setSelectedProduct(selectedProductId);
  
    // Buscar el producto por ID y actualizar el precio
    const selectedProduct = products.find((product) => product.id.toString() === selectedProductId);
    if (selectedProduct) {
      setProductPrice(selectedProduct.precio);
      console.log("Precio del producto seleccionado:", selectedProduct.precio); // Verificación
    } else {
      setProductPrice(0);
    }
  };

  // Cargar los productos y los datos del usuario al iniciar
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData).user;
      setUser(user.email || '');
    }

    const fetchProducts = async () => {
      try {
        if (!token) return;
        const data = await fetchGetProducts(token);
        setProducts(data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProducts();
    
  }, [token]);

  // Cargar las habitaciones al iniciar
  useEffect(() => {
    const loadRooms = async () => {
      try {
        if (location) {
          if (!token) return;
          const roomsData = await fetchGetRooms(location.id,token);  
          setRooms(roomsData);
        } else {
          console.error("No location selected");
        }
      } catch (error) {
        console.error("Error al obtener las habitaciones:", error);
      }
    };

    loadRooms();
  }, [location]);  // Dependencia de location

  // Actualización del precio total en función de cantidad y precio
  useEffect(() => {
    if (selectedProduct && productPrice && quantity) {
      const calculatedPrice = productPrice * parseFloat(quantity);
      setTotalPrice(calculatedPrice.toFixed(2));
    }
  }, [quantity, productPrice, selectedProduct]);

  // Manejo del envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const product = products.find((p) => p.id.toString() === selectedProduct);
    if (product) {
      const numericQuantity = parseFloat(quantity); // Convertir a número solo cuando se necesite.
      if (isNaN(numericQuantity) || numericQuantity <= 0) {
        Swal.fire({
          title: "Error",
          text: "La cantidad debe ser un número mayor a cero.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        return;
      }
      // Agregar el producto al array orderItems
      const updatedOrderItems = [
        ...orderItems,
        { product, quantity: numericQuantity, totalPrice: (numericQuantity * product.precio).toFixed(2) },
      ];
      setOrderItems(updatedOrderItems);

      const calculatedTotalPrice = updatedOrderItems.reduce((acc, item) => {
        const itemPrice = parseFloat(item.product.precio); // Usar item.product.precio
        const itemQuantity = parseInt(item.quantity, 10);
        return acc + (isNaN(itemPrice) || isNaN(itemQuantity) ? 0 : itemPrice * itemQuantity);
      }, 0);

      setTotalPrice(calculatedTotalPrice.toFixed(2)); // Actualizamos el precio total

      addOrder(product, numericQuantity, user, roomNumber);
  
      await Swal.fire({
        title: "Orden Agregada!",
        text: `Se ha agregado con éxito la orden de ${numericQuantity} unidades de ${product.nombre}.`,
        icon: "success",
        confirmButtonText: "Aceptar",
      });
  
      // Limpiar formulario
      setSelectedProduct('');
      setQuantity('1');
      setRoomNumber('');
      setPaidAmount('0');
    }
  };

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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 m-2">
      <div className="ml-8 mt-2">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-6 py-4 mb-4 w-full">
          <h2 className="text-lg font-semibold text-[#264653] mb-3">Agregar productos o servicios</h2>
  
          {/* Selección de Producto */}
          <div className="mb-3">
            <label htmlFor="product" className="block text-gray-700 text-sm">Selecciona un Producto o Servicio:</label>
            <select
              id="product"
              className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded text-sm"
              value={selectedProduct}
              onChange={handleProductChange}
            >
              <option value="">Seleccione un producto</option>
              {products.map((product) => (
                <option key={product.id} value={product.id.toString()}>{product.nombre}</option>
              ))}
            </select>
          </div>
  
          {/* Cantidad */}
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-[#264653] text-sm font-bold mb-2">
              Cantidad:
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min={1}
              className="border border-[#CD9C8A] rounded w-full py-2 px-3 text-[#264653] hover:cursor-pointer focus:outline-none focus:ring focus:ring-[#FF5100]"
            />
          </div>
  
          {/* Usuario */}
          <div className="mb-4">
            <label htmlFor="user" className="block text-[#264653] text-sm font-bold mb-2">
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
            <label htmlFor="roomNumber" className="block text-[#264653] text-sm font-bold mb-2">
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
                <option key={room.id} value={room.number}>
                  {room.name} 
                </option>
              ))}
            </select>
          </div>
  
          {/* Precio del Producto */}
          <div className="mb-4">
            <label htmlFor="price" className="block text-[#264653] text-sm font-bold mb-2">
              Precio:
            </label>
            <input
              type="text"
              id="price"
              value={`$${productPrice.toFixed(2)}`}
              readOnly
              className="border border-[#CD9C8A] rounded w-full py-2 px-3 text-[#264653] hover:cursor-pointer focus:outline-none"
            />
          </div>
  
          {/* Precio Total */}
          <div className="mb-4">
            <label htmlFor="totalPrice" className="block text-[#264653] text-sm font-bold mb-2">
              Precio Total:
            </label>
            <input
              type="text"
              id="totalPrice"
              value={`$${totalPrice}`}
              readOnly
              className="border border-[#CD9C8A] rounded w-full py-2 px-3 text-[#264653] hover:cursor-pointer focus:outline-none"
            />
          </div>
  
          <button
            type="submit"
            className="bg-[#CD9C8A] hover:bg-[#b4a7e6] text-white font-bold py-2 px-4 rounded w-full"
          >
            Agregar Producto
          </button>
        </form>
  
      </div>
      <div className="ml-8 mt-2">
  <h2 className="text-[#264653] text-xl font-semibold mb-3">Crear Orden</h2>
  <div className="overflow-x-auto">
    {orderItems.length === 0 ? ( // Verifica si no hay productos
      <p className="text-center text-gray-500">Aún no has agregado productos</p> // Mensaje cuando no hay productos
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
     
  <div className="flex justify-center mt-4"> 
    <button
      onClick={handleCreateOrder}
      className="bg-[#CD9C8A] hover:bg-[#b4a7e6] text-white font-bold py-2 px-4 rounded w-3/6"
    >
      Crear Orden
    </button>
  </div>
      </div>
      
    </div>
  );
};

export default CreateOrder;