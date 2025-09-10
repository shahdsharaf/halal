import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import { OrdersDateFilters } from "../OrderDateFilters/OrderDateFilters";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

interface OrdersFiltersProps {
  totalCount: number;
  status?: number;
}

export const OrderDetailsFilters: React.FC<OrdersFiltersProps> = ({
  totalCount,
  // status,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation(["orders"]);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { orderId } = useParams<{ orderId: string }>();

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
        <Box
          display="flex"
          gap={2}
          flexDirection={isMobile ? "column" : "row"}
          alignItems={isMobile ? "stretch" : "center"}
        >
          <OrdersDateFilters />
          {/* {status === 2 && ( */}
          <Button
            variant="contained"
            color="error"
            startIcon={<AddIcon />}
            fullWidth={isMobile}
            onClick={() => navigate(`/orders/${orderId}/vet-logs/add-log`)}
          >
            {t("createLog", { ns: "orders" })}
          </Button>
          {/* )} */}
        </Box>
      </Box>
    </div>
  );
};
