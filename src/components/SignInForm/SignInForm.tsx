import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button, TextField, Box, Typography, FormLabel } from "@mui/material";
import { useAppDispatch } from "../../app/hooks";
import { setUser, login, setRole } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import "./sign-in-form.scss";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import axios from "axios";

interface SignInFormInputs {
  username: string;
  password: string;
}

const SignInForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleNavToSignup = () => navigate("/sign-up");
  const { t } = useTranslation(["signIn", "validations", "alerts"]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInputs>();

  const onSubmit: SubmitHandler<SignInFormInputs> = async (data) => {
    try {
      const response = await axios.post(
        "http://41.33.54.162:8085/halalcore/api/authenticate",
        data
      );

      const token = response?.data?.id_token;
      if (token) {
        dispatch(login(token));

        const accountResponse = await axios.get(
          "http://41.33.54.162:8085/halalcore/api/account",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const user = accountResponse.data;
        dispatch(setUser(user));
        let roleToNavigate = "/";

        if (user.authorities) {
          const lowerRoles = user.authorities.map((r: string) =>
            r.toLowerCase()
          );

          if (lowerRoles.includes("role_doctor")) {
            dispatch(setRole("role_doctor"));
            roleToNavigate = "/orders";
          } else if (lowerRoles.includes("role_representative")) {
            dispatch(setRole("role_representative"));
            roleToNavigate = "/";
          }
        }

        toast.success(t("loginSuccess", { ns: "alerts" }));

        navigate(roleToNavigate); 
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(t("usernameOrPassInvalid", { ns: "alerts" }));
    }
  };

  return (
    <Box
      className="signin-form"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h4" fontWeight="bold">
        {t("welcome", { ns: "signIn" })}
      </Typography>
      <Typography variant="h6" color="#aaa">
        {t("wbEnterDetails", { ns: "signIn" })}
      </Typography>

      <>
        <FormLabel
          required
          sx={{
            color: "text.primary",
            fontWeight: "bold",
            "& .MuiFormLabel-asterisk": {
              color: "red",
            },
          }}
        >
          {t("username", { ns: "signIn" })}
        </FormLabel>
        <TextField
          label={t("username", { ns: "signIn" })}
          {...register("username", {
            required: t("usernameRequired", { ns: "validations" }),
          })}
          error={!!errors.username}
          helperText={errors.username?.message}
          fullWidth
        />

        <FormLabel
          required
          sx={{
            color: "text.primary",
            fontWeight: "bold",
            marginTop: "20px",
            "& .MuiFormLabel-asterisk": {
              color: "red",
            },
          }}
        >
          {t("password", { ns: "signIn" })}
        </FormLabel>
        <TextField
          type="password"
          label={t("password", { ns: "signIn" })}
          {...register("password", {
            required: t("passwordRequired", { ns: "validations" }),
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          color="error"
          sx={{ marginTop: "15px" }}
        >
          {t("signInBtn", { ns: "signIn" })}
        </Button>

        <Typography className="sign-up" fontWeight="bold">
          {t("dontHaveAcc", { ns: "signIn" })}
          <Button
            sx={{
              padding: "0",
              textDecoration: "underline",
              fontWeight: "bold",
              textTransform: "none",
            }}
            onClick={handleNavToSignup}
          >
            {t("signUp", { ns: "signIn" })}
          </Button>
        </Typography>
      </>
    </Box>
  );
};

export default SignInForm;
