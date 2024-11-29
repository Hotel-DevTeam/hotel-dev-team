// src/app/location/[id]/products/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { IProduct } from "@/Interfaces/IUser";
import CardProduct from "@/components/Products/cardProduct";
import { useProducts } from "@/components/Products/useProduct";

export default function LocationProducts() {
  const { products, loading, toggleProductStatus, handleEditSubmit } =
    useProducts();
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const params = useParams();
  const locationId = params?.id;

  useEffect(() => {
    if (locationId && products.length > 0) {
      const filtered = products.filter(
        (product) => product.ubicacion?.id === locationId
      );
      setFilteredProducts(filtered);
    }
  }, [products, locationId]);

  const handleEdit = (productId: string) => {
    setIsEditing(productId);
  };

  const handleSaveEdit = (updatedProduct: IProduct) => {
    handleEditSubmit(updatedProduct);
    setIsEditing(null);
  };

  const handleDelete = (productId: string) => {
    setFilteredProducts((prev) =>
      prev.filter((product) => product.id !== productId)
    );

    fetch(`/api/products/${productId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo eliminar el producto.");
        }
      })
      .catch((error) => {
        console.error("Error al eliminar el producto:", error);
      });
  };

  if (loading) {
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
          <CardProduct
            key={product.id}
            product={product}
            onToggleStatus={(id) => toggleProductStatus(id)}
            onEdit={(id) => handleEdit(id)}
            onDelete={(id) => handleDelete(id)}
            isEditing={isEditing === product.id}
            onEditSubmit={handleSaveEdit}
            onSaveEdit={(updatedProduct) => handleSaveEdit(updatedProduct)}
          />
        ))}
      </div>
    </div>
  );
}
