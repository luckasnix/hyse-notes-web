"use client";
import Modal from "@mui/material/Modal";

import { TopicForm } from "~/components/topic-form";
import { useUi } from "~/contexts/ui-context";
import { localDb, type Topic } from "~/database/local";
import type { TopicValues } from "~/schemas/topics";
import { getTimestampInSeconds } from "~/utils/general";

export type TopicUpdateModalProps = Readonly<{
  topic: Topic;
  open: boolean;
  onClose: () => void;
}>;

export const TopicUpdateModal = ({
  topic,
  open,
  onClose,
}: TopicUpdateModalProps) => {
  const { showToast } = useUi();

  const updateTopic = async (values: TopicValues) => {
    try {
      const timestampInSeconds = getTimestampInSeconds();
      const topicToUpdate: Topic = {
        ...topic,
        ...values,
        updatedAt: timestampInSeconds,
      };
      await localDb.topics.update(topic.id, topicToUpdate);
    } catch {
      showToast({
        severity: "error",
        message: "Failed to update topic. Please try again.",
      });
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <TopicForm
        title="Update topic"
        labels={{ submit: "Update", cancel: "Cancel" }}
        initialValues={{
          title: topic.title,
          description: topic.description,
        }}
        onCancel={onClose}
        onSubmit={updateTopic}
      />
    </Modal>
  );
};
