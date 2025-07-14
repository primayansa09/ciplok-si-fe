import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Grid, Stack, TextField, InputLabel, Paper, CircularProgress, Select, MenuItem, Table, TableRow, TableBody, TableCell, TableHead } from "@mui/material";
import { layoutPrivateStyle } from "../../../style/layout/private-route";
import HeaderSection from "../../../components/commponentHeader/Header";
import { DataInsert, DataUserMajelis } from "../../../store/dataMajelis/type";
import { fetchNamaPenatua } from "../../../api/getAllUser";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { fetchJabatanPenatua } from "../../../api/getDataSettings";
import { DataSettings } from "../../../store/dataSettings/type";

export function ManageMajelis() {
  const [awalPeriode, setAwalPeriode] = useState<Dayjs | null>(null);
  const [akhirPeriode, setAkhirPeriode] = useState<Dayjs | null>(null);
  const [formDataMajelis, setFormDataMajelis] = useState<DataInsert>({
    id: "",
    codePenatua: "",
    namaPenatua: "",
    jabatanPenatua: "",
    alamatPenatua: "",
    noWhatsapp: "",
    awalPeriode: new Date(),
    akhirPeriode: new Date(),
  });
  const [errors, setErrors] = useState({
    namaPenatua: false,
    noWhatsapp: false,
  });
  const [searchResults, setSearchResults] = useState<DataUserMajelis[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { itemData, mode, IsEdit } = location.state || {};

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
    const fetchJabatan = async () => {
      const jabatanData = await fetchJabatanPenatua();
      setJabatanPenatuaList(jabatanData);
    };

    fetchJabatan();
  }, [IsEdit, itemData]);

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

  const handleAwalPeriodeChange = (value: Dayjs | null) => {
    setAwalPeriode(value);
  };

  const handleAkhirPeriodeChange = (newValue: Dayjs | null) => {
    setAkhirPeriode(newValue);
  };

  const clickCancel = () => {
    navigate("/master-data/data-majelis", { replace: true });
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setFormDataMajelis({
      ...formDataMajelis,
      namaPenatua: query,
    });
    setErrors({
      namaPenatua: query.trim() === "",
      noWhatsapp: formDataMajelis.noWhatsapp?.trim() === "" || formDataMajelis.noWhatsapp === null,
    });

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    setLoading(true);

    try {
      const results = await fetchNamaPenatua(query); // Fetching results from the backend API
      setSearchResults(results);
      
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectResult = (result: DataUserMajelis) => {
    setFormDataMajelis({
      ...formDataMajelis,
      namaPenatua: result.fullName,
      alamatPenatua: result.address,
      noWhatsapp: result.phoneNo,
    });
    setSearchResults([]); // Clear the results after selection
  };

  const [jabatanPenatuaList, setJabatanPenatuaList] = useState<DataSettings[]>([]);

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
              onChange={handleSearch}
              error={errors.namaPenatua}
              helperText={errors.namaPenatua ? "Nama Penatua wajib diisi" : ""}
              label="Nama Penatua"
            />
            {loading && <CircularProgress size={24} />}
            {searchResults.length > 0 && (
              <Table sx={{ marginTop: "10px", maxHeight: "300px", overflowY: "auto", border: "1px solid #ccc" }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Address</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchResults.map((result, index) => (
                    <TableRow key={index} hover onClick={() => handleSelectResult(result)} style={{ cursor: "pointer" }}>
                      <TableCell>{result.fullName}</TableCell>
                      <TableCell>{result.address}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
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
            <Select
              labelId="jabatanPenatua-label"
              sx={{ width: "250px" }}
              id="jabatanPenatua"
              value={formDataMajelis.jabatanPenatua}
              onChange={(e) =>
                setFormDataMajelis({
                  ...formDataMajelis,
                  jabatanPenatua: e.target.value,
                })
              }
            >
              {jabatanPenatuaList.map((jabatan, index) => (
                <MenuItem key={index} value={jabatan.descriptionSettings}>
                  {jabatan.descriptionSettings}
                </MenuItem>
              ))}
            </Select>
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
              Awal Periode
            </InputLabel>
          </Grid>
          <Grid size={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={awalPeriode}
                onChange={handleAwalPeriodeChange}
                slotProps={{
                  textField: {
                    size: "small",
                  },
                }}
              />
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
