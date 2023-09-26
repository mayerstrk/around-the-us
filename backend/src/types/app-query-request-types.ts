interface GetUserBaseRequest {
	params: { userId: string };
	body: Record<string, never>;
}

interface GetUsersBaseRequest {
	params: Record<string, never>;
	body: Record<string, never>;
}

interface GetCardsBaseRequest {
	params: Record<string, never>;
	body: Record<string, never>;
}

interface ValidateTokenBaseRequest {
	params: Record<string, never>;
	body: Record<string, never>;
}

export type {
	GetUserBaseRequest,
	GetUsersBaseRequest,
	GetCardsBaseRequest,
	ValidateTokenBaseRequest,
};
