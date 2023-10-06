declare namespace Express {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	export interface Request {
		user: {
			_id: string;
		};
	}
}
