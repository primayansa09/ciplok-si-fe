import React, { useState, useEffect } from "react";
import { Form, useLocation } from "react-router-dom";
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
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import HeaderSection from "../../../components/commponentHeader/Header";
import { DataInsert } from "../../../store/dataMajelis/type";

export function ManageMajelis() {
  const [awalPeriode, setAwalPeriode] = React.useState<Dayjs | null>(null);
  const [akhirPeriode, setAkhirPeriode] = React.useState<Dayjs | null>(null);
  const navigate = useNavigate();

  const location = useLocation();
  const { itemData, mode, IsEdit } = location.state || {};

  const [formDataMajelis, setFormDataMajelis] = useState<DataInsert>({
    id: "",
    codePenatua: "",
    namaPenatua: "",
    jabatanPenatua: "",
    alamatPenatua: "",
    noWhatsapp: "",
    awalPeriode: new Date(),  // Default to current date or adjust as needed
    akhirPeriode: new Date(), // Default to current date or adjust as needed
  });

  const [errors, setErrors] = useState({
    namaPenatua: false,
    noWhatsapp: false,
  });

  const handleSubmit = () => {
    const newErrors = {
      namaPenatua: formDataMajelis.namaPenatua?.trim() === "" || formDataMajelis.namaPenatua === null,
      noWhatsapp: formDataMajelis.noWhatsapp?.trim() === "" || formDataMajelis.noWhatsapp === null,
    };

    setErrors(newErrors);

    const isValid = !Object.values(newErrors).includes(true);

    if (!isValid) {
      return;
    }

    console.log("Form submitted:", formDataMajelis);
  };


  useEffect(() => {
    if (IsEdit && itemData) {
      setFormDataMajelis(itemData);
    }
    if (IsEdit && itemData?.periodeAwal) {
      setAwalPeriode(dayjs(itemData.periodeAwal, "DD MMM YYYY"));
    }
    if (IsEdit && itemData?.periodeAkhir) {
      setAkhirPeriode(dayjs(itemData.periodeAkhir, "DD MMM YYYY"));
    }
  }, [IsEdit, itemData]);

  const handleAwalPeriodeChange = (value: Dayjs | null) => {
    setAwalPeriode(value);
  };

  const handleAkhirPeriodeChange = (newValue: Dayjs | null) => {
    setAkhirPeriode(newValue);
  };

  const clickCancel = () => {
    navigate("/master-data/data-majelis", { replace: true });
  };

  return (
    <Stack sx={layoutPrivateStyle.fixHeader}>
      <HeaderSection />
      <InputLabel
        sx={{ ...layoutPrivateStyle.manageTitleHeader, marginTop: 5 }}
      >
        Master Data Majelis
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
              Code Penatua
            </InputLabel>
          </Grid>
          <Grid size={4}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              sx={{ width: "250px" }}
              size="small"
              value={formDataMajelis.codePenatua}
              onChange={(e) =>
                setFormDataMajelis({
                  ...formDataMajelis,
                  codePenatua: e.target.value,
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
              Nama Penatua <span style={{ color: "red" }}>*</span>
            </InputLabel>
          </Grid>
          <Grid size={4}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              sx={{ width: "250px" }}
              size="small"
              value={formDataMajelis.namaPenatua}
              onChange={(e) =>
                setFormDataMajelis({
                  ...formDataMajelis,
                  namaPenatua: e.target.value,
                })
              }
              error={errors.namaPenatua}
              helperText={errors.namaPenatua ? "Nama Penatua wajib diisi" : ""}
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
              Jabatan Penatua
            </InputLabel>
          </Grid>
          <Grid size={4}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              sx={{ width: "250px" }}
              size="small"
              value={formDataMajelis.jabatanPenatua}
              onChange={(e) =>
                setFormDataMajelis({
                  ...formDataMajelis,
                  jabatanPenatua: e.target.value,
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
              Alamat Penatua
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
              value={formDataMajelis.alamatPenatua}
              onChange={(e) =>
                setFormDataMajelis({
                  ...formDataMajelis,
                  alamatPenatua: e.target.value,
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
              No WhatsApp <span style={{ color: "red" }}>*</span>
            </InputLabel>
          </Grid>
          <Grid size={4}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              sx={{ width: "250px" }}
              size="small"
              value={formDataMajelis.noWhatsapp}
              onChange={(e) =>
                setFormDataMajelis({
                  ...formDataMajelis,
                  noWhatsapp: e.target.value,
                })
              }
              error={errors.noWhatsapp}
              helperText={errors.noWhatsapp ? "No WhatsApp Wajib diisi" : ""}
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
              Awal Periode
            </InputLabel>
          </Grid>
          <Grid size={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  value={awalPeriode}
                  onChange={handleAwalPeriodeChange}
                  slotProps={{
                    textField: {
                      size: "small",
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
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
              Akhir Periode
            </InputLabel>
          </Grid>
          <Grid size={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  value={akhirPeriode}
                  onChange={handleAkhirPeriodeChange}
                  minDate={awalPeriode ?? undefined}
                  slotProps={{
                    textField: {
                      size: "small",
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
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
