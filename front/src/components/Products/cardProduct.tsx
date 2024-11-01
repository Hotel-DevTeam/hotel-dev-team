"use client";
import Link from 'next/link';
import { ICardProductProps } from '@/Interfaces/IUser';
import Image from 'next/image';

const CardProduct: React.FC<ICardProductProps> = ({ product, onToggleStatus, onEdit }) => {
    return (
        <div className="border rounded-lg p-4 shadow">
            <Link href={`/products/${product.id}`}>
                <div className="w-full h-48 relative cursor-pointer">
                    <Image
                        src={product.foto}
                        alt={product.nombre}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg"
                    />
                </div>
            </Link>
            <h2 className="text-xl font-semibold mt-2">{product.nombre}</h2>
            <p className="text-gray-600">Tipo: {product.tipo}</p>
            <p className="text-gray-600">Ubicación: {product.ubicacion.name}</p>
            <p className="text-gray-500 mt-2">Activo: {product.Activo ? 'Sí' : 'No'}</p>
            <div className="flex justify-between mt-4">
                <button 
                    onClick={() => onToggleStatus(product.id)}
                    className={`px-4 py-2 rounded ${product.Activo ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
                >
                    {product.Activo ? 'Desactivar' : 'Activar'}
                </button>
                <button
                    onClick={() => onEdit(product.id)}
                    className="px-4 py-2 bg-teal-600 text-white rounded"
                >
                    Editar
                </button>
            </div>
        </div>
    );
};

export default CardProduct;
