import safe from '@shared/shared-helpers/safe';
import { ErrorName } from '@shared/shared-enums/error-names';
import controllerBuilder from '../builders/controller-builder/controller-builder';
import {
	type AppMutationEndpointName,
	type AppQueryEndpointName,
} from '../../../shared/shared-enums/endpoint-names';
import { CardModel } from '../models/card-model';
import {
	type MutationControllerHelper,
	type QueryControllerHelper,
} from '../types/controller-helper.types';

// === Get cards ===

const getCardsControllerHelper: QueryControllerHelper<
	AppQueryEndpointName.getCards
> = async (request, response) => {
	const data = await safe({
		value: CardModel.find({}),
		errorMessage: 'Failed to retrieve cards from the database.',
		errorName: ErrorName.notFound,
		async: true,
	});
	return { request, response, data };
};

const getCardsController = controllerBuilder.query({
	controllerHelper: getCardsControllerHelper,
});

// === Create card ===

const createCardControllerHelper: MutationControllerHelper<
	AppMutationEndpointName.addCard
> = async (request, response) => {
	const { body, user } = request;
	const data = await safe({
		value: CardModel.create({ ...body, owner: user._id }),
		errorMessage: 'Failed to create a new card in the database.',
		errorName: ErrorName.internalServerError,
		async: true,
	});
	return { request, response, data };
};

const createCardController = controllerBuilder.mutation({
	controllerHelper: createCardControllerHelper,
});

// === Like card ===
const likeCardControllerHelper: MutationControllerHelper<
	AppMutationEndpointName.likeCard
> = async (request, response) => {
	const {
		params: { cardId },
		user,
	} = request;
	const data = await safe({
		value: CardModel.findByIdAndUpdate(
			cardId,
			{ $addToSet: { likes: user._id } },
			{ new: true, runValidators: true },
		),
		errorMessage: 'Failed to add a like to the specified card.',
		errorName: ErrorName.internalServerError,
		async: true,
	});
	return { request, response, data };
};

const likeCardController = controllerBuilder.mutation({
	controllerHelper: likeCardControllerHelper,
});

// === Unlike card ===

const unlikeCardControllerHelper: MutationControllerHelper<
	AppMutationEndpointName.unlikeCard
> = async (request, response) => {
	const {
		params: { cardId },
		user,
	} = request;
	const data = await safe({
		value: CardModel.findByIdAndUpdate(
			cardId,
			{ $pull: { likes: user._id } },
			{ new: true },
		),
		errorMessage: 'Failed to remove a like from the specified card.',
		errorName: ErrorName.internalServerError,
		async: true,
	});
	return { request, response, data };
};

const unlikeCardController = controllerBuilder.mutation({
	controllerHelper: unlikeCardControllerHelper,
});

// === Delete card ===

const deleteCardControllerHelper: MutationControllerHelper<
	AppMutationEndpointName.deleteCard
> = async (request, response) => {
	const {
		params: { cardId },
	} = request;
	const data = await safe({
		value: CardModel.findByIdAndDelete(cardId),
		errorMessage: 'Failed to delete the specified card from the database.',
		errorName: ErrorName.internalServerError,
		async: true,
	});
	return { request, response, data };
};

const deleteCardController = controllerBuilder.mutation({
	controllerHelper: deleteCardControllerHelper,
});

export {
	getCardsController,
	createCardController,
	likeCardController,
	unlikeCardController,
	deleteCardController,
};
