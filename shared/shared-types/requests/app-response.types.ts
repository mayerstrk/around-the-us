import type { Response } from 'express';
import type { AppRequestEndpointName } from '../../shared-enums/endpoint-names';
import { type AppResponseDictonary } from './app-response-dictionaries.types';

type AppResponse<T extends AppRequestEndpointName> = Response<
	AppResponseDictonary[T]['body']
>;

export type { AppResponse };
