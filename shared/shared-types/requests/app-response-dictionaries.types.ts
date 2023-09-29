import { type Response } from 'express';
import { type UserDocument, type RequestUser } from '../resources/user.types';
import {
	type AppQueryEndpointName,
	type AppMutationEndpointName,
} from '../../shared-enums/endpoint-names';
import { type CardDocument } from '../resources/card.types';

type AppQueryResponseDictionary = {
	[AppQueryEndpointName.getUsers]: { body: UserDocument[] };
	[AppQueryEndpointName.getUser]: { body: UserDocument };
	[AppQueryEndpointName.getCards]: { body: CardDocument[] };
	[AppQueryEndpointName.validateToken]: { body: RequestUser };
};

type AppMutationResponseDictionary = {
	[AppMutationEndpointName.createUser]: { body: UserDocument };
	[AppMutationEndpointName.login]: {
		body: { message: 'Logged in successfully' };
	};
	[AppMutationEndpointName.updateProfileInfo]: { body: UserDocument };
	[AppMutationEndpointName.updateAvatar]: { body: UserDocument };
	[AppMutationEndpointName.addCard]: { body: CardDocument };
	[AppMutationEndpointName.likeCard]: { body: CardDocument };
	[AppMutationEndpointName.unlikeCard]: { body: CardDocument };
	[AppMutationEndpointName.deleteCard]: { body: CardDocument };
};

type AppResponseDictonary = AppQueryResponseDictionary &
	AppMutationResponseDictionary;

export type {
	AppResponseDictonary,
	AppQueryResponseDictionary,
	AppMutationResponseDictionary,
};
