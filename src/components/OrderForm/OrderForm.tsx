import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  FormLabel,
  InputAdornment,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import { grey } from "@mui/material/colors";
import TonsIcon from "../../assets/img/tons-icon.svg";
import { useTranslation } from "react-i18next";
import "./order-form.scss";
const countries = [
  { id: "1", labelEn: "India", labelAr: "" },
  { id: "2", labelEn: "Egypt", labelAr: "" },
  { id: "3", labelEn: "UAE", labelAr: "" },
];
const orderSchema = z.object({
  govsPermitNo: z.string().nonempty("Egyptian GOVS Permit No is required"),
  productionStartDate: z.string().nonempty("Production Start Date is required"),
  productionEndDate: z.string().nonempty("Production End Date is required"),
  requestedWeight: z
    .number()
    .positive("Requested Weight must be greater than zero"),
  productionDescription: z
    .string()
    .nonempty("Production Order Description is required"),
  companyName: z.string().nonempty("Company Name is required"),
  country: z.string().nonempty("Country is required"),
  contactName: z.string().nonempty("Contact Name is required"),
  contactMobile: z.string().min(6, "Contact Mobile must be at least 6 digits"),
  contactEmail: z.string().email("Invalid email format"),
});

type OrderFormData = z.infer<typeof orderSchema>;

export const OrderForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const today = dayjs().format("YYYY-MM-DD");
  const [loading, setIsLoading] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const { t } = useTranslation(["alerts"]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      productionStartDate: today,
      productionEndDate: today,
      govsPermitNo: "",
      requestedWeight: 0,
      productionDescription: "",
      companyName: "",
      country: "Egypt",
      contactName: "",
      contactEmail: "",
      contactMobile: "",
    },
  });

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    axios
      .get(`http://41.33.54.162:8085/halalcore/api/company-orders/search`, {
        params: { orderId: id, page: 0, size: 1 },
      })
      .then((res) => {
        const fetched = res.data[0];
        setOrder(fetched);

        reset({
          govsPermitNo: fetched.govPermitNo,
          productionStartDate: dayjs(fetched.startDate, "DD-MM-YYYY").format(
            "YYYY-MM-DD"
          ),
          productionEndDate: dayjs(fetched.endDate, "DD-MM-YYYY").format(
            "YYYY-MM-DD"
          ),
          requestedWeight: Number(fetched.totalweight),
          productionDescription: fetched.orderDesc,
          companyName: fetched.destCompanyName,
          country: fetched.destCompanyCountry?.id?.toString(),
          contactName: fetched.destContractName,
          contactEmail: fetched.destContractEmail,
          contactMobile: String(fetched.destContractMobile),
        });

        setIsLoading(false);
      })
      .catch(() => {
        toast.error(t("fetchError", { ns: "alerts" }));
        setIsLoading(false);
      });
  }, [id, reset]);

  const onSubmit = async (data: OrderFormData) => {
    try {
      const payload = {
        ...(id && { id: Number(id) }),
        govPermitNo: data.govsPermitNo,
        startDate: dayjs(data.productionStartDate).format("DD-MM-YYYY"),
        endDate: dayjs(data.productionEndDate).format("DD-MM-YYYY"),
        totalweight: data.requestedWeight,
        orderDesc: data.productionDescription,
        destCompanyName: data.companyName,
        destCompanyCountry: { id: data.country },
        destContractName: data.contactName,
        destContractEmail: data.contactEmail,
        destContractMobile: String(data.contactMobile),
        ...(id ? {} : { status: 1 }),
      };

      if (id) {
        await axios.post(
          "http://41.33.54.162:8085/halalcore/api/company-orders/update",
          payload
        );
        toast.success(t("updateSuccessful", { ns: "alerts" }));
      } else {
        await axios.post(
          "http://41.33.54.162:8085/halalcore/api/company-orders",
          payload
        );
        toast.success(t("creationSuccessful", { ns: "alerts" }));
      }

      navigate("/orders");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(t("somethingWrong", { ns: "alerts" }));
      }
    }
  };

  const handleCancel = () => navigate("/orders");

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className="create-order-form"
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom mb="30px">
        {id ? "Edit Order" : "Create New Order"}
      </Typography>

      <div className="form-row">
        <div className="form-group govs-permit">
          <FormLabel>
            Egyptian GOVS Permit No <span className="required">*</span>
          </FormLabel>
          <TextField
            error={!!errors.govsPermitNo}
            helperText={errors.govsPermitNo?.message}
            fullWidth
            disabled={!!id}
            {...register("govsPermitNo")}
          />
        </div>

        {id && (
          <div className="form-group">
            <FormLabel>Halal Market Order No.</FormLabel>
            <TextField value={order?.orderNo || ""} fullWidth disabled />
          </div>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <FormLabel>
            Production Start Date <span className="required">*</span>
          </FormLabel>
          <TextField
            fullWidth
            type="date"
            {...register("productionStartDate")}
            error={!!errors.productionStartDate}
            helperText={errors.productionStartDate?.message}
          />
        </div>
        <div className="form-group">
          <FormLabel>
            Production End Date <span className="required">*</span>
          </FormLabel>
          <TextField
            fullWidth
            type="date"
            {...register("productionEndDate")}
            error={!!errors.productionEndDate}
            helperText={errors.productionEndDate?.message}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <FormLabel>
            Requested Weight for Production <span className="required">*</span>
          </FormLabel>
          <TextField
            fullWidth
            type="number"
            {...register("requestedWeight", { valueAsNumber: true })}
            error={!!errors.requestedWeight}
            helperText={errors.requestedWeight?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <span style={{ marginInlineStart: 4 }}>Tons</span>
                  <img
                    src={TonsIcon}
                    alt="tons icon"
                    style={{ width: 18, height: 18, marginInlineStart: 4 }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="form-group">
          <FormLabel>
            Production Order Description <span className="required">*</span>
          </FormLabel>
          <TextField
            fullWidth
            multiline
            minRows={3}
            {...register("productionDescription")}
            error={!!errors.productionDescription}
            helperText={errors.productionDescription?.message}
          />
        </div>
      </div>

      <Typography variant="h5" fontWeight="bold" gutterBottom mb="25px">
        Importer Company Details
      </Typography>
      <div className="form-row">
        <div className="form-group">
          <FormLabel>
            Company Name <span className="required">*</span>
          </FormLabel>
          <TextField
            fullWidth
            {...register("companyName")}
            error={!!errors.companyName}
            helperText={errors.companyName?.message}
          />
        </div>
        <div className="form-group">
          <FormLabel>
            Country <span className="required">*</span>
          </FormLabel>
          <TextField
            select
            fullWidth
            {...register("country")}
            error={!!errors.country}
            helperText={errors.country?.message}
          >
            {countries.map((item, index) => (
              <MenuItem key={index} value={item.id}>
                {item.labelEn}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </div>

      <Typography variant="h5" fontWeight="bold" gutterBottom mb="25px">
        Importer Contact Information
      </Typography>
      <div className="form-row">
        <div className="form-group">
          <FormLabel>
            Contact Name <span className="required">*</span>
          </FormLabel>
          <TextField
            fullWidth
            {...register("contactName")}
            error={!!errors.contactName}
            helperText={errors.contactName?.message}
          />
        </div>
        <div className="form-group">
          <FormLabel>
            Contact Mobile <span className="required">*</span>
          </FormLabel>
          <TextField
            fullWidth
            {...register("contactMobile")}
            error={!!errors.contactMobile}
            helperText={errors.contactMobile?.message}
          />
        </div>
      </div>

      <div className="form-group contact-email">
        <FormLabel>
          Contact Email <span className="required">*</span>
        </FormLabel>
        <TextField
          fullWidth
          {...register("contactEmail")}
          error={!!errors.contactEmail}
          helperText={errors.contactEmail?.message}
        />
      </div>

      <div className="form-actions">
        <Button type="submit" variant="contained" color="error">
          {id ? "Edit" : "Add"}
        </Button>
        <Button
          variant="outlined"
          onClick={handleCancel}
          sx={{
            color: grey[500],
            borderColor: grey[500],
            "&:hover": { borderColor: grey[700], color: grey[700] },
          }}
        >
          Cancel
        </Button>
      </div>
    </Box>
  );
};

export default OrderForm;
