import CreateOrder from "@/components/CreateOrder/CreateOrder";
import Link from "next/link";

function Page() {
  return (
    <div>
      <Link href={"../OrderPage"}>
        <button>Ver Ventas</button>
      </Link>
      <CreateOrder />
    </div>
  );
}

export default Page;
