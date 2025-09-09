import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setSearchOrderNo,
  setStatusFilter,
} from "../../features/orders/ordersSlice";
import { statusMap } from "../../features/orders/statusMap";
import { OrdersDateFilters } from "../OrderDateFilters/OrderDateFilters";
import { useTranslation } from "react-i18next";

interface OrdersFiltersProps {
  totalCount: number;
}

export const OrdersFilters: React.FC<OrdersFiltersProps> = ({ totalCount }) => {
  const theme = useTheme();
  const { role } = useAppSelector((state) => state.auth);
  const { t } = useTranslation(["orders"]);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { searchOrderNo, status } = useAppSelector(
    (state) => state.ordersFilters
  );

  return (
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
          {t("orders", { ns: "orders" })}
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
          {totalCount} {t("orders", { ns: "orders" })}
        </Typography>
      </Box>

      <Box
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        alignItems={isMobile ? "stretch" : "center"}
        gap={2}
        width={isMobile ? "100%" : "auto"}
      >
        <TextField
          placeholder={t("orderNum", { ns: "orders" })}
          size="small"
          value={searchOrderNo}
          onChange={(e) => dispatch(setSearchOrderNo(e.target.value))}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
          fullWidth={isMobile}
        />
        <Select
          value={status !== null ? String(status) : ""}
          onChange={(e) => {
            const val = e.target.value;
            if (val === "all" || val === "") {
              dispatch(setStatusFilter(null));
            } else {
              dispatch(setStatusFilter(Number(val)));
            }
          }}
          displayEmpty
          size="small"
          sx={{ minWidth: 160 }}
          fullWidth={isMobile}
        >
          <MenuItem value="" disabled>
            <em> {t("statusFilter", { ns: "orders" })}</em>
          </MenuItem>
          <MenuItem value="all">
            <em> {t("selectAll", { ns: "orders" })}</em>
          </MenuItem>
          {Object.entries(statusMap).map(([statusId, { label: statusKey }]) => (
            <MenuItem key={statusId} value={statusId}>
              {t(`status.${statusKey}`, { ns: "orders" })}
            </MenuItem>
          ))}
        </Select>

        <OrdersDateFilters />
        {role === "role_representative" && (
          <Button
            variant="contained"
            color="error"
            startIcon={<AddIcon />}
            fullWidth={isMobile}
            onClick={() => navigate("/orders/create-order")}
          >
            {t("createOrder", { ns: "orders" })}
          </Button>
        )}
      </Box>
    </Box>
  );
};
