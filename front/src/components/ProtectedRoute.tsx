"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";

const ProtectedRouteAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin, isLogged } = useContext(UserContext);
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Retrasa la lógica hasta que los valores de `isLogged` e `isAdmin` sean válidos
    const timer = setTimeout(() => {
      if (!isLogged || !isAdmin) {
        router.push("/"); 
      } else {
        setIsChecking(false); 
      }
    }, 100); 

    return () => clearTimeout(timer); 
  }, [isLogged, isAdmin, router]);

 
 

  return <>{children}</>;
};

export default ProtectedRouteAdmin;
