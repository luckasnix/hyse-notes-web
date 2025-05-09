import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";

export const containerStyle: SxProps<Theme> = {
  width: "100%",
  paddingX: 3,
  paddingY: 2,
};

export const avatarStyle: SxProps<Theme> = {
  width: 56,
  height: 56,
};

export type TopicHeaderProps = Readonly<{
  title: string;
  description: string;
}>;

export const TopicHeader = ({ title, description }: TopicHeaderProps) => (
  <Stack direction="row" spacing={2} sx={containerStyle}>
    <Avatar variant="rounded" sx={avatarStyle}>
      {title.at(0)?.toUpperCase()}
    </Avatar>
    <Box>
      <Typography variant="h6" component="h2">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Box>
  </Stack>
);
