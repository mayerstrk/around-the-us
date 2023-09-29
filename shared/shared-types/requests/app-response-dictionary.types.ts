import { type Response } from 'express';
import { type UserDocument } from '../resources/user.types';
import {
	type AppQueryEndpointName,
	type AppMutationEndpointName,
} from '../../shared-enums/endpoint-names';
import { type AppRequest } from './app-request.types';

type AppQueryResponseDicroionary = {
	[AppQueryEndpointName.getUsers]: {
		request: AppRequest<AppQueryEndpointName.getUsers>;
		response: Response;
		data: UserDocument[];
	};
	[AppQueryEndpointName.getUser]: {
		request: AppRequest<AppQueryEndpointName.getUser>;
		response: Response;
		data: UserDocument;
	};
};

type AppMutationResopnseDictionary = {
	[AppMutationEndpointName.createUser]: {
		request: AppRequest<AppMutationEndpointName.createUser>;
		response: Response;
		data: UserDocument;
	};
	[AppMutationEndpointName.login]: {
		request: AppRequest<AppMutationEndpointName.login>;
		response: Response;
		data: {
			message: 'Logged in successfully';
		};
	};
	[AppMutationEndpointName.updateProfileInfo]: {
		request: AppRequest<AppMutationEndpointName.updateProfileInfo>;
		response: Response;
		data: UserDocument;
	};
	[AppMutationEndpointName.updateAvatar]: {
		request: AppRequest<AppMutationEndpointName.updateAvatar>;
		response: Response;
		data: UserDocument;
	};
};

export type { AppQueryResponseDicroionary, AppMutationResopnseDictionary };
