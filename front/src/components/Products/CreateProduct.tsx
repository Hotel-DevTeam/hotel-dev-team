"use client";
import { useState, useEffect } from "react";
import { fetchUploadProduct } from "../Fetchs/ProductsFetchs/ProductsFetchs";
import { ILocation, IProduct, Tipo } from "@/Interfaces/IUser";
import { fetchLocations } from "../Fetchs/UserFetchs/UserFetchs";
import { NotificationsForms } from "../Notifications/NotificationsForms";

const UploadProductComponent: React.FC = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [product, setProduct] = useState<IProduct>({
    id: "", // Se agrega un valor inicial para "id"
    tipo: Tipo.Consumible,
    nombre: "",
    Activo: true,
    foto: "",
    ubicacion: { id: "", name: "", address: "", imgUrl: "" },
  });

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const data = await fetchLocations();
        setLocations(data);
      } catch (error) {
        console.error("Error al cargar ubicaciones:", error);
      }
    };
    loadLocations();
  }, []);

  const handleLocationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedLocation = locations.find(
      (loc) => loc.id === event.target.value
    );
    if (selectedLocation) {
      setProduct({
        ...product,
        ubicacion: selectedLocation, // Asignar toda la ubicación
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!product.nombre || !product.foto || !product.ubicacion.id) {
      setNotificationMessage("Por favor, complete todos los campos.");
      setShowNotification(true);
      return;
    }

    try {
      const response = await fetchUploadProduct(product);
      if (response) {
        setNotificationMessage("Creado correctamente");
        setShowNotification(true);
      } else {
        setNotificationMessage("Producto o Servicio Inválido");
        setShowNotification(true);
      }
    } catch {
      setNotificationMessage("Ocurrió un error, intenta de nuevo");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-2xl">
            Crear productos o servicios
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 py-20 space-y-6 rounded-lg border border-gray-300 bg-white p-8 shadow-xl"
        >
          <div>
            <label
              htmlFor="tipo"
              className="block text-sm font-medium text-gray-700"
            >
              Tipo de Producto:
            </label>
            <select
              id="tipo"
              value={product.tipo}
              onChange={(e) =>
                setProduct({ ...product, tipo: e.target.value as Tipo })
              }
              className="mt-1 block w-full rounded-lg border-gray-300 py-2 px-4 shadow-sm focus:ring-1 focus:ring-gray-500 sm:text-sm"
            >
              <option value="Consumible">Consumible</option>
              <option value="Servicio">Servicio</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre:
            </label>
            <input
              type="text"
              id="nombre"
              value={product.nombre}
              onChange={(e) =>
                setProduct({ ...product, nombre: e.target.value })
              }
              className="mt-1 block w-full rounded-lg border-gray-300 py-2 px-4 shadow-sm focus:ring-1 focus:ring-gray-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="foto"
              className="block text-sm font-medium text-gray-700"
            >
              Foto:
            </label>
            <input
              id="foto"
              type="text"
              value={product.foto}
              onChange={(e) => setProduct({ ...product, foto: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 py-2 px-4 shadow-sm focus:ring-1 focus:ring-gray-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="ubicacion"
              className="block text-sm font-medium text-gray-700"
            >
              Ubicación:
            </label>
            <select
              id="ubicacion"
              value={product.ubicacion.id}
              onChange={handleLocationChange}
              className="mt-1 block w-full rounded-lg border-gray-300 py-2 px-4 shadow-sm focus:ring-1 focus:ring-gray-500 sm:text-sm"
            >
              <option value="">Selecciona una ubicación</option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Crear
          </button>
        </form>

        {showNotification && (
          <NotificationsForms message={notificationMessage} />
        )}
      </div>
    </div>
  );
};

export default UploadProductComponent;
