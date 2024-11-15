"use client";

import React, { useContext, useEffect, useState } from "react";
import { IProductView } from "@/Interfaces/IUser";
import CardProduct from "./cardProduct";
import { UserContext } from "@/context/UserContext";
import { fetchGetProducts, fetchUpdateProduct } from "../Fetchs/ProductsFetchs/ProductsFetchs";

export default function AllProducts() {
    const [products, setProducts] = useState<IProductView[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isTokenLoaded, setIsTokenLoaded] = useState<boolean>(false);
    const [filteredProducts, setFilteredProducts] = useState<IProductView[]>([]);
    const [selectedType, setSelectedType] = useState<string>('');
    const [editingProduct, setEditingProduct] = useState<IProductView | null>(null);
    const { token } = useContext(UserContext);

    useEffect(() => {
        if (token) {
            setIsTokenLoaded(true);
        } else {
            setIsTokenLoaded(false);
        }
    }, [token]);

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

        if (isTokenLoaded) {
            getProducts();
        }
    }, [isTokenLoaded, token]);

    useEffect(() => {
        let filtered = [...products];
        if (selectedType !== '') {
            filtered = filtered.filter((product) => product.tipo === selectedType);
        }
        setFilteredProducts(filtered);
    }, [products, selectedType]);

    const toggleProductStatus = (id: string) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id && product.id === id 
                    ? { ...product, Activo: !product.Activo }
                    : product
            )
        );
    };

    const handleEdit = (id: string) => {
        const productToEdit = products.find((product) => product.id === id);
        if (productToEdit) {
            setEditingProduct(productToEdit);
        } else {
            console.error("Invalid product ID");
        }
    };

    const handleEditSubmit = async (updatedProduct: IProductView) => {
        if (!token) return;

        try {
            await fetchUpdateProduct(updatedProduct.id, updatedProduct);
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === updatedProduct.id ? updatedProduct : product
                )
            );
            setEditingProduct(null); // Reset after submission
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleDelete = (id: string) => {
        console.log("Product to delete", id);
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-center text-gray-800 my-10 pb-4 border-b-4 border-gray-300 shadow-2xl">
                Productos y Servicios
            </h1>

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
                        onDelete={() => handleDelete(product.id)}
                        isEditing={editingProduct?.id === product.id}
                        onEditSubmit={handleEditSubmit}
                    />
                ))}
            </div>
        </div>
    );
}
