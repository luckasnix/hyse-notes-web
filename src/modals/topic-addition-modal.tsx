"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";
import { useForm } from "@tanstack/react-form";
import { nanoid } from "nanoid";
import type { FormEventHandler } from "react";
import { z } from "zod";

import { useUi } from "~/contexts/ui-context";
import { localDb, type Topic } from "~/database/local";
import { getTimestampInSeconds } from "~/utils/general";

export const formStyle: SxProps<Theme> = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 1,
};

export type TopicAdditionModalProps = Readonly<{
  open: boolean;
  onClose: () => void;
}>;

const formSchema = z.object({
  title: z.string().min(2, "Title must contain at least 2 characters"),
  description: z
    .string()
    .min(2, "Description must contain at least 2 characters"),
});

export const TopicAdditionModal = ({
  open,
  onClose,
}: TopicAdditionModalProps) => {
  const { showToast } = useUi();

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      try {
        const topicId = nanoid(4);
        const timestampInSeconds = getTimestampInSeconds();
        const topicToAdd: Topic = {
          id: topicId,
          createdAt: timestampInSeconds,
          updatedAt: timestampInSeconds,
          ...value,
        };
        await localDb.topics.add(topicToAdd);
      } catch (error) {
        showToast({
          severity: "error",
          message: "Failed to create topic. Please try again.",
        });
      }
      formApi.reset();
      onClose();
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    form.handleSubmit();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit}
        sx={formStyle}
      >
        <Typography variant="h6">Add topic</Typography>
        <form.Field
          name="title"
          children={(field) => (
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              label="Title"
              value={field.state.value}
              onChange={(event) => {
                field.handleChange(event.target.value);
              }}
              error={field.state.meta.errors.length > 0}
              helperText={field.state.meta.errors[0]?.message}
            />
          )}
        />
        <form.Field
          name="description"
          children={(field) => (
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              multiline
              rows={2}
              label="Description"
              value={field.state.value}
              onChange={(event) => {
                field.handleChange(event.target.value);
              }}
              error={field.state.meta.errors.length > 0}
              helperText={field.state.meta.errors[0]?.message}
            />
          )}
        />
        <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end" }}>
          <Button variant="outlined" size="small" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" size="small" type="submit">
            Add
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
