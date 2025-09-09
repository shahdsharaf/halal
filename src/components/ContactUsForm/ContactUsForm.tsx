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
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

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
  const { t } = useTranslation(["contactUs", "validations", "alerts"]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
    toast.success(t("formSubmitted", { ns: "alerts" }));
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
        {t("formTitle", { ns: "contactUs" })}
      </Typography>

      <Controller
        name="firstName"
        control={control}
        rules={{ required: t("fNameRequired", { ns: "validations" }) }}
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
              {t("firstName", { ns: "contactUs" })}
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
        rules={{ required: t("lNameRequired", { ns: "validations" }) }}
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
              {t("lastName", { ns: "contactUs" })}
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
          required: t("emailRequired", { ns: "validations" }),
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: t("invalidEmail", { ns: "validations" }),
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
              {t("email", { ns: "contactUs" })}
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
        rules={{ required: t("phoneRequired", { ns: "validations" }) }}
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
              {t("phoneNumber", { ns: "contactUs" })}
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
        rules={{ required: t("countryRequired", { ns: "validations" }) }}
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
              {t("country", { ns: "contactUs" })}
            </FormLabel>
            <Select {...field} displayEmpty>
              <MenuItem value="" disabled>
                {" "}
                {t("selectCountry", { ns: "contactUs" })}
              </MenuItem>
              <MenuItem value="usa"> {t("USA", { ns: "contactUs" })}</MenuItem>
              <MenuItem value="canada">
                {" "}
                {t("canada", { ns: "contactUs" })}
              </MenuItem>
              <MenuItem value="uk"> {t("UK", { ns: "contactUs" })}</MenuItem>
              <MenuItem value="india">
                {" "}
                {t("india", { ns: "contactUs" })}
              </MenuItem>
              <MenuItem value="australia">
                {" "}
                {t("australia", { ns: "contactUs" })}
              </MenuItem>
            </Select>
            <FormHelperText>{errors.country?.message}</FormHelperText>
          </FormControl>
        )}
      />

      <Controller
        name="subject"
        control={control}
        rules={{ required: t("subjectRequired", { ns: "validations" }) }}
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
              {t("subject", { ns: "contactUs" })}
            </FormLabel>
            <Select {...field} displayEmpty>
              <MenuItem value="" disabled>
                {" "}
                {t("chooseSubject", { ns: "contactUs" })}
              </MenuItem>
              <MenuItem value="general">
                {" "}
                {t("inquiry", { ns: "contactUs" })}
              </MenuItem>
              <MenuItem value="support">
                {" "}
                {t("support", { ns: "contactUs" })}
              </MenuItem>
              <MenuItem value="feedback">
                {" "}
                {t("feedback", { ns: "contactUs" })}
              </MenuItem>
              <MenuItem value="partnership">
                {" "}
                {t("partnership", { ns: "contactUs" })}
              </MenuItem>
            </Select>
            <FormHelperText>{errors.subject?.message}</FormHelperText>
          </FormControl>
        )}
      />

      <Controller
        name="message"
        control={control}
        rules={{
          required: t("msgRequired", { ns: "validations" }),
          maxLength: {
            value: 3000,
            message: t("maxLetters", { ns: "contactUs" }),
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
              {t("message", { ns: "contactUs" })}{" "}
            </FormLabel>
            <TextField
              {...field}
              fullWidth
              margin="normal"
              multiline
              rows={4}
              error={!!errors.message}
              helperText={
                errors.message?.message || t("maxLetters", { ns: "contactUs" })
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
        {t("sendBtn", { ns: "contactUs" })}
      </Button>
    </Box>
  );
}
