"use client";
import { useState, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type { SxProps, Theme } from "@mui/material/styles";

import { useUi } from "~/contexts/ui-context";
import { localDb } from "~/database/local";

export const containerStyle: SxProps<Theme> = {
  paddingX: 3,
  paddingY: 2,
};

export const avatarStyle: SxProps<Theme> = {
  width: 56,
  height: 56,
};

export type TopicHeaderProps = Readonly<{
  id: string;
  title: string;
  description: string;
}>;

export const TopicHeader = ({ id, title, description }: TopicHeaderProps) => {
  const router = useRouter();

  const { showToast } = useUi();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const openMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const deleteTopic = async () => {
    try {
      await localDb.topics.delete(id);
      router.push("/");
      showToast({
        severity: "success",
        message: "Topic deleted successfully!",
      });
    } catch {
      showToast({
        severity: "error",
        message: "Failed to delete topic. Please try again.",
      });
    }
  };

  return (
    <Stack direction="row" spacing={2} sx={containerStyle}>
      <Avatar variant="rounded" sx={avatarStyle}>
        {title.at(0)?.toUpperCase()}
      </Avatar>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box>
      <Box>
        <IconButton onClick={openMenu}>
          <MoreVertIcon />
        </IconButton>
      </Box>
      <Menu anchorEl={anchorEl} open={open} onClose={closeMenu}>
        <MenuItem sx={{ color: "error.main" }} onClick={deleteTopic}>
          <ListItemIcon sx={{ color: "error.light" }}>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText>Delete topic</ListItemText>
        </MenuItem>
      </Menu>
    </Stack>
  );
};
