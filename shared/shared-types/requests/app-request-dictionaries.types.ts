import {
	type AppQueryEndpointName,
	type AppMutationEndpointName,
} from '../../shared-enums/endpoint-names';
import { type CardInput } from '../resources/card.types';
import {
	type UserCredentials,
	type UserDetails,
} from '../resources/user.types';

type AppQueryDictionary = {
	[AppQueryEndpointName.getUser]: {
		params: { userId: string };
		body: Record<string, never>;
	};
	[AppQueryEndpointName.getUsers]: {
		params: Record<string, never>;
		body: Record<string, never>;
	};
	[AppQueryEndpointName.getCards]: {
		params: Record<string, never>;
		body: Record<string, never>;
	};
	[AppQueryEndpointName.validateToken]: {
		params: Record<string, never>;
		body: Record<string, never>;
	};
};

type AppMutationDictionary = {
	[AppMutationEndpointName.updateProfileInfo]: {
		params: Record<string, never>;
		body: UserDetails;
	};
	[AppMutationEndpointName.updateAvatar]: {
		params: Record<string, never>;
		body: {
			avatar: string;
		};
	};
	[AppMutationEndpointName.addCard]: {
		params: Record<string, never>;
		body: CardInput;
	};
	[AppMutationEndpointName.deleteCard]: {
		params: { cardId: string };
		body: Record<string, never>;
	};
	[AppMutationEndpointName.likeCard]: {
		params: { cardId: string };
		body: Record<string, never>;
	};
	[AppMutationEndpointName.unlikeCard]: {
		params: { cardId: string };
		body: Record<string, never>;
	};
	[AppMutationEndpointName.createUser]: {
		params: Record<string, never>;
		body: UserCredentials;
	};
	[AppMutationEndpointName.login]: {
		params: Record<string, never>;
		body: UserCredentials;
	};
};

type AppRequestDictionary = AppQueryDictionary & AppMutationDictionary;

export type { AppQueryDictionary, AppMutationDictionary, AppRequestDictionary };
