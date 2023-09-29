import { Schema, model, type Types, type Document } from 'mongoose';
import { mongooseLinkValidator } from '../utils';

interface CardInput {
	name: string;
	link: string;
}

interface CardData extends CardInput {
	createdAt: Date;
	updatedAt: Date;
	likes: Types.ObjectId[];
	owner: Types.ObjectId;
}

type CardDocument = Document<Types.ObjectId | string> & CardData;

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
				validator: mongooseLinkValidator,
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

export { CardModel, type CardInput, type CardData };
