import { FaUser, FaCashRegister, FaBox } from 'react-icons/fa';
import { MdNotifications } from 'react-icons/md';
import Link from 'next/link';
import React from 'react';

export default function Panel() {
  return (
    <div className="bg-gradient-to-b from-white to-[#F8EDEB] min-h-screen font-sans mt-20">
      {/* Título Principal */}
      <h1 className="text-4xl mt-20 font-bold text-black text-center">
        Bienvenido a <span className="text-[#CD9C8A]">Villa Rosarito</span>
      </h1>

      {/* Contenedor Principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 px-8 py-12">
        <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Registrar Usuarios */}
          <Link href="/register">
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-102">
              <h2 className="text-2xl font-semibold text-[#CD9C8A] mb-4">
                <FaUser className="inline-block mr-2" />
                Registrar Usuarios
              </h2>
              <p className="text-gray-600">Aquí puedes crear nuevos usuarios</p>
              <button className="mt-4 px-4 py-2 bg-[#CD9C8A] text-white rounded-lg hover:bg-[#b77f6d] transition-all duration-300 ease-in-out">
                Registrar
              </button>
            </div>
          </Link>

          {/* Caja de empleados */}
          <Link href={"/adminDashboard/caja"}>
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-102">
              <h2 className="text-2xl font-semibold text-[#CD9C8A] mb-4">
                <FaCashRegister className="inline-block mr-2" />
                Caja de empleados
              </h2>
              <p className="text-gray-600">Movimientos de caja realizados por los empleados</p>
              <button className="mt-4 px-4 py-2 bg-[#CD9C8A] text-white rounded-lg hover:bg-[#b77f6d] transition-all duration-300 ease-in-out">
                Ver Detalles
              </button>
            </div>
          </Link>

          {/* Movimientos de caja */}
          <Link href={"/cashMovementsPage/movements"}>
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-102">
              <h2 className="text-2xl font-semibold text-[#CD9C8A] mb-4">
                <FaBox className="inline-block mr-2" />
                Movimientos de caja
              </h2>
              <p className="text-gray-600">Consulta ingresos, egresos y montos</p>
              <button className="mt-4 px-4 py-2 bg-[#CD9C8A] text-white rounded-lg hover:bg-[#b77f6d] transition-all duration-300 ease-in-out">
                Ver Detalles
              </button>
            </div>
          </Link>

          {/* Productos y Servicios */}
          <Link href={"/adminDashboard/products"}>
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-102">
              <h2 className="text-2xl font-semibold text-[#CD9C8A] mb-4">
                <FaBox className="inline-block mr-2" />
                Productos y Servicios
              </h2>
              <p className="text-gray-600">
                Aquí verás los productos y servicios creados por ti, podrás editarlos y eliminarlos.
              </p>
              <button className="mt-4 px-4 py-2 bg-[#CD9C8A] text-white rounded-lg hover:bg-[#b77f6d] transition-all duration-300 ease-in-out">
                Ver más
              </button>
            </div>
          </Link>
        </div>

        {/* Sección de Notificaciones */}
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:cursor-pointer">
          <h2 className="text-2xl font-semibold text-[#CD9C8A] mb-4">
            <MdNotifications className="inline-block mr-2" />
            Notificaciones
          </h2>
          <div className="space-y-4 mt-4 max-h-[300px] overflow-y-auto">
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <p className="text-gray-700"></p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <p className="text-gray-700"></p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <p className="text-gray-700"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
