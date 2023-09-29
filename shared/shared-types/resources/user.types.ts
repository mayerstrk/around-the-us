import { type Document, type Types } from 'mongoose';

type RequestUser = {
	_id: string;
};

type UserDetails = {
	name: string;
	about: string;
};

type UserInput = {
	name: string;
	about: string;
	avatar: string;
};

type UserCredentials = {
	email: string;
	password: string;
};

type UserData = UserInput & UserCredentials;

type Timestamps = {
	createdAt: Date;
	updatedAt: Date;
};

type UserDocument = Document<Types.ObjectId | string> & UserData & Timestamps;

export type {
	RequestUser,
	UserDetails,
	UserInput,
	UserCredentials,
	UserData,
	Timestamps,
	UserDocument,
};
