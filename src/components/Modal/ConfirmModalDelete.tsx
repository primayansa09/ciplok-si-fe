import React from "react";
import { Modal, Box, Typography, Button, Stack } from "@mui/material";

interface ConfirmationModalProps {
  open: boolean;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
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

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
  message,
}) => {
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
        {message}
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            onClick={onConfirm}
            sx={{
              backgroundColor: "#0049AC",
              "&:hover": { backgroundColor: "#003B8A" },
            }}
          >
            Yes
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              backgroundColor: "#D32F2F",
              "&:hover": { backgroundColor: "#B71C1C" },
            }}
          >
            No
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
