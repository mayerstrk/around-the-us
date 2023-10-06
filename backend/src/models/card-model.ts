import { Schema, model } from 'mongoose';
import validator from 'validator';
import { type CardDocument } from '@shared/shared-types/resources/card.types';

const cardPopulateOptions = { path: 'likes', select: ' email _id name about' };

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
			ref: 'User',
		},
		likes: {
			type: [
				{
					type: Schema.Types.ObjectId,
					ref: 'User',
				},
			],
			default: [],
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
	},
	{ timestamps: true },
);

cardSchema.pre('find', function () {
	void this.populate(cardPopulateOptions);
});

cardSchema.pre('findOne', function () {
	void this.populate(cardPopulateOptions);
});

const CardModel = model<CardDocument>('Card', cardSchema);

export { CardModel };
