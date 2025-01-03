import CreateOrder from "@/components/CreateOrder/CreateOrder";
import Link from "next/link";

function Page() {
  return (
    <div>
      <CreateOrder />
      <Link href={"../OrderPage"}>
        <button   className="inline-block rounded bg-[#CD9C8A] text-white px-12 py-3 text-sm font-medium hover:bg-transparent hover:text-[#FF5100] hover:border-[#CD9C8A] hover:border-2 focus:outline-none focus:ring active:text-[#FF5100] transition-all duration-300">Ver Ventas</button>
      </Link>
    </div>
  );
}

export default Page;
