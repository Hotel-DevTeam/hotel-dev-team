"use client"
import React, { useEffect, useState, useContext } from "react";
import { fetchGetProducts } from "../Fetchs/ProductsFetchs/ProductsFetchs";
import CardProduct from "./cardProduct";
import { IProduct } from "@/Interfaces/IUser";
import { UserContext } from "@/context/UserContext"; 

export default function AllProducts() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { token } = useContext(UserContext); 

    useEffect(() => {
        const getProducts = async () => {
            if (!token) {
                console.error("No token found");
                setLoading(false); 
                return;
            }

            try {
                const data = await fetchGetProducts(token);
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false); 
            }
        };

        getProducts();
    }, [token]); 

    const handleToggleStatus = (id: string) => {
     
        console.log("Toggle status for product ID:", id);
    };

    const handleEdit = (id: string) => {
     
        console.log("Edit product ID:", id);
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>; // Muestra un indicador de carga
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(product => (
                <CardProduct 
                    key={product.id} 
                    product={product} 
                    onToggleStatus={handleToggleStatus} 
                    onEdit={handleEdit} 
                />
            ))}
        </div>
    );
}
