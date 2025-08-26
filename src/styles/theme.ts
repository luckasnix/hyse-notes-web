"use client";
import { createTheme } from "@mui/material/styles";

import { notoSans } from "~/styles/fonts";

export const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: "#f9a825",
      light: "#fab950",
      dark: "#ae7519",
      contrastText: "#ffffff",
    },
  },
  typography: {
    fontFamily: [notoSans.style.fontFamily, "sans-serif"].join(","),
  },
});
