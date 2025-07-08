import { nanoid } from "nanoid";

import { localDb } from "~/database/local";
import type { TopicValues } from "~/schemas/topics";
import { getTimestampInSeconds } from "~/utils/general";
import type { Topic } from "~/types/topics";

export const addTopic = async (
  values: TopicValues,
  onSuccess?: () => void,
  onError?: () => void
): Promise<void> => {
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
  newTopic: Topic,
  onSuccess?: () => void,
  onError?: () => void
): Promise<void> => {
  try {
    const timestampInSeconds = getTimestampInSeconds();
    const topicToUpdate: Topic = {
      ...newTopic,
      updatedAt: timestampInSeconds,
    };
    await localDb.topics.update(newTopic.id, topicToUpdate);
    onSuccess?.();
  } catch {
    onError?.();
  }
};

export const deleteTopic = async (
  topicId: string,
  onSuccess?: () => void,
  onError?: () => void
): Promise<void> => {
  try {
    await localDb.topics.delete(topicId);
    await localDb.notes.where("topicId").equals(topicId).delete();
    onSuccess?.();
  } catch {
    onError?.();
  }
};
