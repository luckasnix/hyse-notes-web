import Image from "next/image";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export const MainSection = () => (
  <Grid container size="grow" direction="row" justifyContent="center" alignItems="center">
    <Image
      src="/logo.svg"
      width={128}
      height={128}
      alt="Hyse Notes logo"
    />
    <Typography variant="h1" sx={{ color: "primary.main" }}>Hyse Notes</Typography>
  </Grid>
);
