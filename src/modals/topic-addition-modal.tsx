"use client";
import Modal from "@mui/material/Modal";

import { TopicForm } from "~/components/topic-form";
import { useUi } from "~/contexts/ui-context";
import type { TopicValues } from "~/schemas/topics";
import { addTopic } from "~/services/topics";

export type TopicAdditionModalProps = Readonly<{
  open: boolean;
  onClose: () => void;
}>;

export const TopicAdditionModal = ({
  open,
  onClose,
}: TopicAdditionModalProps) => {
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
    <Modal open={open} onClose={onClose}>
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
    </Modal>
  );
};
