import { type Document, type Types } from 'mongoose';
import { type Timestamps } from '../mongoose.types';
import { type PopulatedUser } from './user.types';

type CardInput = {
	name: string;
	link: string;
};

type CardData = CardInput &
	Timestamps & {
		likes: PopulatedUser[];
		owner: string | Types.ObjectId;
		_id: string;
	};

type CardDocument = Document<Types.ObjectId> & CardData;

export type { CardInput, CardData, CardDocument };
