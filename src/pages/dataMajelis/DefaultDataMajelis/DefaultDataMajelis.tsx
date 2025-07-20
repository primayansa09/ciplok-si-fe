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
import { DataMajelis } from "../../../store/dataMajelis/type";
import ConfirmDeleteModal from "../../../components/Modal/ConfirmationModal";
import HeaderSection from "../../../components/commponentHeader/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import { format } from "date-fns";
import { fetchDataMajelis } from "../../../store/dataMajelis/slice";
import ConfirmDownloadModal from "../../../components/Modal/ConfirmModalDownload";
import ConfirmationModal from "../../../components/Modal/ConfirmationModal";

export function DefaultDataMajelis() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error, pageNumber, pageSize, totalPages, totalData } = useSelector(
    (state: RootState) => state.dataMajelis
  );

  const [open, setOpen] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [filteredData, setFilteredData] = useState<DataMajelis[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);
  const [page, setPage] = useState(pageNumber > 0 ? pageNumber - 1 : 0);

  useEffect(() => {
    dispatch(
      fetchDataMajelis({
        pageNumber: page + 1,
        pageSize: rowsPerPage,
        searchTerm: searchData,
      })
    );
  }, [dispatch, page, rowsPerPage, searchData]);

  useEffect(() => {
    if (data) {
      const filtered = data.filter((item) =>
        item.codePnt?.toLowerCase().includes(searchData.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [data, searchData]);

  useEffect(() => {
    setPage(pageNumber - 1); // karena redux pakai 1-based, MUI pakai 0-based
  }, [pageNumber]);
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

  const handleManageMajalis = () => {
    navigate("/manage-majelis", { replace: true });
  };

  const clickEditData = (item: DataMajelis) => {

    console.log(item)
    navigate("/manage-majelis", {
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Stack sx={layoutPrivateStyle.fixHeader}>
      <HeaderSection />
      <InputLabel
        sx={{ ...layoutPrivateStyle.manageTitleHeader, marginTop: 5 }}
      >
        Master Data Majelis
      </InputLabel>
      <Paper style={{ padding: 16 }}>
        <Grid container spacing={2} alignItems={"center"}>
          <Grid size={8.8}>
            <Button
              variant="contained"
              sx={layoutPrivateStyle.buttonAdd}
              onClick={handleManageMajalis}
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
              Search :
            </InputLabel>
          </Grid>
          <Grid size={2}>
            <TextField
              id="standard-basic"
              variant="standard"
              fullWidth
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
              sx={{ marginBottom: "15px" }}
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
                {[
                  "Code Penatua",
                  "Nama Penatua",
                  "Jabatan",
                  "No WhatsApp",
                  "Awal Periode",
                  "Akhir Periode",
                  "Aksi",
                ].map((label) => (
                  <TableCell
                    key={label}
                    sx={{
                      ...layoutPrivateStyle.manageTableCell,
                      color: "white",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody sx={{ border: 1 }}>
              {data.length > 0 ? (
                data.map((ex) => (
                  <TableRow
                    key={ex.codePnt}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell sx={layoutPrivateStyle.manageTableCell}>
                      {ex.codePnt}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...layoutPrivateStyle.manageTableCell,
                        textAlign: "center",
                      }}
                    >
                      {ex.fullName}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...layoutPrivateStyle.manageTableCell,
                        textAlign: "center",
                      }}
                    >
                      {ex.jabatanPenatua}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...layoutPrivateStyle.manageTableCell,
                        textAlign: "center",
                      }}
                    >
                      {ex.phoneNo}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...layoutPrivateStyle.manageTableCell,
                        textAlign: "center",
                      }}
                    >
                      {ex.startDate
                        ? format(new Date(ex.startDate), "dd-MMMM-yyyy")
                        : "N/A"}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...layoutPrivateStyle.manageTableCell,
                        textAlign: "center",
                      }}
                    >
                      {ex.endDate
                        ? format(new Date(ex.endDate), "dd-MMMM-yyyy")
                        : "N/A"}
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
                          onClick={() => clickEditData(ex)}
                          sx={{
                            ...layoutPrivateStyle.manageTitleAction,
                            cursor: "pointer",
                            marginBottom: "5px",
                          }}
                        >
                          <EditIcon />
                        </InputLabel>
                        <InputLabel
                          onClick={() => setOpen(true)}
                          sx={{
                            ...layoutPrivateStyle.manageTitleAction,
                            cursor: "pointer",
                          }}
                        >
                          <DeleteIcon />
                        </InputLabel>
                        <ConfirmationModal
                          open={open}
                          onClose={() => setOpen(false)}
                          onConfirm={handleDelete}
                          message=""
                          // buttonText="ok"
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow sx={layoutPrivateStyle.manageTableRow}>
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
            count={totalData}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 25, 50]}
            labelRowsPerPage="Menampilkan"
          />
        </Box>
      </Paper>
    </Stack>
  );
}
