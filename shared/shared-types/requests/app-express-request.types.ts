import { type Request } from 'express';
import { type AppRequestEndpointName } from '../../shared-enums/endpoint-names';
import { type RequestUser } from '../resources/user.types';
import { type AppExpressRequestDictionary } from './app-express-request-dictionaries.types';
import { type AppResponsePayloadDictionary } from './app-response-payload-dictionaries.types';

type AppExpressRequest<N extends AppRequestEndpointName> = {
	user: RequestUser;
} & Request<
	AppExpressRequestDictionary[N]['params'],
	AppResponsePayloadDictionary[N],
	AppExpressRequestDictionary[N]['body']
>;

export type { AppExpressRequest };
