type GetUserBaseRequest = {
	params: { userId: string };
	body: Record<string, never>;
};

type GetUsersBaseRequest = {
	params: Record<string, never>;
	body: Record<string, never>;
};

type GetCardsBaseRequest = {
	params: Record<string, never>;
	body: Record<string, never>;
};

type ValidateTokenBaseRequest = {
	params: Record<string, never>;
	body: Record<string, never>;
};

export type {
	GetUserBaseRequest,
	GetUsersBaseRequest,
	GetCardsBaseRequest,
	ValidateTokenBaseRequest,
};
