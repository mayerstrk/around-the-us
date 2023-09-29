import { type Request } from 'express';
import { type AppRequestEndpointName } from '../../shared-enums/endpoint-names';
import { type AppRequestDictionary } from './app-requests-dictionaries.types';

type AppRequest<T extends AppRequestEndpointName> = Request<
	AppRequestDictionary[T]['params'],
	unknown,
	AppRequestDictionary[T]['body']
>;

export type { AppRequest };
