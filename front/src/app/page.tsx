import React from "react";
import Link from "next/link";
import Image from "next/image";

const Home = () => {
  return (
    <div className="relative flex flex-col items-center justify-between min-h-screen bg-beige">
      <div className="relative w-full h-1/2">
        <Image
          src="https://lh3.googleusercontent.com/p/AF1QipP9NjP72GiD9SrAnwK82_hqZi_4zKmb8o4ggOW2=s1360-w1360-h1020"
          alt="Imagen de fondo"
          fill
          style={{ objectFit: "cover" }}
          quality={100}
          className="rounded-b-xl shadow-lg"
        />
      </div>

      {/* Título principal */}
      <h1 className="text-4xl font-bold text-black mt-8 text-center">
        Bienvenido a <span className="text-[#CD9C8A]">Villa Rosarito</span>
      </h1>

      {/* Botón de iniciar sesión */}
      <div className="mt-6">
        <Link href="/login">
          <button className="px-8 py-4 bg-[#CD9C8A] text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-orange-400 hover:text-white  transition-all duration-300">
            Iniciar Sesión
          </button>
        </Link>
      </div>

      {/* Espaciado final */}
      <div className="h-16" />
    </div>
  );
};

export default Home;
