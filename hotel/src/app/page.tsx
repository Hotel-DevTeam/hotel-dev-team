import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center gap-3">
      <Link href={"../CreateOrder"}>
        <button>Crear Venta</button>
      </Link>
      <Link href={"../OrderPage"}>
        <button>Ver Ventas</button>
      </Link>
    </div>
  );
}
