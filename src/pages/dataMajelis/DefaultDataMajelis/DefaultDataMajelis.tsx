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
import { Data, DataFilter } from "../../../store/dataMajelis/type";
import ConfirmDeleteModal from "../../../components/Modal/ConfirmModalDelete";
import HeaderSection from "../../../components/commponentHeader/Header";

export function DefaultDataMajelis() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const dataDummyMajelis = [
    {
      codePenatua: "PNT001",
      namaPenatua: "Wanda Primayansa",
      jabatan: "Ketua",
      alamatPenatua: "Jakarta",
      noWhatsapp: "081234567890",
      periodeAwal: "01 Jan 2023",
      periodeAkhir: "31 Des 2025",
    },
    {
      codePenatua: "PNT002",
      namaPenatua: "Sinta Dewi",
      jabatan: "Wakil Ketua",
      alamatPenatua: "Jakarta",
      noWhatsapp: "082345678901",
      periodeAwal: "01 Jan 2023",
      periodeAkhir: "31 Des 2025",
    },
    {
      codePenatua: "PNT003",
      namaPenatua: "Budi Santoso",
      jabatan: "Wakil Ketua",
      alamatPenatua: "Jakarta",
      noWhatsapp: "083456789012",
      periodeAwal: "01 Jan 2023",
      periodeAkhir: "31 Des 2025",
    },
    {
      codePenatua: "PNT004",
      namaPenatua: "Rina Marlina",
      jabatan: "Bendahara",
      alamatPenatua: "Jakarta",
      noWhatsapp: "084567890123",
      periodeAwal: "01 Jan 2023",
      periodeAkhir: "31 Des 2025",
    },
  ];

  const [dataBind, setDataBind] = useState({
    data: dataDummyMajelis,
  });
  const [searchData, setSearchData] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>(dataBind.data);

  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  const clickEditData = (item: Data) => {
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

  useEffect(() => {
  const filtered = dataBind.data.filter((item: any) =>
    item.codePenatua?.toLowerCase().includes(searchData.toLowerCase())
  );
  setFilteredData(filtered);
}, [searchData, dataBind.data]);

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
              label=""
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
                <TableCell
                  sx={{
                    ...layoutPrivateStyle.manageTableCell,
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Code Panatua
                </TableCell>
                <TableCell
                  sx={{
                    ...layoutPrivateStyle.manageTableCell,
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Nama Panatua
                </TableCell>
                <TableCell
                  sx={{
                    ...layoutPrivateStyle.manageTableCell,
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Jabatan
                </TableCell>
                <TableCell
                  sx={{
                    ...layoutPrivateStyle.manageTableCell,
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  No WhatsApp
                </TableCell>
                <TableCell
                  sx={{
                    ...layoutPrivateStyle.manageTableCell,
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Awal Periode
                </TableCell>
                <TableCell
                  sx={{
                    ...layoutPrivateStyle.manageTableCell,
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Akhir Periode
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
                filteredData.map((ex: any, index) => (
                  <TableRow
                    key={ex.codePenatua}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell sx={layoutPrivateStyle.manageTableCell}>
                      {ex.codePenatua}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...layoutPrivateStyle.manageTableCell,
                        textAlign: "center",
                      }}
                    >
                      {ex.namaPenatua}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...layoutPrivateStyle.manageTableCell,
                        textAlign: "center",
                      }}
                    >
                      {ex.jabatan}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...layoutPrivateStyle.manageTableCell,
                        textAlign: "center",
                      }}
                    >
                      {ex.noWhatsapp}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...layoutPrivateStyle.manageTableCell,
                        textAlign: "center",
                      }}
                    >
                      {ex.periodeAwal}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...layoutPrivateStyle.manageTableCell,
                        textAlign: "center",
                      }}
                    >
                      {ex.periodeAkhir}
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
            rowsPerPageOptions={[10, 25, 50]}
            labelRowsPerPage="Showing"
          />
        </Box>
      </Paper>
    </Stack>
  );
}
