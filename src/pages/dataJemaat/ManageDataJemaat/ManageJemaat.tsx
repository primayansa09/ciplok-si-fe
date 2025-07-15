import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  Stack,
  TextField,
  InputLabel,
  Paper,
} from "@mui/material";
import { layoutPrivateStyle } from "../../../style/layout/private-route";
import HeaderSection from "../../../components/commponentHeader/Header";
import { DataInsert } from "../../../store/dataJemaat/type";

export function ManageJemaat() {
  const navigate = useNavigate();

  const location = useLocation();
  const { itemData, mode, IsEdit } = location.state || {};

  const [formDataJemaat, setFormDataJemaat] = useState<DataInsert>({
    userID: "",
    email: "",
    anggotaKomisi:"",
    password:"",
    phoneNo: "",
    fullName: "",
    address: "",
    alternatePhoneNo: ""
  });

  const [errors, setErrors] = useState({
    namaPenatua: false,
    alamatPenatua: false,
    noTelepon: false,
    noWhatsApp: false,
  });

  const handleSubmit = () => {
    // const newErrors = {
    //   namaPenatua: formDataJemaat.namaPenatua.trim() === "",
    //   alamatPenatua: formDataJemaat.alamatPenatua.trim() === "",
    //   noTelepon: formDataJemaat.noTelepon.trim() === "",
    //   noWhatsApp: formDataJemaat.noWhatsapp.trim() === "",
    // };

    // setErrors(newErrors);

    // const isValid = !Object.values(newErrors).includes(true);

    // if (!isValid) {
    //   return;
    // }
  };

  useEffect(() => {
    if (IsEdit && itemData) {
      setFormDataJemaat(itemData);
    }
  }, [IsEdit, itemData]);

  const clickCancel = () => {
    navigate("/master-data/data-peminjam", { replace: true });
  };

  return (
    <Stack sx={layoutPrivateStyle.fixHeader}>
      <HeaderSection />
      <InputLabel
        sx={{ ...layoutPrivateStyle.manageTitleHeader, marginTop: 5 }}
      >
        Master Data Peminjam
      </InputLabel>
      <Paper style={{ padding: 16 }}>
        <Grid container spacing={2} alignItems={"center"} marginTop={5}>
          <Grid size={2.2}>
            <InputLabel
              sx={{
                ...layoutPrivateStyle.manageSubTitle,
                marginLeft: "15px",
              }}
            >
              Nama Lengkap <span style={{ color: "red" }}>*</span>
            </InputLabel>
          </Grid>
          <Grid size={4}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              sx={{ width: "250px" }}
              size="small"
              value={formDataJemaat.fullName}
              onChange={(e) =>
                setFormDataJemaat({
                  ...formDataJemaat,
                  fullName: e.target.value,
                })
              }
              error={errors.namaPenatua}
              helperText={errors.namaPenatua ? "Nama Penatua Wajib diidi" : ""}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems={"center"} marginTop={2}>
          <Grid size={2.2}>
            <InputLabel
              sx={{
                ...layoutPrivateStyle.manageSubTitle,
                marginLeft: "15px",
              }}
            >
              Email <span style={{ color: "red" }}>*</span>
            </InputLabel>
          </Grid>
          <Grid size={4}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              sx={{ width: "250px" }}
              size="small"
              value={formDataJemaat.email}
              onChange={(e) =>
                setFormDataJemaat({
                  ...formDataJemaat,
                  email: e.target.value,
                })
              }
              error={errors.noTelepon}
              helperText={errors.noTelepon ? "No Telepon Wajib diidi" : ""}
            />
          </Grid>
        </Grid>
         <Grid container spacing={2} alignItems={"center"} marginTop={2}>
          <Grid size={2.2}>
            <InputLabel
              sx={{
                ...layoutPrivateStyle.manageSubTitle,
                marginLeft: "15px",
              }}
            >
              Password <span style={{ color: "red" }}>*</span>
            </InputLabel>
          </Grid>
          <Grid size={4}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              sx={{ width: "250px" }}
              size="small"
              value={formDataJemaat.password}
              onChange={(e) =>
                setFormDataJemaat({
                  ...formDataJemaat,
                  password: e.target.value,
                })
              }

            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems={"center"} marginTop={2}>
          <Grid size={2.2}>
            <InputLabel
              sx={{
                ...layoutPrivateStyle.manageSubTitle,
                marginLeft: "15px",
              }}
            >
              No WhatsApp <span style={{ color: "red" }}>*</span>
            </InputLabel>
          </Grid>
          <Grid size={4}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              sx={{ width: "250px" }}
              size="small"
              value={formDataJemaat.alternatePhoneNo}
              onChange={(e) =>
                setFormDataJemaat({
                  ...formDataJemaat,
                  alternatePhoneNo: e.target.value,
                })
              }
              error={errors.noWhatsApp}
              helperText={errors.noWhatsApp ? "No WhatsApp Wajib diidi" : ""}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems={"center"} marginTop={2}>
          <Grid size={2.2}>
            <InputLabel
              sx={{
                ...layoutPrivateStyle.manageSubTitle,
                marginLeft: "15px",
              }}
            >
              No WhatsApp <span style={{ color: "red" }}>*</span>
            </InputLabel>
          </Grid>
          <Grid size={4}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              sx={{ width: "250px" }}
              size="small"
              value={formDataJemaat.password}
              onChange={(e) =>
                setFormDataJemaat({
                  ...formDataJemaat,
                  password: e.target.value,
                })
              }
              error={errors.noWhatsApp}
              helperText={errors.noWhatsApp ? "No WhatsApp Wajib diidi" : ""}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems={"center"} marginTop={2}>
          <Grid size={2.2}>
            <InputLabel
              sx={{
                ...layoutPrivateStyle.manageSubTitle,
                marginLeft: "15px",
              }}
            >
              Alamat Lengkap <span style={{ color: "red" }}>*</span>
            </InputLabel>
          </Grid>
          <Grid size={4}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              sx={{ width: "600px" }}
              multiline
              rows={10}
              InputProps={{
                sx: {
                  height: 200,
                  padding: "0 8px",
                  alignItems: "flex-start",
                },
              }}
              value={formDataJemaat.address}
              onChange={(e) =>
                setFormDataJemaat({
                  ...formDataJemaat,
                  address: e.target.value,
                })
              }
              error={errors.alamatPenatua}
              helperText={errors.alamatPenatua ? "Alamat Wajib diidi" : ""}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems={"center"} marginTop={2}>
          <Grid size={2.2}>
            <InputLabel
              sx={{
                ...layoutPrivateStyle.manageSubTitle,
                marginLeft: "15px",
              }}
            >
              Anggota Komisi
            </InputLabel>
          </Grid>
          <Grid size={4}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              sx={{ width: "250px" }}
              size="small"
              value={formDataJemaat.anggotaKomisi}
              onChange={(e) =>
                setFormDataJemaat({
                  ...formDataJemaat,
                  anggotaKomisi: e.target.value,
                })
              }
              disabled
            />
          </Grid>
        </Grid>
        <Grid container spacing={2.2} alignItems={"center"} marginTop={2}>
          <Grid size={2.2}>
            <InputLabel
              sx={{
                ...layoutPrivateStyle.manageSubTitle,
                marginLeft: "15px",
              }}
            >
              No lain yang dapat dihubungi
            </InputLabel>
          </Grid>
          <Grid size={4}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              sx={{ width: "250px" }}
              size="small"
              value={formDataJemaat.alternatePhoneNo}
              onChange={(e) =>
                setFormDataJemaat({
                  ...formDataJemaat,
                  alternatePhoneNo: e.target.value,
                })
              }
              disabled
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          justifyContent={"flex-end"}
          alignItems={"center"}
          marginTop={2}
        >
          <Grid size={2}>
            <Button
              type="submit"
              variant="contained"
              sx={{ ...layoutPrivateStyle.buttonSubmit, width: "100%" }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
          <Grid size={2}>
            <Button
              type="submit"
              variant="contained"
              sx={{ ...layoutPrivateStyle.buttonCancel, width: "100%" }}
              onClick={clickCancel}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Stack>
  );
}
