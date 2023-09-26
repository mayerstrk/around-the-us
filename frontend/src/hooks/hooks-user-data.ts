import { createSelector } from '@reduxjs/toolkit';
import {
	useGetUserQuery,
	type UserData,
	type UserDetails,
} from '../features/app-data-api/app-data-api-slice';

const selectUserDetails = createSelector(
	(data: UserData) => data,
	data => ({ name: data.name, about: data.about }),
);

const selectUserId = createSelector(
	(data: UserData) => data._id,
	id => id,
);

const useUserDetails = () => {
	const { userDetails = {} as UserDetails, isSuccess } = useGetUserQuery(
		undefined,
		{
			selectFromResult: ({ data, isSuccess }) => ({
				userDetails: data ? selectUserDetails(data) : undefined,
				isSuccess,
			}),
		},
	);
	return { userDetails, isSuccess };
};

const useUserId = () => {
	const { userId = '', isLoading, isError } = useGetUserQuery(
		undefined,
		{
			selectFromResult: ({ data, isLoading, isError }) => ({
				userId: data ? selectUserId(data) : undefined,
				isError,
				isLoading,
			}),
		},
	);
	return { userId, isLoading, isError };
};

export { useUserDetails, useUserId };
