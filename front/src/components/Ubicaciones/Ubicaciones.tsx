import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Ubicaciones = () => {
  return (
    <div>
      <h1 className="text-3xl mt-20 font-bold text-center mb-8">Nuestros hoteles</h1>
      <div className="flex flex-col mt-20 sm:flex-col md:flex-row lg:flex-row justify-center">
        {/* Tarjetas */}
        <section className="relative overflow-hidden rounded-lg shadow transition hover:shadow-lg m-2 w-80 h-64 sm:h-72 md:h-80 lg:h-96"> {/* Ajusta la altura según el tamaño de pantalla */}
          <Link href="#">
            <Image
              alt="Ubicaciones 1"
              src="https://res.cloudinary.com/dbtfna8ev/image/upload/c_fill,g_auto,h_250,w_970/b_rgb:000000,e_gradient_fade,y_-0.50/v1729614871/waldemar-2XDsKxuRv-s-unsplash_nlvkek.jpg"
              className="absolute inset-0 h-full w-full object-cover"
              width={970}
              height={250}
              quality={75}
              priority
            />
            <div className="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 h-full flex flex-col justify-end">
              <div className="p-4 sm:p-6">
                <h3 className="mt-0.5 text-lg text-white">
                  Nombre del alojamiento
                </h3>
                <h3 className="mt-0.5 text-lg text-white">
                  Ciudad
                </h3>
              </div>
            </div>
          </Link>
        </section>
        <section className="relative overflow-hidden rounded-lg shadow transition hover:shadow-lg m-2 w-80 h-64 sm:h-72 md:h-80 lg:h-96"> {/* Ajusta la altura según el tamaño de pantalla */}
          <Link href="#">
            <Image
              alt="Ubicaciones 1"
              src="https://res.cloudinary.com/dbtfna8ev/image/upload/c_fill,g_auto,h_250,w_970/b_rgb:000000,e_gradient_fade,y_-0.50/v1729614871/waldemar-2XDsKxuRv-s-unsplash_nlvkek.jpg"
              className="absolute inset-0 h-full w-full object-cover"
              width={970}
              height={250}
              quality={75}
              priority
            />
            <div className="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 h-full flex flex-col justify-end">
              <div className="p-4 sm:p-6">
                <h3 className="mt-0.5 text-lg text-white">
                  Nombre del alojamiento
                </h3>
                <h3 className="mt-0.5 text-lg text-white">
                  Ciudad
                </h3>
              </div>
            </div>
          </Link>
        </section>
        <section className="relative overflow-hidden rounded-lg shadow transition hover:shadow-lg m-2 w-80 h-64 sm:h-72 md:h-80 lg:h-96"> {/* Ajusta la altura según el tamaño de pantalla */}
          <Link href="#">
            <Image
              alt="Ubicaciones 1"
              src="https://res.cloudinary.com/dbtfna8ev/image/upload/c_fill,g_auto,h_250,w_970/b_rgb:000000,e_gradient_fade,y_-0.50/v1729614871/waldemar-2XDsKxuRv-s-unsplash_nlvkek.jpg"
              className="absolute inset-0 h-full w-full object-cover"
              width={970}
              height={250}
              quality={75}
              priority
            />
            <div className="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 h-full flex flex-col justify-end">
              <div className="p-4 sm:p-6">
                <h3 className="mt-0.5 text-lg text-white">
                  Nombre del alojamiento
                </h3>
                <h3 className="mt-0.5 text-lg text-white">
                  Ciudad
                </h3>
              </div>
            </div>
          </Link>
        </section>
        <section className="relative overflow-hidden rounded-lg shadow transition hover:shadow-lg m-2 w-80 h-64 sm:h-72 md:h-80 lg:h-96"> {/* Ajusta la altura según el tamaño de pantalla */}
          <Link href="#">
            <Image
              alt="Ubicaciones 1"
              src="https://res.cloudinary.com/dbtfna8ev/image/upload/c_fill,g_auto,h_250,w_970/b_rgb:000000,e_gradient_fade,y_-0.50/v1729614871/waldemar-2XDsKxuRv-s-unsplash_nlvkek.jpg"
              className="absolute inset-0 h-full w-full object-cover"
              width={970}
              height={250}
              quality={75}
              priority
            />
            <div className="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 h-full flex flex-col justify-end">
              <div className="p-4 sm:p-6">
                <h3 className="mt-0.5 text-lg text-white">
                  Nombre del alojamiento
                </h3>
                <h3 className="mt-0.5 text-lg text-white">
                  Ciudad
                </h3>
              </div>
            </div>
          </Link>
        </section>
      
      </div>
    </div>
  );
};

export default Ubicaciones;
