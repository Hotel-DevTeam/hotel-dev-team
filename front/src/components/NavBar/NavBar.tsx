/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOrderMenuOpen, setOrderMenuOpen] = useState(false);
  const [isReservationMenuOpen, setReservationMenuOpen] = useState(false);

  const orderMenuRef = useRef<HTMLUListElement | null>(null);
  const reservationMenuRef = useRef<HTMLUListElement | null>(null);

  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);

  const toggleOrderMenu = () => {
    setOrderMenuOpen(!isOrderMenuOpen);
  };

  const toggleReservationMenu = () => {
    setReservationMenuOpen(!isReservationMenuOpen);
  };

  const closeAllMenus = () => {
    if (closeTimeout) clearTimeout(closeTimeout);
    setCloseTimeout(
      setTimeout(() => {
        setOrderMenuOpen(false);
        setReservationMenuOpen(false);
      }, 300)
    );
  };

  const handleMouseEnter = (menu: "order" | "reservation") => {
    if (menu === "order") setOrderMenuOpen(true);
    if (menu === "reservation") setReservationMenuOpen(true);
    if (closeTimeout) clearTimeout(closeTimeout);
  };

  const handleMouseLeave = (menu: "order" | "reservation") => {
    if (menu === "order" && isOrderMenuOpen) {
      setCloseTimeout(setTimeout(() => setOrderMenuOpen(false), 300));
    }
    if (menu === "reservation" && isReservationMenuOpen) {
      setCloseTimeout(setTimeout(() => setReservationMenuOpen(false), 300));
    }
  };

  return (
    <nav className="flex items-center bg-[#F1FAEE] text-[#264653] py-3 px-4 relative">
      <div className="flex items-center space-x-3">
        <Link href={"/"}>
          <h1 className="text-xl font-semibold text-[#264653] mb-0">
            Villa <span className="font-light text-[#2A9D8F]">Rosarito</span>
          </h1>
        </Link>
      </div>

      <ul className="hidden md:flex space-x-6 justify-end w-full">
        <li
          className="relative"
          onMouseEnter={() => handleMouseEnter("reservation")}
          onMouseLeave={() => handleMouseLeave("reservation")}
        >
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
                  onClick={closeAllMenus}
                >
                  Crear Reserva
                </Link>
              </li>
              <li>
                <Link
                  href="/ReservationList"
                  className="block px-4 py-2 hover:bg-[#E9C46A] transition"
                  onClick={closeAllMenus}
                >
                  Lista de Reservas
                </Link>
              </li>
              <li>
                <Link
                  href="/Reservations"
                  className="block px-4 py-2 hover:bg-[#E9C46A] transition"
                  onClick={closeAllMenus}
                >
                  Todas las Reservas
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li
          className="relative"
          onMouseEnter={() => handleMouseEnter("order")}
          onMouseLeave={() => handleMouseLeave("order")}
        >
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
                  onClick={closeAllMenus}
                >
                  Página de Órdenes
                </Link>
              </li>
              <li>
                <Link
                  href="/CreateOrder"
                  className="block px-4 py-2 hover:bg-[#E9C46A] transition"
                  onClick={closeAllMenus}
                >
                  Crear Orden
                </Link>
              </li>
            </ul>
          )}
        </li>

        {[
          { href: "/adminDashboard", label: "Panel de Administración" },
          { href: "/location", label: "Ubicación" },
          { href: "/login", label: "Iniciar Sesión" },
          { href: "/register", label: "Registrarse" },
        ].map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="hover:text-[#F4A261] transition duration-200"
              onClick={closeAllMenus}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
