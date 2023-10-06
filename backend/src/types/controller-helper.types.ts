import { type Response } from 'express';
import {
	type AppMutationEndpointName,
	type AppQueryEndpointName,
	type AppRequestEndpointName,
} from '@shared/shared-enums/endpoint-names';
import { type AppExpressRequest } from '@shared/shared-types/requests/app-express-request.types';
import { type AppResponsePayloadDictionary } from '@shared/shared-types/requests/app-response-payload-dictionaries.types';

interface ControllerHelperResult<N extends AppRequestEndpointName> {
	request: AppExpressRequest<N>;
	response: Response;
	data: AppResponsePayloadDictionary[N];
}

type QueryControllerHelper<N extends AppQueryEndpointName> = (
	request: AppExpressRequest<N>,
	response: Response,
) => Promise<ControllerHelperResult<N>>;

type MutationControllerHelper<N extends AppMutationEndpointName> = (
	request: AppExpressRequest<N>,
	response: Response,
) => Promise<ControllerHelperResult<N>>;

interface QueryHelperOptions<N extends AppQueryEndpointName> {
	controllerHelper: QueryControllerHelper<N>;
}

interface MutationHelperOptions<N extends AppMutationEndpointName> {
	controllerHelper: MutationControllerHelper<N>;
}

export type {
	ControllerHelperResult,
	QueryControllerHelper,
	MutationControllerHelper,
	QueryHelperOptions,
	MutationHelperOptions,
};
