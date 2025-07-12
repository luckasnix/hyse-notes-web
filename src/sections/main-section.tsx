import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";
import Image from "next/image";

const containerStyle: SxProps<Theme> = {
  direction: "row",
  justifyContent: "center",
  alignItems: "center",
};

const titleTextStyle: SxProps<Theme> = {
  color: "primary.main",
};

export const MainSection = () => (
  <Grid component="section" container size="grow" sx={containerStyle}>
    <Image src="/logo.svg" width={128} height={128} alt="Hyse Notes logo" />
    <Typography variant="h1" sx={titleTextStyle}>
      Hyse Notes
    </Typography>
  </Grid>
);
