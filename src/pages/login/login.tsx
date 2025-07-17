import React, { useEffect, useState } from "react";
import {
  Box, TextField, Typography, Button, Grid, Paper, Stack
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login, setTokenFromSession } from "../../store/auth/authSlice"; // Import setTokenFromSession
import { AppDispatch, RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

export function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Memeriksa apakah ada token di sessionStorage dan men-setnya di Redux
  useEffect(() => {
    dispatch(setTokenFromSession()); // Cek dan update token jika ada di sessionStorage
    if (auth.token) {
      navigate("/master-data/data-majelis"); // Redirect jika token ada
    }
  }, [auth.token, dispatch, navigate]);


  const handleLogin = async () => {
    const resultAction = await dispatch(login({ email, password }));
    if (login.fulfilled.match(resultAction)) {
      navigate("/dashboard");
    }
  };

  return (
    <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="center" sx={{ backgroundColor: "#183B4E" }}>
      <Stack padding={6}>
        <Grid sx={{ marginBottom: 2, justifyContent: "center", alignItems: "center", display: "flex" }}>
          <img src={logo} alt="Logo" style={{ width: "200px" }} />
        </Grid>
        <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
          <Typography variant="h5" textAlign="center" mb={2}>Login</Typography>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth size="small" />
            </Grid>
            <Grid size={12}>
              <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth size="small" />
            </Grid>
            {auth.error && (
              <Grid size={12}>
                <Typography color="error" textAlign="center">{auth.error}</Typography>
              </Grid>
            )}
            <Grid size={12}>
              <Button variant="contained" color="primary" fullWidth onClick={handleLogin} disabled={auth.loading}>
                {auth.loading ? "Logging in..." : "Login"}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Stack>
    </Box>
  );
}
