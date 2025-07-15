import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  Stack,
  TextField,
  InputLabel,
  Paper,
  MenuItem,
  Select,
  IconButton,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import { layoutPrivateStyle } from "../../../style/layout/private-route";
import HeaderSection from "../../../components/commponentHeader/Header";
import { DataInsert } from "../../../store/dataJemaat/type";
import { fetchAnggotaKomisi } from "../../../api/getDataSettings";
import { DataSettings } from "../../../store/dataSettings/type";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { createDataJemaat, updateDataJemaat } from "../../../api/dataJemaat";
import MessageModal from "../../../components/Modal/MessageModal";

export function ManageJemaat() {
  const navigate = useNavigate();
  const [anggotaKomisi, setAnggotaKomisi] = useState<DataSettings[]>([]);
  const location = useLocation();
  const { itemData, mode, IsEdit } = location.state || {};
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [redirectTo, setRedirectTo] = useState("");
  const [formDataJemaat, setFormDataJemaat] = useState<DataInsert>({
    userID: 0,
    email: "",
    anggotaKomisi: "",
    password: "",
    phoneNo: "",
    fullName: "",
    address: "",
    alternatePhoneNo: "",
  });

  const [errors, setErrors] = useState({
    namaPenatua: false,
    alamatPenatua: false,
    noTelepon: false,
    noWhatsApp: false,
  });

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);

  // Fetch anggota komisi data
  useEffect(() => {
    const fetchData = async () => {
      const anggotaKomisiList = await fetchAnggotaKomisi("KCODE");
      setAnggotaKomisi(anggotaKomisiList);
    };
    fetchData();
  }, []);

  // Initialize form data when in Edit mode
  useEffect(() => {
    if (IsEdit && itemData) {
      setFormDataJemaat(itemData);
    }
  }, [IsEdit, itemData]);

  // Handle form submission (create or update)
  const handleSubmit = async () => {
    try {
      let response;
      if (formDataJemaat.userID == 0) {
        response = await createDataJemaat(formDataJemaat);
        if (response.statusCode === 200) {
          setFormDataJemaat({
            userID: 0,
            email: "",
            anggotaKomisi: "",
            password: "",
            phoneNo: "",
            fullName: "",
            address: "",
            alternatePhoneNo: "",
          });
          setModalMessage(response.message || "Data created successfully!");
          setRedirectTo("/master-data/data-jemaat");
          setOpenModal(true);
        }
      } else {
        response = await updateDataJemaat(formDataJemaat.userID, formDataJemaat);
        if (response.statusCode === 200) {
          setFormDataJemaat({
            userID: 0,
            email: "",
            anggotaKomisi: "",
            password: "",
            phoneNo: "",
            fullName: "",
            address: "",
            alternatePhoneNo: "",
          });
          setModalMessage(response.message || "Data updated successfully!");
          setRedirectTo("/master-data/data-jemaat");
          setOpenModal(true);
        }
      }
    } catch (error) {
      setModalMessage("An error occurred while submitting the form.");
      setOpenModal(true);
    }
  };

  // Handle password visibility toggle
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataJemaat({
      ...formDataJemaat,
      password: e.target.value,
    });
  };
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent default behavior for mouse down
  };

  // Modal close handler
  const closeModal = () => {
    setOpenModal(false);
  };

  // Modal confirm handler (redirect after confirmation)
  const handleModalConfirm = () => {
    setOpenModal(false);
    navigate(redirectTo, { replace: true });
  };

  // Cancel operation
  const clickCancel = () => {
    navigate("/master-data/data-jemaat", { replace: true });
  };

  return (
    <Stack sx={layoutPrivateStyle.fixHeader}>
      <HeaderSection />
      <InputLabel sx={{ ...layoutPrivateStyle.manageTitleHeader, marginTop: 5 }}>
        Master Data Jemaat
      </InputLabel>
      <Paper style={{ padding: 16 }}>
        <Grid container spacing={2} alignItems={"center"} marginTop={5}>
          <Grid size={2.2}>
            <InputLabel sx={{ ...layoutPrivateStyle.manageSubTitle, marginLeft: "15px" }}>
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
            <InputLabel sx={{ ...layoutPrivateStyle.manageSubTitle, marginLeft: "15px" }}>
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
            <InputLabel sx={{ ...layoutPrivateStyle.manageSubTitle, marginLeft: "15px" }}>
              Password <span style={{ color: "red" }}>*</span>
            </InputLabel>
          </Grid>
          <Grid size={4}>
            <TextField
              id="outlined-password-input"
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={formDataJemaat.password}
              onChange={handlePasswordChange}
              sx={{ width: "250px" }}
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title={showPassword ? "Hide password" : "Show password"}>
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems={"center"} marginTop={2}>
          <Grid size={2.2}>
            <InputLabel sx={{ ...layoutPrivateStyle.manageSubTitle, marginLeft: "15px" }}>
              Anggota Komisi <span style={{ color: "red" }}>*</span>
            </InputLabel>
          </Grid>
          <Grid size={4}>
            <Select
              labelId="jabatanPenatua-label"
              sx={{ width: "250px" }}
              id="jabatanPenatua"
              value={formDataJemaat.anggotaKomisi}
              onChange={(e) =>
                setFormDataJemaat({
                  ...formDataJemaat,
                  anggotaKomisi: e.target.value,
                })
              }
            >
              {anggotaKomisi.map((anggotaData, index) => (
                <MenuItem key={index} value={anggotaData.descriptionSettings}>
                  {anggotaData.descriptionSettings}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems={"center"} marginTop={2}>
          <Grid size={2.2}>
            <InputLabel sx={{ ...layoutPrivateStyle.manageSubTitle, marginLeft: "15px" }}>
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
            <InputLabel sx={{ ...layoutPrivateStyle.manageSubTitle, marginLeft: "15px" }}>
              No WhatsApp <span style={{ color: "red" }}>*</span>
            </InputLabel>
          </Grid>
          <Grid size={4}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              sx={{ width: "250px" }}
              size="small"
              value={formDataJemaat.phoneNo}
              onChange={(e) =>
                setFormDataJemaat({
                  ...formDataJemaat,
                  phoneNo: e.target.value,
                })
              }
              error={errors.noWhatsApp}
              helperText={errors.noWhatsApp ? "No WhatsApp Wajib diidi" : ""}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2.2} alignItems={"center"} marginTop={2}>
          <Grid size={2.2}>
            <InputLabel sx={{ ...layoutPrivateStyle.manageSubTitle, marginLeft: "15px" }}>
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
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} justifyContent={"flex-end"} alignItems={"center"} marginTop={2}>
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
