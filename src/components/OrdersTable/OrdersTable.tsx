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
import { useOrders } from "../../features/orders/useOrders";
import type { Order } from "../../features/orders/types";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setPage } from "../../features/orders/ordersSlice";
import OrderStatusChip from "../../features/orders/OrdersStatusChip";
import { useTranslation } from "react-i18next";

interface OrdersTableProps {
  onTotalCount: (count: number) => void;
}
export const OrdersTable: React.FC<OrdersTableProps> = ({ onTotalCount }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { searchOrderNo, status, page, pageSize, dateFrom, dateTo } =
    useAppSelector((state) => state.ordersFilters);
  const { t } = useTranslation(["orders", "validations"]);
  const { role } = useAppSelector((state) => state.auth);

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

  const handleVetLogs = () => {
    if (selectedOrder) navigate(`/orders/${selectedOrder.id}/vet-logs`);
    handleMenuClose();
  };

  const handleViewContainers = () => {
    if (selectedOrder) navigate(`/orders/${selectedOrder.id}/containers`);
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
        {t("loadError", { ns: "validations" })}
      </Typography>
    );

  return (
    <Box m={4}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell> {t("orderNum", { ns: "orders" })}</TableCell>
              <TableCell>{t("importerCompany", { ns: "orders" })}</TableCell>
              <TableCell>
                {t("requestedProductionWeight", { ns: "orders" })}
              </TableCell>
              <TableCell>{t("startDate", { ns: "orders" })}</TableCell>
              <TableCell>{t("endDate", { ns: "orders" })}</TableCell>
              <TableCell>{t("status.title", { ns: "orders" })}</TableCell>
              <TableCell align="right">
                {t("actions", { ns: "orders" })}
              </TableCell>
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
        {role === "role_representative" && (
          <>
            <MenuItem onClick={handleView}>
              {t("view", { ns: "orders" })}
            </MenuItem>
            <MenuItem onClick={handleEdit}>
              {t("edit", { ns: "orders" })}
            </MenuItem>
            <MenuItem onClick={handleTimeline}>
              {t("orderTimeline", { ns: "orders" })}
            </MenuItem>
          </>
        )}

        {role === "role_doctor" && (
          <>
            <MenuItem onClick={handleVetLogs}>
              {t("vetLogs", { ns: "orders" })}
            </MenuItem>
            <MenuItem onClick={handleViewContainers}>
              {t("viewContainers", { ns: "orders" })}
            </MenuItem>
          </>
        )}
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
