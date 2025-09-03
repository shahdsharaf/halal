import {
  Box,
  useMediaQuery,
  useTheme,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setDateFrom, setDateTo } from "../../features/orders/ordersSlice";
import ClearIcon from "@mui/icons-material/Clear";

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
            dispatch(
              setDateFrom(newValue ? newValue.format("YYYY-MM-DD") : null)
            )
          }
          slotProps={{
            textField: {
              size: "small",
              fullWidth: isMobile,
              InputProps: {
                endAdornment: dateFrom ? (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => dispatch(setDateFrom(null))}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              },
            },
          }}
        />

        <DatePicker
          label="End Date"
          value={dateTo ? dayjs(dateTo) : null}
          onChange={(newValue: Dayjs | null) =>
            dispatch(setDateTo(newValue ? newValue.format("YYYY-MM-DD") : null))
          }
          slotProps={{
            textField: {
              size: "small",
              fullWidth: isMobile,
              InputProps: {
                endAdornment: dateTo ? (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => dispatch(setDateTo(null))}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              },
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};
