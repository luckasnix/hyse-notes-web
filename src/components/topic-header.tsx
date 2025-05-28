"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { useState, type MouseEvent } from "react";

import { ActionMenu } from "~/components/action-menu";
import { useUi } from "~/contexts/ui-context";
import { localDb } from "~/database/local";

export const containerStyle: SxProps<Theme> = {
  paddingX: 3,
  paddingY: 2,
  borderBottomWidth: 1,
  borderBottomStyle: "solid",
  borderBottomColor: "divider",
};

export const avatarStyle: SxProps<Theme> = {
  width: 56,
  height: 56,
  bgcolor: "primary.main",
};

export type TopicHeaderProps = Readonly<{
  id: string;
  title: string;
  description: string;
}>;

export const TopicHeader = ({ id, title, description }: TopicHeaderProps) => {
  const router = useRouter();
  const { showToast } = useUi();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
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
      await localDb.notes.where("topicId").equals(id).delete();
      router.push("/");
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
      <ActionMenu
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        items={[
          {
            type: "neutral",
            label: "Edit topic",
            icon: <ModeEditIcon />,
            onClick: () => {}, // TODO: Add topic editing
            disabled: true,
          },
          {
            type: "error",
            label: "Delete topic",
            icon: <DeleteIcon />,
            onClick: deleteTopic,
          },
        ]}
      />
    </Stack>
  );
};
