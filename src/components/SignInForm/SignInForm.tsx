import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, TextField, Box, Typography, Alert } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { signinUser, logout } from "../../features/auth/authSlice";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./sign-in-form.scss";

interface SignInFormInputs {
  username: string;
  password: string;
}

const SignInForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInFormInputs>();

  const onSubmit: SubmitHandler<SignInFormInputs> = (data) => {
    dispatch(signinUser(data));
  };

  const handleLogout = () => {
    dispatch(logout());
    reset();
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box
      className="signin-form"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h4" fontWeight="bold">
        Welcome
      </Typography>
      <Typography variant="h6" color="#aaa">
        Welcome back, please enter your details
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {isAuthenticated && <Alert severity="success">Login successful!</Alert>}

      {!isAuthenticated ? (
        <>
          <TextField
            label="Username"
            {...register("username", { required: "Username is required" })}
            error={!!errors.username}
            helperText={errors.username?.message}
            fullWidth
          />

          <TextField
            type="password"
            label="Password"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="error"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </>
      ) : (
        <Button
          onClick={handleLogout}
          variant="outlined"
          fullWidth
          color="secondary"
        >
          Logout
        </Button>
      )}
    </Box>
  );
};

export default SignInForm;
