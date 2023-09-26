import { Navigate } from 'react-router-dom';
import { type ReactElement } from 'react';
import { useAppSelector } from '../../hooks/hooks-redux';
import { RoutesPaths } from '../../utills';

interface ProtectedComponentProps {
	component: ReactElement;
	fallback: RoutesPaths;
}

function ProtectedComponent({ component: Component, fallback = RoutesPaths.logIn }: ProtectedComponentProps) {
	const isUserAuthorized = useAppSelector(state => state.userAuthenticationData.isAuthorized);

	if (isUserAuthorized) {
		return Component;
	}

	return <Navigate to={fallback}/>;
}

export default ProtectedComponent;
