import Link from "next/link";

function OptionRes() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold text-[#CD9C8A] mb-6">
        ¿A dónde es la reserva?
      </h1>

      <div className="flex gap-6">
        <Link
          href="/ResHotel"
          className="px-6 py-3 bg-[#CD9C8A] text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-orange-400 hover:text-white transition-all duration-300"
        >
          Hotel
        </Link>

        <Link
          href="/"
          className="px-6 py-3 bg-[#CD9C8A] text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-orange-400 hover:text-white transition-all duration-300"
        >
          Departamento
        </Link>
      </div>
    </div>
  );
}

export default OptionRes;
