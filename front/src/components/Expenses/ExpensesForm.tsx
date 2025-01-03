import { IExpenses } from '@/Interfaces/IMovements';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';


const ExpensesForm: React.FC = () => {
  // Estado para los datos del formulario
  const [formData, setFormData] = useState<IExpenses>({
    monto: '',
    descripcion: '',
    estado: 'Hecho',
    producto: '',
    ubicacion: '',
    tipoMovimiento: 'Egreso',
  });

  // Cargar los datos desde el localStorage cuando el componente se monta
  useEffect(() => {
    const locationData = localStorage.getItem('selectedLocation');
    if (locationData) {
      const location = JSON.parse(locationData);
      setFormData(prevState => ({
        ...prevState,
        ubicacion: location.name || '', 
      }));
    }
  }, []); 

  // Manejo de cambios en los inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejo del envío del formulario
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
  };
  

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#CD9C8A] sm:text-4xl">Registro de Gastos</h1>
          <p className="mt-2 text-gray-500">
            Completa los datos para registrar un movimiento
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 py-10 space-y-6 rounded-lg border border-gray-300 bg-white p-8 shadow-xl"
        >
          <div>
            <label htmlFor="monto" className="block text-sm font-medium text-gray-700">
              Monto
            </label>
            <input
              type="number"
              name="monto"
              value={formData.monto}
              onChange={handleChange}
              className="w-full mt-1 rounded-lg border border-[#CD9C8A] py-2 px-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5100] transition duration-300"
              placeholder="Ingrese el monto"
              required
            />
          </div>

          <div>
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="w-full mt-1 rounded-lg border border-[#CD9C8A] py-2 px-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5100] transition duration-300"
              placeholder="Ingrese la descripción"
              required
            />
          </div>

          <div>
            <label htmlFor="producto" className="block text-sm font-medium text-gray-700">
              Producto
            </label>
            <input
              type="text"
              name="producto"
              value={formData.producto}
              onChange={handleChange}
              className="w-full mt-1 rounded-lg border border-[#CD9C8A] py-2 px-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5100] transition duration-300"
              placeholder="Producto asociado"
              required
            />
          </div>

          <div>
            <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700">
              Ubicación
            </label>
            <input
              type="text"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleChange}
              className="w-full mt-1 rounded-lg border border-[#CD9C8A] py-2 px-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5100] transition duration-300"
              placeholder="Ubicación seleccionada"
              required
              readOnly // No permitimos cambiar la ubicación manualmente
            />
          </div>

          <div>
            <label htmlFor="estado" className="block text-sm font-medium text-gray-700">
              Estado
            </label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="w-full mt-1 rounded-lg border border-[#CD9C8A] py-2 px-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5100] transition duration-300"
            >
              <option value="Hecho">Hecho</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-block rounded bg-[#FF5100] border border-[#FF5100] px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-[#FF5100] focus:outline-none focus:ring active:text-[#FF5100] transition-all duration-300"
            >
              Registrar Gasto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpensesForm;
