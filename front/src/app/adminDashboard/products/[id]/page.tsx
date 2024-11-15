"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";  
import { fetchProductById } from "@/components/Fetchs/ProductsFetchs/ProductsFetchs";
import { IProductView } from "@/Interfaces/IUser";
import CardProduct from "@/components/Products/cardProduct";

export default function ProductDetail() {
    const { id } = useParams();  
    const [product, setProduct] = useState<IProductView | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getProductDetail = async () => {
            if (typeof id === "string") {
                try {
                    const data = await fetchProductById(id);
                    setProduct(data);
                } catch (error) {
                    console.error("Error fetching product details:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                console.error("Invalid product ID");
                setLoading(false);
            }
        };

        getProductDetail();
    }, [id]);

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

    const handleToggleStatus = () => {
        if (product) {
            const updatedProduct = { ...product, Activo: !product.Activo };
            setProduct(updatedProduct);
            console.log("Producto actualizado:", updatedProduct);
        }
    };

    const handleEdit = () => {
        console.log("Editando el producto", product?.id);
    };
 
    const handleDelete = () => {
        console.log("Eliminando el producto", product?.id);
    };

    return (
        <div className="mt-28 mb-24">
            <CardProduct
                product={product}
                onToggleStatus={handleToggleStatus}
                onEdit={handleEdit}
                onDelete={handleDelete}
                
            />
        </div>
    );
}
