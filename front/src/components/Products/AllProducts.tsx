"use client";
import React, { useState, useEffect } from "react";
import { IProduct } from "@/Interfaces/IUser";
import CardProduct from "./cardProduct";
import { useProducts } from "./useProduct";
import Link from "next/link";

export default function AllProducts() {
  const { products, loading, toggleProductStatus, handleEditSubmit } =
    useProducts();
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [editingProduct, setEditingProduct] = useState<string | null>(null);

  useEffect(() => {
    let filtered = [...products];
    if (selectedType !== "") {
      filtered = filtered.filter((product) => product.tipo === selectedType);
    }
    setFilteredProducts(filtered);
  }, [products, selectedType]);

  const handleEdit = (productId: string) => {
    setEditingProduct(productId); // Poner el producto en modo de edición
  };

  const handleSaveEdit = (updatedProduct: IProduct) => {
    setEditingProduct(null); // Salir del modo de edición
    handleEditSubmit(updatedProduct); // Guardar el producto actualizado
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-gray-800 my-10 pb-4 border-b-4 border-gray-300 shadow-2xl">
        Productos y Servicios
      </h1>
      <Link href="/adminDashboard/upload"
      className="bg-[#CD9C8A] text-white hover:bg-[#c49f92] p-2 m-2 rounded hover:cursor-pointer">Cargar nuevo producto o servicio</Link>

      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        className="p-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400"
      >
        <option value="">Filtrar por tipo</option>
        {[...new Set(products.map((product) => product.tipo))].map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {filteredProducts.map((product) => (
          <CardProduct
            key={product.id}
            product={product}
            onToggleStatus={() => toggleProductStatus(product.id)}
            onEdit={() => handleEdit(product.id)}
            onDelete={() => {}}
            isEditing={editingProduct === product.id} // Comprobar si es el producto en edición
            onEditSubmit={handleSaveEdit} // Guardar los cambios
            onSaveEdit={() => {}} //aqui cambie
          />
        ))}
      </div>
    </div>
  );
}
