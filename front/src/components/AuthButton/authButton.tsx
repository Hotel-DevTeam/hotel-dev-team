"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { UserContext } from "../../context/UserContext"; // Ajustá la ruta según tu estructura

const AuthButton = () => {
  const { isLogged } = useContext(UserContext);

  return isLogged ? (
    <Link href="/OptionRes">
      <button className="px-8 py-4 bg-[#CD9C8A] text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-orange-400 hover:text-white transition-all duration-300">
        Crear Reserva
      </button>
    </Link>
  ) : (
    <Link href="/login">
      <button className="px-8 py-4 bg-[#CD9C8A] text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-orange-400 hover:text-white transition-all duration-300">
        Iniciar Sesión
      </button>
    </Link>
  );
};

export default AuthButton;
