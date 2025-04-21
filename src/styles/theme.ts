"use client";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: "#f9a825",
      light: "#fab950",
      dark: "#ae7519",
      contrastText: '#ffffff',
    },
  },
});
