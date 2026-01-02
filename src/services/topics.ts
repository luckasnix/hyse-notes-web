import { nanoid } from "nanoid";

import { db } from "#/integrations/dexie";
import type { TopicValues } from "#/schemas/topics";
import type { Topic } from "#/types/topics";
import { getTimestampInSeconds } from "#/utils/general";

export const addTopic = async (
  values: TopicValues,
  onSuccess?: () => void,
  onError?: () => void,
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
    await db.topics.add(topicToAdd);
    onSuccess?.();
  } catch {
    onError?.();
  }
};

export const updateTopic = async (
  newTopic: Topic,
  onSuccess?: () => void,
  onError?: () => void,
): Promise<void> => {
  try {
    const timestampInSeconds = getTimestampInSeconds();
    const topicToUpdate: Topic = {
      ...newTopic,
      updatedAt: timestampInSeconds,
    };
    await db.topics.update(newTopic.id, topicToUpdate);
    onSuccess?.();
  } catch {
    onError?.();
  }
};

export const deleteTopic = async (
  topicId: string,
  onSuccess?: () => void,
  onError?: () => void,
): Promise<void> => {
  try {
    await db.topics.delete(topicId);
    await db.notes.where("topicId").equals(topicId).delete();
    onSuccess?.();
  } catch {
    onError?.();
  }
};
