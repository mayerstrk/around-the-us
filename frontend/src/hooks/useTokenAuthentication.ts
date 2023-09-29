import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks-redux';
import { userAuthorized, userLoggedOut } from '../../features/user-authentication-data/user-authentication-data-slice';
import { logInMutation, registerMutation, type UserCredentials, validateTokenQuery } from '../../features/auth-api/auth-api';
import { RoutesPaths } from '../../utills';

interface QueryResults {
	isSuccess: boolean | undefined;
	isError: boolean | undefined;
	error: unknown;
}

const useTokenAuthentication = () => {
	const [isTokenPersisted, setIsTokenPersisted] = useState<boolean | undefined>(undefined);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { pathname } = useLocation();

	useEffect(() => {
		const await validateTokenQuery()
				.then(({ data }) => {
					dispatch(userAuthorized(data));
					navigate(RoutesPaths.home);
				})
				.catch(error => {
					console.error('Error validating token:', error);
					logOut();
				});
		}
	}, [isTokenPersisted]);

	async function setToken(credentials: UserCredentials): Promise<QueryResults> {
		try {
			await logInMutation(credentials);
			setIsTokenPersisted(true);
			return { isSuccess: true, isError: false, error: null };
		} catch (error) {
			return { isSuccess: false, isError: true, error };
		}
	}

	async function register(credentials: UserCredentials): Promise<QueryResults> {
		try {
			await registerMutation(credentials);
			return { isSuccess: true, isError: false, error: null };
		} catch (error) {
			return { isSuccess: false, isError: true, error };
		}
	}

	function logOut() {
		Cookies.remove('jwt');
		setIsTokenPersisted(false);
		dispatch(userLoggedOut());
	}

	return {
		setToken,
		register,
		logOut,
	};
};

export type TokenAuthenticationMethods = ReturnType<typeof useTokenAuthentication>;
export default useTokenAuthentication;
