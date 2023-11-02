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
	'signIn' = 'signIn',
	'logOut' = 'logOut',
	'toggleLike' = 'toggleLike',
}

type AppRequestEndpointName = AppMutationEndpointName | AppQueryEndpointName;

export type {
	AppRequestEndpointName,
	AppQueryEndpointName,
	AppMutationEndpointName,
};
