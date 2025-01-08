import React, { useState, useEffect, useContext } from "react";
import { fetchGetProducts } from "../Fetchs/ProductsFetchs/ProductsFetchs";
import { UserContext } from "@/context/UserContext"; // El contexto de Usuario
import { IProduct } from "@/Interfaces/IUser"; 
import { ICreateMovement, TipoMovimiento } from "@/Interfaces/IMovements";
import { crearMovimiento } from "../Fetchs/MovementsFetch.tsx/MovementsFetch";

const ExpensesForm: React.FC = () => {
  const { token } = useContext(UserContext);
  const [user, setUser] = useState<any>(null);
  const [ubicacion, setUbicacion] = useState<{ id: string, name: string } | null>(null); // Cambiado para guardar objeto {id, name}
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [amount, setAmount] = useState<string>('1');
  const [descripcion, setDescripcion] = useState<string>(''); 
  const [tipoMovimiento] = useState<TipoMovimiento>(TipoMovimiento.Egreso); 
  const [estado] = useState<string>('Hecho'); 

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const locationData = localStorage.getItem('selectedLocation');

    if (userData) {
      const user = JSON.parse(userData).user; 
      setUser(user); 
    }

    if (locationData) {
      const location = JSON.parse(locationData);
      setUbicacion(location); // Ahora guardamos el objeto completo
    }
  }, []);  

  // Cargar productos usando fetch
  useEffect(() => {
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

  // Función para manejar el cambio de producto
  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProduct(e.target.value);
  };

  // Función para manejar el cambio de cantidad
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  // Función para manejar el cambio de descripción
  const handleDescripcionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescripcion(e.target.value);
  };

  // Función para manejar el envío de los gastos
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!user || !ubicacion) {
      console.error("No user or location data available.");
      return;
    }
  
    // Crear el objeto de movimiento que se enviará
    const movimiento: ICreateMovement = {
      usuario: {
        id: user.id,
        name: user.name,
        password:user.password,
        email: user.email,
        role: user.role,
        isAdmin: user.isAdmin || false, 
      },
      monto: parseFloat(amount),
      descripcion: descripcion,
      estado: estado,
      producto: {
        id: selectedProduct,
      },
      ubicacion: {
        id: ubicacion.id, // Aquí usamos el ID de la ubicación
      },
      tipoMovimiento: tipoMovimiento,
    };
  
    // Verifica el objeto antes de enviarlo
    console.log("Datos a enviar al servidor:", JSON.stringify(movimiento, null, 2));
  
    // Llamada a la función para crear el movimiento
    const response = await crearMovimiento(movimiento);
  
    if (response) {
      console.log("Movimiento creado exitosamente:", response);
    } else {
      console.error("Hubo un error al crear el movimiento");
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen">
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-6 py-4 mb-4 w-3/5">
        <h1 className="text-lg font-bold text-[#264653] mb-3 text-center">Registrar Gasto</h1>

        {/* Información de Usuario */}
        <div className="mb-4">
          <label htmlFor="user" className="block text-[#264653] text-sm font-bold mb-2">Usuario:</label>
          <input
            type="text"
            id="user"
            value={user ? user.name : 'Cargando...'}
            readOnly
            className="border border-[#CD9C8A] rounded w-full py-2 px-3 text-[#264653] focus:outline-none"
          />
        </div>

        {/* Monto */}
        <div className="mb-4">
          <label htmlFor="amount" className="block text-[#264653] text-sm font-bold mb-2">Monto:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            className="border border-[#CD9C8A] rounded w-full py-2 px-3 text-[#264653] focus:outline-none"
          />
        </div>

        {/* Descripción del Gasto */}
        <div className="mb-4">
          <label htmlFor="descripcion" className="block text-[#264653] text-sm font-bold mb-2">Descripción:</label>
          <input
            type="text"
            id="descripcion"
            value={descripcion}
            onChange={handleDescripcionChange}
            className="border border-[#CD9C8A] rounded w-full py-2 px-3 text-[#264653] focus:outline-none"
          />
        </div>

        {/* Selección de Producto */}
        <div className="mb-4">
          <label htmlFor="product" className="block text-[#264653] text-sm font-bold mb-2">Selecciona un Producto:</label>
          <select
            id="product"
            value={selectedProduct}
            onChange={handleProductChange}
            className="mt-1 block w-full px-2 py-1 border border-[#CD9C8A] rounded text-sm text-[#264653] focus:outline-none focus:ring focus:ring-[#FF5100]"
          >
            <option value="">Seleccione un producto</option>
            {products.map((product) => (
              <option key={product.id} value={product.id.toString()}>{product.nombre}</option>
            ))}
          </select>
        </div>

        {/* Información de Ubicación */}
        <div className="mb-4">
          <label htmlFor="location" className="block text-[#264653] text-sm font-bold mb-2">Ubicación:</label>
          <input
            type="text"
            id="location"
            value={ubicacion ? ubicacion.name : 'Cargando...'} // Mostramos el nombre de la ubicación
            readOnly
            className="border border-[#CD9C8A] rounded w-full py-2 px-3 text-[#264653] focus:outline-none"
          />
        </div>    

        <button
          type="submit"
          className="bg-[#CD9C8A] hover:bg-[#b4a7e6] text-white font-bold py-2 px-4 rounded w-full"
        >
          Registrar Gasto
        </button>
      </form>
    </div>
  );
};

export default ExpensesForm;
