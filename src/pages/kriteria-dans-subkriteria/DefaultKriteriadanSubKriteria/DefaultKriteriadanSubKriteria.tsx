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

  const dataDummyPeminjam = [
    {
      codePenatua: "PNT001",
      namaPenatua: "Wanda Primayansa",
      jabatan: "Ketua",
      alamatPenatua: "Jakarta",
      noWhatsApp: "081234567890",
      periodeAwal: "01 Jan 2023",
      periodeAkhir: "31 Des 2025",
      anggotaKomisi: "MJ",
    },
    {
      codePenatua: "PNT002",
      namaPenatua: "Sinta Dewi",
      jabatan: "Wakil Ketua",
      alamatPenatua: "Jakarta",
      noWhatsApp: "082345678901",
      periodeAwal: "01 Jan 2023",
      periodeAkhir: "31 Des 2025",
      anggotaKomisi: "Komisi Pemuda",
    },
    {
      codePenatua: "PNT003",
      namaPenatua: "Budi Santoso",
      jabatan: "Wakil Ketua",
      alamatPenatua: "Jakarta",
      noWhatsApp: "083456789012",
      periodeAwal: "01 Jan 2023",
      periodeAkhir: "31 Des 2025",
      anggotaKomisi: "Komisi Pemuda",
    },
    {
      codePenatua: "PNT004",
      namaPenatua: "Rina Marlina",
      jabatan: "Bendahara",
      alamatPenatua: "Jakarta",
      noWhatsApp: "084567890123",
      periodeAwal: "01 Jan 2023",
      periodeAkhir: "31 Des 2025",
      anggotaKomisi: "Panitia",
    },
    {
      codePenatua: "PNT004",
      namaPenatua: "Rina Marlina",
      jabatan: "Bendahara",
      alamatPenatua: "Jakarta",
      noWhatsApp: "084567890123",
      periodeAwal: "01 Jan 2023",
      periodeAkhir: "31 Des 2025",
      anggotaKomisi: "Panitia",
    },
    {
      codePenatua: "PNT004",
      namaPenatua: "Rina Marlina",
      jabatan: "Bendahara",
      alamatPenatua: "Jakarta",
      noWhatsApp: "084567890123",
      periodeAwal: "01 Jan 2023",
      periodeAkhir: "31 Des 2025",
      anggotaKomisi: "Panitia",
    },
  ];

  const [dataBind, setDataBind] = useState({ data: dataDummyPeminjam });
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
      item.namaPenatua?.toLowerCase().includes(searchData.toLowerCase())
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
                  .map((ex: any, index) => (
                    <TableRow
                      key={ex.codePenatua}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell sx={layoutPrivateStyle.manageTableCell}>
                        {ex.namaPenatua}
                      </TableCell>
                      <TableCell
                        sx={{
                          ...layoutPrivateStyle.manageTableCell,
                          textAlign: "center",
                        }}
                      >
                        {ex.noWhatsApp}
                      </TableCell>
                      <TableCell
                        sx={{
                          ...layoutPrivateStyle.manageTableCell,
                          textAlign: "center",
                        }}
                      >
                        {ex.alamatPenatua}
                      </TableCell>
                      <TableCell
                        sx={{
                          ...layoutPrivateStyle.manageTableCell,
                          textAlign: "center",
                        }}
                      >
                        {ex.anggotaKomisi}
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
