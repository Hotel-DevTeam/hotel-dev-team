"use client";

import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">MyApp</h1>

        
        <button className="md:hidden text-2xl" onClick={toggleMobileMenu}>
          ☰
        </button>

        
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link href="/adminDashboard">Admin Dashboard</Link>
          </li>
          <li>
            <Link href="/CreateOrder">Create Order</Link>
          </li>
          <li>
            <Link href="/location">Location</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/register">Register</Link>
          </li>
          <li>
            <Link href="/OrderPage">Order Page</Link>
          </li>
          <li>
            <Link href="/ReservationCreate">Reservation Create</Link>
          </li>
          <li>
            <Link href="/ReservationList">Reservation List</Link>
          </li>
          <li>
            <Link href="/Reservations">Reservations</Link>
          </li>
        </ul>
      </div>

      
      {isMobileMenuOpen && (
        <ul className="md:hidden flex flex-col items-center space-y-4 mt-4">
          <li>
            <Link href="/adminDashboard" onClick={toggleMobileMenu}>
              Admin Dashboard
            </Link>
          </li>
          <li>
            <Link href="/CreateOrder" onClick={toggleMobileMenu}>
              Create Order
            </Link>
          </li>
          <li>
            <Link href="/location" onClick={toggleMobileMenu}>
              Location
            </Link>
          </li>
          <li>
            <Link href="/login" onClick={toggleMobileMenu}>
              Login
            </Link>
          </li>
          <li>
            <Link href="/register" onClick={toggleMobileMenu}>
              Register
            </Link>
          </li>
          <li>
            <Link href="/OrderPage" onClick={toggleMobileMenu}>
              Order Page
            </Link>
          </li>
          <li>
            <Link href="/ReservationCreate" onClick={toggleMobileMenu}>
              Reservation Create
            </Link>
          </li>
          <li>
            <Link href="/ReservationList" onClick={toggleMobileMenu}>
              Reservation List
            </Link>
          </li>
          <li>
            <Link href="/Reservations" onClick={toggleMobileMenu}>
              Reservations
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
