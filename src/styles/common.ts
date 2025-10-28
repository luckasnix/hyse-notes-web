import type { SxProps, Theme } from "@mui/material/styles";

export const modalContentStyle: SxProps<Theme> = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: 4,
  backgroundColor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  gap: 1,
};
