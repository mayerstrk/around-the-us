import e, { type Response } from 'express';
import {
	type AppMutationEndpointName,
	type AppQueryEndpointName,
	type AppRequestEndpointName,
} from '../enums/endpoint-names';
import { type AppRequest } from './app-request-types';

interface ControllerHelperResult<N extends AppRequestEndpointName> {
	request: AppRequest<N>;
	response: Response;
	data: unknown;
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
	QueryControllerHelper,
	MutationControllerHelper,
	QueryHelperOptions,
	MutationHelperOptions,
};
