"use client";

import React, { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import { IProduct } from "@/Interfaces/IUser"; // Ajusta la ruta de tu interfaz
import CardProduct from "@/components/Products/cardProduct";
import { UserContext } from "@/context/UserContext";
import { fetchGetProducts } from "@/components/Fetchs/ProductsFetchs/ProductsFetchs";

export default function LocationProducts() {
  const { token } = useContext(UserContext);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para indicar si está cargando
  const params = useParams();
  const locationId = params?.id;
  console.log("productos en el componente", products)
  // Obtener productos al montar el componente
  useEffect(() => {
    const getProducts = async () => {
      if (!token) {
        console.error("No token found");
        setIsLoading(false); // Finaliza la carga si no hay token
        return;
      }
      try {
        const data = await fetchGetProducts(token);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false); // Finaliza la carga después de obtener los datos
      }
    };

    if (token) {
      getProducts();
    } else {
      setIsLoading(false);
    }
  }, [token]);

  // Filtrar productos por ubicación
  useEffect(() => {
    if (locationId && products.length > 0) {
      const filtered = products.filter(
        (product) => product.ubicacion?.id === locationId
      );
      setFilteredProducts(filtered);
    }
  }, [products, locationId]);

  if (isLoading) {
    return <p>Cargando productos...</p>;
  }

  if (!filteredProducts.length) {
    return <p>No se encontraron productos para esta ubicación.</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-gray-800 my-10 pb-4 border-b-4 border-gray-300 shadow-2xl">
        Productos y Servicios en esta Ubicación
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {filteredProducts.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
