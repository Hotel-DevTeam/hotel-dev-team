import OrderPage from "../../components/OrderList/OrderList";
import ProtectedRouteStaff from "@/components/ProtectedRouteStaff";

function Page() {
  return (
    <ProtectedRouteStaff>
      <div>
        <OrderPage />
      </div>
    </ProtectedRouteStaff>
  );
}

export default Page;
