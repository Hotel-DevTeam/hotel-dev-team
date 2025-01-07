"use client";
import React, { useState, useEffect, useContext } from "react";
import { useOrderContext } from "../../context/OrderContext";
import { rooms } from "../../helpers/helpers";
import { fetchGetProducts } from "../Fetchs/ProductsFetchs/ProductsFetchs";
import Swal from "sweetalert2";
import { UserContext } from "@/context/UserContext";
import { OrderItem, Product } from "@/Interfaces/interfaces";

const CreateOrder: React.FC = () => {
  const { token } = useContext(UserContext);
  const { addOrder } = useOrderContext();
  const [user, setUser] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('1');
  const [roomNumber, setRoomNumber] = useState<string>('');
  const [paidAmount, setPaidAmount] = useState<string>('0');
  const [price, setPrice] = useState<string>('0');
  const [totalPrice, setTotalPrice] = useState<string>('0.00');
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  // Función para manejar el cambio en la cantidad
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '' || !isNaN(parseFloat(value))) {
      setQuantity(value);
    }
  };

  // Función para manejar el cambio en el precio
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '' || !isNaN(parseFloat(value))) {
      setPrice(value);
    }
  };

  // Función para manejar el cambio en el monto pagado
  const handlePaidAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '' || !isNaN(parseFloat(value))) {
      setPaidAmount(value);
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

 

  // Agregar la orden
  const handleCreateOrder = () => {
    if (orderItems.length > 0) {
      Swal.fire({
        title: "Orden Creada!",
        text: "La orden ha sido creada con éxito.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
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
  

    
  useEffect(() => {
    if (selectedProduct && price && quantity) {
      const calculatedPrice = parseFloat(price) * parseFloat(quantity);
      setTotalPrice(calculatedPrice.toFixed(2));
    }
  }, [quantity, price, selectedProduct]);
  
  
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
      // Agregar el producto al array orderItems
  const updatedOrderItems = [
    ...orderItems,
    { product, quantity: numericQuantity },
  ];
  setOrderItems(updatedOrderItems);

  // Calcular el precio total de la orden
  const calculatedTotalPrice = updatedOrderItems.reduce((acc, item) => {
    const itemPrice = parseFloat(item.product.price); // Usar item.product.price
    const itemQuantity = parseInt(item.quantity, 10); // Convertir quantity a número
    return acc + (isNaN(itemPrice) || isNaN(itemQuantity) ? 0 : itemPrice * itemQuantity);
  }, 0);

  
      setTotalPrice(calculatedTotalPrice.toFixed(2)); // Actualizamos el precio total
      console.log({
        product: product.nombre,
        quantity: numericQuantity,
        user: user,
        roomNumber: roomNumber,
        totalPrice: calculatedTotalPrice.toFixed(2),
      });
      // Llamada para agregar la orden al sistema
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
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="ml-8 mt-2">
        {/* Formulario */}
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-6 py-4 mb-4 w-full">
          <h2 className="text-sm font-semibold text-[#264653] mb-3">Crear Orden</h2>
  
          {/* Producto */}
          <div className="mb-3">
            <label htmlFor="product" className="block text-gray-700 text-sm">Selecciona un Producto:</label>
            <select
              id="product"
              className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded text-sm"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <option value="">Seleccione un producto</option>
              {products.map((product) => (
                <option key={product.id} value={product.id.toString()}>{product.nombre}</option>
              ))}
            </select>
          </div>
  
          {/* Cantidad */}
          <div className="mb-3">
            <label htmlFor="quantity" className="block text-[#264653] text-xs font-bold mb-1">Cantidad:</label>
            <input
              type="text"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-full mt-1 rounded-lg border border-[#CD9C8A] py-1 px-2 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5100] transition duration-300"
              placeholder="Ingrese la cantidad"
            />
          </div>
  
          {/* Usuario */}
          <div className="mb-3">
            <label htmlFor="user" className="block text-[#264653] text-xs font-bold mb-1">Usuario:</label>
            <input
              type="text"
              id="user"
              value={user}
              readOnly
              className="w-full mt-1 rounded-lg border border-[#CD9C8A] py-1 px-2 text-sm text-gray-700 shadow-sm focus:outline-none"
            />
          </div>
  
          {/* Número de habitación */}
          <div className="mb-3">
            <label htmlFor="roomNumber" className="block text-[#264653] text-xs font-bold mb-1">Número de Habitación:</label>
            <select
              id="roomNumber"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              required
              className="w-full mt-1 rounded-lg border border-[#CD9C8A] py-1 px-2 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5100] transition duration-300"
            >
              <option value="">Seleccione una habitación</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.roomNumber}>{room.roomNumber}</option>
              ))}
            </select>
          </div>
  
          {/* Precio por unidad */}
          <div className="mb-3">
            <label htmlFor="price" className="block text-[#264653] text-xs font-bold mb-1">Precio por unidad:</label>
            <input
              type="text"
              id="price"
              value={price}
              onChange={handlePriceChange}
              className="w-full mt-1 rounded-lg border border-[#CD9C8A] py-1 px-2 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5100] transition duration-300"
            />
          </div>
  
          {/* Precio Total */}
          <div className="mb-3">
            <label htmlFor="totalPrice" className="block text-[#264653] text-xs font-bold mb-1">Precio Total:</label>
            <input
              type="text"
              id="totalPrice"
              value={totalPrice}
              readOnly
              className="w-full mt-1 rounded-lg border border-[#CD9C8A] py-1 px-2 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5100] transition duration-300"
            />
          </div>
  
          {/* Monto Pagado */}
          <div className="mb-3">
            <label htmlFor="paidAmount" className="block text-[#264653] text-xs font-bold mb-1">Monto Pagado:</label>
            <input
              type="text"
              id="paidAmount"
              value={paidAmount}
              onChange={handlePaidAmountChange}
              className="w-full mt-1 rounded-lg border border-[#CD9C8A] py-1 px-2 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5100] transition duration-300"
              placeholder="Ingrese el monto pagado"
            />
          </div>
  
          <button
            type="submit"
            className="bg-[#CD9C8A] text-white w-full py-1 rounded-lg text-sm focus:outline-none hover:bg-orange-400 transition-all"
          >
            Agregar Producto
          </button>
        </form>
      </div>
      {/* Tarjeta para mostrar productos agregados */}
      <div className="bg-white shadow-md rounded px-6 py-4 mt-4 max-w-[700px] mx-auto">
        <h3 className="text-sm font-semibold text-[#264653] mb-3">
          Productos Agregados
        </h3>
        {orderItems.length > 0 ? (
          <ul>
            {orderItems.map((item, index) => (
              <li key={index} className="flex justify-between mb-2 text-md">
                <span>
                  {item.product.nombre} <strong>x{item.quantity}</strong>
                </span>
                <span className="bg-slate-300">${(item.product.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm">No se han agregado productos aún.</p>
        )}
        <button
          onClick={handleCreateOrder}
          className="bg-[#CD9C8A] text-white w-full mt-3 py-1 rounded-lg text-sm focus:outline-none hover:bg-orange-400 transition-all"
        >
          Crear Orden
        </button>
      </div>
    </div>
  );
  
};

export default CreateOrder;