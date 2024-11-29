/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { IProduct, ICardProductProps } from "@/Interfaces/IUser";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const CardProduct: React.FC<ICardProductProps> = ({
  product,
  onToggleStatus,
  onEdit,
  onDelete,
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
    if (editedProduct.nombre && editedProduct.foto && editedProduct.ubicacion) {
      onEditSubmit(editedProduct); // Siempre definido
      onSaveEdit?.(editedProduct); // Verifica si está definido
    } else {
      alert("Por favor, complete los campos de nombre, foto y ubicación.");
    }
  };

  const handleToggleStatus = () => {
    if (onToggleStatus && product.id) {
      onToggleStatus(product.id); // Argumento explícito
    }
  };

  const handleEdit = () => {
    if (onEdit && product.id) {
      onEdit(product.id); // Argumento explícito
    }
  };

  const handleDelete = () => {
    if (onDelete && product.id) {
      onDelete(product.id); // Argumento explícito
    }
  };

  return (
    <div className="border m-4 rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
      <Link href={`/adminDashboard/products/${product.id || "#"}`}>
        <div className="w-full h-48 relative cursor-pointer overflow-hidden rounded-t-xl flex justify-center items-center">
          <Image
            src={product.foto || "/default-image.jpg"} // Default image if foto is undefined
            alt={product.nombre || "Producto sin nombre"}  // Default alt text if nombre is undefined
            width={200}
            height={200}
            priority
            className="object-contain transform transition-transform duration-300 hover:scale-110"
          />
        </div>
        <h2 className="bg-black text-white inline-block px-2 py-1 rounded-md shadow-md">
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
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300"
          >
            Editar
          </button>
        )}

        <button
          onClick={handleDelete} // Aquí se pasa la función envolvente
          className="p-2 rounded-full bg-gray-600 hover:bg-gray-900 transition-colors duration-300"
        >
          <FaTrashAlt className="text-white" size={20} />
        </button>
      </div>
    </div>
  );
};

export default CardProduct;
