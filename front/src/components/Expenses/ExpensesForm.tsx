import React, { useState, useEffect, useContext } from "react";
import { fetchGetProducts } from "../Fetchs/ProductsFetchs/ProductsFetchs";
import { UserContext } from "@/context/UserContext"; // El contexto de Usuario
import { IProduct } from "@/Interfaces/IUser"; 
import { ICreateMovement, TipoMovimiento } from "@/Interfaces/IMovements";
import { crearMovimiento } from "../Fetchs/MovementsFetch.tsx/MovementsFetch";
import { NotificationsForms } from "../Notifications/NotificationsForms";

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
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
  try {
    const response = await crearMovimiento(movimiento);
    if (response) {
      console.log("Movimiento creado exitosamente:", response);
      setNotificationMessage("Se ha registrado el movimiento gasto");
      setShowNotification(true);
    
      // Espera 500ms para mostrar la notificación antes de limpiar el formulario
      setTimeout(() => {
        setSelectedProduct('');
        setAmount('1');
        setDescripcion('');
        setShowNotification(false);
      }, 1500);
    }
     else {
        setErrors({ ...errors, general: "Movimiento inválido. Por favor, revisa los datos ingresados." });
    }
  } catch (error) {
    setErrorMessage(error instanceof Error ? error.message : "Error desconocido.");
    setShowErrorNotification(true);
    setTimeout(() => setShowErrorNotification(false), 3000);
  }
  };
  
return(
<div className="flex items-center justify-center min-h-screen">
  <form 
    onSubmit={handleSubmit} 
    className="bg-white shadow-md rounded px-6 py-4 mb-4 w-3/5 min-h-[500px] " 
  >
    <h1 className="text-4xl font-bold text-[#264653] mb-3 text-center">Registrar Gasto</h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-16">
      {/* Información de Usuario */}
      <div>
        <label htmlFor="user" className="block text-[#264653] text-sm font-bold mb-2">Usuario:</label>
        <input
          type="text"
          id="user"
          value={user ? user.name : 'Cargando...'}
          readOnly
          className="border border-[#CD9C8A] rounded w-full py-2 px-3 text-[#264653] focus:outline-none"
        />
      </div>

      {/* Información de Ubicación */}
      <div>
        <label htmlFor="location" className="block text-[#264653] text-sm font-bold mb-2">Ubicación:</label>
        <input
          type="text"
          id="location"
          value={ubicacion ? ubicacion.name : 'Cargando...'}
          readOnly
          className="border border-[#CD9C8A] rounded w-full py-2 px-3 text-[#264653] focus:outline-none"
        />
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
      {/* Producto */}
      <div>
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

      {/* Monto */}
      <div>
        <label htmlFor="amount" className="block text-[#264653] text-sm font-bold mb-2">Monto:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
          className="border border-[#CD9C8A] rounded w-full py-2 px-3 text-[#264653] focus:outline-none"
        />
      </div>

      {/* Descripción */}
      <div>
        <label htmlFor="descripcion" className="block text-[#264653] text-sm font-bold mb-2">Descripción:</label>
        <input
          type="text"
          id="descripcion"
          value={descripcion}
          onChange={handleDescripcionChange}
          className="border border-[#CD9C8A] rounded w-full py-2 px-3 text-[#264653] focus:outline-none"
        />
      </div>
    </div>
    <div className="flex items-center justify-center mt-4">
      <button
        type="submit"
        className="bg-[#CD9C8A] hover:bg-[#b4a7e6] text-white font-bold py-2 px-4 rounded w-3/6 mt-8"
      >
        Registrar Gasto
      </button>
    </div>


    {showNotification && (
      <div className="absolute top-12 left-0 right-0 mx-auto w-max">
        <NotificationsForms message={notificationMessage} />
      </div>
    )}

    {showErrorNotification && (
      <div className="absolute top-20 left-0 right-0 mx-auto w-max bg-red-500 text-white py-2 px-4 rounded">
        {errorMessage}
      </div>
    )}
  </form>
</div>
)
};

export default ExpensesForm;
