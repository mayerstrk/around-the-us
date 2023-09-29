import axios, { type AxiosResponse, type AxiosError, isAxiosError } from 'axios';

export interface UserIdentifiers {
	_id: string;
}

export interface UserCredentials {
	email: string;
	password: string;
}

export interface UserToken {
	token: string;
}

export interface AuthApiError {
	error: string;
}

export type AxiosAuthApiError = AxiosError<AuthApiError>;

const baseAuthApi = axios.create({
	baseURL: 'https://register.nomoreparties.co',
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});

const handleApiError = (error: unknown): string => {
	if (isAxiosError<AuthApiError>(error)) {
		if (error.response) {
			// Ensuring that we are returning a string
			return error.response.data.error || `Error Status: ${error.response.status}`;
		}

		if (error.request) {
			return 'No response from the server.';
		}

		return error.message;
	}

	return 'An unknown error occurred.';
};

const authApi = {
	async logIn(credentials: UserCredentials): Promise<AxiosResponse<void>> {
		try {
			return await baseAuthApi.post<UserToken>('/signin', credentials);
		} catch (error) {
			throw new Error(handleApiError(error));
		}
	},

	async register(credentials: UserCredentials): Promise<AxiosResponse<UserIdentifiers>> {
		try {
			return await baseAuthApi.post<UserIdentifiers>('/signup', credentials);
		} catch (error) {
			throw new Error(handleApiError(error));
		}
	},

	async validateToken(): Promise<AxiosResponse<UserIdentifiers>> {
		try {
			return await baseAuthApi.get<UserIdentifiers>('/users/me');
		} catch (error) {
			throw new Error(handleApiError(error));
		}
	},
};

export const {
	logIn: logInMutation,
	register: registerMutation,
	validateToken: validateTokenQuery,
} = authApi;
