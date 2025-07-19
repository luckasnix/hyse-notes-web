export type Note = {
	id: string;
	createdAt: number;
	updatedAt: number;
	topicId: string;
	content: string;
	reactions: Array<string>;
};
