import { Navigate } from 'react-router-dom';
import { type ReactNode } from 'react';
import { type RoutesPaths } from '../../utils';
import { useValidateTokenQuery } from '../../features/app-data-api/app-data-api-slice';
import ProcessLoadingBar from '../ProcessLoadingBar/process-loading-bar';

interface ProtectedComponentProps {
	children: ReactNode;
	fallback: RoutesPaths;
}

function ProtectedComponent({ children, fallback }: ProtectedComponentProps) {
	const {
		isLoading: isValidateTokenLoading,
		isError: isValidateTokenError,
		isSuccess,
	} = useValidateTokenQuery();
	return (
		<>
			{isValidateTokenLoading && <ProcessLoadingBar />}
			{isSuccess && children}
			{isValidateTokenError && <Navigate to={fallback} />}
		</>
	);
}

export default ProtectedComponent;
