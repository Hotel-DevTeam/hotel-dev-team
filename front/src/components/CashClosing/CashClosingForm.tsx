'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';  

const CashClosingForm: React.FC = () => {
  const [efectivoCierre, setEfectivoCierre] = useState<string>(''); 
  const [fechaHora, setFechaHora] = useState<string>(''); 
  const [usuario, setUsuario] = useState<string>(''); 
  const [ubicacion, setUbicacion] = useState<string>(''); 

  const router = useRouter();  

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleString();
    setFechaHora(formattedDate);

    const userData = localStorage.getItem('user');
    const locationData = localStorage.getItem('selectedLocation');

    if (userData && locationData) {
      const user = JSON.parse(userData);
      const location = JSON.parse(locationData);
      setUsuario(user.email || '');
      setUbicacion(location.name || '');
    }
  }, []);

  // Función para manejar el cambio en el efectivo de cierre
  const handleEfectivoCierreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
       if (value === '' || !isNaN(parseFloat(value))) {
      setEfectivoCierre(value);
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    console.log('Formulario de cierre de caja enviado:', { efectivoCierre, fechaHora, usuario, ubicacion });
    logOut();  
    router.push("/");  
  };


  const logOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('selectedLocation');
    };

  return (
    <div className="max-w-lg mt-20 mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">Cierre de Caja</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Campo efectivo de cierre */}
        <div>
          <label htmlFor="efectivoCierre" className="block text-sm font-medium text-gray-700 mb-1">
            Efectivo de Cierre
          </label>
          <input
            type="text" 
            id="efectivoCierre"
            value={efectivoCierre}
            onChange={handleEfectivoCierreChange}
            className="mt-1 p-3 border border-gray-300 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingrese el efectivo de cierre"
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
            className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-200"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CashClosingForm;
