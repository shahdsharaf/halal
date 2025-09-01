import { OrdersFilters } from "../../components/OrdersFilters/OrdersFilters";
import SignInFooter from "../../components/SignInFooter/SignInFooter";
import { OrdersTable } from "../../components/OrdersTable/OrdersTable";
import { useState } from "react";

export const Orders = () => {
  const [totalCount, setTotalCount] = useState(0);
  return (
    <div>
      <OrdersFilters totalCount={totalCount} />
      <OrdersTable onTotalCount={setTotalCount} />
      <SignInFooter />
    </div>
  );
};
