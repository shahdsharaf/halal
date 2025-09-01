import { Chip } from "@mui/material";
import { statusMap } from "./statusMap";

interface OrderStatusChipProps {
  status: number;
}

export default function OrderStatusChip({ status }: OrderStatusChipProps) {
  const { label, color } = statusMap[status] || {
    label: "Unknown",
    color: "default",
  };

  return <Chip label={label} color={color} size="small" />;
}
