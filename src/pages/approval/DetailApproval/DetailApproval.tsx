import React, { useState } from "react";
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
  Paper,
} from "@mui/material";
import { layoutPrivateStyle } from "../../../style/layout/private-route";
import DoneIcon from "@mui/icons-material/Done";
import HeaderSection from "../../../components/commponentHeader/Header";

export function DetailApproval() {
  const navigate = useNavigate();

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

  const [dataBind, setDataBind] = useState({
    data: dataDummyApprovalDetail,
  });
  const [dataBindPenunjang, setDataBindPenunjang] = useState({
    data: dataDummyPenunjang,
  });

  const clickCancel = () => {
    navigate("/pinjam-ruangan/approval", { replace: true });
  };

  return (
    <Stack sx={layoutPrivateStyle.fixHeader}>
      <HeaderSection/>
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
                  Jumlah Orang
                </TableCell>
                <TableCell
                  sx={{
                    ...layoutPrivateStyle.manageTableCell,
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Peminjaman
                </TableCell>
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
              {dataBind.data.length > 0 ? (
                dataBind.data.map((ex: any, index) => (
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
                      {ex.peminjaman}
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
                      {ex.jemaatPeminjaman}
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
