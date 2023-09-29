import process from 'node:process';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import safe from '@shared/shared-helpers/safe';
import { ErrorName } from '@shared/shared-enums/error-names';
import { isRequestUser } from '@shared/shared-helpers/is-request-user';
import controllerBuilder from '../builders/controller-builder/controller-builder';
import {
	type AppMutationEndpointName,
	type AppQueryEndpointName,
} from '../../../shared/shared-enums/endpoint-names';
import { UserModel } from '../models/user-model';
import {
	type MutationControllerHelper,
	type QueryControllerHelper,
} from '../types/controller-helper.types';

// === Get users ===

const getUsersControllerHelper: QueryControllerHelper<
	AppQueryEndpointName.getUsers
> = async (request, response) => {
	const data = await safe({
		value: UserModel.find({}).orFail(),
		async: true,
		errorMessage: 'No users found',
		errorName: ErrorName.notFound,
	});

	return { request, response, data };
};

const getUsersController = controllerBuilder.query({
	controllerHelper: getUsersControllerHelper,
});

// === Get user ===

const getUserControllerHelper: QueryControllerHelper<
	AppQueryEndpointName.getUser
> = async (request, response) => {
	const {
		params: { userId },
	} = request;

	const data = await safe({
		value: UserModel.findById(userId).orFail(),
		async: true,
		errorMessage: 'No user found',
		errorName: ErrorName.notFound,
	});

	return { request, response, data };
};

const getUserController = controllerBuilder.query({
	controllerHelper: getUserControllerHelper,
});

// === Create user ===

const createUserControllerHelper: MutationControllerHelper<
	AppMutationEndpointName.createUser
> = async (request, response) => {
	const {
		body: { email, password },
	} = request;

	const hashedPassword = await safe({
		value: bcrypt.hash(password, 10),
		async: true,
		errorMessage: 'Error hashing password',
		errorName: ErrorName.authentication,
	});

	const data = await safe({
		value: UserModel.create({
			email,
			password: hashedPassword,
		}),
		async: true,
		errorMessage: 'Error creating user',
		errorName: ErrorName.authentication,
	});

	return { request, response, data };
};

const createUserController = controllerBuilder.mutation({
	controllerHelper: createUserControllerHelper,
});

// === Log in ===

const loginControllerHelper: MutationControllerHelper<
	AppMutationEndpointName.login
> = async (request, response) => {
	const {
		body: { email, password },
	} = request;

	const user = await safe({
		value: UserModel.findUserByCredentials(email, password),
		async: true,
		errorMessage: 'Invalid email or password',
		errorName: ErrorName.authentication,
	});

	await safe({
		value: bcrypt.compare(password, user.password),
		async: true,
		test: (isMatch) => isMatch,
		errorMessage: 'Invalid email or password',
		errorName: ErrorName.authentication,
	});

	const token = await safe({
		value: jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, {
			expiresIn: '7d',
		}),
		async: true,
		errorMessage: 'Error creating token',
		errorName: ErrorName.authentication,
	});

	response.cookie('token', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		signed: true,
	});

	return {
		request,
		response,
		data: {
			message: 'Logged in successfully',
		},
	};
};

const loginController = controllerBuilder.mutation({
	controllerHelper: loginControllerHelper,
});

// === Validate Token ===

const validateTokenControllerHelper: QueryControllerHelper<
	AppQueryEndpointName.validateToken
> = async (request, response) => {
	const token = await safe({
		value: request.signedCookies?.token as string | undefined,
		errorMessage: 'No token provided',
		errorName: ErrorName.authentication,
	});

	const decoded = await safe({
		value: jwt.verify(token, process.env.JWT_SECRET!),
		errorMessage: 'Invalid token format.',
		errorName: ErrorName.authentication,
		typeguard: isRequestUser,
	});

	return {
		request,
		response,
		data: decoded,
	};
};

const validateTokenController = controllerBuilder.query({
	controllerHelper: validateTokenControllerHelper,
});

// === Update profile info ===

const updateProfileInfoControllerHelper: MutationControllerHelper<
	AppMutationEndpointName.updateProfileInfo
> = async (request, response) => {
	const { user, body } = request;

	const data = await safe({
		value: UserModel.findByIdAndUpdate(user._id, body, {
			new: true,
			runValidators: true,
		}).orFail(),
		async: true,
		errorMessage: 'Error updating profile info',
		errorName: ErrorName.notFound,
	});

	return { request, response, data };
};

const updateProfileInfoController = controllerBuilder.mutation({
	controllerHelper: updateProfileInfoControllerHelper,
});

// === Update avatar ===

const updateAvatarControllerHelper: MutationControllerHelper<
	AppMutationEndpointName.updateAvatar
> = async (request, response) => {
	const { user, body } = request;

	const data = await safe({
		value: UserModel.findByIdAndUpdate(user._id, body, {
			new: true,
			runValidators: true,
		}).orFail(),
		async: true,
		errorMessage: 'Error updating avatar',
		errorName: ErrorName.notFound,
	});

	return { request, response, data };
};

const updateAvatarController = controllerBuilder.mutation({
	controllerHelper: updateAvatarControllerHelper,
});

export {
	getUsersController,
	getUserController,
	createUserController,
	loginController,
	updateProfileInfoController,
	updateAvatarController,
	validateTokenController,
};
