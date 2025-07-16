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
  Box,
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
import HeaderSection from "../../../components/commponentHeader/Header";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DataInsert,
  LocationState,
  KriteriaDetails,
  initialKriteriaDetails,
  ValidateError,
} from "../../../store/kriteriaSubKriteria/type";

export function ManageKriteriadanSubKriteria() {
  const navigate = useNavigate();
  const [nilai, setNilai] = React.useState("");
  const [details, setDetails] = React.useState("");
  const location = useLocation();
  const { itemData, mode, IsEdit } = location.state || {};

  const [formKriteria, setFormKriteria] = useState<DataInsert>({
    id: "",
    kodeKriteria: "",
    namaKriteria: "",
    bobotKriteria: "",
    nilai: "",
    kriteriaDetails: initialKriteriaDetails,
  });

  const [errors, setErrors] = useState<ValidateError>({
    kodeKriteria: false,
    namaKriteria: false,
    bobotKriteria: false,
    nilai: false,
  });

  const handleSubmit = () => {
    const newErrors = {
      kodeKriteria: (formKriteria.kodeKriteria ?? "").trim() === "",
      namaKriteria: (formKriteria.namaKriteria ?? "").trim() === "",
      bobotKriteria: (formKriteria.bobotKriteria ?? "").trim() === "",
      nilai: (formKriteria.nilai ?? "").trim() === "",
    };

    setErrors(newErrors);

    const isValid = !Object.values(newErrors).includes(true);

    if (!isValid) {
      return;
    }
  };

  useEffect(() => {
    if (IsEdit && itemData) {
      setFormKriteria(itemData);
    }
  }, [IsEdit, itemData]);

  const clickCancel = () => {
    navigate("/kriteria-sub-kriteria", { replace: true });
  };

  const handleChangeNilai = (event: SelectChangeEvent) => {
    setNilai(event.target.value as string);
  };

  const addRow = () => {
    setFormKriteria((prevData) => ({
      ...prevData,
      kriteriaDetails: [
        ...prevData.kriteriaDetails,
        {
          namaSubKriteria: "",
          bobot: "",
        },
      ],
    }));
  };

  const handleDeleteRow = (index: number) => {
    const updateKriteria = [...formKriteria.kriteriaDetails];
    updateKriteria.splice(index, 1);
    setFormKriteria((prevData) => ({
      ...prevData,
      kriteriaDetails: updateKriteria,
    }));
  };

  const dataDummyNilai = [
    {
      id: 1,
      durasi: "Maksimum",
    },
    {
      id: 2,
      durasi: "Minimum",
    },
  ];

  const dataDummyDetail = [
    {
      id: 1,
      value: "Ibadah",
    },
    {
      id: 2,
      value: "Latihan Ibadah",
    },
    {
      id: 3,
      value: "Latihan Pengisi Pujian",
    },
  ];

  return (
    <Stack sx={layoutPrivateStyle.fixHeader}>
      <HeaderSection />
      <InputLabel
        sx={{ ...layoutPrivateStyle.manageTitleHeader, marginTop: 5 }}
      >
        Master Data Kriteria
      </InputLabel>
      <Paper style={{ padding: 16 }}>
        <Grid container spacing={1} alignItems={"center"} marginTop={2}>
          <Grid size={6}>
            <InputLabel
              sx={{
                ...layoutPrivateStyle.manageSubTitle,
              }}
            >
              Kode Kriteria
            </InputLabel>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              fullWidth
              disabled
            />
          </Grid>
          <Grid size={6}>
            <InputLabel
              sx={{
                ...layoutPrivateStyle.manageSubTitle,
              }}
            >
              Nama Kriteria <span style={{ color: "red" }}>*</span>
            </InputLabel>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              fullWidth
              error={errors.namaKriteria}
              helperText={
                errors.namaKriteria ? " Nama Kriteria Wajib diisi" : ""
              }
              value={formKriteria.namaKriteria}
              onChange={(e) =>
                setFormKriteria({
                  ...formKriteria,
                  namaKriteria: e.target.value,
                })
              }
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems={"center"} marginTop={2}>
          <Grid size={6}>
            <InputLabel
              sx={{
                ...layoutPrivateStyle.manageSubTitle,
              }}
            >
              Bobot Kriteria <span style={{ color: "red" }}>*</span>
            </InputLabel>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              fullWidth
              error={errors.bobotKriteria}
              helperText={
                errors.bobotKriteria ? " Bobot Kriteria Wajib diisi" : ""
              }
              value={formKriteria.bobotKriteria}
              onChange={(e) =>
                setFormKriteria({
                  ...formKriteria,
                  bobotKriteria: e.target.value,
                })
              }
            />
          </Grid>
          <Grid size={6}>
            <InputLabel
              sx={{
                ...layoutPrivateStyle.manageSubTitle,
              }}
            >
              Nilai <span style={{ color: "red" }}>*</span>
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              style={{ width: "100%" }}
              size="small"
              value={nilai}
              onChange={handleChangeNilai}
              error={errors.nilai}
            >
              {dataDummyNilai.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.durasi}
                </MenuItem>
              ))}
            </Select>
            {errors.nilai && (
              <FormHelperText>
                {errors.nilai || "Nilai Wajib diisi"}
              </FormHelperText>
            )}
          </Grid>
        </Grid>
        <TableContainer
          sx={layoutPrivateStyle.manageTableContainer}
          style={{ marginTop: 10, backgroundColor: "#FFFFFF" }}
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
                  Nama Sub Kriteria
                </TableCell>
                <TableCell
                  sx={{
                    ...layoutPrivateStyle.manageTableCell,
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Bobot
                </TableCell>
                <TableCell
                  sx={{
                    ...layoutPrivateStyle.manageTableCell,
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Aksi
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ border: 1 }}>
              {formKriteria.kriteriaDetails.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell sx={layoutPrivateStyle.manageTableCell}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      style={{ width: "100%" }}
                      size="small"
                      value={row.namaSubKriteria}
                      onChange={(e) => {
                        const updated = [...formKriteria.kriteriaDetails];
                        updated[index].namaSubKriteria = e.target.value;
                        setFormKriteria({
                          ...formKriteria,
                          kriteriaDetails: updated,
                        });
                      }}
                      //   error={errors.nilai}
                    >
                      {dataDummyDetail.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.value}
                        </MenuItem>
                      ))}
                    </Select>
                    {/* {errors.nilai && (
                      <FormHelperText>
                        {errors.nilai || "Nilai Wajib diisi"}
                      </FormHelperText>
                    )} */}
                  </TableCell>
                  <TableCell
                    sx={{
                      ...layoutPrivateStyle.manageTableCell,
                      textAlign: "center",
                    }}
                  >
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={row.bobot || ""}
                      onChange={(e) => {
                        const newDetails = [...formKriteria.kriteriaDetails];
                        newDetails[index].bobot = e.target.value;
                        setFormKriteria({
                          ...formKriteria,
                          kriteriaDetails: newDetails,
                        });
                      }}
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      ...layoutPrivateStyle.manageTableCell,
                      textAlign: "center",
                    }}
                  >
                    <Box
                      display="flex"
                      flexDirection="row"
                      justifyContent="center"
                      gap={1}
                    >
                      <InputLabel
                        onClick={addRow}
                        sx={{
                          ...layoutPrivateStyle.manageTitleAction,
                          cursor: "pointer",
                          marginBottom: "5px",
                        }}
                      >
                        <AddIcon />
                      </InputLabel>
                      {formKriteria.kriteriaDetails.length > 1 && (
                        <InputLabel
                          onClick={() => handleDeleteRow(index)}
                          sx={{
                            ...layoutPrivateStyle.manageTitleAction,
                            cursor: "pointer",
                          }}
                        >
                          <DeleteIcon />
                        </InputLabel>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="flex-start" mt={2}></Box>
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
