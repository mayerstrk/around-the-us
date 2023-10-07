import { Navigate } from 'react-router-dom';
import { type ReactNode } from 'react';
import { type RoutesPaths } from '../../utills';
import { useValidateTokenQuery } from '../../features/app-data-api/app-data-api-slice';
import ProcessLoadingBar from '../ProcessLoadingBar/ProcessLoadingBar';

interface ProtectedComponentProps {
	children: ReactNode;
	fallback: RoutesPaths;
}

function ProtectedComponent({ children, fallback }: ProtectedComponentProps) {
	console.log('protected component rendered');
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
