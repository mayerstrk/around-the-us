import { type Document, type Types } from 'mongoose';
import { type Timestamps } from '../mongoose.types';

type RequestUser = {
	_id: string;
};

type UserDetails = {
	name: string;
	about: string;
};

type UserAvatar = {
	avatar: string;
};

type UserInput = UserDetails & UserAvatar;

type UserCredentials = {
	email: string;
	password: string;
};

type UserData = UserInput &
	UserCredentials &
	Timestamps & { _id: string; __v: number };

type UserDataWithoutPassword = Omit<UserData, 'password'>;

type PopulatedUser = {
	_id: string;
	email: string;
	name: string;
	about: string;
};

type UserDocument = Document<Types.ObjectId> & UserData;

export type {
	RequestUser,
	UserDetails,
	UserAvatar,
	UserInput,
	UserCredentials,
	UserData,
	PopulatedUser,
	UserDataWithoutPassword,
	UserDocument,
};
