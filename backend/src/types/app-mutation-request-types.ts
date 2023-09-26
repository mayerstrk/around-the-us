import { type BaseCardData } from '@shared/shared-types/card-types';
import {
	type UserDetails,
	type UserCredentials,
} from '@shared/shared-types/user-types';

interface UpdateProfileInfoBaseRequest {
	params: Record<string, never>;
	body: UserDetails;
}

interface UpdateAvatarBaseRequest {
	params: Record<string, never>;
	body: {
		avatar: string;
	};
}

interface AddCardBaseRequest {
	params: Record<string, never>;
	body: BaseCardData;
}

interface DeleteCardBaseRequest {
	params: { cardId: string };
	body: Record<string, never>;
}

interface LikeCardBaseRequest {
	params: { cardId: string };
	body: Record<string, never>;
}

interface UnlikeCardBaseRequest {
	params: { cardId: string };
	body: Record<string, never>;
}

interface CreateUserBaseRequest {
	params: Record<string, never>;
	body: UserCredentials;
}

interface LoginBaseRequest {
	params: Record<string, never>;
	body: UserCredentials;
}

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
