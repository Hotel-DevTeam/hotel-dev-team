import { IProduct } from "@/Interfaces/IUser";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//Ver todos los productos
export const fetchGetProducts = async (token:string) => {
    const response = await fetch(`${apiUrl}/products`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
  
    const data = await response.json();
    return data;
  };

   //Obtener producto por id
export const fetchProductById = async (id:string) => {
    const response = await fetch(`${apiUrl}/products/${id}`);
    if (!response.ok) {
      throw new Error(`Error al obtener el producto: ${response.statusText}`);
    }
    return await response.json();
  };
  

  
  //Modificar producto
  export const fetchUpdateProduct = async(id:string, product:IProduct) => {
    const response = await fetch(`${apiUrl}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
  
  if (!response.ok) {
  throw new Error("Error al modificar producto");
  }
  
  return response.json();
  };

  //Cargar  productos
export const fetchUploadProduct = async (product:IProduct) => {
    const response = await fetch(`${apiUrl}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

  if (!response.ok) {
    throw new Error("Error al cargar producto. Por favor, verifica los datos o si el producto ya existe.");
  }

  return response.json();
};
