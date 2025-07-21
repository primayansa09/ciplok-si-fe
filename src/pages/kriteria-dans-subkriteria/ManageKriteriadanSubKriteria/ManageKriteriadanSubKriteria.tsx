import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  Stack,
  TextField,
  InputLabel,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormHelperText,
  FormControl,
} from "@mui/material";
import { layoutPrivateStyle } from "../../../style/layout/private-route";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import HeaderSection from "../../../components/commponentHeader/Header";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DataInsert,
  initialCriteriaDetails,
  ValidateError,
} from "../../../store/kriteriaSubKriteria/type";
import MessageModal from "../../../components/Modal/MessageModal";
import { createDataCriteria, editDataCriteria } from "../../../api/dataCriteria";

export function ManageKriteriadanSubKriteria() {
  const navigate = useNavigate();
  const location = useLocation();

  const [dataDummyNilai, setDataDummyNilai] = useState<any[]>([
    { id: "Maksimal", value: "Maksimal" },
    { id: "Minimal", value: "Minimal" },
  ]);

  const { itemData, mode, IsEdit } = location.state || {};
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [redirectTo, setRedirectTo] = useState("");
  const [formKriteria, setFormKriteria] = useState<DataInsert>({
    criteriaCode: null,
    idHeaderCriteria: 0,
    bobot: null,
    criteriaName: "",
    parameter: "",
    subCriteriaList: initialCriteriaDetails,
  });

  const [errors, setErrors] = useState({
    criteriaName: false,
    bobot: false,
    parameter: false,
    subCriteriaName: false,
    subCriteriaBobot: false,  // Add error for subCriteriaName at index 0
  });

  const handleSubmit = async () => {
    const newErrors = {
      criteriaName: (formKriteria.criteriaName ?? "").trim() === "",
      bobot: String(formKriteria.bobot ?? "").trim() === "",
      parameter: String(formKriteria.parameter ?? "").trim() === "" || String(formKriteria.parameter ?? "").trim() === null,
      subCriteriaName: formKriteria.subCriteriaList[0]?.subCriteriaName.trim() === "" || formKriteria.subCriteriaList[0]?.subCriteriaName.trim() === null,
      subCriteriaBobot: formKriteria.subCriteriaList[0]?.subCriteriaBobot === null || formKriteria.subCriteriaList[0]?.subCriteriaBobot === 0
      // subCriteriaBobot: String(formKriteria.subCriteriaList[0].subCriteriaBobot === 0)
    };

    setErrors(newErrors);

    const isValid = !Object.values(newErrors).includes(true);

    if (!isValid) {
      return;
    }

    try {
      let response;
      console.log(formKriteria);
      if (formKriteria.idHeaderCriteria == 0 || formKriteria.idHeaderCriteria === null) {
        response = await createDataCriteria(formKriteria);
        if (response.statusCode === 200) {
          setFormKriteria({
            criteriaCode: null,
            idHeaderCriteria: 0,
            bobot: null,
            criteriaName: "",
            parameter: "",
            subCriteriaList: initialCriteriaDetails,
          });
          setModalMessage(response.message || "Data created successfully!");
          setRedirectTo("/kriteria-sub-kriteria");
          setOpenModal(true);
        }
      } else {
        response = await editDataCriteria(formKriteria.idHeaderCriteria, formKriteria);
        if (response.statusCode === 200) {
          setFormKriteria({
            criteriaCode: null,
            idHeaderCriteria: 0,
            bobot: null,
            criteriaName: "",
            parameter: "",
            subCriteriaList: initialCriteriaDetails,
          });
          setModalMessage(response.message || "Data updated successfully!");
          setRedirectTo("/kriteria-sub-kriteria");
          setOpenModal(true);
        }
      }
    } catch (ex) {
      setModalMessage("An error occurred while submitting the form.");
      setOpenModal(true);
    }
  };

  useEffect(() => {
    if (IsEdit && itemData) {
      setFormKriteria({
        ...itemData,
        parameter: itemData.parameter || "",
      });
    } else {
      setFormKriteria({
        ...formKriteria,
        subCriteriaList: [
          {
            ...initialCriteriaDetails[0],
            subCriteriaName: "",
            subCriteriaBobot: null,
          },
          ...initialCriteriaDetails.slice(1),
        ],
      });
    }
  }, [IsEdit, itemData, dataDummyNilai]);

  const clickCancel = () => {
    navigate("/kriteria-sub-kriteria", { replace: true });
  };

  const addRow = () => {
    setFormKriteria((prevData) => ({
      ...prevData,
      subCriteriaList: [
        ...prevData.subCriteriaList,
        {
          idCriteria: null,
          idSubCriteria: null,
          subCriteriaBobot: null,
          subCriteriaName: "",
        },
      ],
    }));
  };

  const handleDeleteRow = (index: number) => {
    const updateKriteria = [...formKriteria.subCriteriaList];
    updateKriteria.splice(index, 1);
    setFormKriteria((prevData) => ({
      ...prevData,
      subCriteriaList: updateKriteria,
    }));
  };

  const handleBobotChange = (e: any) => {
    const value = e.target.value;
    const isValid = /^[1-9]$|^[1-9][0-9]$|^100$/.test(value);
    if (isValid || value === '') {
      setFormKriteria({
        ...formKriteria,
        bobot: value,
      });
    }

    if (!isValid && value !== '') {
      setErrors({
        ...errors,
        bobot: true,
      });
    } else {
      setErrors({
        ...errors,
        bobot: false,
      });
    }
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleModalConfirm = () => {
    setOpenModal(false);
    navigate(redirectTo, { replace: true });
  };

  return (
    <Stack sx={layoutPrivateStyle.fixHeader}>
      <HeaderSection />
      <InputLabel sx={{ ...layoutPrivateStyle.manageTitleHeader, marginTop: 5 }}>
        Master Data Kriteria
      </InputLabel>
      <Paper style={{ padding: 16 }}>
        <Grid container spacing={1} alignItems={"center"} marginTop={2}>
          <Grid size={6}>
            <InputLabel sx={{ ...layoutPrivateStyle.manageSubTitle }}>Kode Kriteria</InputLabel>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              fullWidth
              disabled
              helperText={"Nama Kriteria Wajib diisi"}
              sx={{
                "& .MuiFormHelperText-root": {
                  visibility: "hidden",  // Hides the helper text
                  height: "0",           // Ensures the space remains occupied
                  marginBottom: 0,       // Removes any margin
                },
              }}
              value={IsEdit ? formKriteria.criteriaCode : ""}
            />
          </Grid>
          <Grid size={6}>
            <InputLabel sx={{ ...layoutPrivateStyle.manageSubTitle }}>
              Nama Kriteria <span style={{ color: "red" }}>*</span>
            </InputLabel>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              fullWidth
              error={errors.criteriaName}
              helperText={errors.criteriaName ? "Nama Kriteria Wajib diisi" : " "}
              value={formKriteria.criteriaName}
              onChange={(e) =>
                setFormKriteria({
                  ...formKriteria,
                  criteriaName: e.target.value,
                })
              }
            />
          </Grid>
        </Grid>

        <Grid container spacing={1} alignItems={"center"} marginTop={2}>
          <Grid size={6}>
            <InputLabel sx={{ ...layoutPrivateStyle.manageSubTitle }}>
              Bobot Kriteria <span style={{ color: "red" }}>*</span>
            </InputLabel>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              fullWidth
              error={errors.bobot}
              helperText={errors.bobot ? "Bobot Kriteria Wajib diisi" : " "}
              value={formKriteria.bobot}
              onChange={handleBobotChange}
            />
          </Grid>
          <Grid size={6}>
            <InputLabel sx={{ ...layoutPrivateStyle.manageSubTitle }}>
              Nilai <span style={{ color: "red" }}>*</span>
            </InputLabel>
            <FormControl fullWidth error={errors.parameter} size="small">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formKriteria.parameter}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormKriteria({
                    ...formKriteria,
                    parameter: value,
                  });
                }}
              >
                {dataDummyNilai.map((item) => (
                  <MenuItem key={item.id} value={item.value}>
                    {item.value}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.parameter ? "Nilai Wajib diisi" : " "}</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>

        <TableContainer sx={layoutPrivateStyle.manageTableContainer} style={{ marginTop: 10, backgroundColor: "#FFFFFF" }}>
          <Table sx={{ minWidth: 720 }} size="small" aria-label="a dense table">
            <TableHead sx={layoutPrivateStyle.moduleTableHead}>
              <TableRow sx={layoutPrivateStyle.manageTableRow}>
                <TableCell sx={{ ...layoutPrivateStyle.manageTableCell, color: "white", fontWeight: "bold", textAlign: "center" }}>
                  Nama Sub Kriteria
                </TableCell>
                <TableCell sx={{ ...layoutPrivateStyle.manageTableCell, color: "white", fontWeight: "bold", textAlign: "center" }}>
                  Bobot
                </TableCell>
                <TableCell sx={{ ...layoutPrivateStyle.manageTableCell, color: "white", fontWeight: "bold", textAlign: "center" }}>
                  Aksi
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ border: 1 }}>
              {formKriteria.subCriteriaList.map((row, index) => (
                <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell sx={layoutPrivateStyle.manageTableCell}>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={row.subCriteriaName}
                      onChange={(e) => {
                        const newDetails = [...formKriteria.subCriteriaList];
                        newDetails[index].subCriteriaName = e.target.value;
                        setFormKriteria({
                          ...formKriteria,
                          subCriteriaList: newDetails,
                        });
                      }}
                      error={index === 0 && errors.subCriteriaName}  // Show error for index 0
                      helperText={index === 0 && errors.subCriteriaName ? "Sub Criteria Name Wajib Di Isi" : ""}
                    />
                  </TableCell>

                  <TableCell sx={{ ...layoutPrivateStyle.manageTableCell, textAlign: "center" }}>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={row.subCriteriaBobot}
                      onChange={(e) => {
                        const newDetails = [...formKriteria.subCriteriaList];
                        const value = e.target.value;
                        if (!isNaN(Number(value)) || value === '') {
                          newDetails[index].subCriteriaBobot = Number(value);
                          setFormKriteria({
                            ...formKriteria,
                            subCriteriaList: newDetails,
                          });
                        }
                      }}
                      inputProps={{
                        pattern: "[0-9]*",
                      }}
                      error={index === 0 && errors.subCriteriaName}  // Show error for index 0
                      helperText={index === 0 && errors.subCriteriaName ? "Sub Kriteria Name Bobot Di Isi" : ""}
                    />
                  </TableCell>

                  <TableCell sx={{ ...layoutPrivateStyle.manageTableCell, textAlign: "center" }}>
                    <Box display="flex" flexDirection="row" justifyContent="center" gap={1}>
                      <InputLabel onClick={addRow} sx={{ ...layoutPrivateStyle.manageTitleAction, cursor: "pointer", marginBottom: "5px" }}>
                        <AddIcon />
                      </InputLabel>
                      {formKriteria.subCriteriaList.length > 1 && (
                        <InputLabel onClick={() => handleDeleteRow(index)} sx={{ ...layoutPrivateStyle.manageTitleAction, cursor: "pointer" }}>
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

        <Grid container spacing={2} justifyContent={"flex-end"} alignItems={"center"} marginTop={2}>
          <Grid size={2}>
            <Button type="submit" variant="contained" sx={{ ...layoutPrivateStyle.buttonSubmit, width: "100%" }} onClick={handleSubmit}>
              Submit
            </Button>
            <MessageModal
              open={openModal}
              onClose={closeModal}
              onConfirm={handleModalConfirm}
              message={modalMessage}
              redirectTo={redirectTo}
            />
          </Grid>
          <Grid size={2}>
            <Button type="submit" variant="contained" sx={{ ...layoutPrivateStyle.buttonCancel, width: "100%" }} onClick={clickCancel}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Stack>
  );
}
