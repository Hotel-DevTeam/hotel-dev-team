'use client'
import React, { useState, useEffect } from 'react';

const CashOpeningForm: React.FC = () => {
  const [saldoInicial, setSaldoInicial] = useState<string>(''); 
  const [fechaHora, setFechaHora] = useState<string>(''); 
  const [usuario, setUsuario] = useState<string>(''); 
  const [ubicacion, setUbicacion] = useState<string>(''); 

// Cargar la fecha y hora actual
useEffect(() => {
  const now = new Date();
  const formattedDate = now.toLocaleString(); 
  setFechaHora(formattedDate);

  // Obtener los datos del localStorage
  const userData = localStorage.getItem('user');
  console.log("Datos de usuario:", userData); 

  const locationData = localStorage.getItem('selectedLocation');
  console.log("Datos de ubicación:", locationData);

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

  // Función para manejar el envío del formulario (aquí puedes hacer lo que necesites)
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Formulario enviado:', { saldoInicial, fechaHora, usuario, ubicacion });
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
            className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-200"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CashOpeningForm;
