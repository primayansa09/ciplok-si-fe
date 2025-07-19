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
import CancelIcon from '@mui/icons-material/Cancel';
import HeaderSection from "../../../components/commponentHeader/Header";
import { fetchApprovalByDate, finalizeApprovalData } from "../../../api/dataApproval";
import { FinalizeApproval, ReservationData, ScoreData, } from "../../../store/formPeminjaman/type";
import ConfirmationModal from "../../../components/Modal/ConfirmModalDelete";
import MessageModal from "../../../components/Modal/MessageModal";  // Ensure you are importing the MessageModal


export function DetailApproval() {
  const navigate = useNavigate();
  const location = useLocation();
  const [dataBind, setDataBind] = useState<ReservationData[]>([]);
  const [dataBindPenunjang, setDataBindPenunjang] = useState<ScoreData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { reservationDate, startTime, roomName } = location.state || {};
  const [headers, setHeaders] = useState<string[]>([]);
  const [headersScore, setHeadersScore] = useState<string[]>([]);
  const clickCancel = () => {
    navigate("/pinjam-ruangan/approval", { replace: true });
  };
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [redirectTo, setRedirectTo] = useState("");
  const [currentAction, setCurrentAction] = useState<"approve" | "reject" | null>(null);

  const [selectedData, setSelectedData] = useState<ReservationData | null>(null);
  const [buttonText, setButtonText] = useState("Ok");  // State to control button text in the modal

  const excludedHeaders = [
    "transactionID",
    "reservationDate",
    "startTime",
    "roomName",
    "mjMengetahui",
    "createdBy"
  ];
  const excludedHeadersScore = [
    "transactionID",
    "tanggalPengajuan",
    "recommendationStatus",
    "finalScore",

  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const formattedString = `${reservationDate};${startTime};${roomName}`;
        const response = await fetchApprovalByDate(formattedString);
        if (response.statusCode === 200) {
          console.log(response.data[0])
          const reservationData = response.data.reservationData;
          const scoreData = response.data.scoreData;
          console.log(reservationData);
          console.log(scoreData);
          setDataBind(response.data.reservationData);
          setDataBindPenunjang(scoreData);
          if (reservationData.length > 0) {
            const dynamicHeaders = Object.keys(reservationData[0]);
            const filteredHeaders = dynamicHeaders.filter(header => !excludedHeaders.includes(header));
            setHeaders(filteredHeaders);
          }
          if (reservationData.length > 0) {
            const dynamicHeadersScore = Object.keys(scoreData[0]);
            const filteredHeaders = dynamicHeadersScore.filter(header => !excludedHeadersScore.includes(header));
            setHeadersScore(filteredHeaders)
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
    console.log(headersScore)
  }, [dataBind])
  const closeModal = () => {
    setOpenModal(false);
  };

  const handleModalConfirm = () => {
    setOpenModal(false);
    navigate(redirectTo, { replace: true });
  };

  const handleApprovalClick = (action: "approve" | "reject", ex: ReservationData) => {
    setCurrentAction(action);
    setSelectedData(ex); // Set the selected data for modal
    const message = action === "approve" ?`Are you sure you want to Approve  ${ex.createdBy} this request?` : "Are you sure you want to reject this request?";
    setModalMessage(message);
    setOpenModal(true); // Open modal when action is clicked
  };

   const handleConfirm = async () => {
    if (!currentAction || !selectedData) return;

    const ex = selectedData;
    const formData = {
      transactionID: ex.transactionID,
      reservationDate: ex.reservationDate,
      startTime: ex.startTime,
      roomName: ex.roomName,
      status: currentAction === "approve" ? "Approved" : "Rejected"
    };

    try {
      // Call API to finalize approval
      const response = await finalizeApprovalData(ex.transactionID, formData);

      // Set the modal message based on the response
      if (response.statusCode === 200) {
        setModalMessage("Request has been successfully processed.");
      } else {
        setModalMessage(response.message || "Something went wrong.");
      }
    } catch (error) {
      setModalMessage("Something went wrong.");
    }

    setOpenModal(false); // Keep the modal open
  };

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
                      if (!excludedHeaders.includes(header)) {
                        return (
                          <TableCell
                            key={headerIndex}
                            sx={{
                              ...layoutPrivateStyle.manageTableCell,
                              textAlign: "center",
                            }}
                          >
                            {ex[header] ?? "N/A"}
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
                        alignItems="center"
                        gap={2}
                      >
                        <InputLabel
                          sx={{ cursor: "pointer" }}
                          onClick={() => handleApprovalClick("approve", ex)} // Passing the entire ex object
                        >
                          <DoneIcon style={{ color: "green" }} />
                        </InputLabel>
                        <InputLabel
                          sx={{ cursor: "pointer" }}
                          onClick={() => handleApprovalClick("reject", ex)} // Passing the entire ex object
                        >
                          <CancelIcon style={{ color: "red" }} />
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
       <ConfirmationModal
          open={openModal}
          onClose={() => setOpenModal(false)}  // Close modal when user clicks "No"
          onConfirm={handleConfirm}  // Handle confirmation when user clicks "Yes"
          message={modalMessage}  // Pass the success/error message to the modal
        />

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
                  Tanggal Pengajuan
                </TableCell>
                {headersScore.map((header, headerIndex) => {
                  if (!excludedHeaders.includes(header)) {
                    return (
                      <TableCell
                        key={headerIndex}
                        sx={{
                          ...layoutPrivateStyle.manageTableCell,
                          textAlign: "center",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        {header.charAt(0).toUpperCase() + header.slice(1)} {/* Capitalize first letter */}
                      </TableCell>
                    );
                  }
                  return null;
                })}


                <TableCell
                  sx={{
                    ...layoutPrivateStyle.manageTableCell,
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Final Score
                </TableCell>

                <TableCell
                  sx={{
                    ...layoutPrivateStyle.manageTableCell,
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Recommendation Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ border: 1 }}>
              {dataBindPenunjang.length > 0 ? (
                dataBindPenunjang.map((ex: any, index) => (
                  <TableRow
                    key={ex.codePenatua}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell sx={{ ...layoutPrivateStyle.manageTableCell, textAlign: "center" }}>
                      {ex.tanggalPengajuan}
                    </TableCell>

                    {headersScore.map((header, headerIndex) => {
                      if (!excludedHeadersScore.includes(header)) {
                        return (
                          <TableCell
                            key={headerIndex}
                            sx={{
                              ...layoutPrivateStyle.manageTableCell,
                              textAlign: "center",
                            }}
                          >
                            {ex[header] ?? 0}
                          </TableCell>
                        );
                      }
                      return null;
                    })}
                    <TableCell sx={{ ...layoutPrivateStyle.manageTableCell, textAlign: "center" }}>
                      {ex.finalScore}
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
                        {ex.recommendationStatus === "Reject" ? (
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
                        ) : ex.recommendationStatus === "Approve" ? (
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
                          "N/A"
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
