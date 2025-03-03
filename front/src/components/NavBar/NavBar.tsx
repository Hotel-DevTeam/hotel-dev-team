/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useContext, useRef, useState, useEffect } from "react";
import Link from "next/link";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { IUserN } from "@/Interfaces/IUser";

const Navbar: React.FC = () => {
  const { isLogged, logOut, isAdmin } = useContext(UserContext);
  const router = useRouter();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubMenuOpen, setSubMenuOpen] = useState(false); // Nuevo estado para el submenú
  const navRef = useRef<HTMLDivElement | null>(null);

  const closeMenus = () => {
    setSubMenuOpen(false); // Cerrar el submenú
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        closeMenus();
        setMobileMenuOpen(false); // Cierra el menú móvil al hacer clic fuera
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogOut = () => {
    const user: IUserN = JSON.parse(localStorage.getItem("user") || "{}");

    if (user && user.role !== "admin") {
      router.push("/cashClosing");
    } else {
      logOut();
      router.push("/");
    }
  };

  if (!isLogged) return null;

  return (
    <nav
      ref={navRef}
      className="flex items-center bg-[#F1FAEE] text-[#264653] py-3 px-4 relative"
    >
      <div className="flex items-center space-x-3">
        <Link href={"/"}>
          <h1 className="text-xl font-semibold text-[#264653] mb-0">
            Villa <span className="font-light text-[#2A9D8F]">Rosarito</span>
          </h1>
        </Link>
      </div>

      {/* Botón móvil */}
      <button
        className="md:hidden ml-auto"
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
              href={"/CreateOrder"}
              className="block px-4 py-2 hover:bg-[#E9C46A] transition"
            >
              Ventas
            </Link>
          </li>
          <li className="border-b">
            <Link
              href={"/expenses"}
              className="block px-4 py-2 hover:bg-[#E9C46A] transition"
            >
              Gastos
            </Link>
          </li>
          <li
            className="border-b cursor-pointer"
            onClick={() => setSubMenuOpen(!isSubMenuOpen)} // Toggle del submenú
          >
            <span className="block px-4 py-2 hover:bg-[#E9C46A] transition">
              Submenú
            </span>
            {isSubMenuOpen && (
              <ul className="bg-white shadow-md w-full">
                <li>
                  <Link
                    href="/SubmenuItem1"
                    className="block px-4 py-2 hover:bg-[#F4A261] transition"
                  >
                    Item 1
                  </Link>
                </li>
                <li>
                  <Link
                    href="/SubmenuItem2"
                    className="block px-4 py-2 hover:bg-[#F4A261] transition"
                  >
                    Item 2
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Enlace directo a Reservas (Hotel) */}
          <li className="border-b">
            <Link
              href="/ResHotel"
              className="block px-4 py-2 hover:bg-[#E9C46A] transition"
            >
              Reservas
            </Link>
          </li>

          {/* Enlace directo a Ver Reservas */}
          <li className="border-b">
            <Link
              href="/ReservationList"
              className="block px-4 py-2 hover:bg-[#E9C46A] transition"
            >
              Ver Reservas
            </Link>
          </li>

          <li className="border-b">
            <button
              className="block px-4 py-2 hover:bg-[#E9C46A] transition"
              onClick={handleLogOut}
            >
              Cerrar sesión
            </button>
          </li>

          {/* Panel Admin */}
          {isAdmin && (
            <Link href="/adminDashboard">
              <button className="w-full text-left bg-[#CD9C8A] text-white hover:bg-[#b77f6d] transition duration-200 rounded px-4 py-2">
                Panel Admin
              </button>
            </Link>
          )}
        </ul>
      )}

      {/* Menú en escritorio */}
      <ul className="hidden md:flex space-x-6 justify-end w-full">
        <li className="relative">
          <Link
            href={"/Calendar"}
            className="hover:text-[#F4A261] transition duration-200"
          >
            Calendario
          </Link>
        </li>
        <li className="relative">
          <Link
            href={"/CreateOrder"}
            className="hover:text-[#F4A261] transition duration-200"
          >
            Ventas
          </Link>
        </li>
        <li>
          <Link
            href={"/expenses"}
            className="hover:text-[#F4A261] transition duration-200"
          >
            Gastos
          </Link>
        </li>

        {/* Enlace directo a Reservas (Hotel) */}
        <li>
          <Link
            href="/ResHotel"
            className="hover:text-[#F4A261] transition duration-200"
          >
            Reservas
          </Link>
        </li>

        {/* Enlace directo a Ver Reservas */}
        <li>
          <Link
            href="/ReservationList"
            className="hover:text-[#F4A261] transition duration-200"
          >
            Ver Reservas
          </Link>
        </li>

        {/* Botón de Cerrar sesión */}
        <li>
          <button
            onClick={handleLogOut}
            className="hover:text-[#F4A261] transition duration-200"
          >
            Cerrar sesión
          </button>
        </li>

        {/* Panel Admin */}
        {isAdmin && (
          <Link href="/adminDashboard">
            <button className="w-full text-left bg-[#CD9C8A] text-white hover:bg-[#b77f6d] transition duration-200 rounded px-4 py-2">
              Panel Admin
            </button>
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
