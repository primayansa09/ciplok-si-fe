import React from "react";
import { Modal, Box, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface MessageModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  redirectTo: string;
}

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  width: 400,
  textAlign: "center",
};

const MessageModal: React.FC<MessageModalProps> = ({
  open,
  onClose,
  onConfirm,
  message,
  redirectTo,
}) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    onConfirm();
    navigate(redirectTo, { replace: true });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Box sx={modalStyle}>
        <Typography variant="h6" mb={3}>
          {message || "Something went wrong!"} {/* Fallback message */}
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            onClick={handleConfirm}
            sx={{
              backgroundColor: "#0049AC",
              "&:hover": { backgroundColor: "#003B8A" },
            }}
          >
            OK
          </Button>
          {/* <Button
            variant="contained"
            onClick={onClose}
            sx={{
              backgroundColor: "#D32F2F",
              "&:hover": { backgroundColor: "#B71C1C" },
            }}
          >
            Batal
          </Button> */}
        </Stack>
      </Box>
    </Modal>
  );
};

export default MessageModal;
