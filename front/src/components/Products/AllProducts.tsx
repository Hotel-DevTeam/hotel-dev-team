"use client" 
/*import React, { useEffect, useState, useContext } from "react";
import { fetchGetProducts } from "../Fetchs/ProductsFetchs/ProductsFetchs";
import CardProduct from "./cardProduct";
import { IProduct } from "@/Interfaces/IUser";
import { UserContext } from "@/context/UserContext"; */
import React, { useEffect, useState } from "react";
import { IProduct } from "@/Interfaces/IUser";
import CardProduct from "./cardProduct";
import { mockProducts } from "./mockPrueba";

export default function AllProducts() {
    const [products, setProducts] = useState<IProduct[]>(mockProducts);
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(mockProducts);
    const [loading] = useState<boolean>(false);
    const [selectedLocation, setSelectedLocation] = useState<string>('');
    const [selectedType, setSelectedType] = useState<string>('');

    // Función para cambiar el estado 'Activo' de un producto
    const toggleProductStatus = (id: string) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id
                    ? { ...product, Activo: !product.Activo }
                    : product
            )
        );
    };

    // Función para editar un producto
    const editProduct = (id: string) => {
        // Aquí puedes redirigir al usuario a la página de edición del producto
        console.log("Edit product with ID:", id);
    };

    useEffect(() => {
        setProducts(mockProducts); // Usamos mockProducts para la prueba
    }, []);

    // Filtrar los productos según los filtros seleccionados
    useEffect(() => {
        let filtered = products;

        if (selectedLocation) {
            filtered = filtered.filter((product) => product.ubicacion.name === selectedLocation);
        }

        if (selectedType) {
            filtered = filtered.filter((product) => product.tipo === selectedType);
        }

        setFilteredProducts(filtered); // Actualiza los productos filtrados
    }, [selectedLocation, selectedType, products]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-center text-gray-800 my-10 pb-4 border-b-4 border-gray-300 shadow-2xl">
                Productos y Servicios
            </h1>

            {/* Filtros con estilos mejorados */}
            <div className="flex justify-between items-center p-4 mb-8">
                <div className="flex gap-6">
                    <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="p-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                    >
                        <option value="">Filtrar por ubicación</option>
                        {[...new Set(products.map((product) => product.ubicacion.name))].map((location) => (
                            <option key={location} value={location}>{location}</option>
                        ))}
                    </select>

                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="p-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                    >
                        <option value="">Filtrar por tipo</option>
                        {[...new Set(products.map((product) => product.tipo))].map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Lista de productos filtrados */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <CardProduct
                        key={product.id}
                        product={product}
                        onToggleStatus={() => toggleProductStatus(product.id)}
                        onEdit={() => editProduct(product.id)}
                    />
                ))}
            </div>
        </div>
    );
}


/*
//Para conectar al back 
export default function AllProducts() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isTokenLoaded, setIsTokenLoaded] = useState<boolean>(false); // Nueva variable de estado
    const { token } = useContext(UserContext);

    useEffect(() => {
        if (token) {
            setIsTokenLoaded(true); // Marca que el token ya está disponible
        } else {
            setIsTokenLoaded(false); // Si no hay token, no hacemos nada
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
            getProducts(); // Ejecuta solo cuando el token está cargado
        }
    }, [isTokenLoaded, token]);

    const handleToggleStatus = (id: string) => {
        console.log("Toggle status for product ID:", id);
    };

    const handleEdit = (id: string) => {
        console.log("Edit product ID:", id);
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
    <div>
        <h1>Productos</h1>
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
        </div>
    );
}*/
