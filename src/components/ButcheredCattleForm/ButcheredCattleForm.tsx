import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate, useParams } from "react-router-dom";
import OrderDetails from "../../components/OrderDetails/OrderDetails";
import axios from "axios";
import { useState } from "react";
import "./butchered-cattle-form.scss";

const schema = z.object({
  cattleLogs: z.coerce.number().min(1, { message: "Cattle logs are required" }),
  weightBefore: z.coerce
    .number()
    .min(1, { message: "Weight before is required" }),
  bonelessMeatWeight: z.coerce
    .number()
    .min(1, { message: "Boneless meat weight is required" }),
  offalWeight: z.coerce
    .number()
    .min(1, { message: "Offal weight is required" }),
  description: z.string().optional(),
  document: z.any().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function ButcheredCattleForm() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });
  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      const payload = {
        companyOrder: { id: Number(orderId) },
        noOfitems: Number(data.cattleLogs),
        weightBefore: Number(data.weightBefore),
        weightMeat: Number(data.bonelessMeatWeight),
        weightOffals: Number(data.offalWeight),
        summary: data.description || "",
        attachGuid: "",
      };

      await axios.post(
        "http://41.33.54.162:8085/halalcore/api/order-vet-logs",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      navigate(`/orders/${orderId}/vet-logs`);
    } catch (err) {
      console.error("Failed to submit vet log", err);
      alert("Failed to submit vet log");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="butchered-form">
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Halal Butchered Cattle
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form-row">
          <div className="form-group">
            <label>
              Cattle Logs <span className="required">*</span>
            </label>
            <Controller
              name="cattleLogs"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  error={!!errors.cattleLogs}
                  helperText={errors.cattleLogs?.message}
                  fullWidth
                />
              )}
            />
          </div>

          <div className="form-group">
            <label>
              Weight Before <span className="required">*</span>
            </label>
            <Controller
              name="weightBefore"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">Kg</InputAdornment>
                    ),
                  }}
                  error={!!errors.weightBefore}
                  helperText={errors.weightBefore?.message}
                  fullWidth
                />
              )}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>
              Boneless Meat Weight <span className="required">*</span>
            </label>
            <Controller
              name="bonelessMeatWeight"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">Kg</InputAdornment>
                    ),
                  }}
                  error={!!errors.bonelessMeatWeight}
                  helperText={errors.bonelessMeatWeight?.message}
                  fullWidth
                />
              )}
            />
          </div>

          <div className="form-group">
            <label>
              Offal Weight <span className="required">*</span>
            </label>
            <Controller
              name="offalWeight"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">Kg</InputAdornment>
                    ),
                  }}
                  error={!!errors.offalWeight}
                  helperText={errors.offalWeight?.message}
                  fullWidth
                />
              )}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Upload Document</label>
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUploadIcon />}
              fullWidth
            >
              Choose File
              <input
                type="file"
                hidden
                {...register("document")}
                accept=".jpg,.jpeg,.png,.pdf"
              />
            </Button>
            <Typography variant="caption" color="textSecondary">
              Supported formats: jpeg, png, pdf. Max size 5MB
            </Typography>
          </div>

          <div className="form-group">
            <label>Description</label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField {...field} multiline rows={3} fullWidth />
              )}
            />
          </div>
        </div>

        {orderId && <OrderDetails orderId={Number(orderId)} />}

        <div className="form-actions">
          <Button
            type="submit"
            variant="contained"
            color="error"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Add"}
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => navigate(`/orders/${orderId}/vet-logs`)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Box>
  );
}
