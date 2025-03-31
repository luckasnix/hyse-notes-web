import Image from "next/image";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { yellow } from "@mui/material/colors";

export default function Home() {
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={4}>
      <Image
        src="/logo.svg"
        width={128}
        height={128}
        alt="Hyse Notes logo"
      />
      <Typography variant="h1" sx={{ color: yellow[800] }}>Hyse Notes</Typography>
    </Grid>
  );
}
