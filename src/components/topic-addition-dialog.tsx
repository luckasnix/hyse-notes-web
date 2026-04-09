import Dialog from "@mui/material/Dialog";

import { TopicForm } from "#/components/topic-form";
import { useUi } from "#/contexts/ui/hook";
import type { TopicValues } from "#/schemas/topics";
import { addTopic } from "#/services/topics";

export type TopicAdditionDialogProps = Readonly<{
  open: boolean;
  onClose: () => void;
}>;

export const TopicAdditionDialog = ({
  open,
  onClose,
}: TopicAdditionDialogProps) => {
  const { showToast } = useUi();

  const handleSubmit = (values: TopicValues) => {
    addTopic(values, undefined, () => {
      showToast({
        severity: "error",
        message: "Failed to add topic. Please try again.",
      });
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <TopicForm
        title="Add topic"
        labels={{ submit: "Add", cancel: "Cancel" }}
        initialValues={{
          title: "",
          description: "",
        }}
        onCancel={onClose}
        onSubmit={handleSubmit}
      />
    </Dialog>
  );
};
