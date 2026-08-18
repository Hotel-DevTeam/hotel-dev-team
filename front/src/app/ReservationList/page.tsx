import ListReservation from "@/components/ListReservation/ListReservation";
import ProtectedRouteStaff from "@/components/ProtectedRouteStaff";

function Page() {
  return (
    <ProtectedRouteStaff>
      <div>
        <ListReservation />
      </div>
    </ProtectedRouteStaff>
  );
}

export default Page;
