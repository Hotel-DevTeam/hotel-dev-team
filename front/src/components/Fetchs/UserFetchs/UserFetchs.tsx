import { ILoginUser, IUserRegister } from "@/components/Interfaces/IUser";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchLoginUser = async (credentials: ILoginUser) => {
    const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      console.log("Response data from login:", data);
      return data;
    }

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
    }
    