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
  FormHelperText,
} from "@mui/material";
import { layoutPrivateStyle } from "../../../style/layout/private-route";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import HeaderSection from "../../../components/commponentHeader/Header";

export function ManagePeminjamanRuangan() {
  const navigate = useNavigate();
  const [peminjam, setPeminjam] = React.useState("");
  const [durasi, setDurasi] = React.useState("");
  const [ruangan, setRuangan] = React.useState("");
  const [jenisKegiatan, setJenisKegiatan] = React.useState("");
  const [mj, setMj] = React.useState("");
  const [jemaatPeminjam, setJemaatPeminjam] = React.useState("");
  const location = useLocation();
  const { itemData, mode, IsEdit } = location.state || {};
  const [tanggalPemakaian, setTanggalPemakaian] = React.useState<Dayjs | null>(
    null
  );
  const [tanggalPengajuan, setTanggalPengajuan] = React.useState<Dayjs | null>(
    null
  );
  const [selectedValue, setSelectedValue] = useState<null | "Ya" | "Tidak">(
    null
  );

  const handleChange = (value: "Ya" | "Tidak") => {
    setSelectedValue(value);
  };

  const [formPeminjaman, setFormPeminjaman] = useState({
    peminjam: "",
    jenisKegiatan: "",
    ruangan: "",
    durasi: "",
    tanggalPemakaian: "",
    tanggalPengajuan: "",
    jamMulaiPemakaian: "",
    jumlahOrang: "",
    mjMengetahui: "",
    jemaatPeminjam: "",
    deskripsi: "",
  });

  const [errors, setErrors] = useState({
    peminjam: false,
    jenisKegiatan: false,
    ruangan: false,
    durasi: false,
    tanggalPemakaian: false,
    tanggalPengajuan: false,
    jamMulaiPemakaian: false,
    jumlahOrang: false,
    mjMengetahui: false,
    jemaatPeminjam: false,
    deskripsi: false,
  });

  const handleSubmit = () => {
    const newErrors = {
      peminjam: formPeminjaman.peminjam.trim() === "",
      jenisKegiatan: formPeminjaman.jenisKegiatan.trim() === "",
      ruangan: formPeminjaman.ruangan.trim() === "",
      durasi: formPeminjaman.durasi.trim() === "",
      tanggalPemakaian: formPeminjaman.tanggalPemakaian.trim() === "",
      tanggalPengajuan: formPeminjaman.tanggalPengajuan.trim() === "",
      jamMulaiPemakaian: formPeminjaman.jamMulaiPemakaian.trim() === "",
      jumlahOrang: formPeminjaman.jumlahOrang.trim() === "",
      mjMengetahui: formPeminjaman.mjMengetahui.trim() === "",
      jemaatPeminjam: formPeminjaman.jemaatPeminjam.trim() === "",
      deskripsi: formPeminjaman.deskripsi.trim() === "",
    };

    setErrors(newErrors);

    const isValid = !Object.values(newErrors).includes(true);

    if (!isValid) {
      return;
    }
  };

  useEffect(() => {
    if (IsEdit && itemData) {
      setFormPeminjaman(itemData);
    }
  }, [IsEdit, itemData]);

  const clickCancel = () => {
    navigate("/pinjam-ruangan/form-peminjaman", { replace: true });
  };

  const handleChangePeminjam = (event: SelectChangeEvent) => {
    setPeminjam(event.target.value as string);
  };

  const handleChangeDurasi = (event: SelectChangeEvent) => {
    setDurasi(event.target.value as string);
  };

  const handleChangeRuangan = (event: SelectChangeEvent) => {
    setRuangan(event.target.value as string);
  };

  const handleChangeKegiatan = (event: SelectChangeEvent) => {
    setJenisKegiatan(event.target.value as string);
  };

  const handleTanggalPemakaian = (newValue: Dayjs | null) => {
    setTanggalPemakaian(newValue);
  };

  const handleTanggalPengajuan = (newValue: Dayjs | null) => {
    setTanggalPengajuan(newValue);
  };

  const handleMj = (event: SelectChangeEvent) => {
    setMj(event.target.value as string);
  };

  const handleJemaatPeminjam = (event: SelectChangeEvent) => {
    setJemaatPeminjam(event.target.value as string);
  };

  const dataDummyDurasi = [
    {
      id: 1,
      durasi: "1",
    },
    {
      id: 2,
      durasi: "2",
    },
    {
      id: 3,
      durasi: "3",
    },
  ];

  const dataDummyPeminjaman = [
    {
      id: 1,
      tanggalPemakaian: "12 Apr 2025",
      jam: "10.00",
      ruangan: "F9 RSG Konsis F9 F9 F9 Gereja Gereja F9 F9",
      jenisKegiatan:
        "Latihan ibadah KP Persiapan GSM Rapat BCRC Regen Band Regen Gitar Latihan Angeloudi Dekor Pentakosta Panda Latihan ibadah KP",
      peminjam:
        "Komisi Pemuda Komisi Anak Komisi Remaja Komisi Remaja Komisi Remaja Komisi Anak Jemaat Jemaat Komisi Pemuda",
      jemaatPeminjam: "Wening Evy Jemima Anya Viola Julia Maria Hein Wening",
      tanggalPengajuan: "10 Apr 2025",
      status: "approve",
    },
    {
      id: 2,
      tanggalPemakaian: "12 Apr 2025",
      jam: "10.00",
      ruangan: "F9 RSG Konsis F9 F9 F9 Gereja Gereja F9 F9",
      jenisKegiatan:
        "Latihan ibadah KP Persiapan GSM Rapat BCRC Regen Band Regen Gitar Latihan Angeloudi Dekor Pentakosta Panda Latihan ibadah KP",
      peminjam:
        "Komisi Pemuda Komisi Anak Komisi Remaja Komisi Remaja Komisi Remaja Komisi Anak Jemaat Jemaat Komisi Pemuda",
      jemaatPeminjam: "Wening Evy Jemima Anya Viola Julia Maria Hein Wening",
      tanggalPengajuan: "10 Apr 2025",
      status: "processing",
    },
    {
      id: 3,
      tanggalPemakaian: "12 Apr 2025",
      jam: "10.00",
      ruangan: "F9 RSG Konsis F9 F9 F9 Gereja Gereja F9 F9",
      jenisKegiatan:
        "Latihan ibadah KP Persiapan GSM Rapat BCRC Regen Band Regen Gitar Latihan Angeloudi Dekor Pentakosta Panda Latihan ibadah KP",
      peminjam:
        "Komisi Pemuda Komisi Anak Komisi Remaja Komisi Remaja Komisi Remaja Komisi Anak Jemaat Jemaat Komisi Pemuda",
      jemaatPeminjam: "Wening Evy Jemima Anya Viola Julia Maria Hein Wening",
      tanggalPengajuan: "10 Apr 2025",
      status: "reject",
    },
  ];

  return (
    <Stack sx={layoutPrivateStyle.fixHeader}>
      <HeaderSection />
      <InputLabel
        sx={{ ...layoutPrivateStyle.manageTitleHeader, marginTop: 5 }}
      >
        Form Peminjaman Ruangan
      </InputLabel>
      <Paper style={{ padding: 16 }}>
        <Grid container spacing={1} alignItems={"center"} marginTop={2}>
          <Grid size={6}>
            <InputLabel
              sx={{
                ...layoutPrivateStyle.manageSubTitle,
              }}
            >
              Peminjam <span style={{ color: "red" }}>*</span>
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              style={{ width: "100%" }}
              size="small"
              value={peminjam}
              onChange={handleChangePeminjam}
              error={errors.peminjam}
            >
              {dataDummyPeminjaman.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.peminjam}
                </MenuItem>
              ))}
            </Select>
            {errors.peminjam && (
              <FormHelperText>
                {errors.peminjam || "Peminjam Wajib diisi"}
              </FormHelperText>
            )}
          </Grid>
          <Grid size={6}>
            <InputLabel
              sx={{
                ...layoutPrivateStyle.manageSubTitle,
              }}
            >
              Jenis Kegiatan <span style={{ color: "red" }}>*</span>
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              style={{ width: "100%" }}
              size="small"
              value={jenisKegiatan}
              onChange={handleChangeKegiatan}
              error={errors.jenisKegiatan}
            >
              {dataDummyPeminjaman.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.jenisKegiatan}
                </MenuItem>
              ))}
            </Select>
              {errors.jenisKegiatan && (
              <FormHelperText>
                {errors.jenisKegiatan || "Jenis Kegiatan Wajib diisi"}
              </FormHelperText>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems={"center"} marginTop={2}>
          <Grid size={6}>
            <InputLabel
              sx={{
                ...layoutPrivateStyle.manageSubTitle,
              }}
            >
              Ruangan <span style={{ color: "red" }}>*</span>
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              style={{ width: "100%" }}
              size="small"
              value={ruangan}
              onChange={handleChangeRuangan}
              error={errors.ruangan}
            >
              {dataDummyPeminjaman.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.ruangan}
                </MenuItem>
              ))}
            </Select>
            {errors.ruangan && (
              <FormHelperText>
                {errors.ruangan || "Ruangan Wajib diisi"}
              </FormHelperText>
            )}
          </Grid>
          <Grid size={6}>
            <InputLabel
              sx={{
                ...layoutPrivateStyle.manageSubTitle,
              }}
            >
              Durasi <span style={{ color: "red" }}>*</span>
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              style={{ width: "100%" }}
              size="small"
              value={durasi}
              onChange={handleChangeDurasi}
              error={errors.durasi}
            >
              {dataDummyDurasi.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.durasi}
                </MenuItem>
              ))}
            </Select>
            {errors.durasi && (
              <FormHelperText>
                {errors.durasi || "Durasi Wajib diisi"}
              </FormHelperText>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems={"center"} marginTop={2}>
          <Grid size={6}>
            <InputLabel
              sx={{
                ...layoutPrivateStyle.manageSubTitle,
              }}
            >
              Tanggal Pemakaian <span style={{ color: "red" }}>*</span>
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  value={tanggalPemakaian}
                  onChange={handleTanggalPemakaian}
                  slotProps={{
                    textField: {
                      size: "small",
                      fullWidth: true,
                      error: !!errors.tanggalPemakaian,
                      helperText: errors.tanggalPemakaian ? "Tanggal Pemakaian Wajib diisi" : ""
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid size={6}>
            <InputLabel
              sx={{
                ...layoutPrivateStyle.manageSubTitle,
              }}
            >
              Tanggal Pengajuan <span style={{ color: "red" }}>*</span>
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  value={tanggalPengajuan}
                  onChange={handleTanggalPengajuan}
                  slotProps={{
                    textField: {
                      size: "small",
                      fullWidth: true,
                      error: !!errors.tanggalPengajuan,
                      helperText: errors.tanggalPengajuan ? "Tanggal Pengajuan Wajib diisi" : ""
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems={"center"} marginTop={2}>
          <Grid size={6}>
            <InputLabel
              sx={{
                ...layoutPrivateStyle.manageSubTitle,
              }}
            >
              Jam Mulai Pemakaian <span style={{ color: "red" }}>*</span>
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["TimePicker"]}>
                <TimePicker
                  label=""
                  slotProps={{
                    textField: {
                      size: "small",
                      fullWidth: true,
                      error: !!errors.jamMulaiPemakaian,
                      helperText: errors.jamMulaiPemakaian ? "Jam Mulai Pemakaian Wajib diisi" : ""
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid size={2} marginTop={3}>
            <InputLabel
              sx={{
                ...layoutPrivateStyle.manageSubTitle,
                marginLeft: "15px",
              }}
            >
              Tiap Minggu ?
            </InputLabel>
          </Grid>
          <Grid size={4} marginTop={3}>
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="Tidak"
                control={
                  <Checkbox
                    checked={selectedValue === "Tidak"}
                    onChange={() => handleChange("Tidak")}
                  />
                }
                label="Tidak"
              />

              <FormControlLabel
                value="Ya"
                control={
                  <Checkbox
                    checked={selectedValue === "Ya"}
                    onChange={() => handleChange("Ya")}
                  />
                }
                label="Ya"
              />
            </FormGroup>
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems={"center"} marginTop={2}>
          <Grid size={6}>
            <InputLabel
              sx={{
                ...layoutPrivateStyle.manageSubTitle,
              }}
            >
              Jumlah Orang <span style={{ color: "red" }}>*</span>
            </InputLabel>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              fullWidth
              error={errors.jumlahOrang}
              helperText={errors.jumlahOrang ? "Jumlah Orang Wajib diisi" : ""}
              //   value={formDataMajelis.codePenatua}
              //   onChange={(e) =>
              //     setFormDataMajelis({
              //       ...formDataMajelis,
              //       codePenatua: e.target.value,
              //     })
              //   }
            />
          </Grid>
          <Grid size={6}>
            <InputLabel
              sx={{
                ...layoutPrivateStyle.manageSubTitle,
                marginLeft: "15px",
              }}
            >
              MJ Mengetahui <span style={{ color: "red" }}>*</span>
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              style={{ width: "100%" }}
              size="small"
              value={mj}
              onChange={handleMj}
            >
              {dataDummyDurasi.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.durasi}
                </MenuItem>
              ))}
            </Select>
             {errors.mjMengetahui && (
              <FormHelperText>
                {errors.mjMengetahui || "MJ Mengetahui Wajib diisi"}
              </FormHelperText>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems={"center"} marginTop={2}>
          <Grid size={6}>
            <InputLabel
              sx={{
                ...layoutPrivateStyle.manageSubTitle,
                marginLeft: "15px",
              }}
            >
              Jemaat Peminjam <span style={{ color: "red" }}>*</span>
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              style={{ width: "100%" }}
              size="small"
              value={jemaatPeminjam}
              onChange={handleJemaatPeminjam}
            >
              {dataDummyDurasi.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.durasi}
                </MenuItem>
              ))}
            </Select>
             {errors.jemaatPeminjam && (
              <FormHelperText>
                {errors.jemaatPeminjam || "Jemaat Peminjam Wajib diisi"}
              </FormHelperText>
            )}
          </Grid>
          <Grid size={6} marginTop={3}>
            <Button
              type="submit"
              variant="contained"
              size="small"
              sx={{
                ...layoutPrivateStyle.buttonSubmit,
                width: "100%",
                backgroundColor: "orange",
              }}
              // onClick={saveToLocalStorage}
            >
              Surat Hasil Keputusan{" "}
              <span>
                <VerticalAlignBottomIcon
                  style={{ marginLeft: "10px", height: 15 }}
                />
              </span>
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems={"center"} marginTop={2}>
          <Grid size={12}>
            <InputLabel
              sx={{
                ...layoutPrivateStyle.manageSubTitle,
                marginLeft: "15px",
              }}
            >
              Deskripsi Kegiatan <span style={{ color: "red" }}>*</span>
            </InputLabel>
            <TextField
              id="outlined-basic"
              variant="outlined"
              fullWidth
              multiline
              rows={10}
              error={errors.deskripsi}
              helperText={errors.deskripsi ? "Deskripsi Wajib diisi" : ""}
              InputProps={{
                sx: {
                  height: 200,
                  padding: "0 8px",
                  alignItems: "flex-start",
                },
              }}
              //   value={formDataKegiatan.deskripsiKegiatan}
              //   onChange={(e) =>
              //     setFormDataKegiatan({
              //       ...formDataKegiatan,
              //       deskripsiKegiatan: e.target.value,
              //     })
              //   }
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
