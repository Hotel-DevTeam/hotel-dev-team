"use client"; 
import { fetchUploadProduct } from '../Fetchs/ProductsFetchs/ProductsFetchs';
import React, { useState } from 'react';
import ImageUpload from '../Cloudinary/ImageUpload';
import { IProduct, Tipo } from '@/Interfaces/IUser'; 
import { NotificationsForms } from '../Notifications/NotificationsForms';

export interface ILocation {
  id?: string;
  name: string;
  address: string;
  imgUrl: string;
}

const UploadProductComponent = () => {
  const [product, setProduct] = useState<IProduct>({
    id: '', 
    tipo: Tipo.Consumible, 
    nombre: '',
    Activo: true,
    foto: '', 
    ubicacion: {
      id: '', 
      name: '', 
      address: '', 
      imgUrl: '' 
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

  const handleImageUpload = (url: string) => {
    setProduct(prevProduct => ({
      ...prevProduct,
      foto: url, 
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await fetchUploadProduct(product);
      setSuccessMessage('Producto subido con éxito');
      
      setProduct({
        id: '',
        tipo: Tipo.Consumible,
        nombre: '',
        Activo: true,
        foto: '',
        ubicacion: {
          id: '',
          name: '',
          address: '',
          imgUrl: ''
        },
      });
    } catch {
      setError('Error al subir el producto');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <span>{error}</span>}
      {successMessage && <NotificationsForms message={successMessage} />}
      
      <select name="tipo" value={product.tipo} onChange={handleInputChange}>
        <option value={Tipo.Consumible}>Consumible</option>
        <option value={Tipo.Servicio}>Servicio</option>
      </select>

      <input
        type="text"
        name="nombre"
        value={product.nombre}
        onChange={handleInputChange}
        placeholder="Nombre del producto"
      />

      <ImageUpload onUpload={handleImageUpload} />

      <button type="submit">Subir producto</button>
    </form>
  );
};

export default UploadProductComponent;
