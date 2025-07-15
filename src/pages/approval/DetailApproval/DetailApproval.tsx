import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  Paper,
} from "@mui/material";
import { layoutPrivateStyle } from "../../../style/layout/private-route";
import DoneIcon from "@mui/icons-material/Done";
import HeaderSection from "../../../components/commponentHeader/Header";
import { fetchApprovalByDate } from "../../../api/dataApproval";
import { ReservationData } from "../../../store/formPeminjaman/type";

export function DetailApproval() {
  const navigate = useNavigate();
  const location = useLocation();
  const dataDummyApprovalDetail = [
    {
      tanggalPemakaian: "12 April 2025",
      jamPemakaian: "09.00",
      ruangan: "Gedung Gereja",
      jenisKegiatan: "approve",
      durasi: "4 Jam",
      jumlahOrang: "7",
      peminjaman: "Komisi Pemuda",
      mjMengetahui: "Erin Mutiara",
      jemaatPeminjaman: "Zaki",
    },
  ];

  const dataDummyPenunjang = [
    {
      tanggalPemakaian: "12 April 2025",
      jamPemakaian: "09.00",
      ruangan: "Gedung Gereja",
      jenisKegiatan: "1",
      peminjam: "4 Jam",
      durasi: "7",
      statusRutin: "1",
      tanggalPengajuan: "12 April 2025",
      score: "5",
      status: "Cancel",
    },
    {
      tanggalPemakaian: "12 April 2025",
      jamPemakaian: "09.00",
      ruangan: "Gedung Gereja",
      jenisKegiatan: "1",
      peminjam: "4 Jam",
      durasi: "7",
      statusRutin: "1",
      tanggalPengajuan: "12 April 2025",
      score: "5",
      status: "Approve",
    },
  ];

  const [dataBind, setDataBind] = useState<ReservationData[]>([]);
  const [dataBindPenunjang, setDataBindPenunjang] = useState({
    data: dataDummyPenunjang,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { reservationDate, startTime, roomName } = location.state || {};
  const [headers, setHeaders] = useState<string[]>([]); // State for dynamic headers

  const clickCancel = () => {
    navigate("/pinjam-ruangan/approval", { replace: true });
  };

  const excludedHeaders = [
    "transactionID",
    "reservationDate",
    "startTime",
    "roomName",
    "Peminjam",
    "mjMengetahui",
    "createdBy"
  ];
  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      try {
        const formattedString = `${reservationDate};${startTime};${roomName}`;
        const response = await fetchApprovalByDate(formattedString);
        if (response.statusCode === 200) {
          console.log(response.data[0])
          const reservationData = response.data.reservationData;  // Array 1
          const scoreData = response.data.scoreData;  // Array 2

          console.log(reservationData);  // Log the first array
          console.log(scoreData);  // Log the second array

          setDataBind(response.data.reservationData);
          if (reservationData.length > 0) {
            const dynamicHeaders = Object.keys(reservationData[0]); // Extract keys dynamically from the first item
            // Filter out the excluded headers
            const filteredHeaders = dynamicHeaders.filter(header => !excludedHeaders.includes(header));
            setHeaders(filteredHeaders);
          }
        } else {
          // setError("Failed to fetch data");
        }
      } catch (err) {
        // setError("Error fetching data");
      } finally {
        // setLoading(false);
      }
    };

    if (reservationDate && startTime && roomName) {
      fetchData();
    }
  }, [reservationDate, startTime, roomName]);
  useEffect(() => {
    console.log(headers)
  }, [dataBind])
  return (
    <Stack sx={layoutPrivateStyle.fixHeader}>
      <HeaderSection />
      <InputLabel
        sx={{ ...layoutPrivateStyle.manageTitleHeader, marginTop: 5 }}
      >
        Approval Detail
      </InputLabel>
      <Paper style={{ padding: 16 }}>
        <TableContainer
          sx={{
            ...layoutPrivateStyle.manageTableContainer,
            marginTop: 3,
            backgroundColor: "#FFFFFF",
          }}
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
                  Tanggal
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

                {headers.map((header, index) => {
                  return (
                    <TableCell
                      key={index}
                      sx={{
                        ...layoutPrivateStyle.manageTableCell,
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      {header.charAt(0).toUpperCase() + header.slice(1)} {/* Capitalize first letter */}
                    </TableCell>
                  );
                })}
               
                <TableCell
                  sx={{
                    ...layoutPrivateStyle.manageTableCell,
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  MJ Mengatahui
                </TableCell>
                <TableCell
                  sx={{
                    ...layoutPrivateStyle.manageTableCell,
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Jemaat Peminjaman
                </TableCell>
                <TableCell
                  sx={{
                    ...layoutPrivateStyle.manageTableCell,
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Approval
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ border: 1 }}>
              {dataBind.length > 0 ? (
                dataBind.map((ex: any, index) => (
                  <TableRow
                    key={ex.codePenatua}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell sx={layoutPrivateStyle.manageTableCell}>
                      {ex.reservationDate}
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
                    {headers.map((header, headerIndex) => {
                      // Exclude the unwanted headers directly
                      if (!excludedHeaders.includes(header)) {
                        return (
                          <TableCell
                            key={headerIndex}
                            sx={{
                              ...layoutPrivateStyle.manageTableCell,
                              textAlign: "center",
                            }}
                          >
                            {/* Render the value dynamically using the header as the key */}
                            {ex[header] ?? "N/A"} {/* If the value is undefined, show 'N/A' */}
                          </TableCell>
                        );
                      }
                      return null;
                    })}

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
                      {ex.mjMengetahui}
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
                      <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="center"
                        gap={1}
                      >
                        <InputLabel
                          sx={{
                            cursor: "pointer",
                          }}
                        >
                          <DoneIcon style={{ color: "green" }} />
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
        {/* Table Penunjang Keputusan */}
        <InputLabel
          sx={{
            ...layoutPrivateStyle.manageTitleHeader,
            marginTop: 5,
            fontWeight: "reguler",
            fontSize: "20px",
          }}
        >
          Penunjang Keputusan
        </InputLabel>
        <TableContainer
          sx={{
            ...layoutPrivateStyle.manageTableContainer,
            backgroundColor: "#FFFFFF",
            marginBottom: 5
          }}
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
                  Tanggal
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
                  Jenis Kegiatan
                </TableCell>
                <TableCell
                  sx={{
                    ...layoutPrivateStyle.manageTableCell,
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Peminjam
                </TableCell>
                <TableCell
                  sx={{
                    ...layoutPrivateStyle.manageTableCell,
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Durasi
                </TableCell>
                <TableCell
                  sx={{
                    ...layoutPrivateStyle.manageTableCell,
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Status Rutin
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
                  Score
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
              </TableRow>
            </TableHead>
            <TableBody sx={{ border: 1 }}>
              {dataBindPenunjang.data.length > 0 ? (
                dataBindPenunjang.data.map((ex: any, index) => (
                  <TableRow
                    key={ex.codePenatua}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell sx={layoutPrivateStyle.manageTableCell}>
                      {ex.tanggalPemakaian}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...layoutPrivateStyle.manageTableCell,
                        textAlign: "center",
                      }}
                    >
                      {ex.jamPemakaian}
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
                      {ex.peminjam}
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
                      {ex.statusRutin}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...layoutPrivateStyle.manageTableCell,
                        textAlign: "center",
                      }}
                    >
                      {ex.tanggalPengajuan}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...layoutPrivateStyle.manageTableCell,
                        textAlign: "center",
                      }}
                    >
                      {ex.score}
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
                        {ex.status === "Cancel" ? (
                          <Button
                            sx={{
                              cursor: "pointer",
                              backgroundColor: "red",
                            }}
                          >
                            <InputLabel
                              sx={{
                                ...layoutPrivateStyle.manageTitleAction,
                                fontWeight: "bold",
                              }}
                            >
                              Cancel
                            </InputLabel>
                          </Button>
                        ) : ex.status === "Approve" ? (
                          <Button
                            sx={{
                              cursor: "pointer",
                              backgroundColor: "#94E684",
                            }}
                          >
                            <InputLabel
                              sx={{
                                ...layoutPrivateStyle.manageTitleAction,
                                fontWeight: "bold",
                              }}
                            >
                              Approve
                            </InputLabel>
                          </Button>
                        ) : (
                          "-"
                        )}
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
        <Grid
          container
          spacing={2}
          justifyContent={"flex-end"}
          alignItems={"center"}
          marginTop={2}
        >
          <Grid size={2}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                ...layoutPrivateStyle.buttonCancel,
                width: "100%",
                height: "40px",
              }}
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
