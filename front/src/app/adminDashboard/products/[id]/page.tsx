"use client";
import React, { useEffect, useState } from "react";
import { IProduct } from "@/Interfaces/IUser";
import CardProduct from "@/components/Products/cardProduct";
import { mockProducts } from "@/components/Products/mockPrueba"; 

export default function ProductDetail({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState<IProduct | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getProductDetail = async () => {
            try {
                // Evitar la actualización del estado directamente en renderizado
                const foundProduct = mockProducts.find(product => product.id === params.id);
                if (foundProduct) {
                    setProduct(foundProduct);  
                } else {
                    console.error("Producto no encontrado");
                }
            } catch (error) {
                console.error("Error al obtener los detalles del producto:", error);
            } finally {
                setLoading(false); // Cambia el estado de carga después de la ejecución asíncrona
            }
        };

        // Verificar si params.id está disponible antes de ejecutar la solicitud
        if (params.id) {
            getProductDetail();
        }

    }, [params.id]); // Se asegura de que solo se ejecute cuando `params.id` cambie

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (!product) {
        return <div>No se encontró el producto.</div>;
    }

    return (
        <div className="mt-28 mb-24">
            <CardProduct product={product} />
        </div>
    );
}



/*import React, { useEffect, useState } from "react";
import { fetchProductById } from "@/components/Fetchs/ProductsFetchs/ProductsFetchs";
import { IProduct } from "@/Interfaces/IUser";
import CardProduct from "@/components/Products/cardProduct";

export default function ProductDetail({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState<IProduct | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getProductDetail = async () => {
            try {
                const data = await fetchProductById(params.id);
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
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (!product) {
        return <div>No se encontró el producto.</div>;
    }

    return (
        <div className="mt-28 mb-24">
            <CardProduct product={product} />
        </div>
    );
}*/