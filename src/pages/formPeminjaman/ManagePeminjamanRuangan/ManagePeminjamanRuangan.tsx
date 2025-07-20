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
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import HeaderSection from "../../../components/commponentHeader/Header";
import { fetchAnggotaKomisi } from "../../../api/getDataSettings";
import { DataSettings } from "../../../store/dataSettings/type";
import { Criteria, DataInsert, DataMJ, DetailData } from "../../../store/formPeminjaman/type";
import { createFormRequest, fetchDataCriteriaRequest, fetchDataMajelis, updateFromRequest } from "../../../api/dataRequestForm";
import MessageModal from "../../../components/Modal/MessageModal";

export function ManagePeminjamanRuangan() {
  const navigate = useNavigate();
  const [majelisData, setMajelisData] = useState<DataMJ[]>([]);
  const [ruangan, setRuangan] = useState<DataSettings[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [redirectTo, setRedirectTo] = useState("");
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

  const [formPeminjaman, setFormPeminjaman] = useState<DataInsert>({
    transactionID: 0,
    status: "",
    startTime: "",
    roomName: "",
    reservationDate: new Date(),
    createdDate: new Date(),
    createdBy: "",
    description: "",
    mjRequest: "",
    mjMengetahui: "",
    subCriteriaList: []
  });

  const [criteriaData, setCriteriaData] = useState<Criteria[]>([]);

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



  useEffect(() => {
    const fetchData = async () => {
      const ruanganResponse = await fetchAnggotaKomisi("RCODE");
      setRuangan(ruanganResponse);
    };
    fetchData();
    const fetchDataMJ = async () => {
      const response = await fetchDataMajelis(1,10,"dropdown");
      setMajelisData(response.data)
    }
    fetchDataMJ();
    const loadData = async () => {
      try {
        const response = await fetchDataCriteriaRequest();
        setCriteriaData(response)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (IsEdit && itemData && criteriaData!.length > 0) {
      console.log(itemData.subCriteriaList)
      console.log(criteriaData)
      const mappedSubCriteriaList: DetailData[] = itemData.subCriteriaList.map((existingSub: DetailData) => {
        const matchingCriteria = criteriaData.find(
          (criteria) => criteria.idHeaderCriteria === existingSub.criteriaID
        );
        if (!matchingCriteria) {
          return existingSub;

        }

        const selectedSub = matchingCriteria.subCriteriaList.find(
          (sub) => sub.idSubCriteria.toString() === existingSub.subCriteriaID.toString()
        );

        if (!selectedSub) {
          return existingSub;
        }
        return {
          bobot: matchingCriteria.bobot,
          parameter: matchingCriteria.parameter === "Maksimal" ? true : false,
          criteriaID: matchingCriteria.idHeaderCriteria,
          subCriteriaID: selectedSub.idSubCriteria.toString(),
          subCriteriaName: selectedSub.subCriteriaName,
          subCriteriaBobot: selectedSub.subCriteriaBobot,
        };
      });

      setFormPeminjaman({
        ...itemData,
        subCriteriaList: mappedSubCriteriaList,
      });


      if (itemData.createdDate) {
        setTanggalPengajuan(dayjs(itemData.createdDate));
      }

      if (itemData.reservationDate) {
        setTanggalPemakaian(dayjs(itemData.reservationDate));
      }
    }
  }, [IsEdit, itemData, criteriaData]);



  useEffect(() => {

  }, [criteriaData])

  useEffect(() => { }, [formPeminjaman])
  const clickCancel = () => {
    navigate("/pinjam-ruangan/form-peminjaman", { replace: true });
  };

  const handleTanggalPemakaian = (newValue: Dayjs | null) => {
    setTanggalPemakaian(newValue);
    setFormPeminjaman({
      ...formPeminjaman,
      reservationDate: newValue!.toDate(),
    });
  };


  const handleSubCriteriaChange = (
    criteria: Criteria,
    selectedSubCriteriaID: number
  ) => {
    const selectedSubData = criteria.subCriteriaList.find(
      (s) => s.idSubCriteria === selectedSubCriteriaID
    );

    if (!selectedSubData) return;

    const newDetail = {
      idTrDetail: selectedSubData.idTrDetail,
      criteriaName: criteria.criteriaName,
      criteriaCode: criteria.criteriaCode,
      bobot: criteria.bobot,
      criteriaID: criteria.idHeaderCriteria,
      subCriteriaID: selectedSubData.idSubCriteria.toString(),
      subCriteriaName: selectedSubData.subCriteriaName,
      subCriteriaBobot: selectedSubData.subCriteriaBobot,
      parameter: criteria.parameter === "Maksimal",
    };

    const updated = [...formPeminjaman.subCriteriaList];
    const existingIndex = updated.findIndex(
      (item) => item.criteriaID === criteria.idHeaderCriteria
    );

    if (existingIndex !== -1) {
      updated[existingIndex] = newDetail;
    } else {
      updated.push(newDetail);
    }

    setFormPeminjaman((prev) => ({
      ...prev,
      subCriteriaList: updated,
    }));
  };

  const handleSubmit = async () => {

    try {
      let response;
      console.log(formPeminjaman)
      if (formPeminjaman.transactionID === 0 || formPeminjaman.transactionID === null) {
        response = await createFormRequest(formPeminjaman);
        if (response.statusCode === 200) {
          setFormPeminjaman({
            transactionID: 0,
            status: "",
            startTime: "",
            roomName: "",
            reservationDate: new Date(),
            createdDate: new Date(),
            createdBy: "",
            description: "",
            mjRequest: "",
            mjMengetahui: "",
            subCriteriaList: []
          });
          setModalMessage(response.message || "Data created successfully!");
          setRedirectTo("/pinjam-ruangan/form-peminjaman");
          setOpenModal(true);
        }
      } else {
        response = await updateFromRequest(formPeminjaman.transactionID, formPeminjaman);
        if (response.statusCode === 200) {
          setFormPeminjaman({
            transactionID: 0,
            status: "",
            startTime: "",
            roomName: "",
            reservationDate: new Date(),
            createdDate: new Date(),
            createdBy: "",
            description: "",
            mjRequest: "",
            mjMengetahui: "",
            subCriteriaList: []
          });
          setModalMessage(response.message || "Data updated successfully!");
          setRedirectTo("/pinjam-ruangan/form-peminjaman");
          setOpenModal(true);
        }
      }
    } catch (ex) {
      setModalMessage("An error occurred while submitting the form.");
      setOpenModal(true);
    }
  }

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
                  format="DD-MMMM-YYYY"
                  slotProps={{
                    textField: {
                      disabled: mode === 'View',
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
                  ampm={false} // ✅ 24-hour format
                  label=""
                  minutesStep={60} // ✅ hanya tampil tiap 60 menit (1 jam)
                  value={
                    formPeminjaman.startTime
                      ? dayjs(formPeminjaman.startTime, "HH:mm")
                      : null
                  }
                  onChange={(value) => {
                    if (value) {
                      const onlyHour = value.hour();
                      const formatted = dayjs().hour(onlyHour).minute(0).format("HH:mm"); // force menit ke 00
                      setFormPeminjaman((prev) => ({
                        ...prev,
                        startTime: formatted, // ex: "13:00"
                      }));
                    }
                  }}
                  slotProps={{
                    textField: {
                      size: "small",
                      fullWidth: true,
                      disabled: mode === 'View',
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
              disabled={mode === "View"}
              value={formPeminjaman.roomName}
              onChange={(e) =>
                setFormPeminjaman({
                  ...formPeminjaman,
                  roomName: e.target.value,
                })
              }

            >
              {ruangan.map((data, index) => (
                <MenuItem key={index} value={data.descriptionSettings}>
                  {data.descriptionSettings}
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
              value={formPeminjaman.mjRequest}
              onChange={(e) =>
                setFormPeminjaman({
                  ...formPeminjaman,
                  mjRequest: e.target.value,
                })
              }
              disabled={mode === "View"}
            >
              {majelisData.map((data, index) => (
                <MenuItem key={data.userID} value={data.fullName}>
                  {data.fullName}
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
                value={formPeminjaman.status}
                onChange={(e) =>
                  setFormPeminjaman({
                    ...formPeminjaman,
                    status: e.target.value,
                  })
                }
                disabled
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    value={tanggalPengajuan}
                    // onChange={handleTanggalPemakaian}
                    format="DD-MMMM-YYYY"
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
                    disabled
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          </Grid>
        )}
        {/* {IsEdit && (<Grid container spacing={1} alignItems={"center"} marginTop={2}>
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
        </Grid>)
        } */}


        < Grid container spacing={2} alignItems={"center"} marginTop={2}>
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
              // value={formPeminjaman.description}
              fullWidth
              multiline
              rows={10}
              disabled={mode === 'View'}
              error={errors.deskripsi}
              helperText={errors.deskripsi ? "Deskripsi Wajib diisi" : ""}
              InputProps={{
                sx: {
                  height: 200,
                  padding: "0 8px",
                  alignItems: "flex-start",
                },
              }}
              value={formPeminjaman.description}
              onChange={(e) =>
                setFormPeminjaman({
                  ...formPeminjaman,
                  description: e.target.value,
                })
              }
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
              {criteriaData?.map((criteria, index) => (
                <TableRow key={index}>
                  <TableCell sx={layoutPrivateStyle.manageTableCell}>
                    <TextField
                      id={`criteria-${index}`}
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={criteria.criteriaName}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ ...layoutPrivateStyle.manageTableCell, textAlign: "center" }}>
                    <Select
                      value={
                        formPeminjaman.subCriteriaList.find(
                          (item) => item.criteriaID === criteria.idHeaderCriteria
                        )?.subCriteriaID ?? ""
                      }
                      size="small"
                      onChange={(e) => handleSubCriteriaChange(criteria, Number(e.target.value))}
                      displayEmpty
                      style={{ width: "100%" }}
                      disabled={mode === "View"}
                    >
                      <MenuItem disabled value="">
                        Pilih Sub Kriteria
                      </MenuItem>

                      {criteria.subCriteriaList.map((sub) => (
                        <MenuItem key={sub.idSubCriteria} value={sub.idSubCriteria}>
                          {sub.subCriteriaName}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
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
          {mode !== "View" ? (
            <>
              <Grid size={2}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ ...layoutPrivateStyle.buttonSubmit, width: "100%" }}
                  onClick={handleSubmit}
                >
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
                <Button
                  type="button"
                  variant="contained"
                  sx={{ ...layoutPrivateStyle.buttonCancel, width: "100%" }}
                  onClick={clickCancel}
                >
                  Cancel
                </Button>
              </Grid>
            </>
          ) : (
            <Grid size={2}>
              <Button
                type="button"
                variant="contained"
                sx={{ ...layoutPrivateStyle.buttonCancel, width: "100%" }}
                onClick={clickCancel}
              >
                Cancel
              </Button>
            </Grid>
          )}



        </Grid>
      </Paper>
    </Stack >
  );
}
