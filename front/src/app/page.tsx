"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import hotel from "../../public/Hotel1.jpg";
import dpto from "../../public/Depto.jpg";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-[#264653] py-6">
      <h1 className="text-3xl font-semibold text-[#264653] mb-8">
        Bienvenido a Villa Rosarito
      </h1>

      {/* Contenedor de las imágenes */}
      <div className="flex space-x-6">
        {/* Primera Imagen */}
        <Link href="/link1">
          <div className="relative group cursor-pointer">
            <Image
              src={hotel}
              width={250}
              height={300}
              alt="Imagen 1"
              className="w-80 h-60 object-cover rounded-lg transition-transform duration-300 ease-in-out transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[#264653] bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-center justify-center text-white text-lg font-bold">
              Ir a Hotel
            </div>
          </div>
        </Link>

        {/* Segunda Imagen */}
        <Link href="../Reservations">
          <div className="relative group cursor-pointer">
            <Image
              src={dpto}
              width={250}
              height={300}
              alt="Imagen 2"
              className="w-80 h-60 object-cover rounded-lg transition-transform duration-300 ease-in-out transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[#264653] bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-center justify-center text-white text-lg font-bold">
              Ir a Departamento
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
