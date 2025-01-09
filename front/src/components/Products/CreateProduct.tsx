"use client";
import { useState, useEffect } from "react";
import { fetchUploadProduct } from "../Fetchs/ProductsFetchs/ProductsFetchs";
import { ICreateProduct, ILocation,  Tipo } from "@/Interfaces/IUser";
import { fetchLocations } from "../Fetchs/UserFetchs/UserFetchs";
import { NotificationsForms } from "../Notifications/NotificationsForms";
import Link from "next/link";

const UploadProductComponent: React.FC = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [product, setProduct] = useState<ICreateProduct>({
    
    tipo: Tipo.Consumible,
    nombre: "",
    Activo: true,
    precio:0,
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
        ubicacion: selectedLocation,
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
    console.log("Datos enviados:", product);
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

return(
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8 sm:px-6 lg:px-8 relative">
      <div className="w-full max-w-md">
        <Link href={"/adminDashboard/products"}
            className="absolute top-0 left-4 inline-block rounded bg-[#CD9C8A] text-white px-4 py-2 text-xs sm:px-10 sm:py-3 sm:text-sm font-medium hover:bg-transparent hover:text-[#FF5100] hover:border-[#CD9C8A] hover:border-2 focus:outline-none focus:ring active:text-[#FF5100] transition-all duration-300"
          >
            Ver Productos y Servicios
            </Link>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#CD9C8A] sm:text-4xl">
            Crear productos o servicios
          </h1>
          <p className="mt-2 text-gray-500">
            Llena los campos para registrar un nuevo producto o servicio
          </p>
    </div>

          <form
        onSubmit={handleSubmit}
        className="mt-4 py-8 space-y-4 rounded-md border border-[#CD9C8A] bg-white p-6 shadow-md"
      >
        <div>
          <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
            Tipo de Producto:
          </label>
          <select
            id="tipo"
            value={product.tipo}
            onChange={(e) => setProduct({ ...product, tipo: e.target.value as Tipo })}
            className="mt-1 block w-full rounded-md border border-[#CD9C8A] py-2 px-3 text-sm text-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5100] transition duration-300"
          >
            <option value="Consumible">Consumible</option>
            <option value="Servicio">Servicio</option>
          </select>
        </div>

        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
            Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            value={product.nombre}
            onChange={(e) => setProduct({ ...product, nombre: e.target.value })}
            className="mt-1 block w-full rounded-md border border-[#CD9C8A] py-2 px-3 text-sm text-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5100] transition duration-300"
          />
        </div>

        <div>
          <label htmlFor="precio" className="block text-sm font-medium text-gray-700">
            Precio:
          </label>
          <input
            type="text"
            id="precio"
            value={product.precio}
            onChange={(e) =>
              setProduct({
                ...product,
                precio: parseFloat(e.target.value) || 0,
              })
            }
            className="mt-1 block w-full rounded-md border border-[#CD9C8A] py-2 px-3 text-sm text-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5100] transition duration-300"
          />
        </div>

        <div>
          <label htmlFor="foto" className="block text-sm font-medium text-gray-700">
            Foto:
          </label>
          <input
            id="foto"
            type="text"
            value={product.foto}
            onChange={(e) => setProduct({ ...product, foto: e.target.value })}
            className="mt-1 block w-full rounded-md border border-[#CD9C8A] py-2 px-3 text-sm text-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5100] transition duration-300"
          />
        </div>

        <div>
          <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700">
            Ubicación:
          </label>
          <select
            id="ubicacion"
            value={product.ubicacion.id}
            onChange={handleLocationChange}
            className="mt-1 block w-full rounded-md border border-[#CD9C8A] py-2 px-3 text-sm text-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5100] transition duration-300"
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
          className="w-full py-2 px-3 bg-[#FF5100] text-white font-bold text-sm rounded-md hover:bg-transparent hover:text-[#FF5100] border border-[#FF5100] transition duration-300"
        >
          Crear
        </button>
      </form>

      {showNotification && <NotificationsForms message={notificationMessage} />}

  </div>
</div>
)}

export default UploadProductComponent;
