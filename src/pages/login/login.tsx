import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import { z } from "zod";
import logo from "../../assets/logo.png";
import { layoutPrivateStyle } from "../../style/layout/private-route";

const loginSchema = z.object({
  email: z
    .string()
    .email("Format email tidak valid")
    .min(1, "Email tidak boleh kosong"),
  password: z
    .string()
    .min(6, "Password minimal 6 karakter")
    .min(1, "Password tidak boleh kosong"),
});

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [credentialError, setCredentialError] = useState("");

  const dummyLogin = {
    email: "adminlogin@gmail.com",
    password: "adminlogin",
  };

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const handleLogin = () => {
    const newErrors = {
      email: email.trim() === "",
      password: password.trim() === "",
    };

    setErrors(newErrors);
    setCredentialError("");

    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const fieldErrors: any = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    if (email === dummyLogin.email && password === dummyLogin.password) {
      localStorage.setItem("dataLogin", email);
      navigate("/master-data/data-majelis");
    } else {
      setCredentialError("Email atau password salah");
    }
    const stored = localStorage.getItem("dataLogin");
    console.log("Email login:", stored);
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ backgroundColor: "#183B4E" }}
    >
      <Stack padding={6}>
        <Grid
          sx={{
            marginBottom: 2,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{
              width: "200px",
            }}
          />
        </Grid>
        <Grid>
          <Typography sx={{ ...layoutPrivateStyle.manageBoldTitle, mb: 0.5 }}>
            Sistem Informasi
          </Typography>
          <Typography
            sx={{
              ...layoutPrivateStyle.manageBoldTitle,
              marginTop: -2,
              marginBottom: 3,
            }}
          >
            GKI Cipinang Elok
          </Typography>
        </Grid>
        <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
          <Typography variant="h5" textAlign="center" mb={2}>
            Login
          </Typography>

          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                size="small"
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                size="small"
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
            </Grid>

            {credentialError && (
              <Grid size={12}>
                <Typography color="error" textAlign="center">
                  {credentialError}
                </Typography>
              </Grid>
            )}

            <Grid size={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleLogin}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Stack>
    </Box>
  );
}
