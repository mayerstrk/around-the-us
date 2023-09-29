import { Schema, model } from 'mongoose';
import validator from 'validator';
import { type CardDocument } from '@shared/shared-types/resources/card.types';

const cardSchema = new Schema<CardDocument>(
	{
		name: {
			type: String,
			required: true,
			minlength: 2,
			maxlength: 30,
		},
		link: {
			type: String,
			required: true,
			validate: {
				validator: (url: string) => validator.isURL(url),
			},
		},
		owner: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		likes: [
			{
				type: Schema.Types.ObjectId,
				default: [],
			},
		],
		createdAt: {
			type: Date,
			default: Date.now(),
		},
	},
	{ timestamps: true },
);

const CardModel = model<CardDocument>('Card', cardSchema);

export { CardModel };
