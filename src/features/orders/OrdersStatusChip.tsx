import { Chip } from "@mui/material";
import { statusMap } from "./statusMap";
import { useTranslation } from "react-i18next";

interface OrderStatusChipProps {
  status: number;
}

export default function OrderStatusChip({ status }: OrderStatusChipProps) {
  const { t } = useTranslation(["orders"]);
  const { label, color } = statusMap[status] || {
    label: "Unknown",
    color: "default",
  };

  return (
    <Chip
      label={t(`status.${[label]}`, { ns: "orders" })}
      color={color}
      size="small"
    />
  );
}
