import { createSelector } from '@reduxjs/toolkit';
import { type AppResponsePayloadDictionary } from '@shared/shared-types/requests/app-response-payload-dictionaries.types';
import { type AppQueryEndpointName } from '@shared/shared-enums/endpoint-names';
import { useGetUserQuery } from '../features/app-data-api/app-data-api-slice';

const selectUserDetails = createSelector(
	(data: AppResponsePayloadDictionary[AppQueryEndpointName.getUser]) => data,
	(data) => ({ name: data.name, about: data.about }),
);

const selectUserId = createSelector(
	(data: AppResponsePayloadDictionary[AppQueryEndpointName.getUser]) => data,
	(data) => data._id,
);

const useUserDetails = () => {
	const { userDetails, isSuccess } = useGetUserQuery(undefined, {
		selectFromResult: ({ data, isSuccess }) => ({
			userDetails: data ? selectUserDetails(data) : undefined,
			isSuccess,
		}),
	});
	return { userDetails, isSuccess };
};

const useUserId = () => {
	const {
		userId = '',
		isLoading,
		isError,
	} = useGetUserQuery(undefined, {
		selectFromResult: ({ data, isLoading, isError }) => ({
			userId: data ? selectUserId(data) : undefined,
			isError,
			isLoading,
		}),
	});
	return { userId, isLoading, isError };
};

export { useUserDetails, useUserId };
