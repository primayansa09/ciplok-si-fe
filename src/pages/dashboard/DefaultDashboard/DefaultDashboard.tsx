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
import HeaderSection from "../../../components/commponentHeader/Header";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import * as XLSX from "xlsx";
import ConfirmDownloadModal from "../../../components/Modal/ConfirmModalDownload";
import { fetchDataApproval } from "../../../api/dataApproval";
import { ReservationData } from "../../../store/formPeminjaman/type";
import SuratKeputusanPeminjamanRuangan from "../../../components/Surat/SuratPDF"; // Import SuratKeputusanPeminjamanRuangan
import SuratPDF from "../../../components/Surat/SuratPDF";
import ReactPDF from '@react-pdf/renderer';

export function DefaultDashboard() {
  const [open, setOpen] = useState(false);
  const [dataBind, setDataBind] = useState<ReservationData[]>([]);
  const [searchData, setSearchData] = useState("");
  const [page, setPage] = useState(0);
  const [headers, setHeaders] = useState<string[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tanggal, setTanggal] = React.useState<Dayjs | null>(null);
  const [totalData, setTotalData] = useState(0);
  const [openModalData, setOpenModalData] = useState<ReservationData>(); // State to store row data for PDF download

  const handleTanggal = (newValue: Dayjs | null) => {
    setTanggal(newValue);
    const formattedDate = newValue ? newValue.format("DD MMM YYYY") : "";
    setSearchData(formattedDate);
  };

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
    // When the user clicks the download button, generate the PDF for that specific row
    if (openModalData) {
      console.log(openModalData)
      const doc = (
        <SuratPDF
          peminjam={String(openModalData.Peminjam) || "N/A"} 
          tanggal={String(openModalData.reservationDate) || "N/A"} 
          waktu={String(openModalData.startTime) || "N/A"} 
          ruangan={String(openModalData.roomName) || "N/A"}
          kegiatan={String(openModalData.JenisKegiatan) || "N/A"}
          mengetahui={String(openModalData.mjMengetahui) || "N/A"}
          status={String(openModalData.status) || "N/A"}
        />
      );

      // Generate the PDF and trigger the download using ReactPDF.renderToFile
      ReactPDF.pdf(doc).toBlob().then((blob) => {
        // Create a link to trigger the download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `Surat_Keputusan_.pdf`;
        link.click(); // Trigger the download
      });
      setOpen(false); // Close the modal after the download starts
    };
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchDataApproval(page, rowsPerPage, searchData);
        console.log("API Response:", response); // Log response to verify data

        if (response.statusCode === 200 && response.data.length > 0) {
          setDataBind(response.data);
          setTotalData(response.totalData);

          const dynamicHeaders = Object.keys(response.data[0]);
          const filteredHeaders = dynamicHeaders.filter(header => !excludedHeaders.includes(header));
          setHeaders(filteredHeaders);
        }

        if (response.statusCode === 400 || response.data.length === 0) {
          setDataBind([]);
          setTotalData(0);
          setHeaders([]);
        }
      } catch (error) {
        console.error("Error loading data:", error);
        setDataBind([]);
        setTotalData(0);
        setHeaders([]);
      }
    };

    loadData();
  }, [page, rowsPerPage, searchData]);

  const excludedHeaders = [
    "transactionID",
    "reservationDate",
    "startTime",
    "roomName",
    "mjMengetahui",
    "createdBy",
    "status"
  ];

  const handleClearSearch = () => {
    setSearchData("");
    setTanggal(null); // Optionally reset the date picker
    const loadData = async () => {
      try {
        const response = await fetchDataApproval(page, rowsPerPage, "");
        console.log("API Response (Clear Search):", response); // Log response to verify data

        if (response.statusCode === 200 && response.data.length > 0) {
          setDataBind(response.data);
          setTotalData(response.totalData);

          const dynamicHeaders = Object.keys(response.data[0]);
          const filteredHeaders = dynamicHeaders.filter(header => !excludedHeaders.includes(header));
          setHeaders(filteredHeaders);
        }

        if (response.statusCode === 400 || response.data.length === 0) {
          setDataBind([]);
          setTotalData(0);
          setHeaders([]);
        }
      } catch (error) {
        console.error("Error loading data:", error);
        setDataBind([]);
        setTotalData(0);
        setHeaders([]);
      }
    };

    loadData();
  };

  const handleExportToExcel = () => {
    const tableHeaders = [
      "Tanggal", "Jam", "Ruangan", ...headers.map((header) => header.charAt(0).toUpperCase() + header.slice(1)),
      "MJ Mengatahui", "Jemaat Peminjaman", "Status"
    ];

    const tableData = dataBind.map((row) => [
      row.reservationDate,
      row.startTime,
      row.roomName,
      ...headers.map((header) => row[header] ?? "N/A"),
      row.mjMengetahui,
      row.createdBy,
      row.status
    ]);

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([tableHeaders, ...tableData]);
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, "ExportedData.xlsx");
  };

  return (
    <Stack sx={layoutPrivateStyle.fixHeader}>
      <HeaderSection />
      <InputLabel sx={{ ...layoutPrivateStyle.manageTitleHeader, marginTop: 5 }}>Dashboard</InputLabel>
      <Paper style={{ padding: 16 }}>
        <Grid container spacing={2} alignItems={"center"}>
          <Grid size={10}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  value={tanggal}
                  onChange={handleTanggal}
                  format="DD-MMM-YYYY"
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
        <TableContainer sx={layoutPrivateStyle.manageTableContainer} style={{ marginTop: 10, backgroundColor: "#FFFFFF" }}>
          <Table sx={{ minWidth: 720 }} size="small" aria-label="a dense table">
            <TableHead sx={layoutPrivateStyle.moduleTableHead}>
              <TableRow sx={layoutPrivateStyle.manageTableRow}>
                <TableCell sx={{ ...layoutPrivateStyle.manageTableCell, color: "white", fontWeight: "bold", textAlign: "center" }}>
                  Tanggal
                </TableCell>
                <TableCell sx={{ ...layoutPrivateStyle.manageTableCell, color: "white", fontWeight: "bold", textAlign: "center" }}>
                  Jam
                </TableCell>
                <TableCell sx={{ ...layoutPrivateStyle.manageTableCell, color: "white", fontWeight: "bold", textAlign: "center" }}>
                  Ruangan
                </TableCell>
                {headers.map((header, index) => (
                  <TableCell key={index} sx={{ ...layoutPrivateStyle.manageTableCell, color: "white", fontWeight: "bold", textAlign: "center" }}>
                    {header.charAt(0).toUpperCase() + header.slice(1)}
                  </TableCell>
                ))}
                <TableCell sx={{ ...layoutPrivateStyle.manageTableCell, color: "white", fontWeight: "bold", textAlign: "center" }}>
                  MJ Mengatahui
                </TableCell>
                <TableCell sx={{ ...layoutPrivateStyle.manageTableCell, color: "white", fontWeight: "bold", textAlign: "center" }}>
                  Jemaat Peminjaman
                </TableCell>
                <TableCell sx={{ ...layoutPrivateStyle.manageTableCell, color: "white", fontWeight: "bold", textAlign: "center" }}>
                  Status
                </TableCell>
                <TableCell sx={{ ...layoutPrivateStyle.manageTableCell, color: "white", fontWeight: "bold", textAlign: "center" }}>
                  Download
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ border: 1 }}>
              {dataBind.length > 0 ? (
                dataBind.map((ex, index) => (
                  <TableRow key={ex.transactionID} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell sx={layoutPrivateStyle.manageTableCell}>{ex.reservationDate}</TableCell>
                    <TableCell sx={{ ...layoutPrivateStyle.manageTableCell, textAlign: "center" }}>{ex.startTime}</TableCell>
                    <TableCell sx={{ ...layoutPrivateStyle.manageTableCell, textAlign: "center" }}>{ex.roomName}</TableCell>
                    {headers.map((header, headerIndex) => {
                      if (!excludedHeaders.includes(header)) {
                        return (
                          <TableCell key={headerIndex} sx={{ ...layoutPrivateStyle.manageTableCell, textAlign: "center" }}>
                            {ex[header] !== undefined && ex[header] !== null ? ex[header] : "N/A"}
                          </TableCell>
                        );
                      }
                      return null;
                    })}
                    <TableCell sx={{ ...layoutPrivateStyle.manageTableCell, textAlign: "center" }}>{ex.mjMengetahui}</TableCell>
                    <TableCell sx={{ ...layoutPrivateStyle.manageTableCell, textAlign: "center" }}>{ex.createdBy}</TableCell>
                    <TableCell sx={{ ...layoutPrivateStyle.manageTableCell, textAlign: "center" }}>{ex.status}</TableCell>
                    <TableCell sx={{ ...layoutPrivateStyle.manageTableCell, textAlign: "center" }}>
                      <Box display="flex" flexDirection="row" justifyContent="center" gap={1}>
                        <InputLabel onClick={() => {
                          setOpenModalData(ex); // Store the current row data in the modal state when clicked
                          setOpen(true); // Open the modal to confirm the download
                        }} sx={{ ...layoutPrivateStyle.manageTitleAction, cursor: "pointer" }}>
                          <FileDownloadOutlinedIcon />
                        </InputLabel>
                        <ConfirmDownloadModal open={open} onClose={() => setOpen(false)} onConfirm={handleDownload} />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow sx={layoutPrivateStyle.manageTableRow}>
                  <TableCell colSpan={headers.length + 5} align="center">
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
            rowsPerPageOptions={[10, 25, 50]}
            labelRowsPerPage="Showing"
          />
        </Box>
      </Paper>
    </Stack>
  );
}
