import { type Document, type Types } from 'mongoose';
import { type Timestamps } from '../mongoose.types';

type RequestUser = {
	_id: string;
};

type UserDetails = {
	name: string;
	about: string;
};

type UserInput = UserDetails & {
	avatar: string;
};

type UserCredentials = {
	email: string;
	password: string;
};

type UserData = UserInput & UserCredentials & Timestamps;

type UserDocument = Document<Types.ObjectId | string> & UserData;

export type {
	RequestUser,
	UserDetails,
	UserInput,
	UserCredentials,
	UserData,
	UserDocument,
};
