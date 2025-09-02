import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  FormLabel,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import { grey } from "@mui/material/colors";
import "./create-order-form.scss";

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
  contactMobile: z.number().min(6, "Contact Mobile must be at least 6 digits"),
  contactEmail: z.string().email("Invalid email format"),
});

type OrderFormData = z.infer<typeof orderSchema>;

export const CreateOrderForm: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
  });

  const onSubmit = async (data: OrderFormData) => {
    try {
      const payload = {
        govPermitNo: data.govsPermitNo,
        startDate: dayjs(data.productionStartDate).format("DD-MM-YYYY"),
        endDate: dayjs(data.productionEndDate).format("DD-MM-YYYY"),
        totalweight: data.requestedWeight,
        orderDesc: data.productionDescription,
        destCompanyName: data.companyName,
        destCompanyCountry: { id: 1 },
        destContractName: data.contactName,
        destContractEmail: data.contactEmail,
        destContractMobile: data.contactMobile,
        status: 1,
      };

      await axios.post(
        "http://41.33.54.162:8085/halalcore/api/company-orders",
        payload
      );

      toast.success("Order created successfully!");
      navigate("/orders");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Failed to create order"
        );
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong while creating order");
      }
    }
  };

  const handleCancel = () => {
    navigate("/orders");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className="create-order-form"
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        marginBottom="30px"
      >
        Create New Order
      </Typography>

      <div className="form-group">
        <FormLabel>
          Egyptian GOVS Permit No <span className="required">*</span>
        </FormLabel>
        <div className="form-group govs-permit">
          <TextField
            {...register("govsPermitNo")}
            error={!!errors.govsPermitNo}
            helperText={errors.govsPermitNo?.message}
            fullWidth
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <FormLabel>
            Production Start Date <span className="required">*</span>
          </FormLabel>
          <TextField
            fullWidth
            type="date"
            InputLabelProps={{ shrink: true }}
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
            InputLabelProps={{ shrink: true }}
            {...register("productionEndDate")}
            error={!!errors.productionEndDate}
            helperText={errors.productionEndDate?.message}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <FormLabel>
            Requested Weight for Production (Tons){" "}
            <span className="required">*</span>
          </FormLabel>
          <TextField
            fullWidth
            type="number"
            {...register("requestedWeight", { valueAsNumber: true })}
            error={!!errors.requestedWeight}
            helperText={errors.requestedWeight?.message}
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

      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        marginBottom="25px"
      >
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
            <MenuItem value="Egypt">Egypt</MenuItem>
            <MenuItem value="Saudi Arabia">Saudi Arabia</MenuItem>
            <MenuItem value="UAE">UAE</MenuItem>
          </TextField>
        </div>
      </div>

      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        marginBottom="25px"
      >
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
            {...register("contactMobile", { valueAsNumber: true })}
            error={!!errors.contactMobile}
            helperText={errors.contactMobile?.message}
          />
        </div>
      </div>

      <div className="form-group">
        <FormLabel>
          Contact Email <span className="required">*</span>
        </FormLabel>
        <div className="form-group contact-email">
          <TextField
            fullWidth
            {...register("contactEmail")}
            error={!!errors.contactEmail}
            helperText={errors.contactEmail?.message}
          />
        </div>
      </div>

      <div className="form-actions">
        <Button type="submit" variant="contained" color="error">
          Add
        </Button>
        <Button
          variant="outlined"
          onClick={handleCancel}
          sx={{
            color: grey[500],
            borderColor: grey[500],
            "&:hover": {
              borderColor: grey[700],
              color: grey[700],
            },
          }}
        >
          Cancel
        </Button>
      </div>
    </Box>
  );
};
