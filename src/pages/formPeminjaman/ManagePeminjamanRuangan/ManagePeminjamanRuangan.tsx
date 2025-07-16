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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
  const [mj, setMj] = React.useState("");
  const [ruangan, setRuangan] = React.useState("");
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

  const handleTanggalPemakaian = (newValue: Dayjs | null) => {
    setTanggalPemakaian(newValue);
  };

  const handleTanggalPengajuan = (newValue: Dayjs | null) => {
    setTanggalPengajuan(newValue);
  };

  const handleMj = (event: SelectChangeEvent) => {
    setMj(event.target.value as string);
  };

  const handleRuangan = (event: SelectChangeEvent) => {
    setRuangan(event.target.value as string);
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

  const dataDummyRutin = [
    {
      id: 1,
      rutin: "Ya",
    },
    {
      id: 2,
      rutin: "TIdak",
    },
  ];

  const dataDummy = [
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
                      helperText: errors.tanggalPemakaian
                        ? "Tanggal Pemakaian Wajib diisi"
                        : "",
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
                      helperText: errors.jamMulaiPemakaian
                        ? "Jam Mulai Pemakaian Wajib diisi"
                        : "",
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
              Ruangan <span style={{ color: "red" }}>*</span>
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              style={{ width: "100%" }}
              size="small"
              value={ruangan}
              onChange={handleRuangan}
            >
              {dataDummyDurasi.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.durasi}
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

        {IsEdit && (
          <Grid container spacing={1} alignItems={"center"} marginTop={2}>
            <Grid size={6}>
              <InputLabel
                sx={{
                  ...layoutPrivateStyle.manageSubTitle,
                }}
              >
                Status
              </InputLabel>
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                fullWidth
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
                }}
              >
                Tanggal Pengajuan
              </InputLabel>
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                fullWidth
                //   value={formDataMajelis.codePenatua}
                //   onChange={(e) =>
                //     setFormDataMajelis({
                //       ...formDataMajelis,
                //       codePenatua: e.target.value,
                //     })
                //   }
              />
            </Grid>
          </Grid>
        )}

        <Grid container spacing={1} alignItems={"center"} marginTop={2}>
          <Grid size={6}>
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

        <TableContainer
          sx={layoutPrivateStyle.manageTableContainer}
          style={{ marginTop: 30, backgroundColor: "#FFFFFF" }}
        >
          <Table sx={{ minWidth: 720 }} size="small" aria-label="a dense table">
            <TableHead sx={layoutPrivateStyle.moduleTableHead}>
              <TableRow sx={layoutPrivateStyle.manageTableRow}>
                <TableCell
                  sx={{
                    ...layoutPrivateStyle.manageTableCell,
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Kriteria
                </TableCell>
                <TableCell
                  sx={{
                    ...layoutPrivateStyle.manageTableCell,
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Sub Kriteria
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ border: 1 }}>
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell sx={layoutPrivateStyle.manageTableCell}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={"Peminjam"}
                    // onChange={(e) => {
                    //   const newDetails = [...formKriteria.kriteriaDetails];
                    //   newDetails[index].bobot = e.target.value;
                    //   setFormKriteria({
                    //     ...formKriteria,
                    //     kriteriaDetails: newDetails,
                    //   });
                    // }}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    ...layoutPrivateStyle.manageTableCell,
                    textAlign: "center",
                  }}
                >
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    fullWidth
                    size="small"
                    // value={row.namaSubKriteria}
                    // onChange={(e) => {
                    //   const updated = [...formKriteria.kriteriaDetails];
                    //   updated[index].namaSubKriteria = e.target.value;
                    //   setFormKriteria({
                    //     ...formKriteria,
                    //     kriteriaDetails: updated,
                    //   });
                    // }}
                    //   error={errors.nilai}
                  >
                    {dataDummy.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.peminjam}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell sx={layoutPrivateStyle.manageTableCell}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={"Jenis Kegiatan"}
                    // onChange={(e) => {
                    //   const newDetails = [...formKriteria.kriteriaDetails];
                    //   newDetails[index].bobot = e.target.value;
                    //   setFormKriteria({
                    //     ...formKriteria,
                    //     kriteriaDetails: newDetails,
                    //   });
                    // }}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    ...layoutPrivateStyle.manageTableCell,
                    textAlign: "center",
                  }}
                >
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    fullWidth
                    size="small"
                    // value={"Nama Sub Kriteria *"}
                    // onChange={(e) => {
                    //   const updated = [...formKriteria.kriteriaDetails];
                    //   updated[index].namaSubKriteria = e.target.value;
                    //   setFormKriteria({
                    //     ...formKriteria,
                    //     kriteriaDetails: updated,
                    //   });
                    // }}
                    //   error={errors.nilai}
                  >
                    {dataDummy.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.jenisKegiatan}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell sx={layoutPrivateStyle.manageTableCell}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={"Durasi"}
                    // onChange={(e) => {
                    //   const newDetails = [...formKriteria.kriteriaDetails];
                    //   newDetails[index].bobot = e.target.value;
                    //   setFormKriteria({
                    //     ...formKriteria,
                    //     kriteriaDetails: newDetails,
                    //   });
                    // }}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    ...layoutPrivateStyle.manageTableCell,
                    textAlign: "center",
                  }}
                >
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    size="small"
                    fullWidth
                    // value={row.namaSubKriteria}
                    // onChange={(e) => {
                    //   const updated = [...formKriteria.kriteriaDetails];
                    //   updated[index].namaSubKriteria = e.target.value;
                    //   setFormKriteria({
                    //     ...formKriteria,
                    //     kriteriaDetails: updated,
                    //   });
                    // }}
                    //   error={errors.nilai}
                  >
                    {dataDummyDurasi.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.durasi}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell sx={layoutPrivateStyle.manageTableCell}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={"Rutin"}
                    // onChange={(e) => {
                    //   const newDetails = [...formKriteria.kriteriaDetails];
                    //   newDetails[index].bobot = e.target.value;
                    //   setFormKriteria({
                    //     ...formKriteria,
                    //     kriteriaDetails: newDetails,
                    //   });
                    // }}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    ...layoutPrivateStyle.manageTableCell,
                    textAlign: "center",
                  }}
                >
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    size="small"
                    fullWidth
                    // value={row.namaSubKriteria}
                    // onChange={(e) => {
                    //   const updated = [...formKriteria.kriteriaDetails];
                    //   updated[index].namaSubKriteria = e.target.value;
                    //   setFormKriteria({
                    //     ...formKriteria,
                    //     kriteriaDetails: updated,
                    //   });
                    // }}
                    //   error={errors.nilai}
                  >
                    {dataDummyRutin.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.rutin}
                      </MenuItem>
                    ))}
                  </Select>
                  {/* {errors.nilai && (
                              <FormHelperText>
                                {errors.nilai || "Nilai Wajib diisi"}
                              </FormHelperText>
                            )} */}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
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
