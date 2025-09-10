import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "./order-details.scss";

interface OrderDetailsProps {
  orderId: number;
}

const fetchOrderDetails = async (orderId: number) => {
  const { data } = await axios.get(
    "http://41.33.54.162:8085/halalcore/api/company-orders/search",
    {
      params: {
        page: 0,
        size: 1,
        orderId,
      },
    }
  );
  return data?.[0] ?? null;
};

export default function OrderDetails({ orderId }: OrderDetailsProps) {
  const {
    data: order,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orderDetails", orderId],
    queryFn: () => fetchOrderDetails(orderId),
  });

  if (isLoading) return <CircularProgress />;
  if (isError || !order) {
    return <Typography color="error">Failed to load order details.</Typography>;
  }

  return (
    <Card className="order-details-card">
      <CardContent>
        <Box className="order-details-row">
          <Typography>
            <strong>Certificate No.:</strong>{" "}
            {order?.srcCompanyDto?.externalVetCode}
          </Typography>
          <Typography>
            <strong>Company Name:</strong> {order?.srcCompanyDto?.name}
          </Typography>
          <Typography>
            <strong>Halal Market Order No.:</strong> {order?.orderNo}
          </Typography>
        </Box>

        <Box className="order-details-row">
          <Typography>
            <strong>Production Start Date:</strong> {order?.startDate}
          </Typography>
          <Typography>
            <strong>Production End Date:</strong> {order?.endDate}
          </Typography>
          <Typography>
            <strong>Requested Weight:</strong> {order?.totalweight}
          </Typography>
        </Box>

        <Box className="order-details-row single">
          <Typography>
            <strong>Production Order Description:</strong> {order?.orderDesc}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
