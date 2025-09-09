import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { OrdersDateFilters } from "../OrderDateFilters/OrderDateFilters";
interface OrdersFiltersProps {
  totalCount: number;
}

export const OrderDetailsFilters: React.FC<OrdersFiltersProps> = ({
  totalCount,
}) => {
  const theme = useTheme();

  const { t } = useTranslation(["orders"]);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <div>
      <Box
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        justifyContent="space-between"
        alignItems={isMobile ? "stretch" : "center"}
        gap={2}
        m={4}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="h5" fontWeight="bold">
            {t("orderDetailsHistory", { ns: "orders" })}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              border: "1px solid",
              borderColor: "grey.300",
              borderRadius: 5,
              px: 1.5,
              py: 0.5,
              fontSize: 14,
            }}
          >
            {totalCount} {t("logs", { ns: "orders" })}
          </Typography>
        </Box>
        <OrdersDateFilters />
      </Box>
    </div>
  );
};
