import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  useTheme,
} from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";

interface WinModalProps {
  setWinModal: Dispatch<SetStateAction<boolean>>;
}

const WinModal = ({ setWinModal }: WinModalProps): React.ReactElement => {
  const theme = useTheme();

  return (
    <Dialog open maxWidth="xs" sx={{ textAlign: "center" }}>
      <DialogTitle>Top 10 time!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add to the hi-scores to go down in history
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          variant="standard"
          color={theme.palette.mode === "light" ? "primary" : "secondary"}
        />
      </DialogContent>
      <DialogActions>
        <Button
          color={theme.palette.mode === "light" ? "primary" : "secondary"}
          onClick={() => setWinModal(false)}
        >
          Cancel
        </Button>
        <Button
          color={theme.palette.mode === "light" ? "primary" : "secondary"}
          onClick={() => setWinModal(false)}
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WinModal;
