import type { Response } from 'express';
import type { AppRequestEndpointName } from '../../shared-enums/endpoint-names';
import { type AppResponsePayloadDictionary } from './app-response-payload-dictionaries.types';

type AppResponse<T extends AppRequestEndpointName> = Response<
	AppResponsePayloadDictionary[T]
>;

export type { AppResponse };
