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
import { layoutPrivateStyle } from "../../../style/layout/private-route";
import { Data, DataFilter } from "../../../store/formPeminjaman/type";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HeaderSection from "../../../components/commponentHeader/Header";
import { fetchRequestData } from "../../../api/dataRequestForm";

export function DefaultPeminjamanRuangan() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [dataBind, setDataBind] = useState<Data[]>([]);
  const [filteredData, setFilteredData] = useState<Data[]>([]);
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

  const handleManagePeminjam = () => {
    navigate("/manage-peminjaman-ruangan", { replace: true });
  };

  const clickViewData = (item: Data) => {
    navigate("/manage-peminjaman-ruangan", {
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
        const response = await fetchRequestData(page, rowsPerPage);
        if (response.statusCode === 200) {
          setDataBind(response.data);
          setFilteredData(response.data);
          setTotalData(response.totalData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    loadData();
  }, []);
  useEffect(() => {
    const filtered = dataBind.filter((item: Data) =>
      item.createdBy?.toLowerCase().includes(searchData.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchData, dataBind]);

  return (
    <Stack sx={layoutPrivateStyle.fixHeader}>
      <HeaderSection />
      <InputLabel
        sx={{ ...layoutPrivateStyle.manageTitleHeader, marginTop: 5 }}
      >
        Form Peminjaman
      </InputLabel>
      <Paper style={{ padding: 16 }}>
        <Grid container spacing={2} alignItems={"center"}>
          <Grid size={8.8}>
            <Button
              variant="contained"
              sx={layoutPrivateStyle.buttonAdd}
              onClick={handleManagePeminjam}
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
              label=""
              variant="standard"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
              fullWidth
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
                <TableCell
                  sx={{
                    ...layoutPrivateStyle.manageTableCell,
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Tanggal Pemakaian
                </TableCell>
                <TableCell
                  sx={{
                    ...layoutPrivateStyle.manageTableCell,
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Jam
                </TableCell>
                <TableCell
                  sx={{
                    ...layoutPrivateStyle.manageTableCell,
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Ruangan
                </TableCell>

                <TableCell
                  sx={{
                    ...layoutPrivateStyle.manageTableCell,
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Jemaat Peminjam
                </TableCell>
                <TableCell
                  sx={{
                    ...layoutPrivateStyle.manageTableCell,
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Tanggal Pengajuan
                </TableCell>
                <TableCell
                  sx={{
                    ...layoutPrivateStyle.manageTableCell,
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Status
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
              {dataBind.length > 0 ? (
                dataBind.map((ex: Data, index) => (
                  <TableRow
                    key={ex.transactionID}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell sx={layoutPrivateStyle.manageTableCell}>
                      {ex.reservationDateString}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...layoutPrivateStyle.manageTableCell,
                        textAlign: "center",
                      }}
                    >
                      {ex.startTime}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...layoutPrivateStyle.manageTableCell,
                        textAlign: "center",
                      }}
                    >
                      {ex.roomName}
                    </TableCell>

                    <TableCell
                      sx={{
                        ...layoutPrivateStyle.manageTableCell,
                        textAlign: "center",
                      }}
                    >
                      {ex.createdBy}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...layoutPrivateStyle.manageTableCell,
                        textAlign: "center",
                      }}
                    >
                      {ex.createdDate}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...layoutPrivateStyle.manageTableCell,
                        textAlign: "center",
                      }}
                    >
                      {ex.status === "Approve" ? (
                        <DoneIcon style={{ color: "green" }} />
                      ) : ex.status === "reject" ? (
                        <CloseIcon style={{ color: "red" }} />
                      ) : ex.status === "Pending" ? (
                        <PendingActionsIcon style={{ color: "red" }} />
                      ) : (
                        "-"
                      )}
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
                          onClick={() => clickViewData(ex)}
                          sx={{
                            ...layoutPrivateStyle.manageTitleAction,
                            cursor: "pointer",
                            marginBottom: "5px",
                          }}
                        >
                          <VisibilityIcon />
                        </InputLabel>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow sx={layoutPrivateStyle.manageTableRow}>
                  <TableCell colSpan={8} align="center">
                    No Data Available.
                    <div>Please Click Search Button</div>
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
            rowsPerPageOptions={[10, 25, 50]}
            labelRowsPerPage="Showing"
          />
        </Box>
      </Paper>
    </Stack>
  );
}
