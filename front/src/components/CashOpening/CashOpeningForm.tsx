'use client'
import { ICreateCaja } from '@/Interfaces/ICaja';
import React, { useState, useEffect } from 'react';
import { fetchCreateCaja } from '../Fetchs/CajaFetch/CajaFetch';
import { useRouter } from 'next/navigation';

const CashOpeningForm: React.FC = () => {
  const [saldoInicial, setSaldoInicial] = useState<string>(''); 
  const [fechaHora, setFechaHora] = useState<string>(''); 
  const [usuario, setUsuario] = useState<string>(''); 
  const [ubicacion, setUbicacion] = useState<string>(''); 
  const [ingresoEfectivo, setIngresoEfectivo] = useState<number>(0);
  const [ingresoTarjeta, setIngresoTarjeta] = useState<number>(0);
  const [cargoHabitacion, setCargoHabitacion] = useState<number>(0);
  const [egresos, setEgresos] = useState<number>(0);
  const [movimientoIds, setMovimientoIds] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();

  // Cargar la fecha y hora actual
  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleString(); 
    setFechaHora(formattedDate);

    // Obtener los datos del localStorage
    const userData = localStorage.getItem('user');
    const locationData = localStorage.getItem('selectedLocation');

    if (userData) {
      const user = JSON.parse(userData).user; 
      setUsuario(user.email || ''); 
    }

    if (locationData) {
      const location = JSON.parse(locationData);
      setUbicacion(location.name || '');
    }
  }, []);

  // Función para manejar el cambio en el saldo inicial
  const handleSaldoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '' || !isNaN(parseFloat(value))) {
      setSaldoInicial(value);
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    if (!saldoInicial || !fechaHora || !usuario || !ubicacion) {
      setErrorMessage("Por favor, complete todos los campos.");
      setShowErrorNotification(true);
      setTimeout(() => setShowErrorNotification(false), 3000);
      return;
    }
  
    // Datos de la caja
    const cajaData: ICreateCaja = {
      saldoInicial: parseFloat(saldoInicial),
      movimientoIds: movimientoIds,
      ingresoEfectivo: ingresoEfectivo,
      ingresoTarjeta: ingresoTarjeta,
      cargoHabitacion: cargoHabitacion,
      egresos: egresos,
      usuarioId: usuario, // Aquí usas el email como ID de usuario o adaptas al formato que usas para el ID real
      ubicacionId: ubicacion, // Lo mismo para la ubicación
    };
  
    console.log("Datos de la caja que se enviarán:", cajaData);
  
    try {
      // Crear la caja
      const cajaResponse = await fetchCreateCaja(cajaData);
  
      console.log("Respuesta de la creación de caja:", cajaResponse);
  
      if (cajaResponse) {
        setNotificationMessage("Caja creada exitosamente.");
        setShowNotification(true);
        setTimeout(() => {
          router.push("/Calendar");
        }, 2000);
      } else {
        console.log("No se recibió una respuesta válida de la API.");
        setErrorMessage("Error al crear la caja.");
        setShowErrorNotification(true);
        setTimeout(() => setShowErrorNotification(false), 3000);
      }
    } catch (error) {
      console.log("Error al intentar crear la caja:", error);
      setErrorMessage(error instanceof Error ? error.message : "Error desconocido.");
      setShowErrorNotification(true);
      setTimeout(() => setShowErrorNotification(false), 3000);
    }
  };
  

  return (
    <div className="max-w-lg mt-20 mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">Apertura de Caja</h2>
  
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Campo saldo inicial */}
        <div>
          <label htmlFor="saldoInicial" className="block text-sm font-medium text-gray-700 mb-1">
            Saldo Inicial
          </label>
          <input
            type="text"
            id="saldoInicial"
            value={saldoInicial}
            onChange={handleSaldoChange}
            className="mt-1 p-3 border border-gray-300 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingrese el saldo inicial"
          />
        </div>
  
        {/* Campo fecha y hora */}
        <div>
          <label htmlFor="fechaHora" className="block text-sm font-medium text-gray-700 mb-1">
            Fecha y Hora Actual
          </label>
          <input
            type="text"
            id="fechaHora"
            value={fechaHora}
            readOnly
            className="mt-1 p-3 border border-gray-300 rounded-md w-full bg-gray-100 text-gray-600 shadow-sm focus:outline-none"
          />
        </div>
  
        {/* Campo usuario */}
        <div>
          <label htmlFor="usuario" className="block text-sm font-medium text-gray-700 mb-1">
            Usuario
          </label>
          <input
            type="text"
            id="usuario"
            value={usuario}
            readOnly
            className="mt-1 p-3 border border-gray-300 rounded-md w-full bg-gray-100 text-gray-600 shadow-sm focus:outline-none"
          />
        </div>
  
        {/* Campo ubicación */}
        <div>
          <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700 mb-1">
            Ubicación
          </label>
          <input
            type="text"
            id="ubicacion"
            value={ubicacion}
            readOnly
            className="mt-1 p-3 border border-gray-300 rounded-md w-full bg-gray-100 text-gray-600 shadow-sm focus:outline-none"
          />
        </div>
  
        {/* Botón para enviar el formulario */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-[#CD9C8A] text-white rounded-md shadow-md hover:bg-gray-500 transition duration-200"
          >
            Enviar
          </button>
        </div>
      </form>
  
      {/* Notificación de éxito */}
      {showNotification && (
        <div className="absolute top-20 left-0 right-0 mx-auto w-max bg-green-500 text-white py-2 px-4 rounded">
          {notificationMessage}
        </div>
      )}
  
      {/* Notificación de error */}
      {showErrorNotification && (
        <div className="absolute top-20 left-0 right-0 mx-auto w-max bg-red-500 text-white py-2 px-4 rounded">
          {errorMessage}
        </div>
      )}
    </div>
  );
  
};

export default CashOpeningForm;
