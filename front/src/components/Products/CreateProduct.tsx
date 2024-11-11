"use client"
import React, { useState } from 'react';
import ImageUpload from '../Cloudinary/ImageUpload';
import { IProduct, Tipo } from '@/Interfaces/IUser'; 
import { NotificationsForms } from '../Notifications/NotificationsForms';
import { mockProducts } from './mockPrueba';



const UploadProductComponent = () => {
  const [product, setProduct] = useState<IProduct>({
    id: '',
    tipo: Tipo.Consumible, 
    nombre: '',
    Activo: true, 
    foto: '', 
    ubicacion: {
      name: '', 
    },
  });

  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      ubicacion: {
        ...prevProduct.ubicacion,
        [name]: value,
      }
    }));
  };

  const handleImageUpload = (url: string) => {
    setProduct(prevProduct => ({
      ...prevProduct,
      foto: url, 
    }));
  };

  const handleActivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct(prevProduct => ({
      ...prevProduct,
      Activo: e.target.checked, 
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      
      mockProducts.push(product);
      setSuccessMessage('Producto subido con éxito');
      
      
      setProduct({
        id: '',
        tipo: Tipo.Consumible,
        nombre: '',
        Activo: true,
        foto: '',
        ubicacion: {
          name: '',
        },
      });
    } catch {
      setError('Error al subir el producto');
    }
  };
  

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Crear Nuevo Producto</h2>
        </div>
  
        <form 
          onSubmit={handleSubmit} 
          className="mt-8 py-20 space-y-6 rounded-lg border border-gray-300 bg-white p-8 shadow-xl"
        >
          {error && <span className="text-red-500">{error}</span>}
          {successMessage && <NotificationsForms message={successMessage} />}
  
          <div>
            <label htmlFor="tipo" className="sr-only">Tipo</label>
            <select 
              name="tipo" 
              value={product.tipo} 
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 py-5 px-4 text-gray-500 text-sm shadow-sm focus:outline-none transition duration-300"
            >
              <option value={Tipo.Consumible}>Consumible</option>
              <option value={Tipo.Servicio}>Servicio</option>
            </select>
          </div>
  
          <div>
            <label htmlFor="nombre" className="sr-only">Nombre del Producto</label>
            <input
              type="text"
              name="nombre"
              value={product.nombre}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 py-5 px-4 text-gray-500 text-sm shadow-sm focus:outline-none transition duration-300"
              placeholder="Nombre del producto"
              required
            />
          </div>
  
          <div>
            <label htmlFor="imgUrl" className="sr-only">URL de Imagen</label>
            <ImageUpload onUpload={handleImageUpload} />
          </div>

          {/* Campos de entrada para la ubicación */}
          <div>
            <label htmlFor="ubicacion.name" className="sr-only">Nombre de Ubicación</label>
            <input
              type="text"
              name="name"
              value={product.ubicacion.name}
              onChange={handleLocationChange}
              className="w-full rounded-lg border border-gray-300 py-5 px-4 text-gray-500 text-sm shadow-sm focus:outline-none transition duration-300"
              placeholder="Nombre de la ubicación"
              required
            />
          </div>

          <div>
            <label htmlFor="Activo" className="block text-sm font-medium text-gray-700">¿Activo?</label>
            <input
              type="checkbox"
              name="Activo"
              checked={product.Activo}
              onChange={handleActivoChange}
              className="mt-2 h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
          </div>
  
          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
            >
              Subir Producto
            </button>
          </div>
  
        </form>
      </div>
    </div>
  );
};  

export default UploadProductComponent;

/*import { fetchUploadProduct } from '../Fetchs/ProductsFetchs/ProductsFetchs';
import React, { useState } from 'react';
import ImageUpload from '../Cloudinary/ImageUpload';
import { IProduct, Tipo } from '@/Interfaces/IUser'; 
import { NotificationsForms } from '../Notifications/NotificationsForms';

const UploadProductComponent = () => {
  const [product, setProduct] = useState<IProduct>({
   id:'',
    tipo: Tipo.Consumible, 
    nombre: '',
    Activo: true, 
    foto: '', 
    ubicacion: {
      name: '', 
        },
  });

  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      ubicacion: {
        ...prevProduct.ubicacion,
        [name]: value,
      }
    }));
  };

  const handleImageUpload = (url: string) => {
    setProduct(prevProduct => ({
      ...prevProduct,
      foto: url, 
    }));
  };

  const handleActivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct(prevProduct => ({
      ...prevProduct,
      Activo: e.target.checked, // Update the 'Activo' state when checkbox is checked/unchecked
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   

    try {
      await fetchUploadProduct(product);
      setSuccessMessage('Producto subido con éxito');
      
      setProduct({
        id:'',
        tipo: Tipo.Consumible,
        nombre: '',
        Activo: true,
        foto: '',
        ubicacion: {
          name: '',
        },
      });
    } catch {
      setError('Error al subir el producto');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Crear Nuevo Producto</h2>
        </div>
  
        <form 
          onSubmit={handleSubmit} 
          className="mt-8 py-20 space-y-6 rounded-lg border border-gray-300 bg-white p-8 shadow-xl"
        >
          {error && <span className="text-red-500">{error}</span>}
          {successMessage && <NotificationsForms message={successMessage} />}
  
          <div>
            <label htmlFor="tipo" className="sr-only">Tipo</label>
            <select 
              name="tipo" 
              value={product.tipo} 
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 py-5 px-4 text-gray-500 text-sm shadow-sm focus:outline-none transition duration-300"
            >
              <option value={Tipo.Consumible}>Consumible</option>
              <option value={Tipo.Servicio}>Servicio</option>
            </select>
          </div>
  
          <div>
            <label htmlFor="nombre" className="sr-only">Nombre del Producto</label>
            <input
              type="text"
              name="nombre"
              value={product.nombre}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 py-5 px-4 text-gray-500 text-sm shadow-sm focus:outline-none transition duration-300"
              placeholder="Nombre del producto"
              required
            />
          </div>
  
          <div>
            <label htmlFor="imgUrl" className="sr-only">URL de Imagen</label>
            <ImageUpload onUpload={handleImageUpload} />
          </div>

        
          <div>
            <label htmlFor="ubicacion.name" className="sr-only">Nombre de Ubicación</label>
            <input
              type="text"
              name="name"
              value={product.ubicacion.name}
              onChange={handleLocationChange}
              className="w-full rounded-lg border border-gray-300 py-5 px-4 text-gray-500 text-sm shadow-sm focus:outline-none transition duration-300"
              placeholder="Nombre de la ubicación"
              required
            />
          </div>


          <div>
            <label htmlFor="Activo" className="block text-sm font-medium text-gray-700">¿Activo?</label>
            <input
              type="checkbox"
              name="Activo"
              checked={product.Activo}
              onChange={handleActivoChange}
              className="mt-2 h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
          </div>
  
          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
            >
              Subir Producto
            </button>
          </div>
  
        </form>
      </div>
    </div>
  );
};  

export default UploadProductComponent;*/
