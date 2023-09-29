const enum AppQueryEndpointName {
	'getUsers' = 'getUsers',
	'getUser' = 'getUser',
	'getCards' = 'getCards',
	'validateToken' = 'validateToken',
}

const enum AppMutationEndpointName {
	'createUser' = 'createUser',
	'addCard' = 'addCard',
	'deleteCard' = 'deleteCard',
	'updateAvatar' = 'updateAvatar',
	'updateProfileInfo' = 'updateProfileInfo',
	'likeCard' = 'likeCard',
	'unlikeCard' = 'unlikeCard',
	'login' = 'login',
}

type AppRequestEndpointName = AppMutationEndpointName | AppQueryEndpointName;

export type {
	AppRequestEndpointName,
	AppQueryEndpointName,
	AppMutationEndpointName,
};
