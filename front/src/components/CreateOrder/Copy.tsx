"use client";
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

  // Función para manejar el cambio de habitación
  const handleRoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoomNumber(e.target.value);
  };

// Función para agregar el producto a la orden
const handleAddToOrder = () => {
  if (!selectedProduct || !roomNumber) {
    alert('Por favor, selecciona un producto y una habitación.');
    return;
  }

  // Buscar el producto seleccionado
  const product = products.find((product) => product.id.toString() === selectedProduct);

  if (product) {
    const newOrderItem: OrderItem = {
      product: product, // Usamos el objeto completo del producto
      roomId: roomNumber,
      quantity: parseInt(quantity),
      totalPrice: totalPrice,
    };

    // Añadir el nuevo item al pedido
    setOrderItems((prevItems) => [...prevItems, newOrderItem]);

    // Resetear campos si es necesario
    setSelectedProduct('');
    setQuantity('1');
    setRoomNumber('');
  }
};


  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Crear Orden</h1>

      <ProductSelector 
        products={products} 
        selectedProduct={selectedProduct} 
        onProductChange={handleProductChange} 
      />
      
      <QuantityInput 
        quantity={quantity} 
        onQuantityChange={handleQuantityChange} 
      />
      
      <RoomSelector 
        rooms={rooms} 
        roomNumber={roomNumber} 
        onRoomChange={handleRoomChange} 
      />
      
      <PriceDisplay 
        productPrice={productPrice} 
        totalPrice={totalPrice} 
      />
      
      <button 
        onClick={handleAddToOrder} 
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Agregar al pedido
      </button>
      
      <OrderSummary orderItems={orderItems} />
    </div>
  );
};

export default CreateOrder;
