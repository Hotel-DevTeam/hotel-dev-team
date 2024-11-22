"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import hotel from "../../public/Hotel1.jpg"; // Utilizaremos esta imagen como fondo

const Home = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-[#264653] py-6">
      {/* Imagen de fondo */}
      <Image
        src={hotel}
        alt="Imagen de fondo"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="-z-10" // Colocamos la imagen al fondo usando un índice z negativo
      />

      <h1 className="text-3xl font-semibold text-[#264653] mb-8 bg-white bg-opacity-80 px-4 py-2 rounded">
        Bienvenido a Villa Rosarito
      </h1>

      {/* Botón de iniciar sesión */}
      <Link href="/login">
        <button className="px-6 py-3 bg-[#264653] text-white rounded-lg text-lg font-semibold transition-transform duration-300 ease-in-out transform hover:scale-105">
          Iniciar Sesión
        </button>
      </Link>
    </div>
  );
};

export default Home;
