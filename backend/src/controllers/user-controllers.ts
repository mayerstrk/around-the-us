import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import safe from '@shared/shared-helpers/safe';
import { ErrorName } from '@shared/shared-enums/error-names';
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
import { MongoServerError } from 'mongodb';
// eslint-disable-next-line unicorn/prevent-abbreviations
import { env } from '../environment-config';

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
		user: { _id: userId },
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
		errorName: ErrorName.internalServerError,
	});

	const user = await safe({
		value: UserModel.create({
			email,
			password: hashedPassword,
		}),
		async: true,
		errorHandler(error) {
			if ((error as MongoServerError).code === 11_000) {
				return {
					errorMessage: 'User with this email already exists',
					errorName: ErrorName.conflict,
				};
			}

			return {
				errorMessage: 'Error creating user test',
				errorName: ErrorName.internalServerError,
			};
		},
	});

	const token = await safe({
		value: jwt.sign({ _id: user._id }, env.JWT_SECRET, {
			expiresIn: '7d',
		}),
		async: true,
		errorMessage: 'Error signing token',
		errorName: ErrorName.internalServerError,
	});

	response.cookie('token', token, {
		httpOnly: true,
		secure: true,
		domain: env.DOMAIN_NAME,
		sameSite: 'strict',
		signed: true,
	});

	return { request, response, data: { message: 'User created successfuly' } };
};

const createUserController = controllerBuilder.mutation({
	controllerHelper: createUserControllerHelper,
});

// === Log in ===

const signInControllerHelper: MutationControllerHelper<
	AppMutationEndpointName.signIn
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
		errorMessage: 'Invalid email or password',
		errorName: ErrorName.authentication,
		test: (isMatch) => isMatch,
	});

	const token = await safe({
		value: jwt.sign({ _id: user._id }, env.JWT_SECRET, {
			expiresIn: '7d',
		}),
		async: true,
		errorMessage: 'Error creating token',
		errorName: ErrorName.internalServerError,
	});

	response.cookie('token', token, {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		domain: env.DOMAIN_NAME,
		signed: true,
	});

	return {
		request,
		response,
		data: {
			message: 'User logged in successfuly',
		},
	};
};

const signInController = controllerBuilder.mutation({
	controllerHelper: signInControllerHelper,
});

// === Validate Token ===

const validateTokenControllerHelper: QueryControllerHelper<
	AppQueryEndpointName.validateToken
> = async (request, response) => {
	const user = await safe({
		value: UserModel.findById(request.user._id),
		async: true,
		errorMessage: 'Invalid user ID',
		errorName: ErrorName.notFound,
	});

	return {
		request,
		response,
		data: user,
	};
};

const validateTokenController = controllerBuilder.query({
	controllerHelper: validateTokenControllerHelper,
});

// === Log out ===

const logOutControllerHelper: MutationControllerHelper<
	AppMutationEndpointName.logOut
> = async (request, response) => {
	response.clearCookie('token');

	return {
		request,
		response,
		data: { message: 'User logged out successfuly' },
	};
};

const logOutController = controllerBuilder.mutation({
	controllerHelper: logOutControllerHelper,
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
	signInController,
	logOutController,
	updateProfileInfoController,
	updateAvatarController,
	validateTokenController,
};
