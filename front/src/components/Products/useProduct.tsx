"use client"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { IProduct } from "@/Interfaces/IUser";
import { fetchGetProducts, fetchToggleProductStatus, fetchUpdateProduct } from "@/components/Fetchs/ProductsFetchs/ProductsFetchs";

export function useProducts() {
  const { token } = useContext(UserContext);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isTokenLoaded, setIsTokenLoaded] = useState<boolean>(false);

  // Verifica si hay un token disponible en el contexto
  useEffect(() => {
    setIsTokenLoaded(Boolean(token));
  }, [token]);

  // Obtiene los productos si hay un token válido
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

  const toggleProductStatus = async (id: string) => {
    // Primero, actualizamos el estado localmente para reflejar el cambio antes de hacer la solicitud
    const updatedProducts = products.map((product) =>
      product.id === id
        ? { ...product, Activo: !product.Activo } // Cambia el estado localmente
        : product
    );
  
    // Actualizamos el estado local de productos
    setProducts(updatedProducts);
  
    try {
      // Llama a la función fetchToggleProductStatus para actualizar el estado en el backend
      const updatedProduct = await fetchToggleProductStatus(id);
  
      // Actualizamos la lista de productos con el producto actualizado
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
    } catch (error) {
      console.error('Error al cambiar el estado del producto:', error);
      // Si hay un error, podemos revertir el cambio local
      setProducts(products); // O manejar la revertida de otra forma
    }
  };
  

  // Maneja la actualización del producto
  const handleEditSubmit = async (updatedProduct: IProduct) => {
    if (!token) return;

    try {
      await fetchUpdateProduct(updatedProduct.id, updatedProduct);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return {
    products,
    loading,
    toggleProductStatus,
    handleEditSubmit,
  };
}
