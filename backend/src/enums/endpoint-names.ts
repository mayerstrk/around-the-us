const enum AppQueryEndpointName {
	'getUsers',
	'getUser',
	'getCards',
	'validateToken',
}

const enum AppMutationEndpointName {
	'createUser',
	'addCard',
	'deleteCard',
	'updateAvatar',
	'updateProfileInfo',
	'likeCard',
	'unlikeCard',
	'login',
}

type AppRequestEndpointName = AppMutationEndpointName | AppQueryEndpointName;

export type {
	AppRequestEndpointName,
	AppQueryEndpointName,
	AppMutationEndpointName,
};
