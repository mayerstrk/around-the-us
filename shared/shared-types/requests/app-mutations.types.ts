import {
	type UserDetails,
	type UserCredentials,
} from '../resources/user.types';
import { type BaseCardData } from '../resources/card.types';

type UpdateProfileInfoBaseRequest = {
	params: Record<string, never>;
	body: UserDetails;
};

type UpdateAvatarBaseRequest = {
	params: Record<string, never>;
	body: {
		avatar: string;
	};
};

type AddCardBaseRequest = {
	params: Record<string, never>;
	body: BaseCardData;
};

type DeleteCardBaseRequest = {
	params: { cardId: string };
	body: Record<string, never>;
};

type LikeCardBaseRequest = {
	params: { cardId: string };
	body: Record<string, never>;
};

type UnlikeCardBaseRequest = {
	params: { cardId: string };
	body: Record<string, never>;
};

type CreateUserBaseRequest = {
	params: Record<string, never>;
	body: UserCredentials;
};

type LoginBaseRequest = {
	params: Record<string, never>;
	body: UserCredentials;
};

export type {
	UpdateProfileInfoBaseRequest,
	UpdateAvatarBaseRequest,
	AddCardBaseRequest,
	DeleteCardBaseRequest,
	LikeCardBaseRequest,
	UnlikeCardBaseRequest,
	CreateUserBaseRequest,
	LoginBaseRequest,
};
