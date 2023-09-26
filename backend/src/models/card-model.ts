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

const cardSchema = new Schema<CardData>({
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
});

cardSchema.set('timestamps', true);

const CardDoc = model<CardData>('Card', cardSchema);

export { CardDoc, type CardInput, type CardData };
