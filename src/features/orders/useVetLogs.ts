import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";

export interface VetLog {
  id: number;
  user: {
    id: number;
    firstName: string;
    lastName: string;
  };
  weightBefore: number;
  weightMeat: number;
  weightOffals: number;
  logDateTime: string;
  status: number;
}
const fetchAllVetLogs = async (
  orderId: number,
  page: number,
  size: number,
  dateFrom?: string | null,
  dateTo?: string | null
): Promise<{ logs: VetLog[]; totalCount: number }> => {
  const res = await axios.get(
    "http://41.33.54.162:8085/halalcore/api/order-vet-logs/search",
    {
      params: {
        page,
        size,
        orderId,
        id: "",
        dateFrom: dateFrom || "",
        dateTo: dateTo || "",
      },
    }
  );

  const logs: VetLog[] = Array.isArray(res.data) ? res.data : [];

  return {
    logs,
    totalCount: parseInt(res.headers["x-total-count"] ?? "0", 10),
  };
};

export const useVetLogs = (
  orderId: number,
  page: number,
  size: number,
  dateFrom?: string | null,
  dateTo?: string | null
) => {
  return useQuery({
    queryKey: ["vetLogs", orderId, page, size, dateFrom, dateTo], // include filters in key
    queryFn: () => fetchAllVetLogs(orderId, page, size, dateFrom, dateTo),
    placeholderData: keepPreviousData,
    enabled: !!orderId,
  });
};

