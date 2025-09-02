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
interface OrdersFiltersProps {
  totalCount: number;
}

export const OrdersFilters: React.FC<OrdersFiltersProps> = ({ totalCount }) => {
  const theme = useTheme();
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
          Orders
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
          {totalCount} Orders
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
          placeholder="Halal Market Order No."
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
            <em>Filter by Status</em>
          </MenuItem>
          <MenuItem value="all">
            <em>Select All</em>
          </MenuItem>
          {Object.entries(statusMap).map(([key, { label }]) => (
            <MenuItem key={key} value={key}>
              {label}
            </MenuItem>
          ))}
        </Select>

        <OrdersDateFilters />
        <Button
          variant="contained"
          color="error"
          startIcon={<AddIcon />}
          fullWidth={isMobile}
          onClick={() => navigate("/orders/create-order")}
        >
          Create Order
        </Button>
      </Box>
    </Box>
  );
};
