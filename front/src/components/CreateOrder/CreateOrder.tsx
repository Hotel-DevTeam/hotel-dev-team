"use client"
import React, { useState, useEffect, useContext } from 'react';
import ProductSelector from './ProductSelector';
import QuantityInput from './QuantityInput';
import RoomSelector from './RoomSelector';
import PriceDisplay from './PriceDisplay';
import OrderSummary from './OrderSummary';
import { IProduct, IRoom } from '@/Interfaces/IUser';
import { OrderItem } from '@/Interfaces/interfaces';
import { fetchGetRooms } from '../Fetchs/RoomsFetch/RoomsFetch';
import { fetchGetProducts } from '../Fetchs/ProductsFetchs/ProductsFetchs';
import { useLocationContext } from '@/context/LocationContext';
import { useOrderContext } from '@/context/OrderContext';
import { UserContext } from '@/context/UserContext';
import { NotificationsForms } from '../Notifications/NotificationsForms';
import { createSalesOrder } from '../Fetchs/OrdersFetch/IOrdersFetch';

const CreateOrder: React.FC = () => {
  const { token } = useContext(UserContext);
  const { addOrder } = useOrderContext();
  const { location } = useLocationContext();  
  const [user, setUser] = useState<string>('');
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('1');
  const [rooms, setRooms] = useState<IRoom[]>([]); 
  const [roomNumber, setRoomNumber] = useState('');
  const [productPrice, setProductPrice] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<string>('0.00');
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [notification, setNotification] = useState<string>('');

  const [showOrderSummary, setShowOrderSummary] = useState<boolean>(false);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '' || !isNaN(parseFloat(value))) {
      setQuantity(value);
    }
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProductId = e.target.value;
    setSelectedProduct(selectedProductId);
  
    const selectedProduct = products.find((product) => product.id.toString() === selectedProductId);
    if (selectedProduct) {
      setProductPrice(selectedProduct.precio);
    } else {
      setProductPrice(0);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData).user;
      setUser(user.id || '');
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

  useEffect(() => {
    const loadRooms = async () => {
      try {
        if (location) {
          if (!token) return;
          const roomsData = await fetchGetRooms(location.id, token);  
          setRooms(roomsData);
        } else {
          console.error("No location selected");
        }
      } catch (error) {
        console.error("Error al obtener las habitaciones:", error);
      }
    };

    loadRooms();
  }, [location]);

  useEffect(() => {
    if (selectedProduct && productPrice && quantity) {
      const calculatedPrice = productPrice * parseFloat(quantity);
      setTotalPrice(calculatedPrice.toFixed(2));
    }
  }, [quantity, productPrice, selectedProduct]);

  const handleRoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoomNumber(e.target.value);
  };

  const handleAddToOrder = () => {
    if (!location) {
      setNotification('Por favor, selecciona una ubicación antes de agregar productos.');
      return;
    }
  
    if (!selectedProduct || !roomNumber) {
      setNotification('Por favor, selecciona un producto y una habitación.');
      return;
    }
  
    const selectedProductObj = products.find(p => p.id.toString() === selectedProduct);
    if (!selectedProductObj) {
      setNotification('Producto no encontrado.');
      return;
    }
  
    const newOrderItem: OrderItem = {
      product: selectedProductObj,
      roomId: roomNumber,
      quantity: parseInt(quantity, 10),
      totalPrice: (selectedProductObj.precio * parseInt(quantity, 10)).toFixed(2),
      price: selectedProductObj.precio
    };
  
    setOrderItems(prevItems => [...prevItems, newOrderItem]);
    setShowOrderSummary(true);
    setSelectedProduct('');
    setQuantity('1');
    setRoomNumber('');
  };

 

  const handleConfirmOrder = async () => {
    if (!location || orderItems.length === 0) {
      setNotification('Por favor, selecciona productos y una ubicación antes de confirmar el pedido.');
      return;
    }

    const orderData = {
      userId: user,
      locationId: location.id,
      status: 'confirmed',
      totalAmount: parseFloat(totalPrice),
    };

    console.log('Datos a enviar:', orderData);

    try {
      const createdOrder = await createSalesOrder(orderData);
      console.log('Orden de venta creada:', createdOrder);
    } catch (error) {
      console.error('Error al crear la orden de venta:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 m-2">
      <div className="ml-8 mt-2">
        <h1 className="text-2xl font-bold text-center mb-6">Crear Orden</h1>
        <form className="bg-white shadow-md rounded px-6 py-4 mb-4 w-full">
          <div className="mb-3">
            <ProductSelector 
              products={products} 
              selectedProduct={selectedProduct} 
              onProductChange={handleProductChange} 
            />
          </div>

          <div className="mb-3">
            <QuantityInput 
              quantity={quantity} 
              onQuantityChange={handleQuantityChange} 
            />
          </div>

          <div className="mb-3">
            <RoomSelector 
              rooms={rooms} 
              roomNumber={roomNumber} 
              onRoomChange={handleRoomChange} 
            />
          </div>

          <div className="mb-3">
            <PriceDisplay 
              productPrice={productPrice} 
              totalPrice={totalPrice} 
            />
          </div>

          <button 
            type="button" 
            onClick={handleAddToOrder} 
            className="mt-4 bg-[#CD9C8A] text-white py-2 px-4 rounded"
          >
            Agregar al pedido
          </button>
        </form>
      </div>

      <div className="ml-8 mt-2">
        <h2 className="text-[#264653] text-xl font-semibold mb-3">Resumen de Orden</h2>
        {showOrderSummary && (
          <div className="overflow-x-auto">
            <OrderSummary orderItems={orderItems} />
          </div>
        )}
      </div>

      <button 
        onClick={handleConfirmOrder} 
        className="mt-4 bg-green-600 text-white py-2 px-4 rounded"
      >
        Confirmar Pedido
      </button>

      {notification && <NotificationsForms message={notification} />}
    </div>
  );
};

export default CreateOrder;
