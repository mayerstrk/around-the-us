type RequestUser = {
	_id: string;
};

type UserDetails = {
	name: string;
	about: string;
};

type UserCredentials = {
	email: string;
	password: string;
};

export type { RequestUser, UserDetails, UserCredentials };
