import Dialog from "@mui/material/Dialog";

import { TopicForm } from "#/components/topic-form";
import { useUi } from "#/contexts/ui-context";
import type { TopicValues } from "#/schemas/topics";
import { updateTopic } from "#/services/topics";
import type { Topic } from "#/types/topics";

export type TopicUpdateDialogProps = Readonly<{
  topic: Topic;
  open: boolean;
  onClose: () => void;
}>;

export const TopicUpdateDialog = ({
  topic,
  open,
  onClose,
}: TopicUpdateDialogProps) => {
  const { showToast } = useUi();

  const handleSubmit = (values: TopicValues) => {
    const newTopic: Topic = {
      ...topic,
      ...values,
    };
    updateTopic(newTopic, undefined, () => {
      showToast({
        severity: "error",
        message: "Failed to update topic. Please try again.",
      });
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <TopicForm
        title="Update topic"
        labels={{ submit: "Update", cancel: "Cancel" }}
        initialValues={{
          title: topic.title,
          description: topic.description,
        }}
        onCancel={onClose}
        onSubmit={handleSubmit}
      />
    </Dialog>
  );
};
