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
      country: "India",
      address1: "",
      address2: "",
      firstName: "",
      lastName: "",
      phone: "",
      mobile: "",
      email: "",
    },
  });

  const onSubmit = (data: SignUpFormData) => {
    console.log("Form submitted:", data);
  };

  const Label = ({ text, required }: { text: string; required?: boolean }) => (
    <Typography variant="body2" fontWeight="bold" mb={0.5}>
      {text}
      {required && <span style={{ color: "red" }}>*</span>}
    </Typography>
  );

  return (
    <Box m={6} mt={4}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Sign up
      </Typography>
      <Typography variant="body1" mb={4}>
        Please fill out the form below to apply for registration, to be able to
        use IS EG Halal services
      </Typography>

      <Typography variant="h6" fontWeight="bold" mb={2}>
        Company Info
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
        gap={2}
        mb={4}
      >
        <Box>
          <Label text="Company Name" required />
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
          <Label text="Country of Origin" required />
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.country}>
                <Select {...field}>
                  <MenuItem value="India">India</MenuItem>
                  <MenuItem value="Egypt">Egypt</MenuItem>
                  <MenuItem value="USA">USA</MenuItem>
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
          <Label text="Address 1" required />
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
          <Label text="Address 2" />
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
        Contact Info
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
        gap={2}
        mb={4}
      >
        <Box>
          <Label text="First Name" required />
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
          <Label text="Last Name" required />
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
          <Label text="Phone Number" required />
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
          <Label text="Mobile Number" required />
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
          <Label text="Email" required />
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
            Save & Continue
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
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
