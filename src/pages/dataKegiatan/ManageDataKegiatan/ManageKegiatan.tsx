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

export function ManageKegiatan() {
  const navigate = useNavigate();

  const location = useLocation();
  const { itemData, mode, IsEdit } = location.state || {};

  const [formDataKegiatan, setFormDataKegiatan] = useState({
    namaKegiatan: "",
    deskripsiKegiatan: "",
    scoreKegiatan: "",
  });

  const [errors, setErrors] = useState({
    namaKegiatan: false,
    deskripsiKegiatan: false,
    scoreKegiatan: false,
  });

  const handleSubmit = () => {
    const newErrors = {
      namaKegiatan: formDataKegiatan.namaKegiatan.trim() === "",
      deskripsiKegiatan: formDataKegiatan.deskripsiKegiatan.trim() === "",
      scoreKegiatan: formDataKegiatan.scoreKegiatan.trim() === "",
    };

    setErrors(newErrors);

    const isValid = !Object.values(newErrors).includes(true);

    if (!isValid) {
      return;
    }
  };

  useEffect(() => {
    if (IsEdit && itemData) {
      setFormDataKegiatan(itemData);
    }
  }, [IsEdit, itemData]);

  const clickCancel = () => {
    navigate("/master-data/data-kegiatan", { replace: true });
  };

  return (
    <Stack sx={layoutPrivateStyle.fixHeader}>
     <HeaderSection />
      <InputLabel
        sx={{ ...layoutPrivateStyle.manageTitleHeader, marginTop: 5 }}
      >
        Master Data Kegiatan
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
              Nama Kegiatan <span style={{ color: "red" }}>*</span>
            </InputLabel>
          </Grid>
          <Grid size={4}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              sx={{ width: "600px" }}
              multiline
              rows={3}
              InputProps={{
                sx: {
                  height: 100,
                  padding: "0 8px",
                  alignItems: "flex-start",
                },
              }}
              value={formDataKegiatan.namaKegiatan}
              onChange={(e) =>
                setFormDataKegiatan({
                  ...formDataKegiatan,
                  namaKegiatan: e.target.value,
                })
              }
              error={errors.namaKegiatan}
              helperText={
                errors.namaKegiatan ? "Nama Kegiatan Wajib diisi" : ""
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
              Deskripsi Kegiatan <span style={{ color: "red" }}>*</span>
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
              value={formDataKegiatan.deskripsiKegiatan}
              onChange={(e) =>
                setFormDataKegiatan({
                  ...formDataKegiatan,
                  deskripsiKegiatan: e.target.value,
                })
              }
              error={errors.deskripsiKegiatan}
              helperText={
                errors.deskripsiKegiatan ? "Deskripsi Kegiatan Wajib diisi" : ""
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
              Score Kegiatan <span style={{ color: "red" }}>*</span>
            </InputLabel>
          </Grid>
          <Grid size={4}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              sx={{ width: "250px" }}
              size="small"
              value={formDataKegiatan.scoreKegiatan}
              onChange={(e) =>
                setFormDataKegiatan({
                  ...formDataKegiatan,
                  scoreKegiatan: e.target.value,
                })
              }
              error={errors.scoreKegiatan}
              helperText={
                errors.scoreKegiatan ? "Score Kegiatan Wajib diisi" : ""
              }
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
