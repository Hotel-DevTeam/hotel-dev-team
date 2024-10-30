import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Datos de ubicaciones con name, city e image
const ubicaciones = [
  {
    id: 1,
    name: 'Hotel Andino',
    city: 'Cusco',
    image:
      'https://res.cloudinary.com/dbtfna8ev/image/upload/v1729614871/waldemar-2XDsKxuRv-s-unsplash_nlvkek.jpg',
  },
  {
    id: 2,
    name: 'Hotel Pacífico',
    city: 'Lima',
    image:
      'https://res.cloudinary.com/dbtfna8ev/image/upload/v1729614871/waldemar-2XDsKxuRv-s-unsplash_nlvkek.jpg',
  },
  {
    id: 3,
    name: 'Eco Lodge',
    city: 'Arequipa',
    image:
      'https://res.cloudinary.com/dbtfna8ev/image/upload/v1729614871/waldemar-2XDsKxuRv-s-unsplash_nlvkek.jpg',
  },
  {
    id: 4,
    name: 'Selva Resort',
    city: 'Iquitos',
    image:
      'https://res.cloudinary.com/dbtfna8ev/image/upload/v1729614871/waldemar-2XDsKxuRv-s-unsplash_nlvkek.jpg',
  },
];

const Ubicaciones = () => {
  return (
    <div>
      <h1 className="text-3xl mt-20 font-bold text-center mb-8">Nuestros hoteles</h1>
      <div className="flex flex-col mt-20 sm:flex-col md:flex-row lg:flex-row justify-center flex-wrap">
        {ubicaciones.map((ubicacion) => (
          <section
            key={ubicacion.id}
            className="relative overflow-hidden rounded-lg border-b border-r border-gray-300 shadow-lg m-2 w-80 h-64 sm:h-72 md:h-80 lg:h-96 transition-transform duration-300 hover:scale-105" // Clases para borde inferior y derecho
          >
            <Link href="#" className="cursor-pointer">
              <Image
                alt={ubicacion.name}
                src={ubicacion.image}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                width={970}
                height={250}
                quality={75}
                priority
              />
              <div className="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 h-full flex flex-col justify-end">
                <div className="p-4 sm:p-6">
                  <h3 className="mt-0.5 text-lg text-white">{ubicacion.name}</h3>
                  <h3 className="mt-0.5 text-lg text-white">{ubicacion.city}</h3>
                </div>
              </div>
            </Link>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Ubicaciones;
