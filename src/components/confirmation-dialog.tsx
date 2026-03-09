import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";

export type ConfirmationDialogProps = Readonly<{
  open: boolean;
  content: string;
  labels: {
    cancel: string;
    confirm: string;
  };
  onCancel: () => void;
  onConfirm: () => void;
}>;

export const ConfirmationDialog = ({
  open,
  content,
  labels,
  onCancel,
  onConfirm,
}: ConfirmationDialogProps) => (
  <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
    <DialogContent>
      <Typography variant="body1">{content}</Typography>
    </DialogContent>
    <DialogActions>
      <Button variant="outlined" size="small" onClick={onCancel}>
        {labels.cancel}
      </Button>
      <Button variant="contained" size="small" onClick={onConfirm}>
        {labels.confirm}
      </Button>
    </DialogActions>
  </Dialog>
);
