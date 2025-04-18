/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { IProduct, ICardProductProps } from "@/Interfaces/IUser";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const CardProduct: React.FC<ICardProductProps> = ({
  product,
  onToggleStatus,
  onEdit,
  isEditing,
  onEditSubmit,
  onSaveEdit,
}) => {
  const [editedProduct, setEditedProduct] = useState<IProduct>({
    ...product,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (editedProduct.nombre && editedProduct.foto && editedProduct.ubicacion && editedProduct.precio) {
      onEditSubmit(editedProduct); // Siempre definido
      onSaveEdit?.(editedProduct); // Pasa el objeto editedProduct como argumento
    } else {
      alert("Por favor, complete los campos de nombre, foto y ubicación.");
    }
  };
  

  const handleToggleStatus = () => {
    if (onToggleStatus && product.id) {
      onToggleStatus(product.id); 
    }
  };

  const handleEdit = () => {
    if (onEdit && product.id) {
      onEdit(product.id); 
    }
  };


  return (
    <div className="border m-4 rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
      <Link href={`/adminDashboard/products/${product.id || "#"}`}>
        <h2 className="bg-[#c49f92] text-white inline-block px-2 py-1 rounded-md shadow-md">
          {product.ubicacion?.name || "Ubicación no disponible"}
        </h2>
      </Link>

      <div className="flex flex-col items-center text-center mt-3">
        {isEditing ? (
          <input
            type="text"
            name="nombre"
            value={editedProduct.nombre || ""} // Asegurarse de que el valor sea una cadena vacía si es undefined
            onChange={handleChange}
            className="text-xl font-semibold text-gray-800 border rounded p-1"
          />
        ) : (
          <h2 className="text-xl font-semibold text-gray-800">
            {product.nombre || "Producto sin nombre"}
          </h2>
        )}
        
        {isEditing ? (
          <input
            type="number"
            name="precio"
            value={editedProduct.precio || ""}
            onChange={handleChange}
            className="text-xl font-semibold text-gray-800 border rounded p-1"
          />
        ) : (
          <h2 className="text-xl font-semibold text-gray-800">
            $ {product.precio || "Producto sin precio"}
          </h2>
        )}

        {isEditing ? (
          <select
            name="tipo"
            value={editedProduct.tipo || ""} // Verificar que tipo tenga un valor válido
            onChange={handleChange}
            className="border rounded p-1 mt-2"
          >
            <option value="Consumible">Consumible</option>
            <option value="Servicio">Servicio</option>
          </select>
        ) : (
          <p className="text-gray-600 text-sm">Tipo: {product.tipo || "No especificado"}</p>
        )}
      </div>

      <p className="text-gray-500 mt-2 text-sm text-center">
        Activo: {product.Activo ? "Sí" : "No"}
      </p>

      <div className="flex justify-between mt-4">
        <button
          onClick={handleToggleStatus} // Aquí se pasa la función envolvente
          className={`px-4 py-2 rounded-lg text-white font-semibold transition-colors duration-300 ${
            product.Activo
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {product.Activo ? "Desactivar" : "Activar"}
        </button>

        {isEditing ? (
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Guardar
          </button>
        ) : (
          <button
            onClick={handleEdit} // Aquí se pasa la función envolvente
            className="px-4 py-2 bg-[#c49f92] text-white rounded-lg hover:bg-[#866b62] transition-colors duration-300"
          >
            Editar
          </button>
        )}

        
      </div>
    </div>
  );
};

export default CardProduct;
