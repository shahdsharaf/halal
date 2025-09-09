import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";
import type { Order } from "./types";

const fetchOrders = async (
  page: number,
  size: number,
  orderNo?: string,
  status?: number | null,
  dateFrom?: string | null,
  dateTo?: string | null
): Promise<{ orders: Order[]; totalCount: number }> => {
  const res = await axios.get(
    "http://41.33.54.162:8085/halalcore/api/company-orders/search",
    {
      params: {
        page,
        size,
        orderNo: orderNo || "",
        status: status ?? "",
        orderId: "",
        dateFrom: dateFrom || "",
        dateTo: dateTo || "",
      },
    }
  );

  return {
    orders: res.data as Order[],
    totalCount: parseInt(res.headers["x-total-count"] ?? "0", 10),
  };
};

export const useOrders = (
  page: number,
  size: number,
  orderNo?: string,
  status?: number | null,
  dateFrom?: string | null,
  dateTo?: string | null
) => {
  return useQuery({
    queryKey: ["orders", page, size, orderNo, status, dateFrom, dateTo],
    queryFn: () => fetchOrders(page, size, orderNo, status, dateFrom, dateTo),
    placeholderData: keepPreviousData,
  });
};
