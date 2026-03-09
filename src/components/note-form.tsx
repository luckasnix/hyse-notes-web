import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useForm } from "@tanstack/react-form";
import type { SubmitEventHandler } from "react";

import { type NoteValues, noteSchema } from "#/schemas/notes";

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

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    form.handleSubmit();
  };

  return (
    <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Stack sx={{ pt: 1 }}>
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
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" size="small" onClick={onCancel}>
          {labels.cancel}
        </Button>
        <Button variant="contained" size="small" type="submit">
          {labels.submit}
        </Button>
      </DialogActions>
    </Box>
  );
};
