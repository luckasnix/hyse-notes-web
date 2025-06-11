import { nanoid } from "nanoid";

import { localDb, type Topic } from "~/database/local";
import type { TopicValues } from "~/schemas/topics";
import { getTimestampInSeconds } from "~/utils/general";

export const addTopic = async (
  values: TopicValues,
  onSuccess?: () => void,
  onError?: () => void
) => {
  try {
    const topicId = nanoid(4);
    const timestampInSeconds = getTimestampInSeconds();
    const topicToAdd: Topic = {
      ...values,
      id: topicId,
      createdAt: timestampInSeconds,
      updatedAt: timestampInSeconds,
    };
    await localDb.topics.add(topicToAdd);
    onSuccess?.();
  } catch {
    onError?.();
  }
};

export const updateTopic = async (
  values: TopicValues,
  topic: Topic,
  onSuccess?: () => void,
  onError?: () => void
) => {
  try {
    const timestampInSeconds = getTimestampInSeconds();
    const topicToUpdate: Topic = {
      ...topic,
      ...values,
      updatedAt: timestampInSeconds,
    };
    await localDb.topics.update(topic.id, topicToUpdate);
    onSuccess?.();
  } catch {
    onError?.();
  }
};

export const deleteTopic = async (
  topicId: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  try {
    await localDb.topics.delete(topicId);
    await localDb.notes.where("topicId").equals(topicId).delete();
    onSuccess?.();
  } catch {
    onError?.();
  }
};
