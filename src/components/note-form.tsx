import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useForm } from "@tanstack/react-form";
import type { FormEventHandler } from "react";

import { type NoteValues, noteSchema } from "~/schemas/notes";
import { modalContentStyle } from "~/styles/common";

const contentStyle: SxProps<Theme> = {
  ...modalContentStyle,
  width: 480,
};

const actionsStyle: SxProps<Theme> = {
  justifyContent: "end",
};

export type NoteFormProps = Readonly<{
  title: string;
  labels: {
    cancel: string;
    submit: string;
  };
  initialValues: NoteValues;
  onSubmit: (values: NoteValues) => void;
  onCancel: () => void;
}>;

export const NoteForm = ({
  title,
  labels,
  initialValues,
  onCancel,
  onSubmit,
}: NoteFormProps) => {
  const form = useForm({
    defaultValues: {
      content: initialValues.content,
    },
    validators: {
      onSubmit: noteSchema,
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
      sx={contentStyle}
    >
      <Typography variant="h6">{title}</Typography>
      <form.Field name="content">
        {(field) => (
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            multiline
            rows={4}
            label="Content"
            value={field.state.value}
            onChange={(event) => {
              field.handleChange(event.target.value);
            }}
            error={field.state.meta.errors.length > 0}
            helperText={field.state.meta.errors[0]?.message}
          />
        )}
      </form.Field>
      <Stack direction="row" spacing={1} sx={actionsStyle}>
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
