const enum ErrorName {
	validation = 'ValidationError',
	notFound = 'DocumentNotFoundError',
	cast = 'CastError',
	duplicateKey = 'MongoError',
	authentication = 'AuthenticationError',
	authorization = 'AuthorizationError',
	internalServerError = 'InternalServerError',
	forbidden = 'ForbiddenError',
	conflict = 'ConflictError',
	badRequest = "BadRequestError"
}

export { ErrorName };
