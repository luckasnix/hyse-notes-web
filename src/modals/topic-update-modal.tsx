"use client";
import Modal from "@mui/material/Modal";

import { TopicForm } from "~/components/topic-form";
import { useUi } from "~/contexts/ui-context";
import type { TopicValues } from "~/schemas/topics";
import { updateTopic } from "~/services/topics";
import type { Topic } from "~/types/topics";

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
		<Modal open={open} onClose={onClose}>
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
		</Modal>
	);
};
