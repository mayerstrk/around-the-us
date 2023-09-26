const enum Status {
	ok = 200,
	badRequest = 400,
	unauthorized = 401,
	forbidden = 403, // Added for authorization error
	notFound = 404,
	internalServerError = 500,
}

export { Status };
