import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputLabel,
  TablePagination,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { layoutPrivateStyle } from "../../../style/layout/private-route";
import { Data } from "../../../store/dataJemaat/type";
import HeaderSection from "../../../components/commponentHeader/Header";
import { fetchDataJemaat } from "../../../api/dataJemaat";
import ConfirmationModal from "../../../components/Modal/ConfirmationModal";

export function DefaultDataJemaat() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [dataBind, setDataBind] = useState<Data[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchData, setSearchData] = useState("");
  const [totalData, setTotalData] = useState(0);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleManageJemaat = () => {
    navigate("/manage-jemaat", { replace: true });
  };

  const clickEditData = (item: Data) => {
    navigate("/manage-jemaat", {
      state: {
        itemData: item,
        mode: "Edit",
        IsEdit: true,
      },
    });
  };

  const handleDelete = () => {
    console.log("Data dihapus!");
    setOpen(false);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchDataJemaat(page, rowsPerPage);
        if (response.statusCode === 200) {
          setDataBind(response.data);
          setTotalData(response.totalData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    loadData();
  }, [page, rowsPerPage]);

  return (
    <Stack sx={layoutPrivateStyle.fixHeader}>
      <HeaderSection />
      <InputLabel
        sx={{ ...layoutPrivateStyle.manageTitleHeader, marginTop: 5 }}
      >
        Master Data Jemaat
      </InputLabel>
      <Paper style={{ padding: 16 }}>
        <Grid container spacing={2} alignItems={"center"}>
          <Grid size={9}>
            <Button
              variant="contained"
              sx={layoutPrivateStyle.buttonAdd}
              onClick={handleManageJemaat}
            >
              Tambah Data
            </Button>
          </Grid>
          <Grid size={1}>
            <InputLabel
              sx={{
                ...layoutPrivateStyle.manageSubTitle,
                fontWeight: "bold",
                marginLeft: "15px",
              }}
            >
              Search:
            </InputLabel>
          </Grid>
          <Grid size={2}>
            <TextField
              id="standard-basic"
              label=""
              variant="standard"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
              fullWidth
              sx={{ marginBottom: "15px" }}
              disabled // disable karena belum implementasi search ke backend
            />
          </Grid>
        </Grid>
        <TableContainer
          sx={layoutPrivateStyle.manageTableContainer}
          style={{ marginTop: 10, backgroundColor: "#FFFFFF" }}
        >
          <Table sx={{ minWidth: 720 }} size="small" aria-label="a dense table">
            <TableHead sx={layoutPrivateStyle.moduleTableHead}>
              <TableRow sx={layoutPrivateStyle.manageTableRow}>
                <TableCell sx={{ ...layoutPrivateStyle.manageTableCell, color: "white", fontWeight: "bold", textAlign: "center" }}>
                  Nama Lengkap
                </TableCell>
                <TableCell sx={{ ...layoutPrivateStyle.manageTableCell, color: "white", fontWeight: "bold", textAlign: "center" }}>
                  No WhatsApp
                </TableCell>
                <TableCell sx={{ ...layoutPrivateStyle.manageTableCell, color: "white", fontWeight: "bold", textAlign: "center" }}>
                  Alamat
                </TableCell>
                <TableCell sx={{ ...layoutPrivateStyle.manageTableCell, color: "white", fontWeight: "bold", textAlign: "center" }}>
                  Anggota Komisi
                </TableCell>
                <TableCell sx={{ ...layoutPrivateStyle.manageTableCell, color: "white", fontWeight: "bold", textAlign: "center" }}>
                  Aksi
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ border: 1 }}>
              {dataBind.length > 0 ? (
                dataBind.map((ex: Data) => (
                  <TableRow key={ex.userID}>
                    <TableCell sx={layoutPrivateStyle.manageTableCell}>
                      {ex.fullName}
                    </TableCell>
                    <TableCell sx={{ ...layoutPrivateStyle.manageTableCell, textAlign: "center" }}>
                      {ex.phoneNo}
                    </TableCell>
                    <TableCell sx={{ ...layoutPrivateStyle.manageTableCell, textAlign: "center" }}>
                      {ex.address}
                    </TableCell>
                    <TableCell sx={{ ...layoutPrivateStyle.manageTableCell, textAlign: "center" }}>
                      {ex.anggotaKomisi}
                    </TableCell>
                    <TableCell sx={{ ...layoutPrivateStyle.manageTableCell, textAlign: "center" }}>
                      <Box display="flex" flexDirection="row" justifyContent="center" gap={1}>
                        <InputLabel
                          onClick={() => clickEditData(ex)}
                          sx={{ ...layoutPrivateStyle.manageTitleAction, cursor: "pointer", marginBottom: "5px" }}
                        >
                          <EditIcon />
                        </InputLabel>
                        <InputLabel
                          onClick={() => setOpen(true)}
                          sx={{ ...layoutPrivateStyle.manageTitleAction, cursor: "pointer" }}
                        >
                          <DeleteIcon />
                        </InputLabel>
                        <ConfirmationModal
                          open={open}
                          onClose={() => setOpen(false)}
                          onConfirm={handleDelete}
                          message=""
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No Data Available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="flex-start" mt={2}>
          <TablePagination
            component="div"
            count={totalData}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
            labelRowsPerPage="Showing"
          />
        </Box>
      </Paper>
    </Stack>
  );
}
