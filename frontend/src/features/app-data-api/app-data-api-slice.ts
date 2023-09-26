/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface UserDetails {
	name: string;
	about: string;
}

export interface UserData extends UserDetails {
	avatar: string;
	_id: string;
	cohort: string;
}

export interface BaseCardData {
	name: string;
	link: string;
}

export interface CardData extends BaseCardData {
	_id: string;
	createdAt: string;
	likes: UserData[];
	owner: UserData;
}

export const appDataApiSlice = createApi({
	reducerPath: 'appDataApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://around.nomoreparties.co/v1/cohort-3-en',
		prepareHeaders(headers) {
			headers.set('authorization', '0025f74a-7d55-4e26-bbb6-faf6f78aefcc');
			return headers;
		},
	}),
	tagTypes: ['User', 'Cards'],
	endpoints: builder => ({
		getUser: builder.query<UserData, string | void>({
			query(user = 'me') {
				return `users/${user}`;
			},
			providesTags: ['User'],
		}),
		getCards: builder.query<CardData[], void>({
			query() {
				return 'cards';
			},
			providesTags: ['Cards'],
		}),
		updateProfileInfo: builder.mutation<UserData, Partial<UserDetails>>({
			query({ ...patch }) {
				return {
					url: 'users/me',
					method: 'PATCH',
					body: patch,
				};
			},
			invalidatesTags: ['User'],
		}),
		updateAvatar: builder.mutation<UserData, [user: string | void, patch: { avatar: string }]>({
			query([user = 'me', patch]) {
				return {
					url: `users/${user}/avatar`,
					method: 'PATCH',
					body: patch,
				};
			},
			invalidatesTags: ['User'],
		}),
		addCard: builder.mutation<CardData[], BaseCardData>({
			query({ ...post }) {
				return {
					url: 'cards',
					method: 'POST',
					body: post,
				};
			},
			invalidatesTags: ['Cards'],
		}),
		deleteCard: builder.mutation<{ message: string }, string>({
			query(cardId) {
				return {
					url: `cards/${cardId}`,
					method: 'DELETE',
				};
			},
			invalidatesTags: ['Cards'],
		}),
		toggleLike: builder.mutation<
		CardData,
		{ cardId: string; isLiked: boolean }
		>({
			query({ cardId, isLiked }) {
				return {
					url: `cards/likes/${cardId}`,
					method: isLiked ? 'DELETE' : 'PUT',
				};
			},
			async onQueryStarted({ cardId }, { dispatch, queryFulfilled }) {
				try {
					const { data: updatedCard } = await queryFulfilled;
					dispatch(
						appDataApiSlice.util.updateQueryData('getCards', undefined, draft => {
							const card = draft.find(cardData => cardData._id === cardId);
							if (card) {
								Object.assign(card, updatedCard);
							}
						}),
					);
				} catch {
					throw new Error(`Failed to update cache state for card ${cardId}`);
				}
			},
		}),
	}),
});

export const {
	useGetCardsQuery,
	useGetUserQuery,
	useUpdateProfileInfoMutation,
	useUpdateAvatarMutation,
	useAddCardMutation,
	useDeleteCardMutation,
	useToggleLikeMutation,
} = appDataApiSlice;
