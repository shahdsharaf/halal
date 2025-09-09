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
  status: string | null;
}

const fetchVetLogs = async (
  page: number,
  size: number,
  orderId: number,
  id?: string,
  dateFrom?: string,
  dateTo?: string
): Promise<{ logs: VetLog[]; totalCount: number }> => {
  const res = await axios.get(
    "http://41.33.54.162:8085/halalcore/api/order-vet-logs/search",
    {
      params: {
        page,
        size,
        orderId,
        id: id || null,
        dateFrom: dateFrom || "",
        dateTo: dateTo || "",
      },
    }
  );

  const logs: VetLog[] = Array.isArray(res.data) ? res.data : [];

  return {
    logs,
    totalCount: logs.length,
  };
};

export const useVetLogs = (
  page: number,
  size: number,
  orderId: number,
  id?: string,
  dateFrom?: string,
  dateTo?: string
) => {
  return useQuery({
    queryKey: ["vetLogs", page, size, orderId, id, dateFrom, dateTo],
    queryFn: () => fetchVetLogs(page, size, orderId, id, dateFrom, dateTo),
    placeholderData: keepPreviousData,
  });
};
