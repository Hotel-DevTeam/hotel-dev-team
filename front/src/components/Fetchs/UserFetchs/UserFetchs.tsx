import { ILocation, ILoginUser,IUserRegister } from "@/Interfaces/IUser";


const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//Formulario de login
export const fetchLoginUser = async (credentials: ILoginUser) => {
  try {
      const response = await fetch(`${apiUrl}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
      });
      
      if (!response.ok) {
        throw new Error("Error en la autenticación");
      }

      const data = await response.json();
      console.log("Response data from login:", data); 
      return data;
  } catch (error) {
      console.error("Error en el login:", error);
      throw error;
  }
};

export const fetchRegisterUser = async (user: IUserRegister) => {
  console.log('Datos del usuario a enviar:', user);

  const response = await fetch(`${apiUrl}/auth/register`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
  });

  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error desconocido'); 
  }

  const data = await response.json();
  return data; 
};


 // Obtener todas las ubicaciones
export const fetchLocations = async (): Promise<ILocation[]> => {
  
  const token = localStorage.getItem('token'); 

  const response = await fetch(`${apiUrl}/location/admin/locations`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, 
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error desconocido');
  }

  const data = await response.json();
  return data;
};

 //Formulario crear location
 export const fetchCreateLocation = async (location: ILocation) => {
  const token = localStorage.getItem('token');  

  console.log('Datos del usuario a enviar:', location);

  const response = await fetch(`${apiUrl}/location`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,  
      },
      body: JSON.stringify(location),
  });

  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error desconocido'); 
  }

  const data = await response.json();
  return data;
};