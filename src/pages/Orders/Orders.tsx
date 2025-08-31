import { OrdersFilters } from "../../components/OrdersFilters/OrdersFilters";
import SignInFooter from "../../components/SignInFooter/SignInFooter";
import { OrdersTable } from "../../components/OrdersTable/OrdersTable";
export const Orders = () => {
  return (
    <div>
      <OrdersFilters />
      <OrdersTable />
      <SignInFooter />
    </div>
  );
};
