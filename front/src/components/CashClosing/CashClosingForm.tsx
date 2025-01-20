'use client';
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';  
import { UserContext } from '@/context/UserContext';
import { fetchUpdateCaja } from '../Fetchs/CajaFetch/CajaFetch'; 
import { ICloseCaja, ICreateCaja } from '@/Interfaces/ICaja';

const CashClosingForm: React.FC = () => {
  const [saldoFinal, setsaldoFinal] = useState<string>('');
  const [ingresoEfectivo] = useState<number>(0);
  const [ingresoTarjeta] = useState<number>(0);
  const [cargoHabitacion] = useState<number>(0);
  const [egresos] = useState<number>(0);
  const [fechaHora, setFechaHora] = useState<string>('');
  const [usuarioId, setUsuarioId] = useState<string>('');
  const [ubicacionId, setUbicacionId] = useState<string>('');
  const [usuarioEmail, setUsuarioEmail] = useState<string>('');
  const [ubicacionNombre, setUbicacionNombre] = useState<string>('');
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const { logOut } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleString(); 
    setFechaHora(formattedDate);

    const userData = localStorage.getItem('user');
    const locationData = localStorage.getItem('selectedLocation');

    if (userData) {
      const user = JSON.parse(userData).user; 
      setUsuarioId(user.id || '');
      setUsuarioEmail(user.email || '');
    }

    if (locationData) {
      const location = JSON.parse(locationData);
      setUbicacionId(location.id || '');
      setUbicacionNombre(location.name || '');
    }
  }, []);  // Se ejecuta solo cuando el componente se monta

  const handleSaldoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '' || !isNaN(parseFloat(value))) {
      setsaldoFinal(value);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!saldoFinal || !fechaHora || !usuarioId || !ubicacionId) {
      setErrorMessage("Por favor, complete todos los campos.");
      setShowErrorNotification(true);
      setTimeout(() => setShowErrorNotification(false), 3000);
      return;
    }

    const cajaId = localStorage.getItem('cajaId');
    if (!cajaId) {
      setErrorMessage("No se encontró el ID de la caja.");
      setShowErrorNotification(true);
      setTimeout(() => setShowErrorNotification(false), 3000);
      return;
    }

    const cajaData: ICloseCaja = {
      saldoFinal: parseFloat(saldoFinal),
      ingresoEfectivo: ingresoEfectivo,
      ingresoTarjeta: ingresoTarjeta,
      cargoHabitacion: cargoHabitacion,
      egresos: egresos,
      usuarioId: usuarioId,
      ubicacionId: ubicacionId,
    };

    try {
      // Llamada para actualizar la caja existente
      const cajaResponse = await fetchUpdateCaja(cajaId, cajaData);

      if (cajaResponse && cajaResponse.id) {
        setNotificationMessage("Caja actualizada exitosamente.");
        setShowNotification(true);
        setTimeout(() => {
          logOut();
          router.push("/");  
        }, 2000);
      } else {
        setErrorMessage("Error al actualizar la caja.");
        setShowErrorNotification(true);
        setTimeout(() => setShowErrorNotification(false), 3000);
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Error desconocido.");
      setShowErrorNotification(true);
      setTimeout(() => setShowErrorNotification(false), 3000);
    }
  };

  return (
    <div className="max-w-lg mt-20 mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">Cierre de Caja</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Formulario de saldo inicial */}
        <div>
          <label htmlFor="saldoFinal" className="block text-sm font-medium text-gray-700 mb-1">
            Saldo Inicial
          </label>
          <input
            type="text" 
            id="saldoFinal"
            value={saldoFinal}
            onChange={handleSaldoChange}
            className="mt-1 p-3 border border-gray-300 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingrese el saldo inicial"
          />
        </div>

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

        <div>
          <label htmlFor="usuario" className="block text-sm font-medium text-gray-700 mb-1">
            Usuario
          </label>
          <input
            type="text"
            id="usuario"
            value={usuarioEmail}
            readOnly
            className="mt-1 p-3 border border-gray-300 rounded-md w-full bg-gray-100 text-gray-600 shadow-sm focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700 mb-1">
            Ubicación
          </label>
          <input
            type="text"
            id="ubicacion"
            value={ubicacionNombre}
            readOnly
            className="mt-1 p-3 border border-gray-300 rounded-md w-full bg-gray-100 text-gray-600 shadow-sm focus:outline-none"
          />
        </div>


        {/* Notificaciones de error o éxito */}
        {showNotification && (
          <div className="bg-green-200 text-green-800 p-2 rounded-md">
            {notificationMessage}
          </div>
        )}

        {showErrorNotification && (
          <div className="bg-red-200 text-red-800 p-2 rounded-md">
            {errorMessage}
          </div>
        )}

        {/* Botón para enviar el formulario */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-200"
          >
            Actualizar Caja
          </button>
        </div>
      </form>
    </div>
  );
};

export default CashClosingForm;
