import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useNavigate } from "@tanstack/react-router";
import { type MouseEvent, useState } from "react";

import { ActionMenu } from "~/components/action-menu";
import { useUi } from "~/contexts/ui-context";
import { ConfirmationModal } from "~/modals/confirmation-modal";
import { deleteTopic } from "~/services/topics";
import type { Topic } from "~/types/topics";

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
  backgroundColor: "primary.main",
};

const contentContainerStyle: SxProps<Theme> = {
  flex: 1,
  minWidth: 0,
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
  const navigate = useNavigate();
  const { showToast } = useUi();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    useState<boolean>(false);
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

  const openConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleDeleteTopicOptionClick = () => {
    closeMenu();
    openConfirmationModal();
  };

  const handleTopicDeletionConfirmation = () => {
    deleteTopic(
      topic.id,
      () => {
        closeConfirmationModal();
        navigate({ to: "/{-$topicId}" });
      },
      () => {
        showToast({
          severity: "error",
          message: "Failed to delete topic. Please try again.",
        });
      },
    );
  };

  return (
    <Stack direction="row" spacing={2} sx={containerStyle}>
      <Avatar variant="rounded" sx={avatarStyle}>
        {topic.title.at(0)?.toUpperCase()}
      </Avatar>
      <Box sx={contentContainerStyle}>
        <Typography variant="h6" component="h2" noWrap sx={textStyle}>
          {topic.title}
        </Typography>
        <Typography
          variant="body2"
          noWrap
          color="text.secondary"
          sx={textStyle}
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
      <ConfirmationModal
        open={isConfirmationModalOpen}
        content="Are you sure you want to delete this topic?"
        labels={{
          cancel: "Cancel",
          confirm: "Delete",
        }}
        onCancel={closeConfirmationModal}
        onConfirm={handleTopicDeletionConfirmation}
      />
    </Stack>
  );
};
