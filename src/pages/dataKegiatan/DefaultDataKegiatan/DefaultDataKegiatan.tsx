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
import { Data, DataFilter } from "../../../store/dataKegiatan/type";
import ConfirmDeleteModal from "../../../components/Modal/ConfirmModalDelete";
import HeaderSection from "../../../components/commponentHeader/Header";

export function DefaultDataKegiatan() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const dataDummyKegiatan = [
    {
      namaKegiatan:
        "Latihan ibadah KU Latihan ibadah KP Latihan ibadah KR Latihan regen gitar Latihan regen band Latihan regen vokal Latihan angeloudi Rapat GR jumat agung",
      deskripsiKegiatan:
        "Latihan musik untuk ibadah KU Latihan musik untuk ibadah KP Latihan musik untuk ibadah KR Latihan regen gitar dengan om Juanda Latihan regen band dengan kak Jeska Latihan regen vokal dengan kak Hein Latihan angeloudi dengan kak Julia Rapat panitia Persiapan untuk kebaktian Jumat Agung di Gereja",
      scoreKegiatan: "1",
    },
    {
      namaKegiatan:
        "Latihan ibadah KU Latihan ibadah KP Latihan ibadah KR Latihan regen gitar Latihan regen band Latihan regen vokal Latihan angeloudi Rapat GR jumat agung",
      deskripsiKegiatan:
        "Latihan musik untuk ibadah KU Latihan musik untuk ibadah KP Latihan musik untuk ibadah KR Latihan regen gitar dengan om Juanda Latihan regen band dengan kak Jeska Latihan regen vokal dengan kak Hein Latihan angeloudi dengan kak Julia Rapat panitia Persiapan untuk kebaktian Jumat Agung di Gereja",
      scoreKegiatan: "2",
    },
    {
      namaKegiatan:
        "Latihan ibadah KU Latihan ibadah KP Latihan ibadah KR Latihan regen gitar Latihan regen band Latihan regen vokal Latihan angeloudi Rapat GR jumat agung",
      deskripsiKegiatan:
        "Latihan musik untuk ibadah KU Latihan musik untuk ibadah KP Latihan musik untuk ibadah KR Latihan regen gitar dengan om Juanda Latihan regen band dengan kak Jeska Latihan regen vokal dengan kak Hein Latihan angeloudi dengan kak Julia Rapat panitia Persiapan untuk kebaktian Jumat Agung di Gereja",
      scoreKegiatan: "3",
    },
  ];

  const [dataBind, setDataBind] = useState({ data: dataDummyKegiatan });
  const [page, setPage] = useState(2);
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

  const handleManageKegiatan = () => {
    navigate("/manage-kegiatan", { replace: true });
  };

  const clickEditData = (item: Data) => {
    navigate("/manage-kegiatan", {
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

  const truncateText = (text: string, maxLength: number = 200) => {
    if (!text) return "-";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  useEffect(() => {
      const filtered = dataBind.data.filter((item: any) =>
        item.namaKegiatan?.toLowerCase().includes(searchData.toLowerCase())
      );
      setFilteredData(filtered);
    }, [searchData, dataBind.data]);
  

  return (
    <Stack sx={layoutPrivateStyle.fixHeader}>
      <HeaderSection />
      <InputLabel
        sx={{ ...layoutPrivateStyle.manageTitleHeader, marginTop: 5 }}
      >
        Master Data Kegiatan
      </InputLabel>
      <Paper style={{ padding: 16 }}>
        <Grid container spacing={2} alignItems={"center"}>
          <Grid size={8.8}>
            <Button
              variant="contained"
              sx={layoutPrivateStyle.buttonAdd}
              onClick={handleManageKegiatan}
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
                  Nama Kegiatan
                </TableCell>
                <TableCell
                  sx={{
                    ...layoutPrivateStyle.manageTableCell,
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Deskripsi Kegiatan
                </TableCell>
                <TableCell
                  sx={{
                    ...layoutPrivateStyle.manageTableCell,
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Score Kegiatan
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
                  // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                        {truncateText(ex.namaKegiatan, 18)}
                      </TableCell>
                      <TableCell
                        sx={{
                          ...layoutPrivateStyle.manageTableCell,
                          textAlign: "center",
                        }}
                      >
                        {truncateText(ex.deskripsiKegiatan, 60)}
                      </TableCell>
                      <TableCell
                        sx={{
                          ...layoutPrivateStyle.manageTableCell,
                          textAlign: "center",
                        }}
                      >
                        {ex.scoreKegiatan}
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
