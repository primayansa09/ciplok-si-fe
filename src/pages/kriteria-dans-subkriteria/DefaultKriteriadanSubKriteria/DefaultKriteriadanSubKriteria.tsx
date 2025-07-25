import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
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
import logo from "../../../assets/logo.png";
import { Data, DataFilter } from "../../../store/kriteriaSubKriteria/type";
import ConfirmDeleteModal from "../../../components/Modal/ConfirmModalDelete";
import HeaderSection from "../../../components/commponentHeader/Header";

export function DefaultKriteriadanSubKriteria() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const dataKriteria = [
  {
    id: 1,
    kodeKriteria: "K1",
    namaKriteria: "Jenis Kegiatan",
    detail: [
      { subKriteria: 8, bobot: 25 }
    ]
  },
  {
    id: 2,
    kodeKriteria: "K2",
    namaKriteria: "Durasi",
    detail: [
      { subKriteria: 5, bobot: 10 }
    ]
  },
  {
    id: 3,
    kodeKriteria: "K3",
    namaKriteria: "Status Rutin",
    detail: [
      { subKriteria: 2, bobot: 40 }
    ]
  },
  {
    id: 4,
    kodeKriteria: "K4",
    namaKriteria: "Peminjam",
    detail: [
      { subKriteria: 7, bobot: 25 }
    ]
  }
];


  const [dataBind, setDataBind] = useState({ data: dataKriteria });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchData, setSearchData] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>(dataBind.data);

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

  const handleManageKriteria = () => {
    navigate("/kriteria-sub-kriteria/manage-data", { replace: true });
  };

  const clickEditData = (item: Data) => {
    navigate("/kriteria-sub-kriteria/manage-data", {
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
    const filtered = dataBind.data.filter((item: any) =>
      item.kodeKriteria?.toLowerCase().includes(searchData.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchData, dataBind.data]);

  return (
    <Stack sx={layoutPrivateStyle.fixHeader}>
      <HeaderSection />
      <InputLabel
        sx={{ ...layoutPrivateStyle.manageTitleHeader, marginTop: 5 }}
      >
        Master Data Kriteria dan Sub Kriteria
      </InputLabel>
      <Paper style={{ padding: 16 }}>
        <Grid container spacing={2} alignItems={"center"}>
          <Grid size={8.8}>
            <Button
              variant="contained"
              sx={layoutPrivateStyle.buttonAdd}
              onClick={handleManageKriteria}
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
                  Kode Kriteria
                </TableCell>
                <TableCell
                  sx={{
                    ...layoutPrivateStyle.manageTableCell,
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Nama Kriteria
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
                  Sub Kriteria
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
              {filteredData.length > 0 ? (
                filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((ex: any) => (
                    <TableRow
                      key={ex.kodeKriteria}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell sx={layoutPrivateStyle.manageTableCell}>
                        {ex.kodeKriteria}
                      </TableCell>
                      <TableCell sx={layoutPrivateStyle.manageTableCell}>
                        {ex.namaKriteria}
                      </TableCell>
                      <TableCell
                        sx={{
                          ...layoutPrivateStyle.manageTableCell,
                          textAlign: "center",
                        }}
                      >
                        {ex.detail?.[0]?.bobot ?? '-'}
                      </TableCell>
                      <TableCell
                        sx={{
                          ...layoutPrivateStyle.manageTableCell,
                          textAlign: "center",
                        }}
                      >
                        {ex.detail?.[0]?.subKriteria ?? '-'}
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
                          <ConfirmDeleteModal
                            open={open}
                            onClose={() => setOpen(false)}
                            onConfirm={handleDelete}
                          />
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
            count={dataBind.data.length}
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
