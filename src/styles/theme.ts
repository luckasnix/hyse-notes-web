import { createTheme } from "@mui/material/styles";

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
    fontFamily: "'Noto Sans Variable', sans-serif",
    h1: {
      fontSize: "3.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "3rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "2.5rem",
      fontWeight: 500,
    },
    h4: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h5: {
      fontSize: "1.75rem",
      fontWeight: 500,
    },
    h6: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
  },
});
