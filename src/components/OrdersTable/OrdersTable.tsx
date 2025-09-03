import { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Typography,
  Pagination,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../../features/orders/api";
import type { Order } from "../../features/orders/types";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setPage } from "../../features/orders/ordersSlice";
import OrderStatusChip from "../../features/orders/OrdersStatusChip";

interface OrdersTableProps {
  onTotalCount: (count: number) => void;
}
export const OrdersTable: React.FC<OrdersTableProps> = ({ onTotalCount }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { searchOrderNo, status, page, pageSize, dateFrom, dateTo } =
    useAppSelector((state) => state.ordersFilters);

  const { data, isLoading, isError } = useOrders(
    page - 1,
    pageSize,
    searchOrderNo,
    status,
    dateFrom,
    dateTo
  );

  const totalCount = data?.totalCount ?? 0;
  const orders: Order[] = data?.orders ?? [];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    order: Order
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrder(order);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrder(null);
  };

  const handleView = () => {
    if (selectedOrder) navigate(`/orders/${selectedOrder.id}/view-order`);
    handleMenuClose();
  };

  const handleEdit = () => {
    if (selectedOrder) navigate(`/orders/${selectedOrder.id}/edit-order`);
    handleMenuClose();
  };

  const handleTimeline = () => {
    if (selectedOrder) navigate(`/orders/${selectedOrder.id}/order-timeline`);
    handleMenuClose();
  };

  useEffect(() => {
    onTotalCount(totalCount);
  }, [totalCount, onTotalCount]);

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
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.orderNo}</TableCell>
                <TableCell>{order.destCompanyName}</TableCell>
                <TableCell>{order.totalweight}</TableCell>
                <TableCell>{order.startDate}</TableCell>
                <TableCell>{order.endDate}</TableCell>
                <TableCell>
                  <OrderStatusChip status={order.status} />
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={(e) => handleMenuOpen(e, order)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleView}>View</MenuItem>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleTimeline}>Order Timeline</MenuItem>
      </Menu>

      <Box display="flex" justifyContent="center" my={2}>
        <Pagination
          count={Math.ceil(totalCount / pageSize)}
          page={page}
          onChange={(_, value) => dispatch(setPage(value))}
        />
      </Box>
    </Box>
  );
};
