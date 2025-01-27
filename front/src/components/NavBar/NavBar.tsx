/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useContext, useRef, useState, useEffect } from "react";
import Link from "next/link";
import { UserContext } from "@/context/UserContext";

const Navbar: React.FC = () => {
  const { isLogged, logOut } = useContext(UserContext); // Obtenemos el estado de sesión y la función de cerrar sesión

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isLogged) return null; // Si el usuario no está logueado, no mostramos el Navbar

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full bg-[#F1FAEE] text-[#264653] py-3 px-4 shadow-md z-50"
    >
      <div className="flex items-center justify-between">
        <Link href={"/"}>
          <h1 className="text-xl font-semibold text-[#264653] mb-0">
            Villa <span className="font-light text-[#2A9D8F]">Rosarito</span>
          </h1>
        </Link>

        {/* Botón móvil */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-[#264653]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Menú en móvil */}
        {isMobileMenuOpen && (
          <ul className="absolute top-14 right-0 bg-white shadow-md w-48 z-50">
            <li className="border-b">
              <Link
                href="/location"
                className="block px-4 py-2 hover:bg-[#E9C46A] transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Ubicaciones
              </Link>
            </li>
            <li className="border-b">
              <Link
                href="/ReservationList"
                className="block px-4 py-2 hover:bg-[#E9C46A] transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Lista de Reservas
              </Link>
            </li>
            <li className="border-b">
              <Link
                href="/OrderPage"
                className="block px-4 py-2 hover:bg-[#E9C46A] transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Página de Órdenes
              </Link>
            </li>
            <li>
              <button
                onClick={logOut}
                className="block px-4 py-2 hover:bg-red-400 transition"
              >
                Cerrar sesión
              </button>
            </li>
          </ul>
        )}

        {/* Menú en escritorio */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link
              href="/location"
              className="hover:text-[#F4A261] transition duration-200"
            >
              Ubicaciones
            </Link>
          </li>
          <li>
            <Link
              href="/ReservationList"
              className="hover:text-[#F4A261] transition duration-200"
            >
              Reservas
            </Link>
          </li>
          <li>
            <Link
              href="/OrderPage"
              className="hover:text-[#F4A261] transition duration-200"
            >
              Órdenes
            </Link>
          </li>
          <li>
            <button
              onClick={logOut}
              className="hover:text-red-400 transition duration-200"
            >
              Cerrar sesión
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
