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
import type { Topic } from "~/database/local";
import { deleteTopic } from "~/services/topics";

const containerStyle: SxProps<Theme> = {
  paddingX: 3,
  paddingY: 2,
  borderBottomWidth: 1,
  borderBottomStyle: "solid",
  borderBottomColor: "divider",
};

const avatarStyle: SxProps<Theme> = {
  width: 56,
  height: 56,
  bgcolor: "primary.main",
};

const textStyle: SxProps<Theme> = {
  maxWidth: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

export type TopicHeaderProps = Readonly<{
  topic: Topic;
  openModal: () => void;
}>;

export const TopicHeader = ({ topic, openModal }: TopicHeaderProps) => {
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

  const handleUpdateTopicOptionClick = () => {
    openModal();
    closeMenu();
  };

  const handleDeleteTopicOptionClick = () => {
    deleteTopic(
      topic.id,
      () => {
        router.push("/");
      },
      () => {
        showToast({
          severity: "error",
          message: "Failed to delete topic. Please try again.",
        });
      }
    );
  };

  return (
    <Stack direction="row" spacing={2} sx={containerStyle}>
      <Avatar variant="rounded" sx={avatarStyle}>
        {topic.title.at(0)?.toUpperCase()}
      </Avatar>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="h6" component="h2" noWrap sx={textStyle}>
          {topic.title}
        </Typography>
        <Typography
          variant="body2"
          noWrap
          sx={{
            ...textStyle,
            color: "text.secondary",
          }}
        >
          {topic.description}
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
            label: "Update topic",
            icon: <ModeEditIcon />,
            onClick: handleUpdateTopicOptionClick,
          },
          {
            type: "error",
            label: "Delete topic",
            icon: <DeleteIcon />,
            onClick: handleDeleteTopicOptionClick,
          },
        ]}
      />
    </Stack>
  );
};
