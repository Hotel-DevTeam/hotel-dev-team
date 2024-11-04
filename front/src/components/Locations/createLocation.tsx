"use client";
import React, { useState } from 'react';
import { fetchCreateLocation } from '../Fetchs/UserFetchs/UserFetchs';
import { useRouter } from 'next/navigation';
import { NotificationsForms } from '../Notifications/NotificationsForms';

export default function CreateLocation() {
  const router = useRouter();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    imgUrl: '',
  });

  // Validar la URL de la imagen
  const isImageUrlValid = (url: string) => {
    const allowedExtensions = /\.(jpg|jpeg|png|webp|gif|bmp)$/i;
    return allowedExtensions.test(url);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isImageUrlValid(formData.imgUrl)) {
      setErrorMessage("Por favor, proporciona una URL de imagen válida (jpg, jpeg, png, webp, gif o bmp).");
      setShowErrorNotification(true);
      setTimeout(() => setShowErrorNotification(false), 3000);
      return; // No proceder si la URL de la imagen no es válida
    }

    try {
      const locationData = await fetchCreateLocation(formData);
      if (locationData) {
        setNotificationMessage('Ubicación creada exitosamente');
        setShowNotification(true);
        setTimeout(() => {
          router.push('/location');
        }, 2000);
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Error desconocido.");
      setShowErrorNotification(true);
      setTimeout(() => setShowErrorNotification(false), 3000);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Crear Nueva Ubicación</h2>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 py-20 space-y-6 rounded-lg border border-gray-300 bg-white p-8 shadow-xl">
          <div>
            <label htmlFor="name" className="sr-only">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 py-5 px-4 text-gray-500 text-sm shadow-sm focus:outline-none transition duration-300"
              placeholder="Nombre"
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="sr-only">Dirección</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 py-5 px-4 text-gray-500 text-sm shadow-sm focus:outline-none transition duration-300"
              placeholder="Dirección"
              required
            />
          </div>
          <div>
            <label htmlFor="imgUrl" className="sr-only">URL de Imagen</label>
            <input
              type="text"
              name="imgUrl"
              value={formData.imgUrl}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 py-5 px-4 text-gray-500 text-sm shadow-sm focus:outline-none transition duration-300"
              placeholder="URL de Imagen"
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
            >
              Crear Ubicación
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
    </div>
  );
}
