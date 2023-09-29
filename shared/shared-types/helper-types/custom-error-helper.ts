type CustomError<T, ErrorMessage> = T extends any
	? { _?: ErrorMessage }
	: never;

export type { CustomError };
