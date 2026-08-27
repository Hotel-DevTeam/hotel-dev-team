import CreateReservationHotel from "../../components/formReservation/CreateReservationHotel";
import ProtectedRouteStaff from "@/components/ProtectedRouteStaff";

function Page() {
  return (
    <ProtectedRouteStaff>
      <div>
        <CreateReservationHotel />
      </div>
    </ProtectedRouteStaff>
  );
}

export default Page;
