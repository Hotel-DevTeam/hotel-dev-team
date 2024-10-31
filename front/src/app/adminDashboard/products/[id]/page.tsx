/*"use client";
import { Product } from "@/Interfaces/interfaces";
import React, { useEffect, useState } from "react";


//mediante un botón, desactivar el producto, o volver a activar un producto desactivado.
// También se deberían poder editar los campos ya creados desde la misma

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product| null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProductDetail = async () => {
      try {
        const data = await fetchProductDetail(params.id);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    getProductDetail();
  }, [params.id]);



  if (loading) {
    return <div>Cargando...</div>; 
  }

  if (!product) {
    return <div>No se encontró el producto.</div>;
  }

  const { name, price, category } = product;

  return (
    <div className="mt-28 mb-24">
      <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden mt-12">
        <div className="py-6 px-8">
          <h2 className="text-teal-600 font-bold text-xl mb-2 hover:text-purple-800 hover:cursor-pointer">
            {name}
          </h2>
          <p className="text-gray-700 tracking-wide mb-4">{category}</p>
          <span className="text-lg font-bold text-purple-800">
            {price}
          </span>
        </div>

        <div className="p-4 text-center">
          <div className="flex justify-between gap-2">
            <button
              onClick={() => handleStatus(product.id)}
              className="flex-1 py-2 bg-teal-600 text-white font-medium rounded-full shadow hover:bg-purple-900 transition duration-300 ease-in-out"
            >
              Activar/Desactivar
            </button>
            <button
              onClick={() => handleEdit(product.id)}
              className="flex-1 py-2 bg-teal-600 text-white font-medium rounded-full shadow hover:bg-purple-900 transition duration-300 ease-in-out"
            >
              Editar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}*/