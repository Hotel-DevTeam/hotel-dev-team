"use client";
import { ILoginResponse,IUserRegister,ILoginUser,IUserResponse } from "@/Interfaces/IUser";
import { IUserContextType } from "@/Interfaces/IUser";
import { fetchLoginUser, fetchRegisterUser } from "@/components/Fetchs/UserFetchs/UserFetchs";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext<IUserContextType>({
  user: null,
  setUser: () => {},
  isLogged: false,
  isAdmin: false,
  setIsAdmin: () => {},
  setIsLogged: () => {},
  signIn: async () => false,
  signUp: async () => false,
  logOut: () => {},
  token: null,
  setToken: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUserResponse | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  const signIn = async (credentials: ILoginUser): Promise<boolean> => {
    try {
      const data: ILoginResponse = await fetchLoginUser(credentials);
  
      if (data?.token) {  
        console.log("Token set:", data.token);
        if (typeof window !== "undefined") {
          const authData = {
            token: data.token,
            role: data.role,
            message: data.message  // Asegúrate de incluir "message"
          };
          localStorage.setItem("authData", JSON.stringify(authData));
  
          setUser(authData);  // Incluye "message" aquí
          setToken(data.token);
          setIsLogged(true);
          setIsAdmin(data.role === "admin");
  
          console.log("Response data from login:", data);
          return true;
        }
      } else {
        console.error("Login failed. User may not exist.");
        return false;
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      return false;
    }
    return false;
  };
  
  
  
const signUp = async (user: IUserRegister): Promise<boolean> => {
  try {
      const data = await fetchRegisterUser(user);
      if (data) {
          await signIn({ email: user.email, password: user.password });
          return true; 
      }
      console.error(`Registration failed: ${JSON.stringify(data)}`);
      return false; 
  } catch (error) {
      console.error(`Error during sign up: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw new Error(error instanceof Error ? error.message : 'Error desconocido'); 
  }
};

useEffect(() => {
  if (typeof window !== "undefined") {
    const storedAuthData = localStorage.getItem("authData");

    if (storedAuthData) {
      try {
        const parsedSession = JSON.parse(storedAuthData);
        const { token, role } = parsedSession;

        setUser(parsedSession); // Establece todos los datos del usuario
        setToken(token);
        setIsLogged(Boolean(token));
        setIsAdmin(role === "admin");

      } catch (error) {
        console.error("Error al parsear authData:", error);
        setUser(null);
        setToken(null);
        setIsLogged(false);
        setIsAdmin(false);
      }
    }
  }
}, []);



  const logOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authData");
      setUser(null);
      setToken(null);
      setIsLogged(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLogged,
        setIsLogged,
        token,
        setToken,
        isAdmin,
        setIsAdmin,
        signIn,
        signUp,
        logOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
