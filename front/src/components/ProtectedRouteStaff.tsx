/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";

const ProtectedRouteStaff: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLogged } = useContext(UserContext);
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Retrasa la lógica hasta que `isLogged` sea válido (se hidrata desde localStorage)
    const timer = setTimeout(() => {
      if (!isLogged) {
        router.push("/login");
      } else {
        setIsChecking(false);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isLogged, router]);

  if (isChecking) return null;

  return <>{children}</>;
};

export default ProtectedRouteStaff;
