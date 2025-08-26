import React from "react";
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
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export const OrdersFilters: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
          96 Orders
        </Typography>{" "}
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
          fullWidth={isMobile}
        />

        <Select defaultValue="" displayEmpty size="small" fullWidth={isMobile}>
          <MenuItem value="">
            <em>Filter by Status</em>
          </MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="processing">Processing</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>

        <TextField
          placeholder="Search by Production Start Date"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarTodayIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
          fullWidth={isMobile}
        />

        <Button
          variant="contained"
          color="error"
          startIcon={<AddIcon />}
          fullWidth={isMobile}
        >
          Create Order
        </Button>
      </Box>
    </Box>
  );
};
