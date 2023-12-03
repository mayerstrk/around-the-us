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
		async: true,
		errorMessage: 'Failed to retrieve cards from the database.',
		errorName: ErrorName.notFound,
	});
	return { request, response, data };
};

const getCardsController = controllerBuilder.query({
	controllerHelper: getCardsControllerHelper,
});

// === Create card ===

const addCardControllerHelper: MutationControllerHelper<
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

const addCardController = controllerBuilder.mutation({
	controllerHelper: addCardControllerHelper,
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
		)
			.populate('likes')
			.orFail(),
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
		)
			.populate('likes')
			.orFail(),
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
		user: { _id: userId },
	} = request;

	const card = await safe({
		value: CardModel.findById(cardId),
		async: true,
		errorMessage: "Couldn't find the requested card",
		errorName: ErrorName.notFound,
		test(card) {
			return String(card.owner) === userId;
		},
		testErrorMessage: "Deletion of other user's posts is not allowed.",
		testErrorName: ErrorName.forbidden,
	});

	const deletedCard = await safe({
		value: card.deleteOne(),
		async: true,
		errorMessage: 'Failed to delete the specified card.',
		errorName: ErrorName.internalServerError,
	});

	return { request, response, data: deletedCard };
};

const deleteCardController = controllerBuilder.mutation({
	controllerHelper: deleteCardControllerHelper,
});

export {
	getCardsController,
	addCardController,
	likeCardController,
	unlikeCardController,
	deleteCardController,
};
