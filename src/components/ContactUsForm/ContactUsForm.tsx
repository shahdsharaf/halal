import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  Box,
  Typography,
  FormLabel,
} from "@mui/material";

type FormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  subject: string;
  message: string;
};

export default function ContactUsForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
    alert("Form submitted! Check console for data.");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        mx: "auto",
        px: "20px",
        bgcolor: "white",
      }}
    >
      <Typography variant="h6" mb={2} fontWeight="600">
        Any question or remarks? Just write us a message!
      </Typography>

      <Controller
        name="firstName"
        control={control}
        rules={{ required: "First name is required" }}
        render={({ field }) => (
          <>
            <FormLabel
              required
              sx={{
                color: "text.primary",
                fontWeight: "bold",
                "& .MuiFormLabel-asterisk": { color: "red" },
              }}
            >
              First name
            </FormLabel>
            <TextField
              {...field}
              fullWidth
              margin="normal"
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </>
        )}
      />

      <Controller
        name="lastName"
        control={control}
        rules={{ required: "Last name is required" }}
        render={({ field }) => (
          <>
            <FormLabel
              required
              sx={{
                color: "text.primary",
                fontWeight: "bold",
                "& .MuiFormLabel-asterisk": { color: "red" },
              }}
            >
              Last name
            </FormLabel>
            <TextField
              {...field}
              fullWidth
              margin="normal"
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </>
        )}
      />

      <Controller
        name="email"
        control={control}
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email",
          },
        }}
        render={({ field }) => (
          <>
            <FormLabel
              required
              sx={{
                color: "text.primary",
                fontWeight: "bold",
                "& .MuiFormLabel-asterisk": { color: "red" },
              }}
            >
              Email
            </FormLabel>
            <TextField
              {...field}
              fullWidth
              type="email"
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </>
        )}
      />

      <Controller
        name="phoneNumber"
        control={control}
        rules={{ required: "Phone number is required" }}
        render={({ field }) => (
          <>
            <FormLabel
              required
              sx={{
                color: "text.primary",
                fontWeight: "bold",
                "& .MuiFormLabel-asterisk": { color: "red" },
              }}
            >
              Phone Number
            </FormLabel>
            <TextField
              {...field}
              fullWidth
              margin="normal"
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
            />
          </>
        )}
      />

      <Controller
        name="country"
        control={control}
        rules={{ required: "Country is required" }}
        render={({ field }) => (
          <FormControl fullWidth margin="normal" error={!!errors.country}>
            <FormLabel
              required
              sx={{
                color: "text.primary",
                fontWeight: "bold",
                "& .MuiFormLabel-asterisk": { color: "red" },
              }}
            >
              Country of Origin
            </FormLabel>
            <Select {...field} displayEmpty>
              <MenuItem value="">Select Country</MenuItem>
              <MenuItem value="usa">United States</MenuItem>
              <MenuItem value="canada">Canada</MenuItem>
              <MenuItem value="uk">United Kingdom</MenuItem>
              <MenuItem value="india">India</MenuItem>
              <MenuItem value="australia">Australia</MenuItem>
            </Select>
            <FormHelperText>{errors.country?.message}</FormHelperText>
          </FormControl>
        )}
      />

      <Controller
        name="subject"
        control={control}
        rules={{ required: "Subject is required" }}
        render={({ field }) => (
          <FormControl fullWidth margin="normal" error={!!errors.subject}>
            <FormLabel
              required
              sx={{
                color: "text.primary",
                fontWeight: "bold",
                "& .MuiFormLabel-asterisk": { color: "red" },
              }}
            >
              Subject
            </FormLabel>
            <Select {...field} displayEmpty>
              <MenuItem value="">Choose your subject</MenuItem>
              <MenuItem value="general">General Inquiry</MenuItem>
              <MenuItem value="support">Support</MenuItem>
              <MenuItem value="feedback">Feedback</MenuItem>
              <MenuItem value="partnership">Partnership</MenuItem>
            </Select>
            <FormHelperText>{errors.subject?.message}</FormHelperText>
          </FormControl>
        )}
      />

      <Controller
        name="message"
        control={control}
        rules={{
          required: "Message is required",
          maxLength: { value: 3000, message: "Maximum 3000 characters" },
        }}
        render={({ field }) => (
          <>
            <FormLabel
              required
              sx={{
                color: "text.primary",
                fontWeight: "bold",
                "& .MuiFormLabel-asterisk": { color: "red" },
              }}
            >
              Your Message
            </FormLabel>
            <TextField
              {...field}
              fullWidth
              margin="normal"
              multiline
              rows={4}
              error={!!errors.message}
              helperText={
                errors.message?.message ||
                "Maximum letter 3000 for your message"
              }
            />
          </>
        )}
      />

      <Button
        type="submit"
        variant="contained"
        sx={{
          mt: 2,
          bgcolor: "red",
          "&:hover": { bgcolor: "#2c2f33" },
          color: "white",
          py: 1.2,
          px: 8,
          fontWeight: "600",
          borderRadius: 3,
        }}
      >
        Send
      </Button>
    </Box>
  );
}
