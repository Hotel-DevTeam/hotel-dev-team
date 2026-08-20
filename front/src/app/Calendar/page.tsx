import Calendar from "@/components/Calendar/Calendar";
import ProtectedRouteStaff from "@/components/ProtectedRouteStaff";

function Page() {
  return (
    <ProtectedRouteStaff>
      <Calendar />
    </ProtectedRouteStaff>
  );
}

export default Page;
