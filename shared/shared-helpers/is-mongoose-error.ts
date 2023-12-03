import { MongoServerError } from "mongodb";

function isMongoServerError(error: unknown): error is MongoServerError {
	return error instanceof MongoServerError;
}

export { isMongoServerError };
