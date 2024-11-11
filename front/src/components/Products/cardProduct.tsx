"use client"
import { IProduct } from "@/Interfaces/IUser";
import Image from "next/image";
import Link from "next/link";

interface CardProductProps {
    product: IProduct;
    onToggleStatus: () => void;
    onEdit: () => void;
}

const CardProduct: React.FC<CardProductProps> = ({ product, onToggleStatus, onEdit }) => {
    return (
        <div className="border m-4 rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
        <Link href={`/adminDashboard/products/${product.id}`}>
            <div className="w-full h-48 relative cursor-pointer overflow-hidden rounded-t-xl">
            <Image
                src={product.foto}
                alt={product.nombre}
                layout="fill"
                priority
                className="object-contain transform transition-transform duration-300 hover:scale-110"
            />
            </div>
        </Link>
        <h2 className="text-xl font-semibold mt-3 text-gray-800">{product.nombre}</h2>
        <p className="text-gray-600 text-sm">Tipo: {product.tipo}</p>
        <p className="text-gray-600 text-sm">Ubicación: {product.ubicacion.name}</p>
        <p className="text-gray-500 mt-2 text-sm">Activo: {product.Activo ? 'Sí' : 'No'}</p>
        <div className="flex justify-between mt-4">
            <button
                onClick={onToggleStatus}
                className={`px-4 py-2 rounded-lg text-white font-semibold transition-colors duration-300 ${product.Activo ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
            >
                {product.Activo ? 'Desactivar' : 'Activar'}
            </button>
            <button
                onClick={onEdit}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300"
            >
                Editar
            </button>
        </div>
    </div>
    

    );
};

export default CardProduct;

