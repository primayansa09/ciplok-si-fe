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

export function ManageRuangan() {

  const navigate = useNavigate();

  const location = useLocation();
  const { itemData, mode, IsEdit } = location.state || {};

  const [formDataRuangan, setFormDataRuangan] = useState({
    namaRuangan: "",
    kapasitas: "",
    jamAwalPemakaian: "",
    jamAkhirPemakaian: "",
    scoreKegiatan: "",
    lokasiRuangan: ""
  });

  const [errors, setErrors] = useState({
    namaRuangan: false,
    scoreKegiatan: false,
    kapasitas: false,
  });

  const handleSubmit = () => {
    const newErrors = {
      namaRuangan: formDataRuangan.namaRuangan.trim() === "",
      scoreKegiatan: formDataRuangan.scoreKegiatan.trim() === "",
      kapasitas: formDataRuangan.kapasitas.trim() === ""
    };

    setErrors(newErrors);

    const isValid = !Object.values(newErrors).includes(true);

    if (!isValid) {
      return;
    }
  };

  useEffect(() => {
    if (IsEdit && itemData) {
      setFormDataRuangan(itemData);
    }
  }, [IsEdit, itemData]);

  const clickCancel = () => {
    navigate("/master-data/data-ruangan", { replace: true });
  };

  return (
    <Stack sx={layoutPrivateStyle.fixHeader}>
      <HeaderSection />
      <InputLabel
        sx={{ ...layoutPrivateStyle.manageTitleHeader, marginTop: 5 }}
      >
        Master Data Ruangan
      </InputLabel>
      <Paper style={{ padding: 16 }}>
        <Grid container spacing={2} alignItems={"center"} marginTop={5}>
          <Grid size={2}>
            <InputLabel
              sx={{
                ...layoutPrivateStyle.manageSubTitle,
                marginLeft: "15px",
              }}
            >
              Nama Ruangan <span style={{ color: "red" }}>*</span>
            </InputLabel>
          </Grid>
          <Grid size={4}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              sx={{ width: "600px" }}
              size="small"
              value={formDataRuangan.namaRuangan}
              onChange={(e) =>
                setFormDataRuangan({
                  ...formDataRuangan,
                  namaRuangan: e.target.value,
                })
              }
              error={errors.namaRuangan}
              helperText={errors.namaRuangan ? "Nama Ruangan Wajib diisi" : ""}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems={"center"} marginTop={2}>
          <Grid size={2}>
            <InputLabel
              sx={{
                ...layoutPrivateStyle.manageSubTitle,
                marginLeft: "15px",
              }}
            >
              Lokasi Ruangan
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
              value={formDataRuangan.lokasiRuangan}
              onChange={(e) =>
                setFormDataRuangan({
                  ...formDataRuangan,
                  lokasiRuangan: e.target.value,
                })
              }
              disabled
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems={"center"} marginTop={2}>
          <Grid size={2}>
            <InputLabel
              sx={{
                ...layoutPrivateStyle.manageSubTitle,
                marginLeft: "15px",
              }}
            >
              Kapasitan Ruangan <span style={{ color: "red" }}>*</span>
            </InputLabel>
          </Grid>
          <Grid size={4}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              sx={{ width: "250px" }}
              size="small"
              value={formDataRuangan.kapasitas}
              onChange={(e) =>
                setFormDataRuangan({
                  ...formDataRuangan,
                  kapasitas: e.target.value,
                })
              }
              error={errors.kapasitas}
              helperText={errors.kapasitas ? "Kapasitas Ruangan Wajib diisi" : ""}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems={"center"} marginTop={2}>
          <Grid size={2}>
            <InputLabel
              sx={{
                ...layoutPrivateStyle.manageSubTitle,
                marginLeft: "15px",
              }}
            >
              Jam Awal Pemakaian
            </InputLabel>
          </Grid>
          <Grid size={4}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              sx={{ width: "600px" }}
              size="small"
              value={formDataRuangan.jamAwalPemakaian}
              onChange={(e) =>
                setFormDataRuangan({
                  ...formDataRuangan,
                  jamAwalPemakaian: e.target.value,
                })
              }
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems={"center"} marginTop={2}>
          <Grid size={2}>
            <InputLabel
              sx={{
                ...layoutPrivateStyle.manageSubTitle,
                marginLeft: "15px",
              }}
            >
              Jam Akhir Pemakaian
            </InputLabel>
          </Grid>
          <Grid size={4}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              sx={{ width: "250px" }}
              size="small"
              value={formDataRuangan.jamAkhirPemakaian}
              onChange={(e) =>
                setFormDataRuangan({
                  ...formDataRuangan,
                  jamAkhirPemakaian: e.target.value,
                })
              }
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems={"center"} marginTop={2}>
          <Grid size={2}>
            <InputLabel
              sx={{
                ...layoutPrivateStyle.manageSubTitle,
                marginLeft: "15px",
              }}
            >
              Score Ruangan <span style={{ color: "red" }}>*</span>
            </InputLabel>
          </Grid>
          <Grid size={4}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              sx={{ width: "250px" }}
              size="small"
              value={formDataRuangan.scoreKegiatan}
              onChange={(e) =>
                setFormDataRuangan({
                  ...formDataRuangan,
                  scoreKegiatan: e.target.value,
                })
              }
              error={errors.scoreKegiatan}
              helperText={errors.scoreKegiatan ? "Score Kegiatan Wajib diisi" : ""}
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
