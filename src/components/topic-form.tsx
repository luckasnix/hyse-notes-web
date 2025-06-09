"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";
import { useForm } from "@tanstack/react-form";
import type { FormEventHandler } from "react";

import { topicSchema, type TopicValues } from "~/schemas/topics";

const formStyle: SxProps<Theme> = {
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

export type TopicFormProps = Readonly<{
  title: string;
  labels: {
    cancel: string;
    submit: string;
  };
  initialValues: TopicValues;
  onSubmit: (values: TopicValues) => void;
  onCancel: () => void;
}>;

export const TopicForm = ({
  title,
  labels,
  initialValues,
  onCancel,
  onSubmit,
}: TopicFormProps) => {
  const form = useForm({
    defaultValues: {
      title: initialValues.title,
      description: initialValues.description,
    },
    validators: {
      onSubmit: topicSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      onSubmit(value);
      formApi.reset();
      onCancel();
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    form.handleSubmit();
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit}
      sx={formStyle}
    >
      <Typography variant="h6">{title}</Typography>
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
        <Button variant="outlined" size="small" onClick={onCancel}>
          {labels.cancel}
        </Button>
        <Button variant="contained" size="small" type="submit">
          {labels.submit}
        </Button>
      </Stack>
    </Box>
  );
};
