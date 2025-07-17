import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  Stack,
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
import { Data } from "../../../store/dashboard/type";
import HeaderSection from "../../../components/commponentHeader/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import { format } from "date-fns";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import * as XLSX from "xlsx";
import ConfirmDownloadModal from "../../../components/ConfirmModalDownload";

export function DefaultDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  //   const {data, loading, error, pageNumber, pageSize, totalPages, totalData } = useSelector(
  //     (state: RootState) => state.
  // );

  const dataDummyDashboard = [
    {
      id: "1",
      tanggal: "12 Jul 2025",
      jam: "10.00",
      ruangan: "Gedung Gereja",
      jenisKegiatan: "Latihan ibadah KU",
      durasi: "2 jam",
      jumlahOrang: 5,
      peminjam: "MJ",
      mjMengetahui: "Pdt Diana Bachri",
      jemaatPeminjam: "Hein",
    },
    {
      id: "2",
      tanggal: "16 Jul 2025",
      jam: "10.00",
      ruangan: "Ruang Musik F11",
      jenisKegiatan: "Latihan ibadah KP",
      durasi: "3 jam",
      jumlahOrang: 7,
      peminjam: "Komisi Pemuda",
      mjMengetahui: "Erin Mutiara N",
      jemaatPeminjam: "Wening",
    },
    {
      id: "3",
      tanggal: "7/16/2025",
      jam: "10.00",
      ruangan: "F9",
      jenisKegiatan: "Latihan ibadah KR",
      durasi: "3 jam",
      jumlahOrang: 9,
      peminjam: "Komisi Remaja",
      mjMengetahui: "Jusak Fajar H",
      jemaatPeminjam: "Zaki",
    },
    {
      id: "4",
      tanggal: "7/17/2025",
      jam: "16.00",
      ruangan: "Konsis F9",
      jenisKegiatan: "Latihan regen gitar",
      durasi: "1 jam",
      jumlahOrang: 4,
      peminjam: "Komisi Remaja",
      mjMengetahui: "Jusak Fajar H",
      jemaatPeminjam: "Jemima",
    },
    {
      id: "5",
      tanggal: "7/17/2025",
      jam: "16.00",
      ruangan: "F11",
      jenisKegiatan: "Latihan regen band",
      durasi: "1 jam",
      jumlahOrang: 5,
      peminjam: "Komisi Remaja",
      mjMengetahui: "Jusak Fajar H",
      jemaatPeminjam: "Jeska",
    },
    {
      id: "6",
      tanggal: "7/15/2025",
      jam: "16.00",
      ruangan: "Gedung Gereja",
      jenisKegiatan: "Latihan regen vokal",
      durasi: "1 jam",
      jumlahOrang: 3,
      peminjam: "Komisi Remaja",
      mjMengetahui: "Jusak Fajar H",
      jemaatPeminjam: "Anya",
    },
    {
      id: "7",
      tanggal: "7/17/2025",
      jam: "17.00",
      ruangan: "Gedung Gereja",
      jenisKegiatan: "Latihan angeloudi",
      durasi: "1 jam",
      jumlahOrang: 20,
      peminjam: "Komisi Anak",
      mjMengetahui: "Ruth Pakan",
      jemaatPeminjam: "Julia",
    },
    {
      id: "8",
      tanggal: "7/14/2025",
      jam: "18.00",
      ruangan: "Konsis Gereja",
      jenisKegiatan: "Rapat",
      durasi: "2 jam",
      jumlahOrang: 15,
      peminjam: "Panitia",
      mjMengetahui: "Richard Sutupo",
      jemaatPeminjam: "Maria",
    },
    {
      id: "9",
      tanggal: "7/12/2025",
      jam: "18.00",
      ruangan: "Gedung Gereja",
      jenisKegiatan: "GR jumat agung",
      durasi: "3 jam",
      jumlahOrang: 35,
      peminjam: "Panitia",
      mjMengetahui: "Riza Barus",
      jemaatPeminjam: "TU",
    },
  ];

  const [open, setOpen] = useState(false);
  const [dataBind, setDataBind] = useState({ data: dataDummyDashboard });
  const [searchData, setSearchData] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>(dataBind.data);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tanggal, setTanggal] = React.useState<Dayjs | null>(null);

  const handleTanggal = (newValue: Dayjs | null) => {
    setTanggal(newValue);

    const formattedDate = newValue ? newValue.format("DD MMM YYYY") : "";
    setSearchData(formattedDate);
  };

  useEffect(() => {
    // if (data) {
    const filtered = dataBind.data.filter((item) =>
      item.tanggal?.toLowerCase().includes(searchData)
    );
    setFilteredData(filtered);
    // }
  }, [searchData, dataBind.data]);

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

  const handleDownload = () => {
    setOpen(false);
  };

  const handleExportToExcel = () => {
    const data = dataDummyDashboard.map((item) => ({
      Tanggal: item.tanggal,
      Jam: item.jam,
      Ruangan: item.ruangan,
      "Jenis Kegiatan": item.jenisKegiatan,
      Durasi: item.durasi,
      "Jumlah Orang": item.jumlahOrang,
      Peminjam: item.peminjam,
      "MJ Mengetahui": item.mjMengetahui,
      "Jemaat Peminjam": item.jemaatPeminjam,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DataPeminjaman");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // saveAs(fileData, "DataPeminjaman.xlsx");
  };

  //   if (loading) return <div>Loading...</div>;
  //   if (error) return <div>Error: {error}</div>;

  return (
    <Stack sx={layoutPrivateStyle.fixHeader}>
      <HeaderSection />
      <InputLabel
        sx={{ ...layoutPrivateStyle.manageTitleHeader, marginTop: 5 }}
      >
        Dashboard
      </InputLabel>
      <Paper style={{ padding: 16 }}>
        <Grid container spacing={2} alignItems={"center"}>
          <Grid size={10}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  value={tanggal}
                  onChange={handleTanggal}
                  slotProps={{
                    textField: {
                      size: "small",
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid size={2}>
            <Button
              variant="contained"
              sx={layoutPrivateStyle.buttonAdd}
              onClick={handleExportToExcel}
            >
              Export to Excel
            </Button>
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
                  "Tanggal",
                  "Jam",
                  "Ruangan",
                  "Jenis Kegiatan",
                  "Durasi",
                  "Jumlah Orang",
                  "Peminjam",
                  "MJ Mengetahui",
                  "Jemaat Peminjam",
                  "Surat",
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
              {filteredData.length > 0 ? (
                filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((ex, index) => (
                    <TableRow
                      key={ex.tanggal}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell sx={layoutPrivateStyle.manageTableCell}>
                        {ex.tanggal}
                      </TableCell>
                      <TableCell
                        sx={{
                          ...layoutPrivateStyle.manageTableCell,
                          textAlign: "center",
                        }}
                      >
                        {ex.jam}
                      </TableCell>
                      <TableCell
                        sx={{
                          ...layoutPrivateStyle.manageTableCell,
                          textAlign: "center",
                        }}
                      >
                        {ex.ruangan}
                      </TableCell>
                      <TableCell
                        sx={{
                          ...layoutPrivateStyle.manageTableCell,
                          textAlign: "center",
                        }}
                      >
                        {ex.jenisKegiatan}
                      </TableCell>
                      <TableCell
                        sx={{
                          ...layoutPrivateStyle.manageTableCell,
                          textAlign: "center",
                        }}
                      >
                        {ex.durasi}
                      </TableCell>
                      <TableCell
                        sx={{
                          ...layoutPrivateStyle.manageTableCell,
                          textAlign: "center",
                        }}
                      >
                        {ex.jumlahOrang}
                      </TableCell>
                      <TableCell
                        sx={{
                          ...layoutPrivateStyle.manageTableCell,
                          textAlign: "center",
                        }}
                      >
                        {ex.peminjam}
                      </TableCell>
                      <TableCell
                        sx={{
                          ...layoutPrivateStyle.manageTableCell,
                          textAlign: "center",
                        }}
                      >
                        {ex.mjMengetahui}
                      </TableCell>
                      <TableCell
                        sx={{
                          ...layoutPrivateStyle.manageTableCell,
                          textAlign: "center",
                        }}
                      >
                        {ex.jemaatPeminjam}
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
                            onClick={() => setOpen(true)}
                            sx={{
                              ...layoutPrivateStyle.manageTitleAction,
                              cursor: "pointer",
                            }}
                          >
                            <FileDownloadOutlinedIcon />
                          </InputLabel>
                          <ConfirmDownloadModal
                            open={open}
                            onClose={() => setOpen(false)}
                            onConfirm={handleDownload}
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
