import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toggledAuthErrorPopupVisibility } from '../../features/popups/popups-visibility-slice';
import { RoutesPaths } from '../../utils';
import { InputName, useForm } from '../../hooks/hooks-form';
import { useAppDispatch } from '../../hooks/hooks-redux';
import AppForm, { type AppFormInputs } from '../AppForm/AppForm';
import AuthErrorPopup from '../PopupAuthError/auth-error-popup';
import { useSignInMutation } from '../../features/app-data-api/app-data-api-slice';
import ProcessLoadingBar from '../ProcessLoadingBar/process-loading-bar';

const inputsArray: AppFormInputs = [
	{
		required: true,
		type: 'email',
		autoComplete: 'off',
		id: 'input-sign-in-email',
		name: InputName.signInEmail,
		placeholder: 'Email',
		maxLength: 30,
		minLength: 2,
	},
	{
		required: true,
		type: 'password',
		autoComplete: 'current-password',
		id: 'input-sign-in-password',
		name: InputName.signInPassword,
		placeholder: 'Password',
		minLength: 8,
	},
];

function SignIn({ children }: { children: ReactNode }) {
	console.log('SignIn rendered');
	const [
		signInMutation,
		{
			error: signInError,
			isSuccess: isSignInSuccess,
			isLoading: isSignInLoading,
		},
	] = useSignInMutation();

	const { values, handleChange } = useForm();
	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const submitButtonTextDefault = 'Get started';

	useEffect(() => {
		if (isSignInSuccess) {
			navigate(RoutesPaths.home);
		}
	}, [isSignInSuccess, dispatch, navigate]);

	useEffect(() => {
		if (signInError) {
			dispatch(toggledAuthErrorPopupVisibility());
		}
	}, [signInError, dispatch]);

	return (
		<>
			{isSignInLoading && <ProcessLoadingBar />}
			<AppForm
				header="Log in"
				name="sign-in"
				formType="page"
				inputsArray={inputsArray}
				submitButtonText={
					isSignInLoading ? 'Loading...' : submitButtonTextDefault
				}
				values={values}
				bottomLinkText="Not a member yet? Sign up here!"
				bottomLinkPath={RoutesPaths.signUp}
				onChange={handleChange}
				onSubmit={async (event) => {
					event.preventDefault();
					await signInMutation({
						email: values[InputName.signInEmail],
						password: values[InputName.signInPassword],
					});
				}}
			/>
		</>
	);
}

export default SignIn;
