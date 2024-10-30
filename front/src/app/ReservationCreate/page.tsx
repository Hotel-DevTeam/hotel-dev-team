import CreateReservation from "@/components/CreateReservation/CreateReservation";
import Link from "next/link";

function Page() {
  return (
    <div>
      <Link href={"../ReservationList"}>
        <button>VER RESERVAS</button>
      </Link>
      <CreateReservation />
    </div>
  );
}

export default Page;
