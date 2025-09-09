export const statusMap: Record<
  number,
  {
    label: string;
    color: "default" | "primary" | "success" | "warning" | "error";
  }
> = {
  1: { label: "new", color: "primary" },
  2: { label: "active", color: "success" },
  3: { label: "awaitingDocument", color: "warning" },
  4: { label: "readyForShipment", color: "default" },
  5: { label: "completed", color: "default" },
  6: { label: "underReview", color: "error" },
  7: { label: "paymentSettlement", color: "primary" },
};
