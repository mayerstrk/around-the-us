import { type Response } from 'express';
import {
	type AppMutationEndpointName,
	type AppQueryEndpointName,
	type AppRequestEndpointName,
} from '@shared/shared-enums/endpoint-names';
import { type AppRequest } from '@shared/shared-types/requests/app-request.types';
import { type AppResponseDictonary } from '@shared/shared-types/requests/app-response-dictionaries.types';

interface ControllerHelperResult<N extends AppRequestEndpointName> {
	request: AppRequest<N>;
	response: Response;
	data: AppResponseDictonary[N]['body'];
}

type QueryControllerHelper<N extends AppQueryEndpointName> = (
	request: AppRequest<N>,
	response: Response,
) => Promise<ControllerHelperResult<N>>;

type MutationControllerHelper<N extends AppMutationEndpointName> = (
	request: AppRequest<N>,
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
