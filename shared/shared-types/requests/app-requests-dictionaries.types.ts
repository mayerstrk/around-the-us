import {
	type AppQueryEndpointName,
	type AppMutationEndpointName,
} from '../../shared-enums/endpoint-names';
import {
	type GetUserBaseRequest,
	type GetUsersBaseRequest,
	type GetCardsBaseRequest,
	type ValidateTokenBaseRequest,
} from './app-queries.types';
import {
	type UpdateProfileInfoBaseRequest,
	type UpdateAvatarBaseRequest,
	type AddCardBaseRequest,
	type DeleteCardBaseRequest,
	type LikeCardBaseRequest,
	type UnlikeCardBaseRequest,
	type CreateUserBaseRequest,
	type LoginBaseRequest,
} from './app-mutations.types';

type AppQueryDictionary = {
	[AppQueryEndpointName.getUser]: GetUserBaseRequest;
	[AppQueryEndpointName.getUsers]: GetUsersBaseRequest;
	[AppQueryEndpointName.getCards]: GetCardsBaseRequest;
	[AppQueryEndpointName.validateToken]: ValidateTokenBaseRequest;
};

type AppMutationDictionary = {
	[AppMutationEndpointName.updateProfileInfo]: UpdateProfileInfoBaseRequest;
	[AppMutationEndpointName.updateAvatar]: UpdateAvatarBaseRequest;
	[AppMutationEndpointName.addCard]: AddCardBaseRequest;
	[AppMutationEndpointName.deleteCard]: DeleteCardBaseRequest;
	[AppMutationEndpointName.likeCard]: LikeCardBaseRequest;
	[AppMutationEndpointName.unlikeCard]: UnlikeCardBaseRequest;
	[AppMutationEndpointName.createUser]: CreateUserBaseRequest;
	[AppMutationEndpointName.login]: LoginBaseRequest;
};

type AppRequestDictionary = AppQueryDictionary & AppMutationDictionary;

export type { AppQueryDictionary, AppMutationDictionary, AppRequestDictionary };
