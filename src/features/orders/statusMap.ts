export const statusMap: Record<
  number,
  {
    label: string;
    color: "default" | "primary" | "success" | "warning" | "error";
  }
> = {
  1: { label: "New", color: "primary" },
  2: { label: "Active", color: "success" },
  3: { label: "Awaiting Document", color: "warning" },
  4: { label: "Ready for Shipment", color: "default" },
  5: { label: "Completed", color: "default" },
  6: { label: "Under Review", color: "error" },
  7: { label: "Payment Settlement", color: "primary" },
};
