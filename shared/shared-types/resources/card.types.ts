import { type Document, type Types } from 'mongoose';
import { type Timestamps } from '../mongoose.types';

type CardInput = {
	name: string;
	link: string;
};

type CardData = CardInput &
	Timestamps & {
		likes: Types.ObjectId[];
		owner: Types.ObjectId;
	};

type CardDocument = Document<Types.ObjectId | string> & CardData;

export type { CardInput, CardData, CardDocument };
