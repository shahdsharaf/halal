import {
  Box,
  TextField,
  Typography,
  Button,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const signUpSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  country: z.string().min(1, "Country is required"),
  address1: z.string().min(1, "Address1 is required"),
  address2: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone number is required"),
  mobile: z.string().min(1, "Mobile number is required"),
  email: z.email("Invalid email"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export const SignUpForm = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      companyName: "",
      country: "1",
      address1: "",
      address2: "",
      firstName: "",
      lastName: "",
      phone: "",
      mobile: "",
      email: "",
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    const payload = {
      address1: data.address1,
      address2: data.address2,
      companyName: data.companyName,
      country: { id: data.country },
      email: data.email,
      firstName: data.firstName,
      lastname: data.lastName,
      mobileNumber: data.mobile,
      phoneNumber: data.phone,
    };
    try {
      const response = await axios.post(
        "http://41.33.54.162:8085/halalcore/api/registration-requests",
        payload
      );
      if (response.status === 201) {
        toast.success("Account created");
        navigate("/");
      } else {
        toast.error("something wrong ❌");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("something wrong ❌");
    }
  };

  const Label = ({ text, required }: { text: string; required?: boolean }) => (
    <Typography variant="body2" fontWeight="bold" mb={0.5}>
      {text}
      {required && <span style={{ color: "red" }}>*</span>}
    </Typography>
  );
  const { t } = useTranslation(["signUp"]);

  return (
    <Box m={6} mt={4}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {t("signUp", { ns: "signUp" })}{" "}
      </Typography>
      <Typography variant="body1" mb={4}>
        {t("signUpDescription", { ns: "signUp" })}
      </Typography>

      <Typography variant="h6" fontWeight="bold" mb={2}>
        {t("companyInfo", { ns: "signUp" })}{" "}
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
        gap={2}
        mb={4}
      >
        <Box>
          <Label text={t("companyName", { ns: "signUp" })} required />
          <Controller
            name="companyName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                error={!!errors.companyName}
                helperText={errors.companyName?.message}
              />
            )}
          />
        </Box>

        <Box>
          <Label text={t("countryOfOrigin", { ns: "signUp" })} required />
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.country}>
                <Select {...field}>
                  <MenuItem value="1">{t("india", { ns: "signUp" })}</MenuItem>
                  <MenuItem value="2">{t("egypt", { ns: "signUp" })}</MenuItem>
                  <MenuItem value="3">{t("USA", { ns: "signUp" })}</MenuItem>
                </Select>
                {errors.country && (
                  <Typography color="error" variant="caption">
                    {errors.country.message}
                  </Typography>
                )}
              </FormControl>
            )}
          />
        </Box>

        <Box>
          <Label text={t("address1", { ns: "signUp" })} required />
          <Controller
            name="address1"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                error={!!errors.address1}
                helperText={errors.address1?.message}
              />
            )}
          />
        </Box>

        <Box>
          <Label text={t("address2", { ns: "signUp" })} />
          <Controller
            name="address2"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                error={!!errors.address2}
                helperText={errors.address2?.message}
              />
            )}
          />
        </Box>
      </Box>

      <Typography variant="h6" fontWeight="bold" mb={2}>
        {t("contactInfo", { ns: "signUp" })}{" "}
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
        gap={2}
        mb={4}
      >
        <Box>
          <Label text={t("firstName", { ns: "signUp" })} required />
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            )}
          />
        </Box>

        <Box>
          <Label text={t("lastName", { ns: "signUp" })} required />
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            )}
          />
        </Box>

        <Box>
          <Label text={t("phoneNumber", { ns: "signUp" })} required />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                fullWidth
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            )}
          />
        </Box>

        <Box>
          <Label text={t("mobileNumber", { ns: "signUp" })} required />
          <Controller
            name="mobile"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="number"
                error={!!errors.mobile}
                helperText={errors.mobile?.message}
              />
            )}
          />
        </Box>

        <Box gridColumn={{ sm: "1", m: "1 / span 2" }}>
          <Label text={t("email", { ns: "signUp" })} required />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="email"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
        </Box>
      </Box>

      <Box display="flex">
        <Box
          display="flex"
          gap={2}
          sx={{
            width: { xs: "100%", sm: "50%" },
          }}
        >
          <Button
            sx={{ flex: 1 }}
            variant="contained"
            color="error"
            onClick={handleSubmit(onSubmit)}
          >
            {t("saveContinue", { ns: "signUp" })}{" "}
          </Button>
          <Button
            sx={{
              flex: 1,
              color: "grey.600",
              borderColor: "grey.400",
              "&:hover": {
                borderColor: "grey.600",
                backgroundColor: "grey.100",
              },
            }}
            variant="outlined"
            onClick={() => navigate("/sign-in")}
          >
            {t("cancel", { ns: "signUp" })}{" "}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
