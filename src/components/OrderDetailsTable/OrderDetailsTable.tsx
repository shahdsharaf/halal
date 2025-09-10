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
import { useVetLogs } from "../../features/orders/useVetLogs";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

interface VetLogsTableProps {
  onTotalCount: (count: number) => void;
}

export const OrderDetailsTable: React.FC<VetLogsTableProps> = ({
  onTotalCount,
}) => {
  const { t } = useTranslation(["orders", "validations"]);
  const { orderId } = useParams<{ orderId: string }>();
  const { dateFrom, dateTo } = useAppSelector((state) => state.ordersFilters);

  const [currentPage, setCurrentPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedLog, setSelectedLog] = useState<number | null>(null);

  const itemsPerPage = 10;

  const { data, isLoading, isError } = useVetLogs(
    Number(orderId),
    currentPage - 1,
    itemsPerPage,
    dateFrom,
    dateTo
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [dateFrom, dateTo]);

  const totalCount = data?.totalCount ?? 0;
  const logs = data?.logs ?? [];
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedLog(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedLog(null);
  };

  const handleViewDetails = () => {
    console.log("View details for log:", selectedLog);
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
              <TableCell>{t("weightBefore", { ns: "orders" })}</TableCell>
              <TableCell>{t("weightMeat", { ns: "orders" })}</TableCell>
              <TableCell>{t("weightOffals", { ns: "orders" })}</TableCell>
              <TableCell>{t("dateTime", { ns: "orders" })}</TableCell>
              <TableCell>{t("status.title", { ns: "orders" })}</TableCell>
              <TableCell align="right">
                {t("actions", { ns: "orders" })}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.weightBefore}</TableCell>
                <TableCell>{log.weightMeat}</TableCell>
                <TableCell>{log.weightOffals}</TableCell>
                <TableCell>
                  {new Date(log.logDateTime).toLocaleString()}
                </TableCell>
                <TableCell>{log.status ?? "-"}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={(e) => handleMenuOpen(e, log.id)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {logs.length === 0 && (
        <Typography
          color="error"
          align="center"
          mt={2}
          fontWeight="bold"
          fontSize="25px"
          minHeight="27vh"
        >
          {t("noData", { ns: "orders" })}
        </Typography>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleViewDetails}>
          {t("view", { ns: "orders" })}
        </MenuItem>
      </Menu>

      <Box display="flex" justifyContent="center" my={2}>
        <Pagination
          count={Math.ceil(totalCount / itemsPerPage)}
          page={currentPage}
          onChange={(_, value) => setCurrentPage(value)}
        />
      </Box>
    </Box>
  );
};
