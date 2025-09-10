import { OrderDetailsFilters } from "../../components/OrderDetailsFilters/OrderDetailsFilters";
import { useState } from "react";
import SignInFooter from "../../components/SignInFooter/SignInFooter";
import { OrderDetailsTable } from "../../components/OrderDetailsTable/OrderDetailsTable";
export const VeterinaryLogs = () => {
  const [totalCount, setTotalCount] = useState(0);

  return (
    <div>
      <OrderDetailsFilters totalCount={totalCount} />

      <OrderDetailsTable onTotalCount={setTotalCount} />
      <SignInFooter />
    </div>
  );
};
