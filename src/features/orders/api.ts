import { useQuery } from "@tanstack/react-query";
import type { Order } from "./types";

const fetchOrders = async (): Promise<Order[]> => {
  const res = await fetch(
    "http://41.33.54.162:8085/halalcore/api/company-orders/search?page=0&size=10&orderNo=&orderId=&status=3&dateFrom=&dateTo="
  );
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
};

export const useOrders = () => {
  return useQuery<Order[], Error>({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });
};
