import { type UserDataWithoutPassword } from '../resources/user.types';
import {
	type AppQueryEndpointName,
	type AppMutationEndpointName,
} from '../../shared-enums/endpoint-names';
import { type CardData } from '../resources/card.types';

type AppQueryResponsePayloadDictionary = {
	[AppQueryEndpointName.getUsers]: UserDataWithoutPassword[];
	[AppQueryEndpointName.getUser]: UserDataWithoutPassword;
	[AppQueryEndpointName.getCards]: CardData[];
	[AppQueryEndpointName.validateToken]: UserDataWithoutPassword;
};

type AppMutationResponsePayloadDictionary = {
	[AppMutationEndpointName.createUser]: {
		message: 'User created successfuly';
	};
	[AppMutationEndpointName.signIn]: {
		message: 'User logged in successfuly';
	};
	[AppMutationEndpointName.logOut]: { message: 'User logged out successfuly' };
	[AppMutationEndpointName.updateProfileInfo]: UserDataWithoutPassword;
	[AppMutationEndpointName.updateAvatar]: UserDataWithoutPassword;
	[AppMutationEndpointName.addCard]: CardData;
	[AppMutationEndpointName.toggleLike]: CardData;
	[AppMutationEndpointName.likeCard]: CardData;
	[AppMutationEndpointName.unlikeCard]: CardData;
	[AppMutationEndpointName.deleteCard]: CardData;
};

type AppResponsePayloadDictionary = AppQueryResponsePayloadDictionary &
	AppMutationResponsePayloadDictionary;

export type {
	AppResponsePayloadDictionary,
	AppQueryResponsePayloadDictionary,
	AppMutationResponsePayloadDictionary,
};
