import Link from "next/link";

export default function Home() {
  return (
    <div className="flex gap-16 justify-center items-center">
      <Link href={"../ReservationCreate"}>
        <button>Formulario Reservas</button>
      </Link>
      <Link href={"../ReservationList"}>
        <button>Vistas Reservas</button>
      </Link>
    </div>
  );
}
