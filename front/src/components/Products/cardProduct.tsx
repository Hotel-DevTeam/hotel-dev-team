import { IProduct } from "@/Interfaces/IUser";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaTrashAlt } from 'react-icons/fa';  

interface CardProductProps {
    product: IProduct;
    onToggleStatus: () => void;
    onEdit: () => void;
    onDelete: () => void; 
    isEditing: boolean;
    onEditSubmit: (updatedProduct: IProduct) => void;
}

const CardProduct: React.FC<CardProductProps> = ({ 
    product, 
    onToggleStatus, 
    onEdit, 
    onDelete, 
    isEditing, 
    onEditSubmit 
}) => {
    const [editedProduct, setEditedProduct] = useState<IProduct>(product);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onEditSubmit(editedProduct);
    };

    return (
        <div className="border m-4 rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
            <Link href={`/adminDashboard/products/${product.id}`}>
                <div className="w-full h-48 relative cursor-pointer overflow-hidden rounded-t-xl flex justify-center items-center">
                   <h2>{product.ubicacion.id}</h2>
                    <Image
                        src={product.foto}
                        alt={product.nombre}
                        width={200}
                        height={200}
                        priority
                        className="object-contain transform transition-transform duration-300 hover:scale-110"
                    />
                </div>
                <h2>{product.ubicacion.id}</h2>
            </Link>
            <div className="flex flex-col items-center text-center mt-3">
                {isEditing ? (
                    <input
                        type="text"
                        name="nombre"
                        value={editedProduct.nombre}
                        onChange={handleChange}
                        className="text-xl font-semibold text-gray-800 border rounded p-1"
                    />
                ) : (
                    <h2 className="text-xl font-semibold text-gray-800">{product.nombre}</h2>
                    
                )}
                
                {isEditing ? (
                    <select
                        name="tipo"
                        value={editedProduct.tipo}
                        onChange={handleChange}
                        className="border rounded p-1 mt-2"
                    >
                        <option value="Consumible">Consumible</option>
                        <option value="Servicio">Servicio</option>
                    </select>
                ) : (
                    <p className="text-gray-600 text-sm">Tipo: {product.tipo}</p>
                )}
            </div>
            <p className="text-gray-500 mt-2 text-sm text-center">Activo: {product.Activo ? 'Sí' : 'No'}</p>
            <div className="flex justify-between mt-4">
                <button
                    onClick={onToggleStatus}
                    className={`px-4 py-2 rounded-lg text-white font-semibold transition-colors duration-300 ${product.Activo ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                >
                    {product.Activo ? 'Desactivar' : 'Activar'}
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
                        onClick={onEdit}
                        className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300"
                    >
                        Editar
                    </button>
                )}
                <button
                    onClick={onDelete}
                    className="p-2 rounded-full bg-gray-600 hover:bg-gray-900 transition-colors duration-300"
                >
                    <FaTrashAlt className="text-white" size={20} />
                </button>
            </div>
        </div>
    );
};

export default CardProduct;
