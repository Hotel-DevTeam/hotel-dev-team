/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useContext, useRef, useState, useEffect } from "react";
import Link from "next/link";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const { isLogged, logOut, isAdmin } = useContext(UserContext); // Obtenemos el estado de sesión, la función de cerrar sesión y el rol de administrador
  const router = useRouter();
  const [isOrderMenuOpen, setOrderMenuOpen] = useState(false);
  const [isReservationMenuOpen, setReservationMenuOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdminMenuOpen, setAdminMenuOpen] = useState(false); // Estado para el menú de administrador

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
    setAdminMenuOpen(false); // Cerrar menú de admin
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

  
  const handleLogOut = () => {
    // Aquí asumes que el contexto o algún estado tiene la información del usuario
    const user = JSON.parse(localStorage.getItem('user') || '{}');
  
    if (user && !user.isAdmin) {
      // Si el usuario NO es administrador, redirigimos al formulario de cierre de caja
      router.push("/cashClosing");
    } else {
      // Si es administrador, cerramos sesión normalmente
      logOut();
      router.push("/"); // Redirige a la página de inicio o donde sea necesario
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

          {/* Menú Admin */}
          {isAdmin && (
            <li className="border-b">
              <button
                className="block px-4 py-2 hover:bg-[#E9C46A] transition"
                onClick={() => setAdminMenuOpen(!isAdminMenuOpen)}
              >
                Panel Admin
              </button>
              {isAdminMenuOpen && (
                <ul className="ml-4">
                  <li>
                    <Link
                      href="/register"
                      className="block px-4 py-2 hover:bg-[#E9C46A] transition"
                    >
                      Registrar usuario
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cashMovementsPage"
                      className="block px-4 py-2 hover:bg-[#E9C46A] transition"
                    >
                      Movimientos de caja
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}
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

        {/* Menú Admin en escritorio */}
        {isAdmin && (
          <li className="relative" onClick={() => setAdminMenuOpen(!isAdminMenuOpen)}>
            <button className="w-full text-left hover:text-[#F4A261] transition duration-200">
              Panel Admin
            </button>
            {isAdminMenuOpen && (
              <ul className="absolute left-0 mt-2 bg-white shadow-md w-max z-50">
                <li>
                  <Link
                    href="/register"
                    className="block px-4 py-2 hover:bg-[#E9C46A] transition"
                  >
                    Registrar usuario
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cashMovementsPage"
                    className="block px-4 py-2 hover:bg-[#E9C46A] transition"
                  >
                    Movimientos de caja
                  </Link>
                </li>
              </ul>
            )}
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
