"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { IProduct } from "@/Interfaces/IUser";
import CardProduct from "@/components/Products/cardProduct";
import { useProducts } from "@/components/Products/useProduct";

export default function LocationProducts() {
  const { products, loading, toggleProductStatus, handleEditSubmit } =
    useProducts(); // Aquí ya tienes handleEditSubmit
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null); // Para saber qué producto está en edición
  const params = useParams();
  const locationId = params?.id || ""; // Si `id` es undefined, asignamos una cadena vacía

  useEffect(() => {
    if (locationId && products.length > 0) {
      const filtered = products.filter(
        (product) => product.ubicacion?.id === locationId
      );
      setFilteredProducts(filtered);
    }
  }, [products, locationId]);

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (!filteredProducts.length) {
    return <p>No se encontraron productos para esta ubicación.</p>;
  }

  const handleEdit = (productId: string) => {
    setIsEditing(productId); // Marca el producto como en edición
  };

  const handleSaveEdit = (updatedProduct: IProduct) => {
    handleEditSubmit(updatedProduct); // Guardar el producto actualizado
    setIsEditing(null); // Salir del modo de edición
  };

  const handleDelete = (productId: string) => {
    // Lógica de eliminación del producto (debe ser implementada)
    console.log("Producto eliminado:", productId);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-gray-800 my-10 pb-4 border-b-4 border-gray-300 shadow-2xl">
        Productos y Servicios en esta Ubicación
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {filteredProducts.map((product) => (
          <CardProduct
            key={product.id}
            product={product}
            onToggleStatus={() => toggleProductStatus(product.id)}

            onEdit={() => handleEdit(product.id)}
            isEditing={isEditing === product.id}
            onEditSubmit={handleSaveEdit}
            onDelete={() => handleDelete(product.id)}
            onSaveEdit={handleSaveEdit}

          />
        ))}
      </div>
    </div>
  );
}
