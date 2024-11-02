"use client";
import { fetchProductById } from "@/components/Fetchs/ProductsFetchs/ProductsFetchs";
import { IProduct } from "@/Interfaces/IUser";
import React, { useEffect, useState } from "react";
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

    const handleToggleStatus = (id: string) => {
        // Lógica para activar/desactivar el producto
        console.log("Toggle status for product ID:", id);
    };

    const handleEdit = (id: string) => {
        // Lógica para editar el producto
        console.log("Edit product ID:", id);
    };

    return (
        <div className="mt-28 mb-24">
            <CardProduct 
                product={product} 
                onToggleStatus={handleToggleStatus} 
                onEdit={handleEdit} 
            />
        </div>
    );
}
