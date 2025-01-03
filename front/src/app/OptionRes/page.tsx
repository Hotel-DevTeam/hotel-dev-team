import Link from "next/link";

function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-beige">
      {/* Título principal */}
      <h1 className="text-4xl font-bold text-black mb-6 text-center">
        Elige tu tipo de reserva
      </h1>

      {/* Descripciones y botones */}
      <div className="flex flex-col items-center space-y-6">
        {/* Opción de Hotel */}
        <div className="border border-[#CD9C8A] rounded-lg p-6 w-80 text-center shadow-lg">
          <p className="text-lg text-black mb-6">
            Haz clic aquí para crear una reserva en el{" "}
            <span className="text-[#CD9C8A] font-semibold">Hotel</span>.
          </p>
          <Link
            href="/ResHotel"
            className="px-8 py-4 bg-[#CD9C8A] text-white font-semibold rounded-lg shadow-lg hover:bg-orange-400 transition-all duration-300"
          >
            Reservar en Hotel
          </Link>
        </div>

        {/* Opción de Departamento */}
        <div className="border border-[#CD9C8A] rounded-lg p-6 w-80 text-center shadow-lg">
          <p className="text-lg text-black mb-6">
            Haz clic aquí para crear una reserva en un{" "}
            <span className="text-[#CD9C8A] font-semibold">Departamento</span>.
          </p>
          <Link
            href="/ResDpto"
            className="px-8 py-4 bg-[#CD9C8A] text-white font-semibold rounded-lg shadow-lg hover:bg-orange-400 transition-all duration-300"
          >
            Reservar en Departamento
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
