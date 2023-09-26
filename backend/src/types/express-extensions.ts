interface CustomRequestProperties {
	user: {
		_id: string;
	};
	signedCookies: {
		token: string;
	};
}

declare module 'express-serve-static-core' {
	interface Request extends CustomRequestProperties {}
}

export {};
