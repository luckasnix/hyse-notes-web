"use client";
import Modal from "@mui/material/Modal";
import { nanoid } from "nanoid";

import { TopicForm } from "~/components/topic-form";
import { useUi } from "~/contexts/ui-context";
import { localDb, type Topic } from "~/database/local";
import type { TopicValues } from "~/schemas/topics";
import { getTimestampInSeconds } from "~/utils/general";

export type TopicAdditionModalProps = Readonly<{
  open: boolean;
  onClose: () => void;
}>;

export const TopicAdditionModal = ({
  open,
  onClose,
}: TopicAdditionModalProps) => {
  const { showToast } = useUi();

  const addTopic = async (values: TopicValues) => {
    try {
      const topicId = nanoid(4);
      const timestampInSeconds = getTimestampInSeconds();
      const topicToAdd: Topic = {
        id: topicId,
        createdAt: timestampInSeconds,
        updatedAt: timestampInSeconds,
        ...values,
      };
      await localDb.topics.add(topicToAdd);
    } catch {
      showToast({
        severity: "error",
        message: "Failed to create topic. Please try again.",
      });
    }
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
        onSubmit={addTopic}
      />
    </Modal>
  );
};
