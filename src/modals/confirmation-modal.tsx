import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { modalContentStyle } from "#/styles/common";

const contentStyle: SxProps<Theme> = {
  ...modalContentStyle,
  width: 360,
};

const actionsStyle: SxProps<Theme> = {
  justifyContent: "end",
};

export type ConfirmationModalProps = Readonly<{
  open: boolean;
  content: string;
  labels: {
    cancel: string;
    confirm: string;
  };
  onCancel: () => void;
  onConfirm: () => void;
}>;

export const ConfirmationModal = ({
  open,
  content,
  labels,
  onCancel,
  onConfirm,
}: ConfirmationModalProps) => (
  <Modal open={open} onClose={onCancel}>
    <Box sx={contentStyle}>
      <Typography variant="body1">{content}</Typography>
      <Stack direction="row" spacing={1} sx={actionsStyle}>
        <Button variant="outlined" size="small" onClick={onCancel}>
          {labels.cancel}
        </Button>
        <Button variant="contained" size="small" onClick={onConfirm}>
          {labels.confirm}
        </Button>
      </Stack>
    </Box>
  </Modal>
);
