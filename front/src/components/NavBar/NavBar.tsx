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
  const [isReservasMenuOpen, setReservasMenuOpen] = useState(false);
  const [isVerReservasMenuOpen, setVerReservasMenuOpen] = useState(false);

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdminMenuOpen, setAdminMenuOpen] = useState(false);
  const [isSubMenuOpen, setSubMenuOpen] = useState(false); // Nuevo estado para el submenú
  const orderMenuRef = useRef<HTMLUListElement | null>(null);
  const reservationMenuRef = useRef<HTMLUListElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = (menu: "reservas" | "verReservas" | "ordenes") => {
    if (menu === "reservas") {
      setReservasMenuOpen(!isReservasMenuOpen);
      setVerReservasMenuOpen(false);
    } else if (menu === "verReservas") {
      setVerReservasMenuOpen(!isVerReservasMenuOpen);
      setReservasMenuOpen(false);
    }
  };

  const closeMenus = () => {
    setReservasMenuOpen(false);
    setVerReservasMenuOpen(false);
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
          <li>
            <Link href={"/"}>
              <button
                onClick={handleLogOut}
                className="block px-4 py-2 hover:bg-red-400 transition"
              >
                Cerrar sesión
              </button>
            </Link>
          </li>
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
        <li className="relative" onClick={() => toggleMenu("reservas")}>
          <button className="w-full text-left hover:text-[#F4A261] transition duration-200">
            Reservas
          </button>
          {isReservasMenuOpen && (
            <ul className="absolute left-0 mt-2 bg-white shadow-md w-max z-50">
              <li>
                <Link
                  href="/ResHotel"
                  className="block px-4 py-2 hover:bg-[#E9C46A] transition"
                >
                  Hotel
                </Link>
              </li>
              <li>
                <Link
                  href="/ResDepartamento"
                  className="block px-4 py-2 hover:bg-[#E9C46A] transition"
                >
                  Departamento
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Ver Reservas */}
        <li className="relative">
          <button
            className="w-full text-left hover:text-[#F4A261] transition duration-200"
            onClick={() => toggleMenu("verReservas")}
          >
            Ver Reservas
          </button>
          {isVerReservasMenuOpen && (
            <ul className="absolute left-0 mt-2 bg-white shadow-md w-max z-50">
              <li>
                <Link
                  href="/ReservationList"
                  className="block px-4 py-2 hover:bg-[#E9C46A] transition"
                >
                  Reservas
                </Link>
              </li>
              <li>
                <Link
                  href="/Reservations"
                  className="block px-4 py-2 hover:bg-[#E9C46A] transition"
                >
                  Historial
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Gastos */}
        <li>
          <Link
            href="/expenses"
            className="hover:text-[#F4A261] transition duration-200"
          >
            Gastos
          </Link>
        </li>

        {/* Panel Admin */}
        {isAdmin && (
          <li>
            <Link
              href="/admin"
              className="hover:text-[#F4A261] transition duration-200"
            >
              Panel Admin
            </Link>
          </li>
        )}

        {/* Botón de Cerrar sesión */}
        <li>
          <button
            onClick={handleLogOut}
            className="hover:text-[#F4A261] transition duration-200"
          >
            Cerrar sesión
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
