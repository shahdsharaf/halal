import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  CircularProgress,
  Typography,
  Pagination,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useOrders } from "../../features/orders/api";
import type { Order } from "../../features/orders/types";

const statusColor: Record<
  Order["status"],
  "success" | "info" | "warning" | "default" | "error"
> = {
  Active: "success", // green
  New: "info", // blue
  "Payment Settlement": "info", // blue
  "Awaiting Document": "warning", // orange
  "Ready for Shipment": "default", // grey
  Completed: "default", // grey
  "Under Review": "error", // red
};

export const OrdersTable: React.FC = () => {
  const { data: orders, isLoading, isError } = useOrders();

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );

  if (isError)
    return (
      <Typography color="error" align="center" my={4}>
        Failed to load orders.
      </Typography>
    );

  return (
    <Box m={4}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Halal Market Order No.</TableCell>
              <TableCell>Importer Company</TableCell>
              <TableCell>Requested Production Weight</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.halalOrderNo}</TableCell>
                <TableCell>{order.importerCompany}</TableCell>
                <TableCell>{order.requestedProducts}</TableCell>
                <TableCell>{order.startDate}</TableCell>
                <TableCell>{order.endDate}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={statusColor[order.status]}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" my={2}>
        <Pagination count={10} page={1} />
      </Box>
    </Box>
  );
};
