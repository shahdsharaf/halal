import { Box, useMediaQuery, useTheme } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setDateFrom, setDateTo } from "../../features/orders/ordersSlice";

export const OrdersDateFilters = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useAppDispatch();
  const { dateFrom, dateTo } = useAppSelector((state) => state.ordersFilters);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" gap={2} flexDirection={isMobile ? "column" : "row"}>
        <DatePicker
          label="Start Date"
          value={dateFrom ? dayjs(dateFrom) : null}
          onChange={(newValue: Dayjs | null) =>
            dispatch(setDateFrom(newValue ? newValue.toISOString() : null))
          }
          slotProps={{
            textField: { size: "small", fullWidth: isMobile },
          }}
        />

        <DatePicker
          label="End Date"
          value={dateTo ? dayjs(dateTo) : null}
          onChange={(newValue: Dayjs | null) =>
            dispatch(setDateTo(newValue ? newValue.toISOString() : null))
          }
          slotProps={{
            textField: { size: "small", fullWidth: isMobile },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};
