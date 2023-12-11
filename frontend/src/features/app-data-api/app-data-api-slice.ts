/* React-specific entry point that automatically generates
	 hooks corresponding to the defined endpoints */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
	type AppMutationEndpointName,
	type AppQueryEndpointName,
} from '@shared/shared-enums/endpoint-names';
import { type AppResponsePayloadDictionary } from '@shared/shared-types/requests/app-response-payload-dictionaries.types';
import { type CardInput } from '@shared/shared-types/resources/card.types';
import {
	type UserDetails,
	type UserCredentials,
	type UserAvatar,
} from '@shared/shared-types/resources/user.types';
import { userFetched, userLoggedOut } from '../current-user/current-user-slice';
import { setErrorMessage } from '../error/error-slice';

const baseUrl =
	import.meta.env.VITE_API_BASE_URL ?? 'https://127.0.0.1:3001/around';

export const appDataApiSlice = createApi({
	reducerPath: 'appDataApi',
	baseQuery: fetchBaseQuery({
		baseUrl,
		credentials: 'include',
	}),
	tagTypes: ['User', 'Cards', 'Authorized'],
	endpoints: (builder) => ({
		createUser: builder.mutation<
			AppResponsePayloadDictionary[AppMutationEndpointName.createUser],
			UserCredentials
		>({
			query(credentials) {
				return {
					url: 'signup',
					method: 'POST',
					body: credentials,
					skipCache: true,
					withCredentials: true,
				};
			},
			transformResponse: (response: {
				data: AppResponsePayloadDictionary[AppMutationEndpointName.createUser];
			}) => response.data,
		}),
		signIn: builder.mutation<
			AppResponsePayloadDictionary[AppMutationEndpointName.signIn],
			UserCredentials
		>({
			query(credentials) {
				return {
					url: 'signin',
					method: 'POST',
					body: credentials,
					skipCache: true,
				};
			},
			transformResponse: (response: {
				data: AppResponsePayloadDictionary[AppMutationEndpointName.signIn];
			}) => response.data,
			invalidatesTags: ['Authorized'],
		}),
		logOut: builder.mutation<
			AppResponsePayloadDictionary[AppMutationEndpointName.logOut],
			void
		>({
			query() {
				return {
					url: 'logout',
					method: 'POST',
					skipCache: true,
				};
			},
			transformResponse: (response: {
				data: AppResponsePayloadDictionary[AppMutationEndpointName.logOut];
			}) => response.data,
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(userLoggedOut());
				} catch {
					dispatch(setErrorMessage('Failed to log out'));
				}
			},
			invalidatesTags: ['Authorized', 'Cards', 'User'],
		}),
		validateToken: builder.query<
			AppResponsePayloadDictionary[AppQueryEndpointName.validateToken],
			void
		>({
			query() {
				return {
					url: 'auth',
					method: 'GET',
					skipCache: true,
				};
			},
			transformResponse: (response: {
				data: AppResponsePayloadDictionary[AppQueryEndpointName.validateToken];
			}) => response.data,
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const { data: user } = await queryFulfilled;
					dispatch(userFetched(user));
				} catch {
					dispatch(appDataApiSlice.endpoints.logOut.initiate());
					dispatch(setErrorMessage('Failed to validate token'));
				}
			},
			providesTags: ['Authorized'],
		}),
		getUser: builder.query<
			AppResponsePayloadDictionary[AppQueryEndpointName.getUser],
			void
		>({
			query() {
				return 'users/me';
			},
			providesTags: ['User'],
			transformResponse: (response: {
				data: AppResponsePayloadDictionary[AppQueryEndpointName.getUser];
			}) => response.data,
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const { data: user } = await queryFulfilled;
					dispatch(userFetched(user));
				} catch {
					dispatch(setErrorMessage('Failed to fetch user'));
				}
			},
		}),
		getCards: builder.query<
			AppResponsePayloadDictionary[AppQueryEndpointName.getCards],
			void
		>({
			query() {
				return 'cards';
			},
			providesTags: ['Cards'],
			transformResponse: (response: {
				data: AppResponsePayloadDictionary[AppQueryEndpointName.getCards];
			}) => response.data,
		}),
		updateProfileInfo: builder.mutation<
			AppResponsePayloadDictionary[AppMutationEndpointName.updateProfileInfo],
			Partial<UserDetails>
		>({
			query({ ...patch }) {
				return {
					url: 'users/me',
					method: 'PATCH',
					body: patch,
				};
			},
			invalidatesTags: ['User'],
			transformResponse: (response: {
				data: AppResponsePayloadDictionary[AppMutationEndpointName.updateProfileInfo];
			}) => response.data,
		}),
		updateAvatar: builder.mutation<
			AppResponsePayloadDictionary[AppMutationEndpointName.updateAvatar],
			UserAvatar
		>({
			query(patch) {
				return {
					url: 'users/me/avatar',
					method: 'PATCH',
					body: patch,
				};
			},
			invalidatesTags: ['User'],
			transformResponse: (response: {
				data: AppResponsePayloadDictionary[AppMutationEndpointName.updateAvatar];
			}) => response.data,
		}),
		addCard: builder.mutation<
			AppResponsePayloadDictionary[AppMutationEndpointName.addCard],
			CardInput
		>({
			query({ ...post }) {
				return {
					url: 'cards',
					method: 'POST',
					body: post,
				};
			},
			invalidatesTags: ['Cards'],
			transformResponse: (response: {
				data: AppResponsePayloadDictionary[AppMutationEndpointName.addCard];
			}) => response.data,
		}),
		deleteCard: builder.mutation<
			AppResponsePayloadDictionary[AppMutationEndpointName.deleteCard],
			string
		>({
			query(cardId) {
				return {
					url: `cards/${cardId}`,
					method: 'DELETE',
				};
			},
			invalidatesTags: ['Cards'],
			transformResponse: (response: {
				data: AppResponsePayloadDictionary[AppMutationEndpointName.deleteCard];
			}) => response.data,
		}),
		toggleLike: builder.mutation<
			AppResponsePayloadDictionary[AppMutationEndpointName.toggleLike],
			{ cardId: string; isLiked: boolean }
		>({
			query({ cardId, isLiked }) {
				return {
					url: `cards/${cardId}/likes`,
					method: isLiked ? 'DELETE' : 'PUT',
					skipCache: true,
				};
			},
			transformResponse: (response: {
				data: AppResponsePayloadDictionary[AppMutationEndpointName.toggleLike];
			}) => response.data,
			async onQueryStarted({ cardId }, { dispatch, queryFulfilled }) {
				try {
					const { data: updatedCard } = await queryFulfilled;
					dispatch(
						appDataApiSlice.util.updateQueryData(
							'getCards',
							undefined,
							(draft) => {
								const card = draft.find((cardData) => cardData._id === cardId);
								if (card) {
									Object.assign(card, updatedCard);
								}
							},
						),
					);
				} catch {
					dispatch(
						setErrorMessage(`Failed to update cache state for card ${cardId}`),
					);
				}
			},
		}),
	}),
});

export const {
	useCreateUserMutation,
	useSignInMutation,
	useLogOutMutation,
	useValidateTokenQuery,
	useGetCardsQuery,
	useGetUserQuery,
	useUpdateProfileInfoMutation,
	useUpdateAvatarMutation,
	useAddCardMutation,
	useDeleteCardMutation,
	useToggleLikeMutation,
} = appDataApiSlice;
