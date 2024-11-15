/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useContext, useRef, useState, useEffect } from "react";
import Link from "next/link";
import { UserContext } from "@/context/UserContext";

const Navbar: React.FC = () => {
  const { isLogged, logOut } = useContext(UserContext); // Obtenemos el estado de sesión y la función de cerrar sesión

  const [isOrderMenuOpen, setOrderMenuOpen] = useState(false);
  const [isReservationMenuOpen, setReservationMenuOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const orderMenuRef = useRef<HTMLUListElement | null>(null);
  const reservationMenuRef = useRef<HTMLUListElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = (menu: "reservation" | "order") => {
    if (menu === "reservation") {
      setReservationMenuOpen(!isReservationMenuOpen);
      setOrderMenuOpen(false);
    } else if (menu === "order") {
      setOrderMenuOpen(!isOrderMenuOpen);
      setReservationMenuOpen(false);
    }
  };

  const closeMenus = () => {
    setOrderMenuOpen(false);
    setReservationMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node) &&
        orderMenuRef.current &&
        !orderMenuRef.current.contains(event.target as Node) &&
        reservationMenuRef.current &&
        !reservationMenuRef.current.contains(event.target as Node)
      ) {
        closeMenus();
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
        <ul className="md:hidden absolute top-12 right-0 bg-white shadow-md w-48 z-50">
          <li className="border-b">
            <Link
              href="/ReservationCreate"
              className="block px-4 py-2 hover:bg-[#E9C46A] transition"
              onClick={() => setReservationMenuOpen(false)}
            >
              Crear Reserva
            </Link>
          </li>
          <li className="border-b">
            <Link
              href="/ReservationList"
              className="block px-4 py-2 hover:bg-[#E9C46A] transition"
              onClick={() => setReservationMenuOpen(false)}
            >
              Lista de Reservas
            </Link>
          </li>
          <li className="border-b">
            <Link
              href="/Reservations"
              className="block px-4 py-2 hover:bg-[#E9C46A] transition"
              onClick={() => setReservationMenuOpen(false)}
            >
              Todas las Reservas
            </Link>
          </li>
          <li className="border-b">
            <Link
              href="/OrderPage"
              className="block px-4 py-2 hover:bg-[#E9C46A] transition"
              onClick={() => setOrderMenuOpen(false)}
            >
              Página de Órdenes
            </Link>
          </li>
          <li className="border-b">
            <Link
              href="/CreateOrder"
              className="block px-4 py-2 hover:bg-[#E9C46A] transition"
              onClick={() => setOrderMenuOpen(false)}
            >
              Crear Orden
            </Link>
          </li>
        </ul>
      )}

      {/* Menú en escritorio */}
      <ul className="hidden md:flex space-x-6 justify-end w-full">
        <li className="relative" onClick={() => toggleMenu("reservation")}>
          <button className="w-full text-left hover:text-[#F4A261] transition duration-200">
            Reservas
          </button>
          {isReservationMenuOpen && (
            <ul
              ref={reservationMenuRef}
              className="absolute left-0 mt-2 bg-white shadow-md w-max z-50"
            >
              <li>
                <Link
                  href="/ReservationCreate"
                  className="block px-4 py-2 hover:bg-[#E9C46A] transition"
                  onClick={() => setReservationMenuOpen(false)}
                >
                  Crear Reserva
                </Link>
              </li>
              <li>
                <Link
                  href="/ReservationList"
                  className="block px-4 py-2 hover:bg-[#E9C46A] transition"
                  onClick={() => setReservationMenuOpen(false)}
                >
                  Lista de Reservas
                </Link>
              </li>
              <li>
                <Link
                  href="/Reservations"
                  className="block px-4 py-2 hover:bg-[#E9C46A] transition"
                  onClick={() => setReservationMenuOpen(false)}
                >
                  Todas las Reservas
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li className="relative" onClick={() => toggleMenu("order")}>
          <button className="w-full text-left hover:text-[#F4A261] transition duration-200">
            Órdenes
          </button>
          {isOrderMenuOpen && (
            <ul
              ref={orderMenuRef}
              className="absolute left-0 mt-2 bg-white shadow-md w-max z-50"
            >
              <li>
                <Link
                  href="/OrderPage"
                  className="block px-4 py-2 hover:bg-[#E9C46A] transition"
                  onClick={() => setOrderMenuOpen(false)}
                >
                  Página de Órdenes
                </Link>
              </li>
              <li>
                <Link
                  href="/CreateOrder"
                  className="block px-4 py-2 hover:bg-[#E9C46A] transition"
                  onClick={() => setOrderMenuOpen(false)}
                >
                  Crear Orden
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Botón de Cerrar sesión */}
        <li>
          <button
            onClick={logOut}
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
