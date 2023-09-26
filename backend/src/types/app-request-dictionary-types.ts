import { type Request } from 'express';
import {
	type AppRequestEndpointName,
	type AppMutationEndpointName,
	type AppQueryEndpointName,
} from '../enums/endpoint-names';
import {
	type GetUserBaseRequest,
	type GetUsersBaseRequest,
	type GetCardsBaseRequest,
	type ValidateTokenBaseRequest,
} from './app-query-request-types';
import {
	type UpdateProfileInfoBaseRequest,
	type UpdateAvatarBaseRequest,
	type AddCardBaseRequest,
	type DeleteCardBaseRequest,
	type LikeCardBaseRequest,
	type UnlikeCardBaseRequest,
	type CreateUserBaseRequest,
	type LoginBaseRequest,
} from './app-mutation-request-types';

interface AppQueryDictionary {
	[AppQueryEndpointName.getUser]: GetUserBaseRequest;
	[AppQueryEndpointName.getUsers]: GetUsersBaseRequest;
	[AppQueryEndpointName.getCards]: GetCardsBaseRequest;
	[AppQueryEndpointName.validateToken]: ValidateTokenBaseRequest;
}

interface AppMutationDictionary {
	[AppMutationEndpointName.updateProfileInfo]: UpdateProfileInfoBaseRequest;
	[AppMutationEndpointName.updateAvatar]: UpdateAvatarBaseRequest;
	[AppMutationEndpointName.addCard]: AddCardBaseRequest;
	[AppMutationEndpointName.deleteCard]: DeleteCardBaseRequest;
	[AppMutationEndpointName.likeCard]: LikeCardBaseRequest;
	[AppMutationEndpointName.unlikeCard]: UnlikeCardBaseRequest;
	[AppMutationEndpointName.createUser]: CreateUserBaseRequest;
	[AppMutationEndpointName.login]: LoginBaseRequest;
}

type AppRequestDictionary = AppQueryDictionary & AppMutationDictionary;

export type { AppRequestDictionary };
