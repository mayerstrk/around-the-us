import { type Request } from 'express';
import { type AppRequestEndpointName } from '../../shared-enums/endpoint-names';
import { type AppRequestDictionary } from './app-request-dictionaries.types';
import { type AppResponseDictonary } from './app-response-dictionaries.types';

type AppRequest<T extends AppRequestEndpointName> = Request<
	AppRequestDictionary[T]['params'],
	AppResponseDictonary[T]['body'],
	AppRequestDictionary[T]['body']
>;

export type { AppRequest };
