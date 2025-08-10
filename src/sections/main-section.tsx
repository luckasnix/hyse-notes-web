import Grid from "@mui/material/Grid";
import type { SxProps, Theme } from "@mui/material/styles";
import Image from "next/image";

const containerStyle: SxProps<Theme> = {
  justifyContent: "center",
  alignItems: "center",
};

export const MainSection = () => (
  <Grid component="section" container size="grow" sx={containerStyle}>
    <Image src="/logo.svg" width={512} height={128} alt="Hyse Notes logo" />
  </Grid>
);
