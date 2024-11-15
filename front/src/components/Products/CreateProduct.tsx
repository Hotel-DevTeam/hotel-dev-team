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
    tipo: Tipo.Consumible,
    nombre: "",
    Activo: true,
    foto: "",
    ubicacion: { id: "" },
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

  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setProduct({
      ...product,
      ubicacion: { id: event.target.value },
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
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
              Tipo de producto:
            </label>
            <select
              id="tipo"
              value={product.tipo}
              onChange={(e) => setProduct({ ...product, tipo: e.target.value as Tipo })}
              className="w-full rounded-lg border text-gray-500 border-gray-300 py-5 px-4 text-sm shadow-sm focus:outline-none transition duration-300"
            >
              <option value={Tipo.Consumible}>Consumible</option>
              <option value={Tipo.Servicio}>Servicio</option>
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
              id="nombre"
              type="text"
              value={product.nombre}
              onChange={(e) => setProduct({ ...product, nombre: e.target.value })}
              required
              className="w-full rounded-lg border text-gray-500 border-gray-300 py-5 px-4 text-sm shadow-sm focus:outline-none transition duration-300"
              placeholder="Nombre del producto"
            />
          </div>

          <div>
            <label
              htmlFor="foto"
              className="block text-sm font-medium text-gray-700"
            >
              URL de la foto:
            </label>
            <input
              id="foto"
              type="url"
              value={product.foto}
              onChange={(e) => setProduct({ ...product, foto: e.target.value })}
              required
              className="w-full rounded-lg border text-gray-500 border-gray-300 py-5 px-4 text-sm shadow-sm focus:outline-none transition duration-300"
              placeholder="URL de la foto"
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
              required
              className="w-full rounded-lg border text-gray-500 border-gray-300 py-5 px-4 text-sm shadow-sm focus:outline-none transition duration-300"
            >
              <option value="">Seleccione una ubicación</option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="Activo"
              className="block text-sm font-medium text-gray-700"
            >
              Activo:
            </label>
            <input
              id="Activo"
              type="checkbox"
              checked={product.Activo}
              onChange={(e) => setProduct({ ...product, Activo: e.target.checked })}
              className="w-full rounded-lg border text-gray-500 border-gray-300 py-5 px-4 text-sm shadow-sm focus:outline-none transition duration-300"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
            >
              Crear
            </button>
          </div>
        {showNotification && (
                        <div className="absolute top-12 left-0 right-0 mx-auto w-max">
                            <NotificationsForms message={notificationMessage} />
                        </div>
        )}
        </form>
      </div>
    </div>
  );
};

export default UploadProductComponent;
